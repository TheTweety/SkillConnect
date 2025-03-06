// components/Header.jsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Descope } from "@descope/nextjs-sdk";
import { useRouter } from "next/navigation";
import SignupChoice from "./SignupChoice";

function Header() {
    const { data: session, status } = useSession();
    const [signupChoice, setSignupChoice] = useState(null); // 'showChoice', 'business', 'customer'
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            console.log("User authenticated:", session.user);
            setSignupChoice(null);
        } else if (status === "unauthenticated") {
            console.log("User unauthenticated");
        }
    }, [status, session]);

    const handleLogin = () => {
        setSignupChoice("showChoice");
    };

    const handleBusinessSignup = () => {
        setSignupChoice("business");
    };

    const handleCustomerSignup = () => {
        setSignupChoice("customer");
    };

    const handleCloseSignup = () => {
        setSignupChoice(null);
    };

    const handleDescopeSuccess = async (e) => {
        const user = e.detail.user; // Extract user details from Descope response
        console.log("Descope Success:", user);

        setSignupChoice(null); // Reset the signup choice modal

        try {
            await signIn("descope", { callbackUrl: "/" });
            router.push("/dashboard");
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };


    const handleDescopeError = (e) => {
        console.error("Descope Error:", e);
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: window.location.href });
        router.refresh();
    };

    return (
        <div className="p-5 shadow-sm flex justify-between">
            <div className="flex items-center gap-8">
                <Image src="/logo.svg" alt="logo" width={180} height={100} />
                <div className="md:flex items-center gap-6 hidden">
                    <Link href={"/"} className="hover:scale-105 hover:text-primary cursor-pointer">
                        Home
                    </Link>
                    <h2 className="hover:scale-105 hover:text-primary cursor-pointer">Services</h2>
                    <h2 className="hover:scale-105 hover:text-primary cursor-pointer">About Us</h2>
                </div>
            </div>
            <div>
                {status === "loading" ? (
                    <div>Loading...</div>
                ) : session?.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Image
                                src={session.user.image || "/default-avatar.png"}
                                alt="user"
                                width={40}
                                height={40}
                                className="rounded-full cursor-pointer"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                My Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
                        {/* Login/Signup button is now OUTSIDE the conditional modals */}
                        <Button onClick={handleLogin} className="md:flex align-bottom">Login / Sign Up</Button>

                        {signupChoice === "showChoice" && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
                                    <SignupChoice
                                        onBusinessSignup={handleBusinessSignup}
                                        onCustomerSignup={handleCustomerSignup}
                                        onClose={handleCloseSignup}
                                    />
                                </div>
                            </div>
                        )}
                        {signupChoice === "business" && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
                                    <Descope
                                        flowId="business-signup"
                                        onSuccess={handleDescopeSuccess}
                                        onError={handleDescopeError}
                                    />
                                    <Button className="mt-4 w-full" onClick={handleCloseSignup}>Close</Button>
                                </div>
                            </div>
                        )}
                        {signupChoice === "customer" && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
                                    <Descope
                                        flowId="customer-signup"
                                        onSuccess={handleDescopeSuccess}
                                        onError={handleDescopeError}
                                    />
                                    <Button className="mt-4 w-full" onClick={handleCloseSignup}>Close</Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;