// Libs
import { Avatar, Card, Modal } from "antd";

// Assets
import {
  EditOutlined,
  UserDeleteOutlined,
  ExclamationCircleFilled,
  UserOutlined,
} from "@ant-design/icons";

// Services
import { Employee } from "../../api/services/employee.service";

// Rest
import "./employee.scss";

const { Meta } = Card;
const { confirm } = Modal;

interface EmployeeCardProps {
  employee: Employee;
  onDetailsClick: () => void;
  onDeleteClick: (id: number) => void;
}

export const EmployeeCard: React.FunctionComponent<EmployeeCardProps> = ({
  employee,
  onDetailsClick,
  onDeleteClick,
}) => {
  const onEdit = () => {};

  const onDelete = () => {
    confirm({
      title: "Da li ste sigurni da želite da obrišete zaposlenog?",
      icon: <ExclamationCircleFilled />,
      content: "Ovu akciju ne možete opozvati.",
      onOk() {
        onDeleteClick(employee.id);
      },
      cancelText: "Poništi",
    });
  };

  return (
    <Card
      hoverable
      className="employee"
      cover={<img alt="example" src="https://bit.ly/3WrLuBw" />}
      actions={[
        <UserOutlined key="detalji" onClick={onDetailsClick} />,
        <EditOutlined key="izmjena" onClick={onEdit} />,
        <UserDeleteOutlined key="brisanje" onClick={onDelete} />,
      ]}
    >
      <Meta
        avatar={<Avatar>A</Avatar>}
        title={`${employee.ime} ${employee.prezime}`}
        description={`Pozicija: ${employee.tipZaposlenog.replace("_", " ")}`}
      />
    </Card>
  );
};
