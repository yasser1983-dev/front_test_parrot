import ReportPage from "../features/reports/components/ReportPage";
import { useAppSelector } from "../shared/hooks";
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
