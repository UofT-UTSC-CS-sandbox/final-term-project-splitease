import { useEffect,useState } from "react";
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

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/functionselectionpage" element={<FunctionSelectionPage />} />
      <Route path="/addtransactionpage" element={<AddTransactionPage />} />
      <Route path="/friendsgroupspage" element={<FriendsGroupsPage />} />
      <Route path="/settingslogoutpage" element={<SettingsLogoutPage/>}/>
      <Route path="/profileeditorpage" element={<ProfileEditorPage/>}/>
    </Routes>
  );
}
export default App;
