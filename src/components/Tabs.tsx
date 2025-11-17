import { Video, Upload } from 'lucide-react';
import { cn } from '../lib/utils';

interface TabsProps {
  activeTab: 'live' | 'upload';
  setActiveTab: (tab: 'live' | 'upload') => void;
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="flex justify-center gap-4 mb-8 animate-fade-in">
      <button
        className={cn(
          'flex items-center gap-2 py-4 px-10 text-lg font-semibold rounded-full transition-all duration-300 bg-white/20 text-white backdrop-blur-md hover:bg-white/30 hover:-translate-y-0.5',
          { 'bg-white text-primary shadow-2xl': activeTab === 'live' }
        )}
        onClick={() => setActiveTab('live')}
      >
        <Video className="w-5 h-5" /> Live Detection
      </button>
      <button
        className={cn(
          'flex items-center gap-2 py-4 px-10 text-lg font-semibold rounded-full transition-all duration-300 bg-white/20 text-white backdrop-blur-md hover:bg-white/30 hover:-translate-y-0.5',
          { 'bg-white text-primary shadow-2xl': activeTab === 'upload' }
        )}
        onClick={() => setActiveTab('upload')}
      >
        <Upload className="w-5 h-5" /> Upload Video
      </button>
    </div>
  );
};

export default Tabs;
