import "./App.css";
import MyLogin from "./my_component/MyLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./my_component/UserLogin";
import SignUp from "./my_component/SignUp";
import AddDpr from "./my_component/AddDpr";
import ViewReport from "./my_component/ViewReport";
import ViewAllReport from "./my_component/ViewAllReport";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin></UserLogin>}></Route>
          <Route path="/signin" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<MyLogin></MyLogin>}></Route>
          <Route path="/addReport" element={<AddDpr></AddDpr>}></Route>
          <Route path="/viewReport" element={<ViewReport></ViewReport>}></Route>
          <Route
            path="/viewAllReport"
            element={<ViewAllReport></ViewAllReport>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
