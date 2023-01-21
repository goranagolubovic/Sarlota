// Libs
import { Card } from "antd";

// Assets
import {
  EditOutlined,
  DeleteOutlined,
  PhoneTwoTone,
  MailTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";

import "./contact.scss";

interface ContactCardProps {}

export const ContactCard: React.FunctionComponent<ContactCardProps> = () => {
  return (
    <Card
      title="Ime Prezime"
      bordered
      className="contact"
      actions={[
        <EditOutlined key="izmjena" />,
        <DeleteOutlined key="brisanje" />,
      ]}
    >
      <p>
        <PhoneTwoTone />+ 387 65 123 456
      </p>
      <p>
        <MailTwoTone />
        test@mail.com
      </p>
      <p>
        <SmileTwoTone />{" "}
        <a href="/" target="_blank">
          Profil
        </a>
      </p>
    </Card>
  );
};
