import { Card, Input, Upload, UploadFile, UploadProps } from "antd";
import React, { useState } from "react";
import "./settings-card.scss";
const SettingsCard = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <Card className="card">
      <Upload listType="picture-card" fileList={fileList} onChange={onChange}>
        {fileList.length != 0 ? null : "+ Upload"}
      </Upload>
      <div className="card__row">
        <p>Ime</p>
        <Input width={40}></Input>
      </div>
      <div className="card__row">
        <p>Prezime</p>
        <Input width={40}></Input>
      </div>
      <div className="card__row">
        <p>Korisničko ime</p>
        <Input width={40}></Input>
      </div>
      <div className="card__row">
        <p>Lozinka</p>
        <Input width={40}></Input>
      </div>
    </Card>
  );
};

export default SettingsCard;
