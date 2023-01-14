// Libs
import { useRoutes } from "react-router";

// Pages
import { LandingPage } from "../pages/landing-page";
import { LoginPage } from "../pages/login";
import { SignUpPage } from "../pages/sign-up";

import "./app.scss";

function App() {
  const routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "*", element: <LandingPage /> },
  ]);

  return <>{routes}</>;
}

export default App;
