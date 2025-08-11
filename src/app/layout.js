import NavBar from "@/components/NavBar";
import './globals.css'

export const metadata = {
  title: "Digi Devisor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
