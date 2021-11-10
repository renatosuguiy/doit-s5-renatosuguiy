import { Switch } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { PageNotFound } from "../pages/PageNotFound";
import { SignUp } from "../pages/SignUp";
import { Route } from "./Route";

export const Routes = () => {
  const { accessToken } = useAuth();
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route path='/dashboard' component={Dashboard} isPrivate />
      <Route component={PageNotFound} isPrivate={!!accessToken} />
    </Switch>
  );
};
