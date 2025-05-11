import Login from "../features/auth/components/Login";
import { useAppSelector } from "../shared/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
    const email = useAppSelector((state) => state.auth.email);
    const router = useRouter();

    useEffect(() => {
        if (email) router.replace("/pos");
    }, [email, router]);

    if (email) return null;

    return <Login />;
}
