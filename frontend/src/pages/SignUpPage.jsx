import { SignUp } from "@clerk/clerk-react";
import SplineScene from "@/components/SplineScene";

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <SplineScene scene="https://prod.spline.design/C4bhRKVlqFQWWZHz/scene.splinecode" className="w-full h-full opacity-60" />
            </div>
            <div className="z-10 bg-card/50 backdrop-blur-xl p-8 rounded-2xl border shadow-2xl">
                <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
            </div>
        </div>
    );
}
