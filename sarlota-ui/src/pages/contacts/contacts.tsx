// Libs
import { Typography } from "antd";
import { Input, Button } from "antd";

// Components
import { ContactCard } from "../../components/contact";

// Assets
import { UserAddOutlined } from "@ant-design/icons";

import "./contacts.scss";

const { Title } = Typography;
const { Search } = Input;

export const ContactsPage: React.FunctionComponent = () => {
  const onSearch = (value: string) => console.log(value);

  return (
    <div className="contacts">
      <div className="contacts__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Kontakti
        </Title>

        <div className="contacts__header__actions">
          <Button type="primary" size="large" icon={<UserAddOutlined />}>
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
