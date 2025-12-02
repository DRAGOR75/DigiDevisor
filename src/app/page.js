
import HomeSwitcher from "@/app/home/HomeSwitcher";

export default async function Home() {
    // You can keep the loading delay here, or move it inside the components
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay

    return (
        <main>
            {/* HomeSwitcher replaces all other content */}
            <HomeSwitcher />
        </main>
    );
}

