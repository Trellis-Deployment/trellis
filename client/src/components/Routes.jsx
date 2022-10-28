import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";
import GitRedirect from "./GitRedirect";
import Applications from "./Applications";
import CreateApp from "./CreateApp";
import AppModal from "./AppModal";
import AppActivity from "./ActivityPages/AppActivity";
import { useAppContext } from "../Lib/AppContext";

export default function RoutesComp() {
  const { authUser } = useAppContext();
  return (

    <Routes>
      <Route path="/" element={<Main />} />

      <Route
        path="/gitRedirect"
        element={<GitRedirect />}
      />

      <Route
        path="/apps"
        element={
          authUser ? (
            <Applications />
          ) : (
            <Navigate to="/?redirect=apps" />
          )
        }
      />

      <Route
        path="/create-app"
        element={
          authUser ? (
            <CreateApp />
          ) : (
            <Navigate to="/?redirect=create-app" />
          )
        }
      />

      <Route
        path={`/application/:appName`}
        element={
          authUser ? (
            <AppModal />
          ) : (
            <Navigate to="/?redirect=apps" />
          )
        }
      />

      <Route
        path={`/application/:appName/activity`}
        element={
          authUser ? (
            <AppActivity />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route path="*" element={<NotFound />} />;

    </Routes>
  );
}