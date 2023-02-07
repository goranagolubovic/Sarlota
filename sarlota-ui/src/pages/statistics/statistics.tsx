import "./statistics.scss";

import { Button, Typography } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/user.context";
import { useEffect, useRef, useState } from "react";
import AreaChartComponent from "../../components/area-chart/area-chats";

import "./statistics.scss";
import StatisticCard from "../../components/statistic-card/statistic-card";
import PieChartComponent from "../../components/pie/pie";
import { api } from "../../api";
import { ExportOutlined } from "@ant-design/icons";

import { PDFExport } from "@progress/kendo-react-pdf";

const { Title } = Typography;

const initialDays = "7";

export const StatisticsPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [numOfDays, setNumOfDays] = useState(initialDays);
  const [numOfOrders, setNumOfOrders] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0.0);

  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [expenditureData, setExpenditureData] = useState<any[]>([]);

  const pdfExportComponent = useRef<PDFExport>(null);

  const getNumOfOrders = async () => {
    const response = await api.statistike.getNumOfOrders(numOfDays);
    const responseData = await response.json();
    setNumOfOrders(responseData);
  };

  const getTotalIncome = async () => {
    const response = await api.statistike.getTotalIncome(numOfDays);
    const responseData = await response.json();
    setTotalIncome(responseData);
  };

  const getIncomeStatistics = async () => {
    const response = await api.statistike.getIncome(numOfDays);
    const responseData = await response.json();
    setIncomeData(responseData);
    console.log(responseData);
  };

  const getExpenditureStatistics = async () => {
    const response = await api.statistike.getExpenditure(numOfDays);
    const responseData = await response.json();
    setExpenditureData(responseData);
  };

  const changeGraphShow = (day: string) => {
    setNumOfDays(day);
  };

  const transformIncomeData = (data: any) => {
    const newData = data.map((elem: any) => ({
      datum: elem.datum,
      zarada: parseInt(elem.zarada),
    }));
    console.log(newData);
    return newData;
  };

  const exportReport = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  useEffect(() => {
    user?.tipZaposlenog === "POSLASTICAR"
      ? console.log("fetch statistics")
      : navigate("/admin/pregled");
    getNumOfOrders();
    getTotalIncome();
    getIncomeStatistics();
    getExpenditureStatistics();
  }, [numOfDays]);

  return (
    <PDFExport ref={pdfExportComponent} paperSize="A1" landscape>
      <div className="content">
        <Title level={3} className="content__title">
          Statistika za {numOfDays} {numOfDays === "1" ? "dan" : "dana"}
        </Title>
        <Button
          className="content__report"
          type="primary"
          onClick={exportReport}
          icon={<ExportOutlined />}
        >
          EKSPORTUJ
        </Button>
        <div className="content__links">
          <Button
            type="text"
            onClick={() => {
              changeGraphShow("1");
            }}
          >
            1 dan
          </Button>
          <Button
            type="text"
            onClick={() => {
              changeGraphShow("7");
            }}
          >
            7 dana
          </Button>
          <Button
            type="text"
            onClick={() => {
              changeGraphShow("30");
            }}
          >
            30 dana
          </Button>
        </div>
        <div className="content__orders">
          <AreaChartComponent
            title={"Zarada"}
            data={incomeData}
            date={"datum"}
            value={"zarada"}
            width={1007}
            height={270}
            color="#3861ED"
          ></AreaChartComponent>
          {/* {numOfDays === "1" && (
          <PieChartComponent key={"zarada"} data={data}></PieChartComponent>
        )} */}
          <StatisticCard
            title={"Broj narudzbi"}
            value={numOfOrders}
            precision={0}
          ></StatisticCard>
        </div>
        <div className="content__orders">
          <AreaChartComponent
            title={"Potrosnja"}
            data={expenditureData}
            date={"datum"}
            value={"potrosnja"}
            width={1007}
            height={270}
            color="#3861ED"
          ></AreaChartComponent>
          <StatisticCard
            title={"Ukupna zarada"}
            value={totalIncome}
            precision={2}
          ></StatisticCard>
        </div>
      </div>
    </PDFExport>
  );
};
