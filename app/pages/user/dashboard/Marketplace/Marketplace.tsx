// import libraries
import { useState, useMemo, useEffect, type JSX } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
//import components
import ProductPanel from "~/components/productPanel/ProductPanel";
import FilterDropdown from "~/components/filterDropdown/FilterDropdown";
import { ProductCard } from "~/components/productCard";
//import icons
import { Zap, Bot, CalendarCheck, Mail, Settings2, Search } from "lucide-react";

function getIconComponent(name: string): JSX.Element {
  const icons: Record<string, JSX.Element> = {
    zap: <Zap className="w-5 h-5 text-[color:var(--color-accent)]" />,
    calendarCheck: (
      <CalendarCheck className="w-5 h-5 text-[color:var(--color-accent)]" />
    ),
    bot: <Bot className="w-5 h-5 text-[color:var(--color-accent)]" />,
    mail: <Mail className="w-5 h-5 text-[color:var(--color-accent)]" />,
    settings: (
      <Settings2 className="w-5 h-5 text-[color:var(--color-accent)]" />
    ),
  };
  return (
    icons[name] ?? <Zap className="w-5 h-5 text-[color:var(--color-accent)]" />
  );
}

type Workflow = {
  name: string;
  description: string;
  icon: JSX.Element;
  price: string;
};

const Marketplace = (): JSX.Element => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://new.blumerland.com.br/camaly/products",
          {
            method: "GET",
          }
        );

        const json = await res.json();
       
        if (!res.ok) {
          console.error("Error getting products:", json);
          return;
        }
        const mappedData: Workflow[] = json.map((item: any) => ({
          name: item.name,
          description: item.description,
          price: item.price,
          icon: getIconComponent("bot"),
        }));
        setWorkflows(mappedData);
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  const filteredWorkflows = useMemo(() => {
    return workflows.filter(
      (wf) =>
        wf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wf.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, workflows]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[var(--color-muted)]">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10 mb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1 className="text-3xl text-[var(--color-text)] mb-2">
            {t("marketplace.title")}
          </h1>
        </motion.div>

        <p className="text-[var(--color-muted)] mb-16">
          {t("marketplace.description")}
        </p>

        <div className="flex flex-row gap-4 items-center mb-6">
          <div className="flex items-center gap-2 bg-[var(--color-bg-alt)] px-3 py-2 rounded-xl w-full max-w-md border border-[var(--color-border)]">
            <Search className="w-4 h-4 text-[var(--color-muted)]" />
            <input
              type="text"
              placeholder={t("marketplace.search-placeholder")}
              className="bg-transparent outline-none text-sm text-[var(--color-text)] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FilterDropdown />
        </div>

        <ProductPanel itemsPerPage={4}>
          {filteredWorkflows.map((workflow, idx) => (
            <ProductCard.Root key={idx}>
              <ProductCard.Header icon={workflow.icon} price={workflow.price} />
              <ProductCard.Title>{workflow.name}</ProductCard.Title>
              <ProductCard.Description>
                {workflow.description}
              </ProductCard.Description>
              <ProductCard.Footer>
                <ProductCard.BuyButton />
                <ProductCard.MoreInfoButton />
              </ProductCard.Footer>
            </ProductCard.Root>
          ))}
        </ProductPanel>
      </div>
    </div>
  );
};

export default Marketplace;
