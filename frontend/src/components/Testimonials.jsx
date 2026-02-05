import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
    {
        name: "Sarah Jenkins",
        handle: "@sarahj_creates",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        content: "Content Genie saved me hours of work this week. The ideation tool is basically mind-reading at this point. 🤯 #AI #ContentCreation",
    },
    {
        name: "David Chen",
        handle: "@dchen_tech",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        content: "Finally, an AI tool that doesn't sound like a robot. The Draft feature nailed my brand voice on the first try.",
    },
    {
        name: "Elena Rodriguez",
        handle: "@elenarod_marketing",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
        content: "Repurposing my blog posts into Twitter threads used to take forever. Now it's one click. Game changer. 🚀",
    },
    {
        name: "Marcus Johnson",
        handle: "@mj_hustle",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026708c",
        content: "If you're not using Content Genie for your startup, you're doing it wrong. Just saying. 🤷‍♂️",
    },
];

export function Testimonials() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
                <Card key={i} className="bg-card/40 backdrop-blur-sm border-white/5 hover:border-primary/20 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar>
                            <AvatarImage src={t.avatar} alt={t.name} />
                            <AvatarFallback>{t.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <CardTitle className="text-sm font-medium leading-none">{t.name}</CardTitle>
                            <CardDescription className="text-xs">{t.handle}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            "{t.content}"
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
