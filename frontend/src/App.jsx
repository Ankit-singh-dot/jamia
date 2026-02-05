import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import IdeationPage from "@/pages/IdeationPage";
import DraftingPage from "@/pages/DraftingPage";
import RefinementPage from "@/pages/RefinementPage";
import RepurposingPage from "@/pages/RepurposingPage";
import SocialPreviewPage from "@/pages/SocialPreviewPage";

import { ButtonDemo } from "@/components/button-demo";
import { CardDemo } from "@/components/card-demo";
import { WelcomeCard } from "@/components/welcome-card";
import { Testimonials } from "@/components/Testimonials";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sparkles, PenTool, Edit3, Share2, Twitter, Instagram, Linkedin, FileText, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import Oneko from "@/components/Oneko";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    if (!user) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
};

function Layout() {
    const { user } = useAuth();
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative overflow-hidden bg-background/50 isolate">
                <div className="fixed inset-0 z-[-1] opacity-70 pointer-events-none">
                    <Spline scene="https://prod.spline.design/C4bhRKVlqFQWWZHz/scene.splinecode" />
                </div>

                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-md bg-background/20 sticky top-0 z-40">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="flex-1" />
                    <div className="flex items-center gap-4">
                        {!user && <Link to="/sign-in" className="text-sm font-medium hover:underline">Sign In</Link>}
                    </div>
                </header>

                <div className="relative z-10 flex flex-1 flex-col gap-4 p-4 md:p-10 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)]">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/ideation" element={<IdeationPage />} />
                        <Route path="/drafting" element={<DraftingPage />} />
                        <Route path="/refine" element={<RefinementPage />} />
                        <Route path="/repurpose" element={<RepurposingPage />} />
                        <Route path="/social-preview" element={<SocialPreviewPage />} />
                        <Route path="/dashboard" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

function LandingPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-16 md:gap-24 pb-20">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row justify-between items-center gap-8 min-h-[70vh]">
                <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI-Powered Content Suite
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Create Content <br />
                        <span className="text-primary/90">Hands-Free.</span>
                    </h1>
                    <p className="text-muted-foreground text-xl max-w-lg leading-relaxed">
                        From fleeting thoughts to viral threads. Generate, refine, and visualize your content strategy in seconds with Content Genie.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Button size="lg" className="h-12 px-8" onClick={() => navigate(user ? "/ideation" : "/sign-up")}>
                            {user ? "Go to Dashboard" : "Start Creating Free"}
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 bg-background/20 backdrop-blur-sm border-white/10 hover:bg-background/40">
                            Watch Demo
                        </Button>
                    </div>
                </div>

                <div className="flex-1 flex justify-center md:justify-end scale-110 md:scale-125 origin-center">
                    {user ? <WelcomeCard /> : <CardDemo />}
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-card/60 to-card/40 border border-white/5 p-6 hover:border-primary/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Sparkles className="w-10 h-10 text-primary/80 mb-4" />
                    <h3 className="font-semibold text-xl mb-2">Ideation</h3>
                    <p className="text-muted-foreground text-sm">Generate endless topic ideas tailored to your niche and audience.</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-card/60 to-card/40 border border-white/5 p-6 hover:border-primary/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <PenTool className="w-10 h-10 text-blue-400 mb-4" />
                    <h3 className="font-semibold text-xl mb-2">Drafting</h3>
                    <p className="text-muted-foreground text-sm">Turn ideas into structured drafts with one click. Blogs, scripts, and more.</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-card/60 to-card/40 border border-white/5 p-6 hover:border-primary/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Edit3 className="w-10 h-10 text-green-400 mb-4" />
                    <h3 className="font-semibold text-xl mb-2">Refinement</h3>
                    <p className="text-muted-foreground text-sm">Polish your content. Fix grammar, adjust tone, and simplify complex text.</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-card/60 to-card/40 border border-white/5 p-6 hover:border-primary/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Share2 className="w-10 h-10 text-purple-400 mb-4" />
                    <h3 className="font-semibold text-xl mb-2">Repurposing</h3>
                    <p className="text-muted-foreground text-sm">Transform one piece of content into tweets, LinkedIn posts, and Instagram captions.</p>
                </div>
            </section>

            {/* Testimonials / Social Proof */}
            <section className="space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold">Loved by Creators</h2>
                    <p className="text-muted-foreground">Join thousands of creators building their audience hands-free.</p>
                </div>
                <Testimonials />
            </section>

            {/* CTA Section */}
            <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-background/40 to-background border border-white/10 p-12 text-center space-y-6">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <h2 className="text-3xl md:text-5xl font-bold relative z-10">Ready to automate your growth?</h2>
                <p className="text-muted-foreground max-w-xl mx-auto relative z-10 text-lg">
                    Stop staring at a blank page. Start creating content that converts.
                </p>
                <div className="relative z-10 pt-4">
                    <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-primary/20" onClick={() => navigate("/sign-up")}>
                        Get Started for Free
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 pt-8 mt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <Link to="/" className="text-xl font-bold">Content Genie</Link>
                        <p className="text-sm text-muted-foreground">The AI companion for modern creators.</p>
                        <div className="flex gap-4">
                            <Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                            <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="#" className="hover:text-foreground">Features</Link></li>
                            <li><Link to="#" className="hover:text-foreground">Pricing</Link></li>
                            <li><Link to="#" className="hover:text-foreground">Showcase</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="#" className="hover:text-foreground">About</Link></li>
                            <li><Link to="#" className="hover:text-foreground">Blog</Link></li>
                            <li><Link to="#" className="hover:text-foreground">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="#" className="hover:text-foreground">Privacy</Link></li>
                            <li><Link to="#" className="hover:text-foreground">Terms</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-xs text-muted-foreground border-t border-white/5 pt-8">
                    © 2024 Content Genie Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

function App() {
    useEffect(() => {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }, []);

    return (
        <AuthProvider>
            <Router>
                <div className="app-container font-sans antialiased text-foreground bg-background">
                    <Oneko />
                    <Routes>
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                        <Route path="/*" element={<Layout />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App;
