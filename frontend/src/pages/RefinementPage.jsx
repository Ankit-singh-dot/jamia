import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MockAI } from "@/lib/mock-ai";
import { Skeleton } from "@/components/ui/skeleton";
import { Wand2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RefinementPage() {
    const location = useLocation();
    const { token } = useAuth();
    const [content, setContent] = useState('');
    const [refinedContent, setRefinedContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeOpt, setActiveOpt] = useState('grammar');

    // Receive content from Drafting page
    useEffect(() => {
        if (location.state?.content) {
            setContent(location.state.content);
        }
    }, [location.state]);

    const handleRefine = async () => {
        if (!content) return;
        setLoading(true);
        const result = await MockAI.refine({ content, option: activeOpt }, token);
        setRefinedContent(result);
        setLoading(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Smart Refinement</h1>
                <p className="text-muted-foreground">Polish your content instantly with AI.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 h-[60vh]">
                {/* Input */}
                <div className="flex flex-col gap-4 min-h-0">
                    <Label className="text-foreground flex-shrink-0">Original Content</Label>
                    <textarea
                        className="flex-1 min-h-0 w-full rounded-xl border border-border bg-background text-foreground p-4 resize-none overflow-y-auto focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-muted-foreground"
                        placeholder="Paste your rough draft here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                {/* Output */}
                <div className="flex flex-col gap-4 min-h-0">
                    <Label className="text-foreground flex-shrink-0">Polished Result</Label>
                    <div className="flex-1 min-h-0 w-full rounded-xl border border-border bg-card text-card-foreground p-4 overflow-y-auto">
                        {loading ? (
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-11/12" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        ) : (
                            <div className="whitespace-pre-wrap text-foreground">{refinedContent || <span className="text-muted-foreground">Result will appear here...</span>}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <Card>
                <CardContent className="p-4 flex flex-wrap items-center gap-4">
                    <span className="text-sm font-medium">Refinement Goal:</span>
                    <div className="flex gap-2">
                        {['grammar', 'tone', 'simplify'].map((opt) => (
                            <Button
                                key={opt}
                                variant={activeOpt === opt ? "default" : "outline"}
                                onClick={() => setActiveOpt(opt)}
                                className="capitalize"
                            >
                                {opt}
                            </Button>
                        ))}
                    </div>
                    <div className="flex-1" />
                    <Button size="lg" onClick={handleRefine} disabled={loading || !content}>
                        <Wand2 className="mr-2 h-4 w-4" /> Refine Now
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
