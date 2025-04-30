import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import Login from "./components/Auth/Login";
import OrderForm from "./components/POS/OrderForm";
import DailyReport from "./components/Report/DailyReport";

const App = () => {
  const email = useSelector((state: RootState) => state.auth.email);

/*  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pos" element={email ? <OrderForm /> : <Navigate to="/login" />} />
          <Route path="/report" element={email ? <DailyReport /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={email ? "/pos" : "/login"} />} />
        </Routes>
      </Router>
  );*/
      return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pos" element={<OrderForm />} />
          <Route path="/report" element={email ? <DailyReport /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={email ? "/pos" : "/login"} />} />
        </Routes>
      </Router>
  );
};

export default App;
