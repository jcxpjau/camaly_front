// import libraries
import { useState, useEffect, type JSX, use } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
//import components
import ProductPanel from "~/components/productPanel/ProductPanel";
import { ProductCard } from "~/components/productCard";
import { FilterControls } from "~/components/filterBar";

//import icons
import { ICONS } from "~/components/filterBar/iconCategories";

const Marketplace = (): JSX.Element => {
  const { t } = useTranslation();
  const [workflows, setWorkflows] = useState<{
    name: string;
    description: string;
    icon: JSX.Element;
    price: string;
  }[]>([]);

  //pagination for the panel
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginate, setPaginate] = useState(true);
  const [lastPage, setLastPage] = useState(1);

  //filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [showIcons, setShowIcons] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 100]);

  const toggleIconSelection = (iconName: string) => {
    setSelectedIcons((prev) =>
      prev.includes(iconName)
        ? prev.filter((name) => name !== iconName)
        : [...prev, iconName]
    );
  };

  console.log("Search term: ",searchTerm);
  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        const baseUrl = `${import.meta.env.VITE_API_URL}products`;
        const url = paginate
          ? `${baseUrl}?limit=${itemsPerPage}&page=${currentPage}`
          : `${baseUrl}?limit=9999`;
        console.log(url)
        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok) {
          console.error("Error getting products:", json);
          return;
        }

        const mappedData = json.data.map((item: any) => ({
          name: item.name,
          description: item.description,
          price: item.price,
          icon: item.iconName ?? ICONS["bot"],
        }));

        setWorkflows(mappedData);

        if (paginate && json.lastPage) {
          setLastPage(json.lastPage);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, [currentPage, itemsPerPage, paginate]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10 mb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1 className="text-3xl mb-2">{t("marketplace.title")}</h1>
        </motion.div>

        <p className="text-[var(--color-muted)] mb-16">
          {t("marketplace.description")}
        </p>

        <div className="flex flex-col w-full gap-2 mb-10">
          <FilterControls.Root>
            <FilterControls.Group>
              <FilterControls.SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
              />
              <FilterControls.FilterPrice
                selected={selectedPriceRange}
                onSelect={setSelectedPriceRange}
              />
            </FilterControls.Group>

            <FilterControls.CategoryToggle
              onClick={() => setShowIcons((prev) => !prev)}
            />
          </FilterControls.Root>

          {showIcons && (
            <FilterControls.IconCloud
              selectedIcons={selectedIcons}
              onSelect={toggleIconSelection}
            />
          )}
        </div>

        <ProductPanel
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          paginate={paginate}
          pageCount={lastPage}
          loading={loading}
        >
          {workflows.map((workflow, idx) => (
            <ProductCard.Root key={idx}>
              <ProductCard.Header icon={workflow.icon} price={workflow.price} />
              <ProductCard.Title>{workflow.name}</ProductCard.Title>
              <ProductCard.Description>{workflow.description}</ProductCard.Description>
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
