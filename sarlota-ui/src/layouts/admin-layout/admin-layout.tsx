// Libs
import { Outlet } from "react-router-dom";

import "./admin-layout.scss";

export const AdminLayout: React.FunctionComponent = () => {
  return (
    <div>
      admin-layout
      <Outlet />
    </div>
  );
};
