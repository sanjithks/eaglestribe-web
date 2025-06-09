import "../styles/output.css"; 
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Eagles Tribe MC",
  description: "A website for the Eagles Tribe Motorcycle Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-dark-charcoal flex flex-col min-h-screen">
        
        {/*
          THIS IS THE MOST IMPORTANT LINE FOR YOUR PROBLEM.
          This line tells Next.js to render your Header component.
          Please ensure it exists right after the <body> tag.
        */}
        <Header />

        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />

      </body>
    </html>
  );
}