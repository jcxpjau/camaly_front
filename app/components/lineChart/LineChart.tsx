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
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="day" stroke="var(--color-muted)" />
        <YAxis stroke="var(--color-muted)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-bg-alt)",
            border: `1px solid var(--color-border)`,
            color: "var(--color-text)",
            fontSize: "0.875rem",
          }}
          formatter={(value: number) => [`${value}`, "Usage"]}
        />
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
