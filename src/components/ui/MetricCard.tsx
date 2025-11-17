interface MetricCardProps {
    label: string;
    value: string | number;
}

const MetricCard = ({ label, value }: MetricCardProps) => {
    return (
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="text-4xl font-bold bg-primary-gradient bg-clip-text text-transparent mb-2">
                {value}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                {label}
            </div>
        </div>
    );
};

export default MetricCard;
