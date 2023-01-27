// Libs
import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import { Typography } from "antd";

import type { Dayjs } from "dayjs";

import "./calendar.scss";

const { Title } = Typography;

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [{ type: "error", content: "This is error event 4." }];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export const CalendarPage: React.FunctionComponent = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Title level={3} style={{ marginTop: 0 }}>
        Kalendarski prikaz
      </Title>
      <Calendar
        className="calendar"
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </>
  );
};
