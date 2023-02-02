// Libs
import { useEffect } from "react";
import { Button, Form, Input, Modal, Select } from "antd";

// Services
import { Employee } from "../../api/services/employee.service";
import { api } from "../../api";

interface EmployeeModalProps {
  title?: string;
  employee: Employee | null;
  isModalOpen: boolean;
  onModalClose: () => void;
}

export const EmployeeModal: React.FunctionComponent<EmployeeModalProps> = ({
  title,
  employee,
  isModalOpen,
  onModalClose,
}) => {
  const [form] = Form.useForm<Employee>();

  const handleOk = async (values: Employee) => {
    let response;

    if (employee)
      response = await api.zaposleni.editEmployee(employee.id, values);
    response = await api.zaposleni.addEmployee(values);

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
    if (employee) {
      form.setFieldsValue({
        ime: employee.ime,
        prezime: employee.prezime,
        tipZaposlenog: employee.tipZaposlenog === "POSLASTICAR" ? "0" : "1",
        plata: employee.plata,
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
          <Input />
        </Form.Item>

        <Form.Item
          name="tipZaposlenog"
          label="Tip zaposlenog"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Select
            onChange={(value) => form.setFieldValue("tipZaposlenog", value)}
            options={[
              { value: "0", label: "Poslastičar" },
              { value: "1", label: "Radnik" },
            ]}
          />
        </Form.Item>
        {!employee && (
          <Form.Item
            label="Korisničko ime"
            name="korisnickoIme"
            rules={[{ required: true, message: "Polje je obavezno!" }]}
          >
            <Input />
          </Form.Item>
        )}
        {!employee && (
          <Form.Item
            label="Lozinka"
            name="lozinka"
            rules={[{ required: true, message: "Polje je obavezno!" }]}
          >
            <Input.Password />
          </Form.Item>
        )}
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
