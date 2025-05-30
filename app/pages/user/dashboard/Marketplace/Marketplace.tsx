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
import BuyBtn from "~/components/buyBtn/buyBtn";
import api from "~/services/api";
import { PopUpAction } from "~/components/popUpAction/";

interface IWorkflow {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
}

const Marketplace = (): JSX.Element => {
  const { t } = useTranslation();
  const [workflows, setWorkflows] = useState<IWorkflow[]>([]);

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

  const [popUpOpen, setPopUpOpen] = useState(false);

  // activate and deactivate pagination as a filter is applied
  useEffect(() => {
    if (searchTerm || selectedMaxPrice > 0 || selectedIcons.length > 0) {
      setPaginate(false);
      setItemsPerPage(99);
    } else {
      setPaginate(true);
      setCurrentPage(1);
      setItemsPerPage(4);
    }
  }, [searchTerm, selectedMaxPrice, selectedIcons]);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("products", {
          params: {
            limit: paginate ? itemsPerPage : 99,
            page: paginate ? currentPage : undefined,
            name: searchTerm || undefined,
            maxPrice: selectedMaxPrice > 0 ? selectedMaxPrice : undefined,
            categories:
              selectedIcons.length > 0 ? selectedIcons.join(",") : null,
          },
        });

        if (!data || !Array.isArray(data.data)) {
          return;
        }

        const mappedData = data.data.map((item: any) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category ?? "insight",
        }));

        setWorkflows(mappedData);

        if (paginate && data.lastPage) {
          setLastPage(data.lastPage);
        }
      } catch (err) {
        //console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, [
    currentPage,
    itemsPerPage,
    paginate,
    searchTerm,
    selectedMaxPrice,
    selectedIcons,
  ]);

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
            {showIcons && (
              <FilterControls.IconCloud
                selectedIcons={selectedIcons}
                onSelect={toggleIconSelection}
              />
            )}
          </FilterControls.Root>
        </div>

        {workflows.length > 0 ? (
          <>
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
                  <ProductCard.Header
                    icon={ICONS[workflow.category]}
                    price={Number(workflow.price)}
                  />
                  <ProductCard.Title>{workflow.name}</ProductCard.Title>
                  <ProductCard.Description>
                    {workflow.description}
                  </ProductCard.Description>
                  <ProductCard.Footer>
                    <BuyBtn
                      accentColor="#977efc"
                      hoverColor="#A4B7F4"
                      productId={workflow.id}
                      onPurchaseSuccess={()=>setPopUpOpen(true)}
                    />
                    <ProductCard.MoreInfoButton
                      onClick={() => setSelectedProduct(workflow)}
                    />
                  </ProductCard.Footer>
                </ProductCard.Root>
              ))}
            </ProductPanel>
          </>
        ) : !loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-xl text-[var(--color-text)]">
              {t("marketplace.noProducts")}
            </p>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[var(--color-muted)]">
                {t("loading")}
              </p>
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {selectedProduct && (
          <ProductOverview
            onClick={() => setSelectedProduct(null)}
            workflow={selectedProduct}
            onPurchaseSuccess={()=>setPopUpOpen(true)}
          />
        )}
      </AnimatePresence>
      {popUpOpen && (
        <PopUpAction.Root onClose={()=>setPopUpOpen(false)}>
          <PopUpAction.Title message={t("popUp.purchaseSuccesstitle")}/>
          <PopUpAction.Description>
           {t("popUp.purchaseDescription")}
          </PopUpAction.Description>

        </PopUpAction.Root>
      )}
    </div>
  );
};

export default Marketplace;
