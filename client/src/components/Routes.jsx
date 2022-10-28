import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";
import GitRedirect from "./GitRedirect";
import Applications from "./Applications";
import CreateApp from "./CreateApp";
import AppModal from "./AppModal";


export default function RoutesComp({
  authUser,
  setAuthUser,
  setUserId,
  userId
}) {
  return (
    <Routes>
      <Route path="/" element={<Main authUser={authUser} />} />
      <Route
        path="/create-app"
        element={
          authUser ? (
            <CreateApp authUser={authUser} userId={userId}/>
          ) : (
            <Navigate to="/?redirect=create-app" />
          )
        }
      />
      <Route
        path="/gitRedirect"
        element={<GitRedirect setAuthUser={setAuthUser} setUserId={setUserId}/>}
      />
      <Route
        path="/apps"
        element={
          authUser ? (
            <Applications authUser={authUser} userId={userId}/>
          ) : (
            <Navigate to="/?redirect=apps" />
          )
        }
      />
      <Route
        path={`/application/:appName`}
        element={
          authUser ? (
            <AppModal authUser={authUser} userId={userId}/>
          ) : (
            <Navigate to="/?redirect=apps" />
          )
        }
      />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}