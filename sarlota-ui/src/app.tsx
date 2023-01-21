// Libs
import { useRoutes } from "react-router";
import { AdminLayout } from "./layouts/admin-layout";

// Pages
import { LandingPage } from "./pages/landing-page";
import { LoginPage } from "./pages/login";
import { SignUpPage } from "./pages/sign-up";
import { StatisticsPage } from "./pages/statistics";
import { CalendarPage } from "./pages/calendar";
import { HomePage } from "./pages/home";
import { EmployeesPage } from "./pages/employees";
import { SettingsPage } from "./pages/settings";

function App() {
  const routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignUpPage /> },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "pregled", element: <HomePage /> },
        { path: "kalendar", element: <CalendarPage /> },
        { path: "statistika", element: <StatisticsPage /> },
        { path: "zaposleni", element: <EmployeesPage /> },
        { path: "recepti", element: <EmployeesPage /> },
        { path: "kontakti", element: <EmployeesPage /> },
        { path: "podesavanja", element: <SettingsPage /> },
      ],
    },
    { path: "*", element: <LandingPage /> },
  ]);

  return routes;
}

export default App;
