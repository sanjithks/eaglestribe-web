// app/layout.js
import "../styles/output.css"; // Import compiled Tailwind CSS
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Eagles Tribe MC",
  description: "A website dedicated to the Eagles Tribe Motorcycle Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[--color-background] text-[--color-foreground] font-[var(--font-body)] flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}