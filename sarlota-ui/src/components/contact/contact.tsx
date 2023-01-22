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

// Service
import { Contact } from "../../api/services/contacts.service";

// Styles
import "./contact.scss";

interface ContactCardProps {
  contact: Contact;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export const ContactCard: React.FunctionComponent<ContactCardProps> = ({
  contact,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <Card
      title={`${contact.ime}  ${contact.prezime}`}
      className="contact"
      hoverable
      actions={[
        <EditOutlined key="izmjena" />,
        <DeleteOutlined key="brisanje" />,
      ]}
    >
      <p>
        <PhoneTwoTone /> {contact.brojTelefona}
      </p>
      <p>
        <MailTwoTone />
        {contact.email}
      </p>
      <p>
        <SmileTwoTone />
        <a href={contact.linkProfila} target="_blank">
          Profil
        </a>
      </p>
    </Card>
  );
};
