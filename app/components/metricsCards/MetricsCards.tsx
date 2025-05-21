
interface MetricsCardProps {
  title: string;
  description: string;
}

const MetricsCard = ({ title, description }: MetricsCardProps) => {
  return (
    <div className="bg-[#353535] w-2xs rounded-lg p-3 transition-all hover:bg-purple-600">
      <div className="flex flex-col text-white tracking-wide">
        <h3 className="text-lg font-semibold">
            {title}
            
        </h3>
        <p className="text-sm font-light mt-2">{description}</p>
      </div>
    </div>
  );
};

export default MetricsCard;