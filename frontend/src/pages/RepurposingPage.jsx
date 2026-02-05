import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MockAI } from "@/lib/mock-ai";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Copy, Share2, Layers } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";



import { useAuth } from "@/context/AuthContext";

export default function RepurposingPage() {
    const { token } = useAuth();
    const [sourceContent, setSourceContent] = useState('');
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const toggleFormat = (fmt) => {
        setSelectedFormats(prev =>
            prev.includes(fmt) ? prev.filter(f => f !== fmt) : [...prev, fmt]
        );
    };

    const handleRepurpose = async () => {
        if (!sourceContent || selectedFormats.length === 0) return;
        setLoading(true);
        const res = await MockAI.repurpose({ content: sourceContent, formats: selectedFormats }, token);
        setResults(res);
        setLoading(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Layers className="h-8 w-8 text-primary" /> Multi-Format Repurposing
                </h1>
                <p className="text-muted-foreground">Turn one post into a week's worth of content.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Input Column */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-foreground">Source Content (Blog, Article, Thoughts)</Label>
                        <textarea
                            className="w-full h-48 rounded-md border border-border bg-background text-foreground p-4 overflow-y-auto resize-none focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                            placeholder="Paste your main content here..."
                            value={sourceContent}
                            onChange={e => setSourceContent(e.target.value)}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>Target Formats</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {['linkedin', 'twitter', 'instagram'].map(fmt => (
                                <div
                                    key={fmt}
                                    onClick={() => toggleFormat(fmt)}
                                    className={`cursor-pointer border rounded-lg p-3 flex items-center justify-between transition-all ${selectedFormats.includes(fmt) ? 'bg-primary/10 border-primary' : 'hover:bg-accent'}`}
                                >
                                    <span className="capitalize font-medium">{fmt}</span>
                                    {selectedFormats.includes(fmt) && <Check className="h-4 w-4 text-primary" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button className="w-full" size="lg" onClick={handleRepurpose} disabled={loading || !sourceContent || selectedFormats.length === 0}>
                        {loading ? "Converting..." : "Generate Variants"}
                    </Button>
                </div>

                {/* Output Column */}
                <div className="lg:col-span-7">
                    <div className="grid gap-6">
                        {loading && <Skeleton className="h-64 w-full rounded-xl" />}

                        {!loading && results && Object.entries(results).map(([key, val]) => (
                            <Card key={key} className="overflow-hidden">
                                <CardHeader className="bg-muted/40 py-3 border-b">
                                    <CardTitle className="text-sm font-medium capitalize flex items-center gap-2">
                                        {key} Draft
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <ScrollArea className="h-32 w-full rounded-md border p-4 bg-background/50">
                                        <pre className="text-sm font-sans whitespace-pre-wrap">{val}</pre>
                                    </ScrollArea>
                                    <div className="flex justify-end gap-2 mt-3">
                                        <Button variant="ghost" size="sm"><Copy className="h-3 w-3 mr-2" /> Copy</Button>
                                        <Button variant="ghost" size="sm"><Share2 className="h-3 w-3 mr-2" /> Share</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {!loading && !results && (
                            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl text-muted-foreground">
                                Generated content will appear here...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
