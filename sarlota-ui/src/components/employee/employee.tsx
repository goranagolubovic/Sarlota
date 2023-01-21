// Libs
import { Avatar, Card } from "antd";

import "./employee.scss";

const { Meta } = Card;

interface EmployeeCardProps {}

export const EmployeeCard: React.FunctionComponent<EmployeeCardProps> = () => {
  return (
    <Card
      hoverable
      className="employee"
      cover={<img alt="example" src="https://bit.ly/3WrLuBw" />}
    >
      <Meta
        avatar={<Avatar>A</Avatar>}
        title="Ime prezime"
        description="This is the description"
      />
    </Card>
  );
};
