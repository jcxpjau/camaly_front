import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type LineChartData = {
  day: string;
  value: number;
};

type UsageLineChartProps = {
  lineData: LineChartData[];
};

const StatsLineChart: React.FC<UsageLineChartProps> = ({ lineData }) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="day" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip
          formatter={(value: number, name: string) => [`${value}`, "Usage"]}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ fill: "#3B82F6" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StatsLineChart;
