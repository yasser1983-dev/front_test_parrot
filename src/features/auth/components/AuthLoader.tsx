import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setUser, finishLoading } from "../../redux/slices/authSlice";

const AuthLoader = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail && savedEmail !== "null") {
            dispatch(setUser({ email: savedEmail }));
        } else {
            dispatch(finishLoading());
        }
    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>;

    return <>{children}</>;
};

export default AuthLoader;
