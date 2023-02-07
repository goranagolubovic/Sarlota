import { Pie, PieChart, ResponsiveContainer } from "recharts";

export interface PieChartComponentProps {
  data: any;
}

const PieChartComponent = ({ data }: PieChartComponentProps) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="zarada"
        startAngle={180}
        endAngle={0}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#abb9e3"
        label
      />
    </PieChart>
  );
};

export default PieChartComponent;
