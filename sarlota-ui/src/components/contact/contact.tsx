import { Card } from "antd";
const { Meta } = Card;

interface ContactCardProps {}

export const ContactCard: React.FunctionComponent<ContactCardProps> = () => {
  return (
    <Card title="Ime Prezime" bordered style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};
