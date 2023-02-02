// Libs
import { Button, Form, Input, Modal, Select } from "antd";

// Services
import { Orders } from "../../api/services/orders.service";
import { api } from "../../api";

// Rest
import { useEffect } from "react";

interface OrderModalProps {
  title?: string;
  order: Orders | null;
  isModalOpen: boolean;
  onModalClose: () => void;
}

export const OrderModal: React.FunctionComponent<OrderModalProps> = ({
  title,
  order,
  isModalOpen,
  onModalClose,
}) => {
  const [form] = Form.useForm<Orders>();

  const handleOk = async (values: Orders) => {
    let response;

    if (order)
      response = await api.narudzbe.editOrder(order.id ? order.id : 0, values);
    response = await api.narudzbe.addOrder(values);

    if (response.status === 200) {
      form.resetFields();
      onModalClose();
    }
    onModalClose();
  };

  const handleCancel = () => {
    form.resetFields();
    onModalClose();
  };

  useEffect(() => {
    if (order) {
      form.setFieldsValue({
        datumIsporuke: order.datumIsporuke,
        datumPrijema: order.datumPrijema,
        opis: order.opis,
        aktivna: 1,
        zaposleniId: 1,
      });
    }
  });

  return (
    <Modal
      title={title}
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
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 500, marginTop: "25px" }}
        onFinish={handleOk}
        form={form}
      >
        <Form.Item
          label="Datum prijema"
          name="datumPrijema"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Datum isporuke"
          name="datumIsporuke"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="datumIsporuke" />
        </Form.Item>
        <Form.Item
          label="Opis"
          name="opis"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="opis" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
