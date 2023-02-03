// Libs
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { format } from "date-fns";
// Services
import { Orders } from "../../api/services/orders.service";
import { api } from "../../api";

// Rest
import { useEffect, useState } from "react";

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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleOk = async (values: Orders) => {
    let response;

    values = {
      ...values,
      datumIsporuke: new Date(values.datumIsporuke).toISOString(),
      datumPrijema: new Date(values.datumPrijema).toISOString(),
      aktivna: true,
      slika: fileList[0]?.thumbUrl || "",
    };
    if (order)
      response = await api.narudzbe.editOrder(order.id ? order.id : 0, values);
    else {
      response = await api.narudzbe.addOrder(values);
      setFileList([]);
    }

    if (response.status === 200) {
      form.resetFields();
      onModalClose();
    }
    onModalClose();
  };

  const handleCancel = () => {
    setFileList([]);
    form.resetFields();
    onModalClose();
  };

  useEffect(() => {
    if (order) {
      form.setFieldsValue({
        datumIsporuke: order.datumIsporuke,
        datumPrijema: order.datumPrijema,
        naziv: order.naziv,
        kontakt: order.kontakt,
        adresa: order.adresa,
        brojKomada: order.brojKomada,
        slika: order.slika,
        napomene: order.napomene,
      });
      setFileList([
        {
          uid: "-1",
          name: "Dodajte fotografiju",
          status: "done",
          thumbUrl: order?.slika,
        },
      ]);
    }
  }, [order]);

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
        <Form.Item>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            //onPreview={onPreview}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Datum prijema"
          name="datumPrijema"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Datum isporuke"
          name="datumIsporuke"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="datumIsporuke" type="date" />
        </Form.Item>
        <Form.Item
          label="Napomene"
          name="napomene"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="napomene" />
        </Form.Item>
        <Form.Item
          label="Naziv"
          name="naziv"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="naziv" />
        </Form.Item>
        <Form.Item
          label="Broj komada"
          name="brojKomada"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="brojKomada" type="number" />
        </Form.Item>
        <Form.Item
          label="Kontakt"
          name="kontakt"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="kontakt" />
        </Form.Item>
        <Form.Item
          label="Adresa"
          name="adresa"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="adresa" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
