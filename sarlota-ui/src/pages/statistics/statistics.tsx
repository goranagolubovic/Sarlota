import "./statistics.scss";

import { Typography } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/user.context";
import { useEffect } from "react";

const { Title } = Typography;

export const StatisticsPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    user?.tipZaposlenog === "POSLASTICAR"
      ? console.log("fetch statistics")
      : navigate("/admin/pregled");
  });

  return (
    <div>
      <Title level={3} style={{ marginTop: 0 }}>
        Statistika
      </Title>
    </div>
  );
};
