// import libraries
import { useState, useEffect, type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// import components
import ProductPanel from "~/components/productPanel/ProductPanel";
import { ProductCard } from "~/components/productCard";
import { FilterControls } from "~/components/filterBar";
import { ICONS } from "~/components/filterBar/iconCategories";
import ProductOverview from "~/components/productOverview/productOverview";
import BuyBtn from "~/components/buyBtn/butBtn";

const Marketplace = (): JSX.Element => {
  const { t } = useTranslation();
  const [workflows, setWorkflows] = useState<
    {
      id: string;
      name: string;
      description: string;
      icon: JSX.Element;
      price: string;
    }[]
  >([]);

  //pagination for the panel
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginate, setPaginate] = useState(true);
  const [lastPage, setLastPage] = useState(1);

  //filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [showIcons, setShowIcons] = useState(true);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(0);
  const toggleIconSelection = (iconName: string) => {
    setSelectedIcons((prev) =>
      prev.includes(iconName)
        ? prev.filter((name) => name !== iconName)
        : [...prev, iconName]
    );
  };

  //productviewer controls
  const [selectedProduct, setSelectedProduct] = useState<
    null | (typeof workflows)[number]
  >(null);

  // activate and deactivate pagination as a filter is applied
  useEffect(() => {
    if (searchTerm || selectedMaxPrice > 0) {
      setPaginate(false);
      setItemsPerPage(99);
    } else {
      setPaginate(true);
      setCurrentPage(1);
      setItemsPerPage(4);
    }
  }, [searchTerm, selectedMaxPrice]);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        const baseUrl = `${import.meta.env.VITE_API_URL}products`;
        let url = new URL(baseUrl);

        if (paginate) {
          url.searchParams.append("limit", itemsPerPage.toString());
          url.searchParams.append("page", currentPage.toString());
        } else {
          url.searchParams.append("limit", "99");
        }

        if (searchTerm) {
          url.searchParams.append("name", searchTerm);
        }

        if (selectedMaxPrice > 0) {
          url.searchParams.append("maxPrice", selectedMaxPrice.toString());
        }

        const res = await fetch(url);
        const json = await res.json();

        console.log("API Response:", json);

        if (!res.ok) {
          console.error("Error getting products:", json);
          return;
        }

        const mappedData = json.data.map((item: any) => ({
          id: item._id,
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
  }, [currentPage, itemsPerPage, paginate, searchTerm, selectedMaxPrice]);

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

        {/* Filters */}
        <div className="flex flex-col col-1 w-full gap-2 mb-10">
          <FilterControls.Root>
            <FilterControls.Group>
              <FilterControls.SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
              />
              <FilterControls.FilterPrice
                selected={selectedMaxPrice}
                onSelect={setSelectedMaxPrice}
              />
            </FilterControls.Group>

            {/* <FilterControls.CategoryToggle
              onClick={() => setShowIcons((prev) => !prev)}
            /> */}
            {showIcons && (
              <FilterControls.IconCloud
                selectedIcons={selectedIcons}
                onSelect={toggleIconSelection}
              />
            )}
          </FilterControls.Root>
        </div>

        {/* Panel */}
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
              <ProductCard.Header icon={workflow.icon} price={Number(workflow.price)} />
              <ProductCard.Title>{workflow.name}</ProductCard.Title>
              <ProductCard.Description>
                {workflow.description}
              </ProductCard.Description>
              <ProductCard.Footer>
                <BuyBtn />
                <ProductCard.MoreInfoButton
                  onClick={() => setSelectedProduct(workflow)}
                />
              </ProductCard.Footer>
            </ProductCard.Root>
          ))}
        </ProductPanel>
      </div>
      <AnimatePresence>
        {selectedProduct && (
          <ProductOverview
            onClick={() => setSelectedProduct(null)}
            workflow={selectedProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;
