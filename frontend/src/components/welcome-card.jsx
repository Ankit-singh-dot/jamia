import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMagic, FaPenNib } from "react-icons/fa";

export function WelcomeCard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <Card className="w-full max-w-sm backdrop-blur-3xl bg-black/20 border-white/10 shadow-2xl relative overflow-hidden rounded-3xl">
            {/* Subtle purple glow at top-center behind avatar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-[60px]" />

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/40 to-transparent blur-2xl" />

            <CardHeader className="text-center relative z-10 pt-10 pb-2">
                <div className="mx-auto mb-4 relative">
                    {/* Avatar Ring Glow */}
                    <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-md" />
                    <Avatar className="h-24 w-24 border-2 border-white/10 relative shadow-xl">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback className="text-2xl bg-zinc-800 text-zinc-400">
                            {user.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                <CardTitle className="text-3xl asimovian-regular text-white font-normal tracking-wide drop-shadow-sm">
                    Welcome back, {user.name.split(' ')[0]}!
                </CardTitle>
                <CardDescription className="text-white/60 text-base font-light">
                    Ready to create some magic today?
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-3 relative z-10 px-6 py-4">
                <Button
                    variant="ghost"
                    className="h-16 w-full justify-start gap-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-white transition-all hover:scale-[1.01] group"
                    onClick={() => navigate("/ideation")}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <FaMagic className="text-lg" />
                    </div>
                    <div className="text-left">
                        <div className="font-medium text-base">New Idea</div>
                        <div className="text-xs text-white/40 font-light">Start from scratch</div>
                    </div>
                </Button>

                <Button
                    variant="ghost"
                    className="h-16 w-full justify-start gap-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-white transition-all hover:scale-[1.01] group"
                    onClick={() => navigate("/drafting")}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        <FaPenNib className="text-lg" />
                    </div>
                    <div className="text-left">
                        <div className="font-medium text-base">Continue Draft</div>
                        <div className="text-xs text-white/40 font-light">Pick up where you left off</div>
                    </div>
                </Button>
            </CardContent>

            <CardFooter className="relative z-10 px-6 pb-8 pt-2">
                <Button
                    className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-base font-medium shadow-lg shadow-purple-900/20 transition-all hover:translate-y-[-1px]"
                    onClick={() => navigate("/")}
                >
                    Go to Dashboard
                </Button>
            </CardFooter>
        </Card>
    );
}
