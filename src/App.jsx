import React, { useState, useEffect } from 'react';
import { Upload, FileText, Settings, Users, Search, ChevronRight, CheckCircle, AlertCircle, Database, RefreshCw } from 'lucide-react';

// --- MOCK INITIAL DATA (To show the app isn't empty on load) ---
const INITIAL_DATA = {
    equipment: [
        { id: 'E1', name: 'Digger 3000 (HEMM)', manufacturer: 'HEMM-Corp', category: 'Excavation' }
    ],
    problems: [
        { id: 'P1', title: 'Boom Drift', description: 'Boom arm slowly sinks when control is neutralized.' }
    ],
    solutions: [
        { id: 'S1', instruction: 'Check the hydraulic line pressure at manifold block A.', result: 'Pressure should be within 10 PSI of spec.' },
        { id: 'S2', instruction: 'Verify O-ring seal on boom cylinder valve block 2 is intact. Replace if worn.', result: 'Seal is present and shows no signs of pinching.' }
    ],
    guides_main: [
        { id: 'G1', equipment_id: 'E1', problem_id: 'P1' }
    ],
    guide_steps: [
        { guide_id: 'G1', solution_id: 'S1', seq: 1 },
        { guide_id: 'G1', solution_id: 'S2', seq: 2 }
    ]
};

