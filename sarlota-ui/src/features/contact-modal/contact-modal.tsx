import { Button, Form, Input, InputNumber, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./contact-modal.scss";

interface NewContactModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
}

export const ContactModal: React.FunctionComponent<NewContactModalProps> = ({
  isModalOpen,
  onModalClose,
}) => {
  const [form] = Form.useForm();

  const handleOk = (values: any) => {
    console.log(values);
    onModalClose();
  };
  const handleCancel = () => {
    onModalClose();
  };

  return (
    <Modal
      title="Novi kontakt"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Poništi
        </Button>,
        <Button key="back" type="primary" onClick={handleOk} htmlType="submit">
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
        <Form.Item label="Ime">
          <Input name="ime" />
        </Form.Item>
        <Form.Item label="Prezime">
          <Input name="prezime" />
        </Form.Item>

        <Form.Item label="Broj Telefona">
          <Input />
        </Form.Item>
        <Form.Item label="Email">
          <Input />
        </Form.Item>
        <Form.Item label="Link profila">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
