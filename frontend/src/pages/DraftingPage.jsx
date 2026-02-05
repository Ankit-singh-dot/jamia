import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MockAI } from "@/lib/mock-ai";
import { Skeleton } from "@/components/ui/skeleton";
import { PenTool, Download, Wand2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DraftingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [formData, setFormData] = useState({ topic: '', tone: 'Professional', length: 'Medium', style: 'Storytelling' });
    const [draft, setDraft] = useState(null);
    const [loading, setLoading] = useState(false);

    // Receive topic from Ideation page
    useEffect(() => {
        if (location.state?.topic) {
            setFormData(prev => ({ ...prev, topic: location.state.topic }));
        }
    }, [location.state]);

    const handleDraft = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await MockAI.draft(formData, token);
        setDraft(result);
        setLoading(false);
    };

    const sendToRefinement = () => {
        if (draft?.content) {
            navigate('/refine', { state: { content: draft.content } });
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 animate-in fade-in">
            {/* Left Panel: Controls */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-foreground">Drafting Assistant</h1>
                    <p className="text-sm text-muted-foreground">Turn an idea into a full post.</p>
                </div>

                <Card className="flex-1 bg-card/80 backdrop-blur-md border-border">
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label className="text-foreground">Topic / Headline</Label>
                            <Input
                                value={formData.topic}
                                onChange={e => setFormData({ ...formData, topic: e.target.value })}
                                placeholder="e.g. The Future of AI"
                                className="bg-background text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-foreground">Tone</Label>
                            <select
                                className="w-full h-10 rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                value={formData.tone}
                                onChange={e => setFormData({ ...formData, tone: e.target.value })}
                            >
                                <option>Professional</option>
                                <option>Casual</option>
                                <option>Witty</option>
                                <option>Urgent</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-foreground">Length</Label>
                                <select
                                    className="w-full h-10 rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm"
                                    value={formData.length}
                                    onChange={e => setFormData({ ...formData, length: e.target.value })}
                                >
                                    <option>Short</option>
                                    <option>Medium</option>
                                    <option>Long</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-foreground">Style</Label>
                                <select
                                    className="w-full h-10 rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm"
                                    value={formData.style}
                                    onChange={e => setFormData({ ...formData, style: e.target.value })}
                                >
                                    <option>Storytelling</option>
                                    <option>Listicle</option>
                                    <option>Direct</option>
                                </select>
                            </div>
                        </div>

                        <Button onClick={handleDraft} className="w-full" disabled={loading || !formData.topic}>
                            {loading ? "Writing..." : "Create Draft"}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Right Panel: Editor/Preview */}
            <div className="flex-1 h-full">
                <Card className="h-full flex flex-col bg-card/80 backdrop-blur-xl border-border shadow-2xl">
                    <CardHeader className="border-b px-6 py-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2 text-card-foreground">
                            <PenTool className="h-4 w-4" />
                            {draft ? draft.title : "Document Preview"}
                        </CardTitle>
                        <div className="flex gap-2">
                            {draft && (
                                <>
                                    <Button variant="outline" size="sm" onClick={sendToRefinement}>
                                        <Wand2 className="h-4 w-4 mr-2" /> Refine This
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" /> Export
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0 p-0 overflow-auto">
                        {loading ? (
                            <div className="p-8 space-y-4">
                                <Skeleton className="h-8 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <div className="pt-8 space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                        ) : (
                            <textarea
                                className="w-full h-full min-h-[300px] resize-none bg-background text-foreground p-8 focus:outline-none font-mono text-sm leading-relaxed overflow-y-auto"
                                placeholder="Your draft will appear here..."
                                value={draft ? draft.content : ""}
                                readOnly
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
