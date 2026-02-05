import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMagic, FaPenNib, FaBolt } from "react-icons/fa";

export function WelcomeCard() {
    const { user } = useUser();
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <Card className="w-full max-w-md backdrop-blur-xl bg-black/40 border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Creative glowing orbs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl group-hover:bg-primary/50 transition-all duration-700" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl group-hover:bg-purple-500/50 transition-all duration-700" />

            <CardHeader className="text-center relative z-10">
                <div className="mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-full blur-lg opacity-70 animate-pulse" />
                    <Avatar className="h-20 w-20 border-2 border-white/20 relative">
                        <AvatarImage src={user.imageUrl} alt={user.fullName} />
                        <AvatarFallback className="text-xl bg-background text-foreground">
                            {user.firstName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                <CardTitle className="text-3xl asimovian-regular bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                    Welcome back, {user.firstName}!
                </CardTitle>
                <CardDescription className="text-lg text-white/60">
                    Ready to create some magic today?
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 relative z-10">
                <Button
                    variant="outline"
                    className="h-14 justify-start gap-4 border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-[1.02] hover:border-primary/50 group/btn"
                    onClick={() => navigate("/ideation")}
                >
                    <div className="p-2 rounded-full bg-blue-500/20 text-blue-400 group-hover/btn:bg-blue-500 group-hover/btn:text-white transition-colors">
                        <FaMagic />
                    </div>
                    <div className="text-left">
                        <div className="font-semibold">New Idea</div>
                        <div className="text-xs text-white/50">Start from scratch</div>
                    </div>
                </Button>

                <Button
                    variant="outline"
                    className="h-14 justify-start gap-4 border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-[1.02] hover:border-purple-500/50 group/btn"
                    onClick={() => navigate("/drafting")}
                >
                    <div className="p-2 rounded-full bg-purple-500/20 text-purple-400 group-hover/btn:bg-purple-500 group-hover/btn:text-white transition-colors">
                        <FaPenNib />
                    </div>
                    <div className="text-left">
                        <div className="font-semibold">Continue Draft</div>
                        <div className="text-xs text-white/50">Pick up where you left off</div>
                    </div>
                </Button>
            </CardContent>

            <CardFooter className="relative z-10">
                <Button
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20"
                    onClick={() => navigate("/dashboard")} // Or main action
                >
                    Go to Dashboard
                </Button>
            </CardFooter>
        </Card>
    );
}
