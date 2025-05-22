// src/pages/Marketplace.tsx
import { Zap, Bot, CalendarCheck, Mail, Settings2, Search } from 'lucide-react';
import { useState } from 'react';
// import components
import WorkflowPanel from '~/components/workflowPanel/WorkflowPanel';
import FilterDropdown from '~/components/filterDropdown/FilterDropdown';

const workflows = [
  {
    title: 'Lead Qualification',
    description: 'Automatically qualify leads using AI chat and score based on responses.',
    icon: <Zap className="w-5 h-5" />, 
    price: '$29',
  },
  {
    title: 'Appointment Reminders',
    description: 'Send email and SMS reminders for booked appointments to reduce no-shows.',
    icon: <CalendarCheck className="w-5 h-5" />, 
    price: '$19',
  },
  {
    title: 'Social Post Scheduler',
    description: 'Generate and schedule content for Instagram and LinkedIn automatically.',
    icon: <Bot className="w-5 h-5" />, 
    price: '$25',
  },
  {
    title: 'Customer Feedback Collector',
    description: 'Automate follow-up messages asking for reviews after a service.',
    icon: <Mail className="w-5 h-5" />, 
    price: '$15',
  },
  {
    title: 'Custom Workflow Builder',
    description: 'Build your own automation flow using modular blocks and triggers.',
    icon: <Settings2 className="w-5 h-5" />, 
    price: '$49',
  },
  {
    title: 'Weekly Reports Generator',
    description: 'Send automated performance summaries to your email every week.',
    icon: <Mail className="w-5 h-5" />, 
    price: '$12',
  },
  {
    title: 'Client Onboarding Flow',
    description: 'Welcome and guide new clients with step-by-step automations.',
    icon: <Zap className="w-5 h-5" />, 
    price: '$34',
  },
  {
    title: 'Birthday Greetings Sender',
    description: 'Delight your clients with automated birthday wishes.',
    icon: <CalendarCheck className="w-5 h-5" />, 
    price: '$9',
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Workflow Marketplace</h1>
        <p className="text-gray-400 mb-6">Boost your productivity by adding automations to your business.</p>

        <div className="flex flex-row gap-4 items-center mb-6">
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-xl w-full max-w-md">
            <Search className="w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search workflows..." 
              className="bg-transparent outline-none text-sm text-gray-900 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FilterDropdown />
        </div>


        <WorkflowPanel workflows={workflows} searchTerm={searchTerm} />
      </div>
    </div>
  );
}
