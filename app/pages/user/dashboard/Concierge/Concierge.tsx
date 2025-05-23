// import libraries
import { useTranslation } from "react-i18next";
import type { JSX } from 'react';
import { motion } from 'framer-motion';
//import components
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

const ConciergeDashboard = (): JSX.Element => {
  const { t } = useTranslation();

  const stats = [
    {
      id: 1,
      title: t("conciergeStats.stats.sessions.title"),
      description: t("conciergeStats.stats.sessions.description"),
    },
    {
      id: 2,
      title: t("conciergeStats.stats.questions.title"),
      description: t("conciergeStats.stats.questions.description"),
    },
    {
      id: 3,
      title: t("conciergeStats.stats.credits.title"),
      description: t("conciergeStats.stats.credits.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
            {t("conciergeStats.title")}
          </h1>
          <p className="text-[var(--color-muted)] mb-12">
            {t("conciergeStats.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {stats.map((product) => (
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
              {t("conciergeStats.usage.title")}
            </h3>
            <StatsLineChart lineData={lineData} />
          </div>

          <div className="rounded-xl p-6 bg-[var(--color-bg-alt)]">
            <h3 className="text-lg font-semibold mb-2">
              {t("conciergeStats.channels.title")}
            </h3>
            <p className="text-sm mb-4 text-[var(--color-muted)]">
              {t("conciergeStats.channels.mostUsed")}
            </p>
            <StatsPieChart pieData={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConciergeDashboard;
