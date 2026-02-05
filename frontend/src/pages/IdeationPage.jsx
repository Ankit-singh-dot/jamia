import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MockAI } from "@/lib/mock-ai";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Copy, Check } from "lucide-react";

export default function IdeationPage() {
    const [formData, setFormData] = useState({ niche: '', audience: '', goal: '', platform: '' });
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(null);

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const results = await MockAI.ideate(formData);
        setIdeas(results);
        setLoading(false);
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Content Ideation</h1>
                <p className="text-muted-foreground">Stuck on what to post? Let Content Genie generate high-impact topics for you.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Input Section */}
                <Card className="backdrop-blur-sm bg-card/50 border-white/10 h-fit">
                    <CardHeader>
                        <CardTitle>Topic Parameters</CardTitle>
                        <CardDescription>Tell us about your target content.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="niche">Industry / Niche</Label>
                                <Input
                                    id="niche" placeholder="e.g. Fitness, AI, Marketing"
                                    value={formData.niche} onChange={e => setFormData({ ...formData, niche: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="audience">Target Audience</Label>
                                <Input
                                    id="audience" placeholder="e.g. Beginners, CTOs, Moms"
                                    value={formData.audience} onChange={e => setFormData({ ...formData, audience: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="goal">Goal</Label>
                                    <Input
                                        id="goal" placeholder="e.g. Sales, Engagement"
                                        value={formData.goal} onChange={e => setFormData({ ...formData, goal: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="platform">Platform</Label>
                                    <Input
                                        id="platform" placeholder="e.g. LinkedIn, Twitter"
                                        value={formData.platform} onChange={e => setFormData({ ...formData, platform: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Sparkles className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                {loading ? "Dreaming up ideas..." : "Generate Ideas"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-4">
                    {loading && (
                        <>
                            <Skeleton className="h-24 w-full rounded-xl" />
                            <Skeleton className="h-24 w-full rounded-xl" />
                            <Skeleton className="h-24 w-full rounded-xl" />
                        </>
                    )}

                    {!loading && ideas.length > 0 && ideas.map((idea, idx) => (
                        <Card key={idx} className="group hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-6 flex justify-between items-start gap-4">
                                <p className="font-medium text-lg leading-relaxed">{idea}</p>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(idea, idx)}>
                                    {copied === idx ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}

                    {!loading && ideas.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground border-2 border-dashed rounded-xl">
                            <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                            <p>Enter your parameters and hit generate to see magic happens.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
