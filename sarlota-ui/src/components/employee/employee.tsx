// Libs
import { Avatar, Card, Modal } from "antd";

// Assets
import {
  EditOutlined,
  UserDeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import "./employee.scss";

const { Meta } = Card;
const { confirm } = Modal;

interface EmployeeCardProps {
  onDetailsClick: () => void;
}

export const EmployeeCard: React.FunctionComponent<EmployeeCardProps> = ({
  onDetailsClick,
}) => {
  const onEdit = () => {};

  const onDelete = () => {
    confirm({
      title: "Da li ste sigurni da želite da obrišete zaposlenog?",
      icon: <ExclamationCircleFilled />,
      content: "Ovu akciju ne možete opozvati.",
      onOk() {},
      cancelText: "Poništi",
    });
  };

  return (
    <Card
      hoverable
      className="employee"
      cover={<img alt="example" src="https://bit.ly/3WrLuBw" />}
      actions={[
        <EditOutlined key="izmjena" onClick={onEdit} />,
        <UserDeleteOutlined key="brisanje" onClick={onDelete} />,
      ]}
      onClick={onDetailsClick}
    >
      <Meta
        avatar={<Avatar>A</Avatar>}
        title="Ime prezime"
        description="This is the description"
      />
    </Card>
  );
};
