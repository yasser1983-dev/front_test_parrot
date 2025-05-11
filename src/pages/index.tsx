import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Home() {
    const email = useSelector((state: RootState) => state.auth.email);
    const router = useRouter();

    useEffect(() => {
        if (email) {
            router.replace("/pos");
        } else {
            router.replace("/login");
        }
    }, [email, router]);

    return null;
}
