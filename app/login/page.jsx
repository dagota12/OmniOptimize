"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Github, 
  Chrome, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  Eye,
  EyeOff,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // alert("Logged in!"); // In real app, redirect here
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2 overflow-hidden bg-white dark:bg-slate-950">
      
      {/* --- LEFT SIDE: FORM --- */}
      <div className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 border-r border-slate-200 dark:border-slate-800">
        
        {/* Subtle Grid Background for texture */}
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-[0.4] pointer-events-none" />

        {/* Logo (Top Left) */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-500/20 transition-transform group-hover:rotate-12">
                    <Sparkles size={16} fill="currentColor" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                    OmniOptimize
                </span>
            </Link>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm mx-auto relative z-10"
        >
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                    Welcome back
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Enter your credentials to access your dashboard.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email Input */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">Email</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="name@company.com" 
                        className="h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-brand-500 transition-all"
                        required 
                    />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">Password</Label>
                        <Link href="#" className="text-xs font-medium text-brand-600 hover:text-brand-500">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            className="h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-brand-500 pr-10 transition-all"
                            required 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    className="w-full h-11 bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-lg shadow-brand-500/20 transition-all"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Sign in to Dashboard <ArrowRight className="w-4 h-4" />
                        </span>
                    )}
                </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">
                        Or continue with
                    </span>
                </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-11 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 dark:text-white">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
                <Button variant="outline" className="h-11 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 dark:text-white">
                    <Chrome className="mr-2 h-4 w-4 text-red-500" /> Google
                </Button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{" "}
                <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-500 hover:underline underline-offset-4">
                    Sign up for free
                </Link>
            </p>

        </motion.div>

        {/* Footer Links (Left Side) */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-slate-500 hidden sm:flex">
            <span>© 2025 OmniOptimize</span>
            <div className="space-x-4">
                <Link href="#" className="hover:text-slate-800 dark:hover:text-slate-200">Privacy</Link>
                <Link href="#" className="hover:text-slate-800 dark:hover:text-slate-200">Terms</Link>
            </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: VISUAL (Hidden on mobile) --- */}
      <div className="hidden lg:block relative bg-slate-900 overflow-hidden">
        {/* Background Image - Abstract Data/Tech */}
        <Image 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop"
            alt="Data Center Abstract"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-brand-900/20" />

        {/* Floating Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
            
            {/* Glass Card - Testimonial */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-md shadow-2xl"
            >
                <div className="flex justify-center mb-6">
                    <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        ))}
                    </div>
                </div>
                <blockquote className="text-xl font-medium text-white mb-6 leading-relaxed">
                    "OmniOptimize is the first tool that actually speaks the language of developers. Our site speed increased by <span className="text-brand-400 font-bold">40%</span> in just two weeks."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-400 to-blue-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                            JS
                        </div>
                    </div>
                    <div className="text-left">
                        <div className="text-white font-bold text-sm">Jason Statham</div>
                        <div className="text-slate-400 text-xs">CTO at TechCorp</div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Tech Stats */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-12 flex gap-8 text-slate-400 font-mono text-xs"
            >
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>System Operational</span>
                </div>
                <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-500" />
                    <span>256-bit Encryption</span>
                </div>
            </motion.div>

        </div>
      </div>

    </div>
  );
}