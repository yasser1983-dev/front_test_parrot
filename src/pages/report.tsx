import ReportPage from "../components/report/ReportPage";
import { useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ReportPageRoute() {
    const email = useAppSelector((state) => state.auth.email);
    const router = useRouter();

    useEffect(() => {
        if (!email) router.replace("/login");
    }, [email, router]);

    if (!email) return null;

    return <ReportPage />;
}
