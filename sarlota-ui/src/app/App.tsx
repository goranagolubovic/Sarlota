// Libs
import { useRoutes } from "react-router";
import { AdminLayout } from "../layouts/admin-layout";

// Pages
import { LandingPage } from "../pages/landing-page";
import { LoginPage } from "../pages/login";
import { SignUpPage } from "../pages/sign-up";
import { StatisticsPage } from "../pages/statistics";

import "./app.scss";

function App() {
  const routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignUpPage /> },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [{ path: "statistika", element: <StatisticsPage /> }],
    },
    { path: "*", element: <LandingPage /> },
  ]);

  return routes;
}

export default App;
