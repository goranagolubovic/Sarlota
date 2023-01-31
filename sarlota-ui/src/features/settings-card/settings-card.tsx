import {
  Button,
  Card,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./settings-card.scss";
const SettingsCard = () => {
  const [isEditeActive, setIsEditActive] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const [form] = Form.useForm<any>();
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const editProfile = () => {
    form.resetFields();
    setIsEditActive(!isEditeActive);
  };

  const save = (values: any) => {};
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card className="card">
      <Form
        // layout="vertical"
        labelAlign="left"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 60 }}
        style={{
          maxWidth: 500,
          marginTop: "25px",
        }}
        onFinish={save}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item name="slika">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            className="card__image"
            disabled={!isEditeActive}
          >
            {fileList.length != 0 ? null : "+ Upload"}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Ime"
          name="ime"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input disabled={!isEditeActive} />
        </Form.Item>
        <Form.Item
          label="Prezime"
          name="prezime"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="prezime" disabled={!isEditeActive} />
        </Form.Item>

        <Form.Item
          label="Korisničko ime"
          name="korisnickoIme"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input disabled={!isEditeActive} />
        </Form.Item>
        <Form.Item
          label="Lozinka"
          name="lozinka"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input disabled={!isEditeActive} />
        </Form.Item>
        <Form.Item
          label="Potvrda lozinke"
          name="potvrdaLozinke"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input disabled={!isEditeActive} />
        </Form.Item>
        <div className="card__row">
          {!isEditeActive && (
            <Button
              type="primary"
              size="large"
              icon={<EditOutlined />}
              onClick={editProfile}
            >
              Izmijeni informacije
            </Button>
          )}
          {isEditeActive && (
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                icon={<EditOutlined />}
                onClick={save}
              >
                Sačuvaj
              </Button>
            </Form.Item>
          )}
          {isEditeActive && (
            <Form.Item>
              <Button
                type="primary"
                size="large"
                icon={<EditOutlined />}
                onClick={editProfile}
              >
                Odustani
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default SettingsCard;
