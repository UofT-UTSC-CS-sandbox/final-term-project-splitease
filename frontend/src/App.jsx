import { useEffect,useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import FunctionSelectionPage from "./pages/FunctionSelectionPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/functionselectionpage"
        element={<FunctionSelectionPage />}
      />
    </Routes>
  );
}
export default App;
