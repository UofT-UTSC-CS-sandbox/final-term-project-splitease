import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Router,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import FunctionSelectionPage from "./pages/FunctionSelectionPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import FriendsGroupsPage from "./pages/FriendsGroupsPage";
import SettingsLogoutPage from "./pages/SettingsLogoutPage";
import ProfileEditorPage from "./pages/ProfileEditorPage";
import LoginPage from "./pages/LoginPage";
import FriendsPage from "./pages/FriendsPage";
import GroupsPage from "./pages/GroupsPage";
import AddFriends from "./components/AddFriends";
import AddGroups from "./components/AddGroups";
import ProfileBufferPage from "./pages/ProfileBufferPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import FriendDetailPage from "./pages/FriendDetailPage"; //add
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

function App() {
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/friendspage" element={<FriendsPage />} />
      <Route path="/groupspage" element={<GroupsPage />} />
      <Route path="/addfriends" element={<AddFriends />} />
      <Route path="/addgroups" element={<AddGroups />} />
      <Route path="/profilebufferpage" element={<ProfileBufferPage />} />
      <Route path="/changepasswordpage" element={<ChangePasswordPage />} />
      <Route path="/frienddetailpage/:fid" element={<FriendDetailPage />} />
    </Routes>
  );
}

export default App;
