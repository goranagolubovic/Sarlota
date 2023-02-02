// Libs
import { useCallback, useEffect, useState } from "react";
import { Button, message, Typography } from "antd";
import Search from "antd/es/input/Search";

// Components
import { OrderDetails } from "../../features/order-details/order-details";
import { Spinner } from "../../components/spinner";

// Assets
import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";

// Services
import { Orders } from "../../api/services/orders.service";
import { api } from "../../api";

// Rest
import "./orders.scss";
import { OrderModal } from "../../features/order-modal/order-modal";
import { OrderCard } from "../../components/order/order";

const { Title } = Typography;

export const OrdersPage: React.FunctionComponent = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [orderToEdit, setOrderToEdit] = useState<Orders | null>(null);
  const [orderToShow, setOrderToShow] = useState<Orders>();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const response = await api.narudzbe.fetchOrders();
    const data = await response.json();
    setOrders(data);
    setLoading(false);
  }, []);

  const onSearch = (value: string) => console.log(value);

  const onNewOrderClick = () => {
    setShowModal(true);
    setOrderToEdit(null);
  };

  const onModalClose = () => {
    console.log("close");
    setShowModal(false);
    setRefresh((is) => !is);
  };

  const onOrderDelete = async (id: number) => {
    const response = await api.narudzbe.deleteOrder(id);

    if (response.status === 200) {
      messageApi.open({
        type: "success",
        content: "Narudžba je uspješno obrisana!",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Došlo je do greške.",
      });
    }

    setRefresh((is) => !is);
  };

  const onOrderEdit = (order: Orders) => {
    setOrderToEdit(order);
    setShowModal(true);
    setRefresh((is) => !is);
  };

  const onOrderDetailsClick = (order: Orders) => {
    setOrderToShow(order);
    setShowDetails(true);
  };

  const onOrderDetailsClose = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, refresh]);

  return (
    <div className="orders">
      {contextHolder}
      <OrderDetails
        open={showDetails}
        onClose={onOrderDetailsClose}
        order={orderToShow}
      />

      <OrderModal
        order={orderToEdit}
        title={
          orderToEdit
            ? "Izmijenite informacije o narudžbi"
            : "Dodajte novu narudžbu"
        }
        isModalOpen={showModal}
        onModalClose={onModalClose}
      />

      <div className="contacts__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Narudžbe
        </Title>

        <div className="contacts__header__actions">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={onNewOrderClick}
          >
            Dodaj narudžbu
          </Button>
          <Search
            className="contacts__header__actions__search"
            placeholder="Pretraži narudžbe"
            allowClear
            enterButton="Pretraga"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="orders__content">
          {orders?.map((order) => (
            <OrderCard
              order={order}
              onDeleteClick={onOrderDelete}
              onEditClick={onOrderEdit}
              onDetailsClick={onOrderDetailsClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
