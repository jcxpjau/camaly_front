//import libraries
import type { JSX } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

type LineChartData = {
  day: string;
  value: number;
};

type UsageLineChartProps = {
  lineData: LineChartData[];
};

const StatsLineChart = ({ lineData }: UsageLineChartProps): JSX.Element => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="day" stroke="var(--color-muted)" />
        <YAxis stroke="var(--color-muted)" />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-accent)"
          strokeWidth={2}
          dot={{ fill: "var(--color-accent)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StatsLineChart;
