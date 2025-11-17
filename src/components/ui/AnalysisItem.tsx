interface AnalysisItemProps {
    label: string;
    value: number;
}

const AnalysisItem = ({ label, value }: AnalysisItemProps) => {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:translate-x-1">
            <span className="font-semibold text-gray-700 text-sm">{label}</span>
            <div className="flex-1 h-2.5 bg-gray-200 rounded-full mx-5 overflow-hidden">
                <div 
                    className="h-full bg-primary-gradient rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${value}%` }}
                ></div>
            </div>
            <span className="font-bold bg-primary-gradient bg-clip-text text-transparent min-w-[55px] text-right">
                {value.toFixed(1)}%
            </span>
        </div>
    );
};

export default AnalysisItem;
