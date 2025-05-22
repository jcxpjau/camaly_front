// import libraries
import { motion } from 'framer-motion';
// import components
import MetricsCard from "~/components/metricsCards/MetricsCards";
import StatsPieChart from "~/components/pieChart/PieChart";
import StatsLineChart from "~/components/lineChart/LineChart";

const lineData = [
  { day: "Mon", value: 51, percent: "20.9%" },
  { day: "Tue", value: 32, percent: "13.1%" },
  { day: "Wed", value: 72, percent: "29.4%" },
  { day: "Fri", value: 90, percent: "36.7%" },
];

const pieData = [
  { name: "Linkedin", value: 90, color: "#0072b1" },
  { name: "X", value: 72, color: "#1DA1F2" },
  { name: "Instagram", value: 39, color: "#C13584" },
  { name: "WhatsApp", value: 34, color: "#25D366" },
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
  return (
    <div className="p-6 space-y-6 min-h-screen text-[var(--color-text)] bg-[var(--color-bg)]">
      <motion.div
        className="mx-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h3 className="font-extralight tracking-wide text-3xl">
          Concierge
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="rounded-xl p-6 bg-[var(--color-bg-alt)]">
          <h3 className="text-lg font-semibold mb-2">
            Usage by Day of the Week
          </h3>
          <StatsLineChart lineData={lineData} />
        </div>

        <div className="rounded-xl p-6 bg-[var(--color-bg-alt)]">
          <h3 className="text-lg font-semibold mb-2">
            Support Channels
          </h3>
          <p className="text-sm mb-4 text-[var(--color-muted)]">
            Most Used
          </p>
          <StatsPieChart pieData={pieData} />
        </div>
      </div>
    </div>
  );
}
