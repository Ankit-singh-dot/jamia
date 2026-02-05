import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";

export default function SocialPreviewPage() {
    const [content, setContent] = useState("");
    const [thread, setThread] = useState([]);

    const handleGeneratePreview = () => {
        // Basic splitting by newlines for demo purposes, can be more sophisticated
        const parts = content.split("\n\n").filter((p) => p.trim() !== "");
        setThread(parts.length > 0 ? parts : [content]);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Social Preview</h1>
                <p className="text-muted-foreground">
                    See how your content will look as a Twitter thread before you post.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Input Section */}
                <div className="space-y-4">
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6 space-y-4">
                            <Textarea
                                placeholder="Paste your long-form content here..."
                                className="min-h-[300px] resize-none bg-background/50"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Button onClick={handleGeneratePreview} className="w-full">
                                Generate Preview
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Section */}
                <div className="space-y-4 relative">
                    <div className="absolute left-[28px] top-4 bottom-4 w-0.5 bg-border z-0" />

                    {thread.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground border-2 border-dashed rounded-xl bg-card/20">
                            <p>Preview will appear here</p>
                        </div>
                    ) : (
                        thread.map((tweet, index) => (
                            <div key={index} className="relative z-10 flex gap-4">
                                <div className="flex flex-col items-center">
                                    <Avatar className="h-14 w-14 border-4 border-background">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <Card className="flex-1 bg-black/40 border-white/10 hover:bg-black/50 transition-colors">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-sm">You <span className="text-muted-foreground font-normal">@yourhandle · 1m</span></p>
                                            </div>
                                        </div>
                                        <p className="whitespace-pre-wrap text-[15px] leading-normal">{tweet}</p>
                                        {/* Fake Metrics */}
                                        <div className="flex justify-between text-muted-foreground pt-2">
                                            <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-xs"><MessageCircle className="w-4 h-4" /> <span>24</span></div>
                                            <div className="flex items-center gap-1 hover:text-green-400 cursor-pointer text-xs"><Repeat className="w-4 h-4" /> <span>5</span></div>
                                            <div className="flex items-center gap-1 hover:text-pink-500 cursor-pointer text-xs"><Heart className="w-4 h-4" /> <span>182</span></div>
                                            <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer text-xs"><Share className="w-4 h-4" /></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
