// Libs
import { useCallback, useEffect, useState } from "react";
import { Typography } from "antd";
import { Input, Button } from "antd";

// Components
import { ContactCard } from "../../components/contact";
import { Spinner } from "../../components/spinner";
import { ContactModal } from "../../features/contact-modal";

// Assets
import { UserAddOutlined } from "@ant-design/icons";

// Utils
import { Contact } from "../../api/services/contacts.service";
import { api } from "../../api";
import "./contacts.scss";

const { Title } = Typography;
const { Search } = Input;

export const ContactsPage: React.FunctionComponent = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    const response = await api.kontakti.fetchContacts();
    const data = await response.json();
    setContacts(data);

    setLoading(false);
  }, []);

  const onSearch = (value: string) => console.log(value);

  const onNewContactClick = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
    setRefresh((is) => !is);
  };

  const onContactDelete = () => {};

  const onContactEdit = () => {};

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts, refresh]);

  return (
    <div className="contacts">
      <ContactModal isModalOpen={showModal} onModalClose={onModalClose} />
      <div className="contacts__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Kontakti
        </Title>

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

      {loading ? (
        <Spinner />
      ) : (
        <div className="contacts__content">
          {contacts?.map((contact) => (
            <ContactCard contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
};
