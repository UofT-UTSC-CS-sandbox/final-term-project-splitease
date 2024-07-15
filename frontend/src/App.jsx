import axios from "axios";
import { Route, Routes } from "react-router-dom";
import AddFriends from "./components/AddFriends";
import AddGroups from "./components/AddGroups";
import AddTransactionPage from "./pages/AddTransactionPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import FriendDetailPage from "./pages/FriendDetailPage";
import FriendsGroupsPage from "./pages/FriendsGroupsPage";
import FriendsPage from "./pages/FriendsPage";
import FunctionSelectionPage from "./pages/FunctionSelectionPage";
import GroupDetailPage from "./pages/GroupDetailPage";
import GroupsPage from "./pages/GroupsPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfileBufferPage from "./pages/ProfileBufferPage";
import ProfileEditorPage from "./pages/ProfileEditorPage";
import SettingsLogoutPage from "./pages/SettingsLogoutPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";

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
      <Route path="/groupdetailpage" element={<GroupDetailPage />} />
      <Route
        path="/transactiondetailpage"
        element={<TransactionDetailPage />}
      />
    </Routes>
  );
}

export default App;
