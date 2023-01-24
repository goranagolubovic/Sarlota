// Libs
import { Drawer } from "antd";

interface EmployeeDetailsProps {
  open: boolean;
  onClose: () => void;
}

export const EmployeeDetails: React.FunctionComponent<EmployeeDetailsProps> = ({
  open,
  onClose,
}) => {
  return (
    <Drawer
      title="Podaci o zaposlenom"
      placement="right"
      onClose={onClose}
      open={open}
    >
      <p>...</p>
      <p>...</p>
      <p>...</p>
    </Drawer>
  );
};
