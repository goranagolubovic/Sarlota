import "./statistics.scss";

import { Button, Typography } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/user.context";
import { useCallback, useEffect, useState } from "react";
import AreaChartComponent from "../../components/area-chart/area-chats";

import "./statistics.scss";
import StatisticCard from "../../components/statistic-card/statistic-card";
import PieChartComponent from "../../components/pie/pie";

const { Title } = Typography;

const data = [
  {
    date: "02-03-2023",
    value: 50,
  },
  {
    date: "03-03-2023",
    value: 70,
  },
  {
    date: "04-03-2023",
    value: 65,
  },
  {
    date: "05-03-2023",
    value: 43,
  },
];
const initialDays = "7";

export const StatisticsPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [numOfDays, setNumOfDays] = useState(initialDays);

  const getOrdersStatistics = useCallback(async () => {}, []);

  const getIncomeStatistics = useCallback(async () => {}, []);

  const getExpenditureStatistics = useCallback(async () => {}, []);

  useEffect(() => {
    user?.tipZaposlenog === "POSLASTICAR"
      ? console.log("fetch statistics")
      : navigate("/admin/pregled");
    getOrdersStatistics();
    getIncomeStatistics();
    getExpenditureStatistics();
  }, [numOfDays]);

  return (
    <div className="content">
      <Title level={3} className="content__title">
        Statistika za {numOfDays} dana
      </Title>
      <div className="content__links">
        <Button
          type="text"
          onClick={() => {
            setNumOfDays("1");
          }}
        >
          1 day
        </Button>
        <Button
          type="text"
          onClick={() => {
            setNumOfDays("7");
          }}
        >
          7 days
        </Button>
        <Button
          type="text"
          onClick={() => {
            setNumOfDays("30");
          }}
        >
          30 days
        </Button>
      </div>
      <div className="content__orders">
        <AreaChartComponent
          title={"Broj narudžbi"}
          data={data}
          date={"date"}
          value={"value"}
          width={1007}
          height={270}
          color="#3861ED"
        ></AreaChartComponent>
        <StatisticCard
          title={"Broj narudžbi"}
          value={0}
          precision={0}
        ></StatisticCard>
      </div>
      <div className="content__orders">
        <AreaChartComponent
          title={"Zarada"}
          data={data}
          date={"date"}
          value={"value"}
          width={1007}
          height={270}
          color="#3861ED"
        ></AreaChartComponent>
        <StatisticCard
          title={"Ukupna zarada"}
          value={0}
          precision={2}
        ></StatisticCard>
      </div>
      <div className="content__orders">
        <AreaChartComponent
          title={"Potrošnja"}
          data={data}
          date={"date"}
          value={"value"}
          width={1007}
          height={270}
          color="#3861ED"
        ></AreaChartComponent>
        <StatisticCard
          title={"Ukupna potrošnja"}
          value={0}
          precision={2}
        ></StatisticCard>
      </div>
    </div>
  );
};
