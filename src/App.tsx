import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Albums from "./pages/Albums";
import Photos from "./pages/Photos";
import PageNotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { useAppDispatch } from "../src/hooks";
import {
  fetchUsersFailure,
  fetchUsersSuccess,
} from "../src/store/reducers/userReducer";
import { getUsers } from "../src/utils/api";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const users = await getUsers();
        dispatch(fetchUsersSuccess(users));
      } catch (error) {
        if (error instanceof Error) dispatch(fetchUsersFailure(error));
      }
    };
    getAllUsers();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Albums />} />
        <Route path="/albums/:albumId/photos/:userId/" element={<Photos />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
