// Libs
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Form,
  Input,
  Modal,
  Row,
  Space,
} from "antd";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

// Assets
import { InboxOutlined } from "@ant-design/icons";

import { Recipe } from "../../api/services/recipes.service";
import { getBase64 } from "../../util/util";

const { Dragger } = Upload;

interface RecipeDrawerProps extends DrawerProps {
  recipe?: Recipe | null;
}

export const RecipeDrawer: React.FunctionComponent<RecipeDrawerProps> = ({
  recipe,
  open,
  onClose,
}) => {
  const [form] = Form.useForm<Recipe>();
  const [imageUrl, setImageUrl] = useState<string>();

  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = (values: Recipe) => {
    console.log({ ...values, fotografija: imageUrl });
  };

  const onImageDropped = async (e: any) => {
    console.log("here", e.dataTransfer.files);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (recipe) {
      form.setFieldsValue({
        naslov: recipe.naslov,
        sastojci: recipe.sastojci,
        priprema: recipe.priprema,
        fotografija: recipe.fotografija,
      });
      setPreviewImage(recipe.fotografija);
    } else {
      form.resetFields();
      setPreviewImage("");
    }
  }, [recipe]);

  return (
    <Drawer
      title={recipe ? "Izmijenite recept" : "Dodajte novi recept"}
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
          <Col span={24}>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
            {/* <Form.Item name="fotografija">
              <Dragger multiple={false} onDrop={onImageDropped}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Kliknite ili prevucite sliku</p>
              </Dragger>
            </Form.Item> */}
          </Col>
        </Row>
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
      </Form>
    </Drawer>
  );
};
