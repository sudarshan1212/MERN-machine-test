import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import DahsBoard from "./pages/DahsBoard";
import EmployeeList from "./pages/EmployeeList";
import EmployeeCreate from "./pages/EmployeeCreate";
import { useSelector } from "react-redux";
function App() {
  const isAuthenticated = useSelector((state) => state.bazar.isAuthenticated);
  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <DahsBoard /> : <Navigate to="/login" />}
          />
          <Route
            path="/employeelist"
            element={
              isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/createemployee"
            element={
              isAuthenticated ? <EmployeeCreate /> : <Navigate to="/login" />
            }
          />
          {/* <Route path="/dashboard" element={<DahsBoard />} /> */}
          {/* <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/createemployee" element={<EmployeeCreate />} /> */}
          {/* <Route path="/notes" element={<MyNotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes/:id" element={<CreateNotes />} />  */}
          {/* <Route path="/note/:id" element={<MainScreen />} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
