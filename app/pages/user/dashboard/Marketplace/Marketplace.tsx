// src/pages/Marketplace.tsx
import { Zap, Bot, CalendarCheck, Mail, Settings2, Search, Filter } from 'lucide-react';
import WorkflowCard from '~/components/workflowCards/WorkflowCards';


export default function Marketplace() {
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

  return (
    <div className="min-h-screen text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Workflow Marketplace</h1>
        <p className="text-gray-400 mb-6">Boost your productivity by adding automations to your business.</p>

        <div className="flex gap-4 items-center mb-6">
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-xl w-full max-w-md">
            <Search className="w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search workflows..." 
              className="bg-transparent outline-none text-sm text-gray-900 w-full"
            />
          </div>
          <button className="flex items-center gap-2 bg-purple-600 px-3 py-2 rounded-xl text-sm hover:bg-zinc-700">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {workflows.map((workflow, idx) => (
            <WorkflowCard
              key={idx}
              title={workflow.title}
              description={workflow.description}
              icon={workflow.icon}
              price={workflow.price}
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <div className="flex gap-2">
            <button className="bg-zinc-800 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-zinc-700">Previous</button>
            <button className="bg-purple-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-purple-700">1</button>
            <button className="bg-zinc-800 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-zinc-700">2</button>
            <button className="bg-zinc-800 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-zinc-700">3</button>
            <button className="bg-zinc-800 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-zinc-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

