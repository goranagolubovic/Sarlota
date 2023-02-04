import { RcFile } from "antd/es/upload";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getBase64 = (img: RcFile) => {
  const reader = new FileReader();
  // reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
  return reader.result as string;
};
