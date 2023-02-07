// Libs
import { useEffect, useState } from "react";
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
import Upload, { UploadFile, UploadProps } from "antd/es/upload";

// Services
import { Recipe } from "../../api/services/recipes.service";
import { api } from "../../api";

interface RecipeDrawerProps extends DrawerProps {
  recipe?: Recipe | null;
  onClose: () => void;
}

export const RecipeDrawer: React.FunctionComponent<RecipeDrawerProps> = ({
  recipe,
  open,
  onClose,
}) => {
  const [form] = Form.useForm<Recipe>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = async (values: Recipe) => {
    const data = { ...values, fotografija: fileList[0]?.thumbUrl || "" };
    let response;

    if (recipe) {
      response = await api.recepti.editRecipe(recipe.id, data);
    } else {
      response = await api.recepti.addRecipe(data);
    }

    if (response.status === 200) {
      form.resetFields();
      setFileList([]);
      onClose();
    }

    form.resetFields();
    setFileList([]);
    onClose();
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (recipe) {
      form.setFieldsValue({
        naslov: recipe.naslov,
        sastojci: recipe.sastojci,
        priprema: recipe.priprema,
        fotografija: recipe.fotografija,
      });
      setFileList([
        {
          uid: "-1",
          name: "Dodajte fotografiju",
          status: "done",
          thumbUrl: recipe?.fotografija,
        },
      ]);
    } else {
      setFileList([]);
      form.resetFields();
    }
  }, [recipe, form]);

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
            <Form.Item>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                beforeUpload={() => false}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>
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
