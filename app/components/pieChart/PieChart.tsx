import React, { useState, useEffect, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

type PieDataEntry = {
  name: string;
  value: number;
  color: string;
};

type MyResponsivePieChartProps = {
  pieData: PieDataEntry[];
};

const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const StatsPieChart: React.FC<MyResponsivePieChartProps> = ({ pieData}) => {
    const isMobile = useIsMobile();
     
    const totalPie = useMemo(() => pieData.reduce((sum, item) => sum + item.value, 0), []);
    return (
        <ResponsiveContainer width="100%" height={isMobile ? 320 : 240}>
            <PieChart>
                <Legend
                layout={isMobile ? "horizontal" : "vertical"}
                verticalAlign={isMobile ? "bottom" : "middle"}
                align={isMobile ? "center" : "left"}
                iconType="circle"
                formatter={(value: string) => <span style={{ color: '#fff' }}>{value}</span>}
                />
                <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                label={({ name, value }: { name: string; value: number }) =>
                    `${value} (${((value / totalPie) * 100).toFixed(1)}%)`
                }
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
