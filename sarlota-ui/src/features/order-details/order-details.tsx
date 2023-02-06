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
      <p>{order?.naziv}</p>
      <p>Broj komada:{order?.brojKomada}</p>
      <p>Napomene:{order?.napomene}</p>
      <p>Cijena:{order?.cijena}</p>
      <p>Veličina:{order?.velicina}</p>
      <p>Recept:{order?.nazivRecepta}</p>
      <p>Ime narucioca:{order?.imeNarucioca}</p>
      <p>Kontakt:{order?.kontakt}</p>
      <p>Adresa:{order?.adresa}</p>
    </Drawer>
  );
};
