// import libraries
import { useState, useMemo, type JSX } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
//import components
import ProductPanel from '~/components/productPanel/ProductPanel';
import FilterDropdown from '~/components/filterDropdown/FilterDropdown';
import { ProductCard } from '~/components/productCard';
//import icons
import { Zap, Bot, CalendarCheck, Mail, Settings2, Search } from 'lucide-react';

const Marketplace = (): JSX.Element => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const workflows = [
    {
      title: t('marketplace.lead-qualification.title'),
      description: t('marketplace.lead-qualification.description'),
      icon: <Zap className="w-5 h-5 text-[color:var(--color-accent)]" />,
      price: '$29',
    },
    {
      title: t('marketplace.appointment-reminders.title'),
      description: t('marketplace.appointment-reminders.description'),
      icon: <CalendarCheck className="w-5 h-5 text-[color:var(--color-accent)]" />,
      price: '$19',
    },
    {
      title: t('marketplace.social-post-scheduler.title'),
      description: t('marketplace.social-post-scheduler.description'),
      icon: <Bot className="w-5 h-5 text-[color:var(--color-accent)]" />,
      price: '$25',
    },
    {
      title: t('marketplace.feedback-collector.title'),
      description: t('marketplace.feedback-collector.description'),
      icon: <Mail className="w-5 h-5 text-[color:var(--color-accent)]" />,
      price: '$15',
    },
    {
      title: t('marketplace.custom-workflow-builder.title'),
      description: t('marketplace.custom-workflow-builder.description'),
      icon: <Settings2 className="w-5 h-5 text-[color:var(--color-accent)]" />,
      price: '$49',
    },
    {
      title: t('marketplace.weekly-reports-generator.title'),
      description: t('marketplace.weekly-reports-generator.description'),
      icon: <Mail className="w-5 h-5 text-[color:var(--color-accent)]" />,
      price: '$12',
    },
    {
      title: t('marketplace.client-onboarding-flow.title'),
      description: t('marketplace.client-onboarding-flow.description'),
      icon: <Zap className="w-5 h-5 text-[color:var(--color-accent)]" />,
      price: '$34',
    },
    {
      title: t('marketplace.birthday-greetings-sender.title'),
      description: t('marketplace.birthday-greetings-sender.description'),
      icon: <CalendarCheck className="w-5 h-5 text-[color:var(--color-accent)]" />,
      price: '$9',
    },
  ];

  const filteredWorkflows = useMemo(() => {
    return workflows.filter(
      (wf) =>
        wf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wf.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, workflows]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
            {t('marketplace.title')}
          </h1>
        </motion.div>

        <p className="text-[var(--color-muted)] mb-16">
          {t('marketplace.description')}
        </p>

        <div className="flex flex-row gap-4 items-center mb-6">
          <div className="flex items-center gap-2 bg-[var(--color-bg-alt)] px-3 py-2 rounded-xl w-full max-w-md border border-[var(--color-border)]">
            <Search className="w-4 h-4 text-[var(--color-muted)]" />
            <input
              type="text"
              placeholder={t('marketplace.search-placeholder')}
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
              <ProductCard.Title>{workflow.title}</ProductCard.Title>
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
