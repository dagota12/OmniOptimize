// File: app/layout.js
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes"; 
import ProgressBar from "@/components/ProgressBar";
import ConvexClientProvider from "./ConvexClientProvider";

// CORRECTION: Import Navbar and Footer from the global '_components' folder
// Based on your file tree: app/_components/Navbar.jsx and app/_components/Footer.jsx


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: "OmniOptimize | Where website peaks SEO performance",
  description: "The official digitally reimagined home of Seo optimization.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<body className={`${inter.variable} ${playfair.variable} ${inter.className} bg-harvard-accent text-slate-900 antialiased`}>
				{/* Progress Bar acts as the loading indicator */}
                <ProgressBar />
				
                <Toaster />
				
                <ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
                    
					
                    {/* 2. Children renders the page content (Home, About, etc.) */}
					<div className="min-h-screen flex flex-col">
                        <ConvexClientProvider>
							{children}
						</ConvexClientProvider>
                    </div>
                    
                    

                 
				</ThemeProvider>
			</body>
		</html>
	);
}