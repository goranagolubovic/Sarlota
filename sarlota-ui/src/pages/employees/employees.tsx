// Libs
import { Button, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

// Components
import { EmployeeCard } from "../../components/employee";

// Assets
import { UserAddOutlined } from "@ant-design/icons";

import "./employees.scss";

const { Title } = Typography;

export const EmployeesPage: React.FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const onSearch = (value: string) => console.log(value);

  const onNewContactClick = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  const onContactDelete = () => {};

  const onContactEdit = () => {};

  return (
    <div className="employees">
      <div className="contacts__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Zaposleni
        </Title>

        <div className="contacts__header__actions">
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            onClick={onNewContactClick}
          >
            Dodaj zaposlenog
          </Button>
          <Search
            className="contacts__header__actions__search"
            placeholder="Pretraži zaposlene"
            allowClear
            enterButton="Pretraga"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>

      <div className="employees__content">
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
      </div>
    </div>
  );
};
