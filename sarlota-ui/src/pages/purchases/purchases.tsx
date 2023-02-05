// Libs
import { useCallback, useEffect, useState } from "react";
import { Button, List, Typography } from "antd";

// Service
import { Nabavka } from "../../api/services/purchases.service";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { formatDate } from "../../util/util";
import { api } from "../../api";

import "./purchases.scss";
import moment from "moment";
import { FoodStuffModal } from "../../features/foodstuff-modal/foodstuff-modal";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/user.context";

const { Title } = Typography;
const Moment = require("moment");

const columns: ColumnsType<Nabavka> = [
  {
    title: "#ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Datum nabavke",
    dataIndex: "datum",
    width: "300px",
    key: "datum",
    render: (_, { datum }) => <p style={{ margin: 0 }}>{formatDate(datum)}.</p>,
    sorter: (a, b) =>
      new Moment(a.datum).format("YYYYMMDD") -
      new Moment(b.datum).format("YYYYMMDD"),
    filters: [
      { text: "Ovaj mjesec", value: moment().month() },
      { text: "Prethodni mjesec", value: moment().month() - 1 },
    ],
    onFilter: (value: number | string | boolean, record) =>
      moment(record.datum).month() === value,
  },
  {
    title: "Ukupna cijena [KM]",
    dataIndex: "cijena",
    width: "300px",
    key: "cijena",
    sorter: (a, b) => a.cijena - b.cijena,
  },
  {
    title: "Sirovine",
    key: "namirnice",
    dataIndex: "namirnice",
    render: (_, { namirnice }) => (
      <List
        dataSource={namirnice}
        renderItem={(item) => (
          <List.Item>
            <Typography.Link style={{ textAlign: "left" }}>
              {item.namirnica.naziv}
            </Typography.Link>
            <Typography.Text style={{ textAlign: "left" }}>
              {`Kolicina: ${item.kolicina} [${item.namirnica.jedinica}]`}
            </Typography.Text>
            <Typography.Text style={{ textAlign: "left" }}>
              {`Cijena: ${item.cijena} [KM]`}
            </Typography.Text>
          </List.Item>
        )}
      />
    ),
  },
];

export const PurchasesPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [purchases, setPurchases] = useState<Nabavka[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPurchases = useCallback(async () => {
    const response = await api.nabavke.fetchPurchases();
    if (response.status === 200) {
      const data = await response.json();
      setPurchases(data);
    }
  }, []);

  const onModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    user?.tipZaposlenog === "POSLASTICAR"
      ? fetchPurchases()
      : navigate("/admin/pregled");
  }, [fetchPurchases]);

  return (
    <div className="purchases">
      <div className="purchases__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Nabavke
        </Title>

        <FoodStuffModal
          title={"Dodajte novu sirovinu"}
          isModalOpen={showModal}
          onModalClose={onModalClose}
        />
        <div className="purchases__header__actions">
          <Button
            type="default"
            size="middle"
            onClick={() => setShowModal(true)}
          >
            Dodaj sirovinu
          </Button>
          <Button type="primary" size="middle">
            Nova nabavka
          </Button>
        </div>
      </div>
      <Table dataSource={purchases} columns={columns} />
    </div>
  );
};
