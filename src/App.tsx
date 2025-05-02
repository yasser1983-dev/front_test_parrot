import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import OrderFormPage from "./pages/OrderFormPage";
import ReportPage from "./pages/ReportPage";
import {useAppSelector} from "./hooks/hooks";


const App = () => {
    const email = useAppSelector((state) => state.auth.email);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={email ? "/pos" : "/login"}/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/pos" element={<OrderFormPage/>}/>
                <Route path="/report" element={<ReportPage/>}/>
                {/*<Route path="/report" element={email ? <DailyReport /> : <Navigate to="/login" />} />*/}
            </Routes>
        </Router>
    );
};

export default App;