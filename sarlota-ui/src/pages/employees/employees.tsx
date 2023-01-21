// Libs
import { Typography } from "antd";

// Components
import { EmployeeCard } from "../../components/employee";

import "./employees.scss";

const { Title } = Typography;

export const EmployeesPage: React.FunctionComponent = () => {
  return (
    <div className="employees">
      <Title level={3} style={{ marginTop: 0 }}>
        Zaposleni
      </Title>

      <div className="employees__content">
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
      </div>
    </div>
  );
};
