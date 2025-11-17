import { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import LiveDetectionTab from './components/LiveDetectionTab';
import UploadTab from './components/UploadTab';

type Tab = 'live' | 'upload';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('live');

  return (
    <div className="container mx-auto max-w-[1600px] p-5">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === 'live' && <LiveDetectionTab />}
        {activeTab === 'upload' && <UploadTab />}
      </main>
    </div>
  );
}

export default App;
