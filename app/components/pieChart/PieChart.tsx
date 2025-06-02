// import libraries
import{ useMemo, type JSX } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip
} from "recharts";

type PieDataEntry = {
  name: string;
  value: number;
  color: string;
};

type MyResponsivePieChartProps = {
  pieData: PieDataEntry[];
};

const StatsPieChart = ({ pieData }: MyResponsivePieChartProps): JSX.Element => {
  const totalPie = useMemo(
    () => pieData.reduce((sum, item) => sum + item.value, 0),
    [pieData]
  );

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          formatter={(value: string) => (
            <span style={{ color: 'var(--color-text)' }}>{value}</span>
          )}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          itemStyle={{ color: '#000' }}
          labelStyle={{ color: '#000' }}
        />
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          label={({ name, value }) =>
            `${value} (${((value / totalPie) * 100).toFixed(1)}%)`
          }
          labelLine={false}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatsPieChart;
