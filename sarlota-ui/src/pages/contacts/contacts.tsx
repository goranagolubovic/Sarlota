// Libs
import { Typography } from "antd";
import { Input, Button } from "antd";

// Components
import { ContactCard } from "../../components/contact";

// Assets
import { UserAddOutlined } from "@ant-design/icons";

import "./contacts.scss";
import { useState } from "react";
import { ContactModal } from "../../features/contact-modal";

const { Title } = Typography;
const { Search } = Input;

export const ContactsPage: React.FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
    <div className="contacts">
      <div className="contacts__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Kontakti
        </Title>

        <ContactModal isModalOpen={showModal} onModalClose={onModalClose} />

        <div className="contacts__header__actions">
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            onClick={onNewContactClick}
          >
            Dodaj kontakt
          </Button>
          <Search
            className="contacts__header__actions__search"
            placeholder="Pretraži kontakte"
            allowClear
            enterButton="Pretraga"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>

      <div className="contacts__content">
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
      </div>
    </div>
  );
};
