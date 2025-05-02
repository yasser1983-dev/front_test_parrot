import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import OrderFormPage from "./pages/OrderFormPage";
import ReportPage from "./pages/ReportPage";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {useEffect} from "react";
import {finishLoading, setUser} from "./redux/slices/authSlice";


const App = () => {
    const email = useAppSelector((state) => state.auth.email);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");

        if (savedEmail && savedEmail !== "null") {
            dispatch(setUser({ email: savedEmail }));
        } else {
            dispatch(finishLoading());
        }
    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={email ? "/pos" : "/login"} />} />
                <Route path="/login" element={email ? <OrderFormPage /> : <Login />} />
                <Route path="/pos" element={email ? <OrderFormPage /> : <Navigate to="/login" />} />
                <Route path="/report" element={email ? <ReportPage /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;