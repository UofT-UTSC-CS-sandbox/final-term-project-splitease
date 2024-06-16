import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import FunctionSelectionPage from "./pages/FunctionSelectionPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import FriendsGroupsPage from "./pages/FriendsGroupsPage";
import SettingsLogoutPage from "./pages/SettingsLogoutPage";
import ProfileEditorPage from "./pages/ProfileEditorPage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

function App() {
  localStorage.setItem("u_name", "test3");
  localStorage.setItem("uid", "66639c533510056bb776a242");

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/functionselectionpage"
        element={<FunctionSelectionPage />}
      />
      <Route path="/addtransactionpage" element={<AddTransactionPage />} />
      <Route path="/friendsgroupspage" element={<FriendsGroupsPage />} />
      <Route path="/settingslogoutpage" element={<SettingsLogoutPage />} />
      <Route path="/profileeditorpage" element={<ProfileEditorPage />} />
      <Route path="/loginpage" element={<LoginPage />} />
    </Routes>
  );
}
export default App;
