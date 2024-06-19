import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/user/auth/Register";
import UserLogin from "./pages/user/UserLogin";
import { Provider } from "react-redux";
import configStore from "./redux/store";
import Home from "./pages/user/Home";
import UserAuth from "./components/user/middleware/userAuth";
import Login from "./pages/admin/Login";
import Admin from "./pages/admin/Admin";
import AdminAuth from "./components/user/middleware/adminAuth";
import Erorr from "./components/common/Erorr";

function App() {
  return (
    <>
    <Provider store={configStore}>
      <Routes>
      <Route  path="*" element={<Erorr />} />
          <Route  path="/register" element={<Register />} />
          <Route  path="/" element={<UserLogin />} />
          <Route path="/home" element={<UserAuth><Home/></UserAuth>} />
          <Route  path="/admin" element={<Login/>} />
          <Route  path="/admin/home" element={<AdminAuth><Admin/></AdminAuth>} />
      </Routes>
      </Provider>
    </>
  );
}

export default App;
