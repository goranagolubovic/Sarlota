// Libs
import { Button, Form, Input, Modal, Select } from "antd";

// Services
import { Employee } from "../../api/services/employee.service";
import { api } from "../../api";

// Rest
import { useEffect } from "react";

interface EmployeeModalProps {
  title?: string;
  isModalOpen: boolean;
  onModalClose: () => void;
}

export const EmployeeModal: React.FunctionComponent<EmployeeModalProps> = ({
  title,
  isModalOpen,
  onModalClose,
}) => {
  const [form] = Form.useForm<Employee>();

  const handleOk = async (values: Employee) => {
    let response;

    // if (contact) response = await api.kontakti.editContact(contact.id, values);
    response = await api.zaposleni.addEmployee(values);

    if (response.status === 200) {
      form.resetFields();
      onModalClose();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onModalClose();
  };

  useEffect(() => {
    // if (contact) {
    //   form.setFieldsValue({
    //     ime: contact.ime,
    //     prezime: contact.prezime,
    //     brojTelefona: contact.brojTelefona,
    //     email: contact.email,
    //     linkProfila: contact.linkProfila,
    //   });
    // }
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
          name="tipZaposlenog"
          label="Tip zaposlenog"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Select
            // defaultValue="1"
            // style={{ width: 120 }}

            onChange={(value) => form.setFieldValue("tipZaposlenog", value)}
            options={[
              { value: "0", label: "Poslastičar" },
              { value: "1", label: "Radnik" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Korisničko ime"
          name="korisnickoIme"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lozinka"
          name="lozinka"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Plata"
          name="plata"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
