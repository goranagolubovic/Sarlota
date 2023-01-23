import { Button, Form, Input, InputNumber, Modal } from "antd";

import "./contact-modal.scss";
import { Contact } from "../../api/services/contacts.service";
import { api } from "../../api";

interface NewContactModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
}

export const ContactModal: React.FunctionComponent<NewContactModalProps> = ({
  isModalOpen,
  onModalClose,
}) => {
  const [form] = Form.useForm<Contact>();

  const handleOk = async (values: Contact) => {
    console.log(values);
    const response = await api.kontakti.addContact(values);
    if (response.status === 200) {
      form.resetFields();
      onModalClose();
    }
  };

  const handleCancel = () => {
    onModalClose();
  };

  return (
    <Modal
      title="Novi kontakt"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={form.submit}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Poništi
        </Button>,
        <Button
          key="back"
          type="primary"
          htmlType="submit"
          onClick={form.submit}
        >
          Potvrdi
        </Button>,
      ]}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        // layout="horizontal"
        onFinish={handleOk}
        form={form}
        style={{ maxWidth: 700 }}
      >
        <Form.Item
          label="Ime"
          name="ime"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Prezime"
          name="prezime"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="prezime" />
        </Form.Item>

        <Form.Item
          label="Broj Telefona"
          name="brojTelefona"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Link profila"
          name="linkProfila"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
