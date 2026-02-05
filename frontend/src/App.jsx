import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp, UserButton } from "@clerk/clerk-react";
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import Oneko from "@/components/Oneko";
import SplineScene from "@/components/SplineScene";

// Pages
import IdeationPage from "@/pages/IdeationPage";
import DraftingPage from "@/pages/DraftingPage";
import RefinementPage from "@/pages/RefinementPage";
import RepurposingPage from "@/pages/RepurposingPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";

import { ButtonDemo } from "@/components/button-demo";
import { CardDemo } from "@/components/card-demo";
import { WelcomeCard } from "@/components/welcome-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Toggle } from "@/components/ui/toggle";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

function LandingPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="min-h-[60vh] flex flex-col justify-center hero-content">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            Now in Beta
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                            AI-Based Content Creation
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-[600px]">
                            Creating high-quality digital content consistently is a major challenge.
                            Content Genie helps you generate, refine, and optimize content across multiple formats.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/ideation" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                                Get Started
                            </Link>
                            <SignedOut>
                                <Link to="/sign-in" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                    Sign In
                                </Link>
                            </SignedOut>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <SignedOut>
                            <CardDemo />
                        </SignedOut>
                        <SignedIn>
                            <WelcomeCard />
                        </SignedIn>
                    </div>
                </div>
            </section>

            {/* Features / Showcase */}
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50 border flex items-center justify-center p-6">
                    <div className="text-center space-y-2">
                        <h3 className="font-semibold text-lg">Ideation</h3>
                        <p className="text-sm text-muted-foreground">Automated topic suggestions and drafting.</p>
                        <Skeleton className="h-4 w-[100px] mx-auto mt-4" />
                    </div>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 border flex items-center justify-center p-6">
                    <div className="text-center space-y-2">
                        <h3 className="font-semibold text-lg">Optimization</h3>
                        <p className="text-sm text-muted-foreground">Content quality improvement and SEO.</p>
                        <Skeleton className="h-4 w-[100px] mx-auto mt-4" />
                    </div>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 border flex items-center justify-center p-6">
                    <div className="text-center space-y-2">
                        <h3 className="font-semibold text-lg">Multi-Format</h3>
                        <p className="text-sm text-muted-foreground">Support for blogs, social, and more.</p>
                        <Skeleton className="h-4 w-[100px] mx-auto mt-4" />
                    </div>
                </div>
            </div>

            {/* Accordion FAQ */}
            <div className="max-w-2xl w-full mx-auto my-12 bg-card/40 backdrop-blur-sm p-8 rounded-2xl border">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Content Genie?</AccordionTrigger>
                        <AccordionContent>
                            Content Genie is an AI-powered assistant that helps creators generate and optimize digital content efficiently.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Who is it for?</AccordionTrigger>
                        <AccordionContent>
                            It is designed for content creators, marketing teams, small businesses, and educational organizations.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is it free?</AccordionTrigger>
                        <AccordionContent>
                            We offer a free tier for hackathon judges and a premium tier for power users.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

function Layout() {
    // This component wraps the main app content that needs the sidebar
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative overflow-hidden bg-background/50 isolate">

                {/* Spline Background (Robot Scene) */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <SplineScene scene="https://prod.spline.design/C4bhRKVlqFQWWZHz/scene.splinecode" className="w-full h-full" />
                </div>

                <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/60 backdrop-blur-md px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Link to="/" className="font-semibold text-foreground tracking-tight hover:opacity-80 transition-opacity">
                            Content Genie
                        </Link>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </header>

                <div className="relative z-10 flex flex-1 flex-col gap-4 p-4 md:p-10 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)]">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />

                        {/* Protected Routes */}
                        <Route path="/ideation" element={
                            <>
                                <SignedIn><IdeationPage /></SignedIn>
                                <SignedOut><RedirectToSignIn /></SignedOut>
                            </>
                        } />
                        <Route path="/drafting" element={
                            <>
                                <SignedIn><DraftingPage /></SignedIn>
                                <SignedOut><RedirectToSignIn /></SignedOut>
                            </>
                        } />
                        <Route path="/refinement" element={
                            <>
                                <SignedIn><RefinementPage /></SignedIn>
                                <SignedOut><RedirectToSignIn /></SignedOut>
                            </>
                        } />
                        <Route path="/repurposing" element={
                            <>
                                <SignedIn><RepurposingPage /></SignedIn>
                                <SignedOut><RedirectToSignIn /></SignedOut>
                            </>
                        } />
                    </Routes>

                    <div className="min-h-[10vh]" /> {/* Spacer */}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

function App() {
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
        gsap.fromTo(".app-container", { opacity: 0 }, { opacity: 1, duration: 1 });

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Router>
                <div className="app-container">
                    <Oneko />
                    <Routes>
                        {/* Auth Routes (No Sidebar) */}
                        <Route path="/sign-in/*" element={<SignInPage />} />
                        <Route path="/sign-up/*" element={<SignUpPage />} />

                        {/* Main Routes (With Sidebar) */}
                        <Route path="/*" element={<Layout />} />
                    </Routes>
                </div>
            </Router>
        </ClerkProvider>
    )
}

export default App
