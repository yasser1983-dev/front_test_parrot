import OrderFormPage from "../features/orders/components/OrderFormPage";
import { useAppSelector } from "../shared/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PosPage() {
    const email = useAppSelector((state) => state.auth.email);
    const router = useRouter();

    useEffect(() => {
        if (!email) router.replace("/login");
    }, [email, router]);

    if (!email) return null;

    return <OrderFormPage />;
}
