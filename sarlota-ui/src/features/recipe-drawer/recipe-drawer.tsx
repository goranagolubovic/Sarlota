import { useState } from "react";
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import Upload, { RcFile } from "antd/es/upload";
import { InboxOutlined } from "@ant-design/icons";
import { Recipe } from "../../api/services/recipes.service";

const { Dragger } = Upload;

const getBase64 = async (img: RcFile, callback?: (url: string) => void) => {
  const reader = new FileReader();
  // reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
  return reader.result as string;
};

interface RecipeDrawerProps extends DrawerProps {}

export const RecipeDrawer: React.FunctionComponent<RecipeDrawerProps> = ({
  open,
  onClose,
}) => {
  const [form] = Form.useForm<Recipe>();
  const [imageUrl, setImageUrl] = useState<string>();

  const [loading, setLoading] = useState(false);

  const onSubmit = (values: Recipe) => {
    console.log({ ...values, fotografija: imageUrl });
  };

  const onImageDropped = async (e: any) => {
    console.log("here", e.dataTransfer.files);
  };

  return (
    <Drawer
      title="Dodajte novi recept"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>Poništi</Button>
          <Button onClick={form.submit} type="primary">
            Potvrdi
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark form={form} onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="naslov"
              label="Naslov"
              rules={[{ required: true, message: "Polje je obavezno" }]}
            >
              <Input placeholder="Naziv recepta" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="sastojci"
              label="Sastojci"
              rules={[
                {
                  required: true,
                  message: "Polje je obavezno",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Sastojci" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="priprema"
              label="Priprema"
              rules={[
                {
                  required: true,
                  message: "Polje je obavezno",
                },
              ]}
            >
              <Input.TextArea rows={6} placeholder="Priprema" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="fotografija">
              <Dragger multiple={false} onDrop={onImageDropped}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Kliknite ili prevucite sliku</p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