const App = () => {
    // --- STATE MANAGEMENT (Simulating the Database Tables) ---
    const [activeTab, setActiveTab] = useState('tech'); // 'tech' or 'admin'
    const [db, setDb] = useState(INITIAL_DATA);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, processing, success, error
    const [log, setLog] = useState([]);

    // --- ETL LOGIC (The "Pipeline" in JavaScript) ---
    const processCSV = (csvText) => {
        setUploadStatus('processing');
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');

        // We create temporary sets to ensure uniqueness (Simulating "SELECT DISTINCT")
        let newDb = { ...db };
        let logs = [];

        // Helper to generate IDs (Simple hash simulation)
        const generateId = (prefix, text) => `${prefix}-${Math.abs(text.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0))}`;

        lines.slice(1).forEach((line, idx) => {
            if (!line.trim()) return;

            // Simple CSV parsing (assuming no commas in fields for this demo)
            const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            if (cols.length < 3) return;

            const equipName = cols[0].replace(/"/g, '').trim();
            const probTitle = cols[1].replace(/"/g, '').trim();
            const probDesc = cols[2].replace(/"/g, '').trim();

            // 1. NORMALIZE EQUIPMENT
            const equipId = generateId('E', equipName);
            if (!newDb.equipment.find(e => e.id === equipId)) {
                newDb.equipment.push({ id: equipId, name: equipName, manufacturer: 'Imported', category: 'General' });
                logs.push(`New Equipment: ${equipName}`);
            }

            // 2. NORMALIZE PROBLEMS
            const probId = generateId('P', probTitle);
            if (!newDb.problems.find(p => p.id === probId)) {
                newDb.problems.push({ id: probId, title: probTitle, description: probDesc });
                logs.push(`New Problem: ${probTitle}`);
            }

            // 3. NORMALIZE SOLUTIONS (Loop through steps 1, 2, 3)
            const guideSteps = [];
            [3, 5, 7].forEach((colIdx, stepIndex) => { // Steps are at cols 3, 5, 7
                if (cols[colIdx] && cols[colIdx].trim()) {
                    const instruction = cols[colIdx].replace(/"/g, '').trim();
                    const result = cols[colIdx + 1] ? cols[colIdx + 1].replace(/"/g, '').trim() : '';

                    const solId = generateId('S', instruction);

                    // Insert Solution if unique
                    if (!newDb.solutions.find(s => s.id === solId)) {
                        newDb.solutions.push({ id: solId, instruction, result });
                    }
                    guideSteps.push({ solId, seq: stepIndex + 1 });
                }
            });

            // 4. LINK GUIDES
            const guideId = generateId('G', `${equipId}-${probId}`);
            if (!newDb.guides_main.find(g => g.id === guideId)) {
                newDb.guides_main.push({ id: guideId, equipment_id: equipId, problem_id: probId });

                // Link Steps
                guideSteps.forEach(step => {
                    newDb.guide_steps.push({ guide_id: guideId, solution_id: step.solId, seq: step.seq });
                });
                logs.push(`Linked Guide: ${equipName} -> ${probTitle}`);
            }
        });

        setDb(newDb);
        setLog(logs);
        setUploadStatus('success');
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => processCSV(e.target.result);
            reader.readAsText(file);
        }
    };

    // --- QUERY LOGIC (The "SELECT... JOIN" simulation) ---
    const getProblemsForEquipment = (equipId) => {
        // JOIN guides_main ON equipment_id
        const guides = db.guides_main.filter(g => g.equipment_id === equipId);
        // JOIN problems ON problem_id
        return guides.map(g => {
            const prob = db.problems.find(p => p.id === g.problem_id);
            return { ...prob, guideId: g.id };
        });
    };

    const getStepsForGuide = (guideId) => {
        // JOIN guide_steps ON guide_id
        const links = db.guide_steps.filter(gs => gs.guide_id === guideId).sort((a,b) => a.seq - b.seq);
        // JOIN solutions ON solution_id
        return links.map(link => {
            const sol = db.solutions.find(s => s.id === link.solution_id);
            return { ...sol, seq: link.seq };
        });
    };

    // --- RENDER HELPERS ---
    const resetView = () => {
        setSelectedEquipment(null);
        setSelectedProblem(null);
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800">

            {/* SIDEBAR */}
            <div className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl">
                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <Database className="w-6 h-6 text-blue-400" />
                        HEMM Guide
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">v2.0 Normalized System</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('tech')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'tech' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}
                    >
                        <Search className="w-5 h-5" /> Technician View
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'admin' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}
                    >
                        <Settings className="w-5 h-5" /> Admin / Upload
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-800 text-xs">
                    <div className="flex justify-between mb-1"><span>Equipment:</span> <span className="text-white font-mono">{db.equipment.length}</span></div>
                    <div className="flex justify-between mb-1"><span>Problems:</span> <span className="text-white font-mono">{db.problems.length}</span></div>
                    <div className="flex justify-between mb-1"><span>Solutions:</span> <span className="text-white font-mono">{db.solutions.length}</span></div>
                    <div className="flex justify-between"><span>Active Guides:</span> <span className="text-white font-mono">{db.guides_main.length}</span></div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 overflow-auto">

                {/* === ADMIN VIEW === */}
                {activeTab === 'admin' && (
                    <div className="p-8 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Upload className="w-6 h-6 text-blue-600" /> Data Pipeline Upload
                        </h2>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 mb-8">
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-10 text-center hover:bg-slate-50 transition-colors">
                                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-700">Upload Raw CSV</h3>
                                <p className="text-sm text-slate-500 mb-6">Drag and drop your 'HEMM raw.csv' file here or click to browse.</p>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="csv-upload"
                                />
                                <label
                                    htmlFor="csv-upload"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
                                >
                                    Select File
                                </label>
                            </div>

                            {uploadStatus === 'processing' && (
                                <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2">
                                    <RefreshCw className="w-4 h-4 animate-spin" /> Processing and Normalizing Data...
                                </div>
                            )}

                            {uploadStatus === 'success' && (
                                <div className="mt-4">
                                    <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 mb-4">
                                        <CheckCircle className="w-4 h-4" /> Import Successful! Database updated.
                                    </div>
                                    <div className="bg-slate-900 text-green-400 font-mono text-xs p-4 rounded-lg h-48 overflow-y-auto">
                                        {log.map((l, i) => <div key={i}>&gt; {l}</div>)}
                                        <div className="text-white mt-2">-- ETL Process Complete --</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-800">
                            <strong>Architecture Note:</strong> When you upload a file here, the JavaScript mimics a server-side ETL process. It splits your "flat" CSV rows into the 5 normalized relational tables (Equipment, Problems, Solutions, Guides, Steps) we designed.
                        </div>
                    </div>
                )}

                {/* === TECHNICIAN VIEW === */}
                {activeTab === 'tech' && (
                    <div className="p-8 max-w-5xl mx-auto">

                        {/* Breadcrumb Navigation */}
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                            <span className={`cursor-pointer hover:text-blue-600 ${!selectedEquipment ? 'font-bold text-slate-900' : ''}`} onClick={resetView}>Equipment Select</span>
                            {selectedEquipment && <ChevronRight className="w-4 h-4" />}
                            {selectedEquipment && <span className={`cursor-pointer hover:text-blue-600 ${!selectedProblem ? 'font-bold text-slate-900' : ''}`} onClick={() => setSelectedProblem(null)}>{selectedEquipment.name}</span>}
                            {selectedProblem && <ChevronRight className="w-4 h-4" />}
                            {selectedProblem && <span className="font-bold text-slate-900">{selectedProblem.title}</span>}
                        </div>

                        {/* 1. EQUIPMENT SELECTION */}
                        {!selectedEquipment && (
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Select Equipment</h2>
                                <p className="text-slate-500 mb-6">Choose the machine you are troubleshooting.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {db.equipment.map(equip => (
                                        <div
                                            key={equip.id}
                                            onClick={() => setSelectedEquipment(equip)}
                                            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-blue-400 transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    {equip.name.charAt(0)}
                                                </div>
                                                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{equip.id}</span>
                                            </div>
                                            <h3 className="font-bold text-lg text-slate-800 mb-1">{equip.name}</h3>
                                            <p className="text-sm text-slate-500">{equip.category}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. PROBLEM SELECTION */}
                        {selectedEquipment && !selectedProblem && (
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Identify Issue</h2>
                                <p className="text-slate-500 mb-6">What symptom is {selectedEquipment.name} exhibiting?</p>
                                <div className="space-y-3">
                                    {getProblemsForEquipment(selectedEquipment.id).map(prob => (
                                        <div
                                            key={prob.id}
                                            onClick={() => setSelectedProblem(prob)}
                                            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-red-400 hover:bg-red-50/50 transition-all flex items-center justify-between"
                                        >
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-800 text-red-700">{prob.title}</h3>
                                                <p className="text-slate-600">{prob.description}</p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-400" />
                                        </div>
                                    ))}
                                    {getProblemsForEquipment(selectedEquipment.id).length === 0 && (
                                        <div className="text-center py-10 text-slate-400 bg-slate-100 rounded-lg border-dashed border-2">
                                            No guides available for this equipment yet. <br/> Try uploading the CSV in Admin mode!
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 3. GUIDE VIEW */}
                        {selectedEquipment && selectedProblem && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-slate-900 text-white p-6 rounded-t-xl">
                                    <div className="text-xs uppercase tracking-wider opacity-70 mb-1">Troubleshooting Guide</div>
                                    <h1 className="text-2xl font-bold flex items-center gap-2">
                                        {selectedEquipment.name}: {selectedProblem.title}
                                    </h1>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-b-xl p-8 space-y-8 shadow-sm">
                                    {getStepsForGuide(selectedProblem.guideId).map((step, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200">
                                                    {index + 1}
                                                </div>
                                                {index !== getStepsForGuide(selectedProblem.guideId).length - 1 && (
                                                    <div className="w-0.5 flex-1 bg-slate-200 my-2"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 pb-8">
                                                <h4 className="text-lg font-bold text-slate-800 mb-2">Instruction</h4>
                                                <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 mb-3">{step.instruction}</p>

                                                {step.result && (
                                                    <div className="flex gap-3 items-start">
                                                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                                        <div>
                                                            <span className="text-sm font-bold text-green-700 uppercase tracking-wide">Expected Result</span>
                                                            <p className="text-sm text-slate-600">{step.result}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={() => setSelectedProblem(null)}
                                        className="text-slate-500 hover:text-slate-800 font-medium"
                                    >
                                        Back to Problem List
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
};

export default App;
