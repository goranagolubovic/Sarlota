// Libs
import { Drawer } from "antd";
import { Orders } from "../../api/services/orders.service";

interface OrderDetailsProps {
  open: boolean;
  onClose: () => void;
  order?: Orders;
}

export const OrderDetails: React.FunctionComponent<OrderDetailsProps> = ({
  open,
  order,
  onClose,
}) => {
  return (
    <Drawer
      title="Podaci o narudžbi"
      placement="right"
      onClose={onClose}
      open={open}
    >
      <p>{order?.id}</p>
      <p>{order?.opis}</p>
      <p>...</p>
    </Drawer>
  );
};
