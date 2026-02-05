import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MockAI } from "@/lib/mock-ai";
import { Skeleton } from "@/components/ui/skeleton";
import { Wand2, ArrowRight } from "lucide-react";

export default function RefinementPage() {
    const [content, setContent] = useState('');
    const [refinedContent, setRefinedContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeOpt, setActiveOpt] = useState('grammar');

    const handleRefine = async () => {
        if (!content) return;
        setLoading(true);
        const result = await MockAI.refine({ content, option: activeOpt });
        setRefinedContent(result);
        setLoading(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Smart Refinement</h1>
                <p className="text-muted-foreground">Polish your content instantly with AI.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 h-[60vh]">
                {/* Input */}
                <div className="flex flex-col gap-4">
                    <Label>Original Content</Label>
                    <textarea
                        className="flex-1 w-full rounded-xl border bg-card/50 p-4 resize-none focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Paste your rough draft here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                {/* Output */}
                <div className="flex flex-col gap-4">
                    <Label>Polished Result</Label>
                    <div className="flex-1 w-full rounded-xl border bg-muted/30 p-4 relative overflow-auto">
                        {loading ? (
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-11/12" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        ) : (
                            <div className="whitespace-pre-wrap">{refinedContent || "Result will appear here..."}</div>
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
