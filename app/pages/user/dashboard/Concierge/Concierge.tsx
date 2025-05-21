import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useMemo } from "react";
import MetricsCard from "~/components/metricsCards/MetricsCards";
import { motion } from 'framer-motion';

const lineData = [
  { day: "Mon", value: 51, percent: "20.9%" },
  { day: "Tue", value: 32, percent: "13.1%" },
  { day: "Wed", value: 72, percent: "29.4%" },
  { day: "Fri", value: 90, percent: "36.7%" },
];

const pieData = [
  { name: "Linkedin", value: 90, color: "#00FFC2" },
  { name: "X", value: 72, color: "#00CED1" },
  { name: "Instagram", value: 39, color: "#ADFF2F" },
  { name: "WhatsApp", value: 34, color: "#FFB6C1" },
];

const stats = [
  {
    id: 1,
    title: "1,024 support sessions",
    description: "just this month with the concierge",
  },
  {
    id: 2,
    title: ">3,000 questions",
    description: "answered from customers",
  },
  {
    id: 3,
    title: "5,000 credits",
    description: "Average monthly usage",
  },
];


export default function ConciergeDashboard() {
    
    const totalPie = useMemo(() => pieData.reduce((sum, item) => sum + item.value, 0), []);
    
    return (
        <div className="p-6 space-y-6 text-white min-h-screen">
            <motion.div
                className=" mx-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                >
                <h3 className="text-white font-extralight tracking-wide text-3xl">Concierge</h3>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {stats.map(product => (
                <div key={product.id} className="relative">
                    <MetricsCard
                        title={product.title}
                        description={product.description}
                      
                    />
                </div>
            ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-2">Usage by Day of the Week</h3>
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="day" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip formatter={(value: number, name: string, props: any) => [`${value}`, "Usage"]} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                dot={{ fill: "#3B82F6" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-2">Support Channels</h3>
                    <p className="text-sm text-gray-400 mb-4">Most Used</p>
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Legend
                                layout="vertical"
                                verticalAlign="middle"
                                align="left"
                                iconType="circle"
                                formatter={(value) => <span style={{ color: '#fff' }}>{value}</span>}
                            />
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={2}
                                label={({ name, value }) => `${value} (${((value / totalPie) * 100).toFixed(1)}%)`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
} 
