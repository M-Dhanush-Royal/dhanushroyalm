import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="text-center text-white py-10 mb-8 animate-fade-in-down">
      <div className="text-6xl mb-2.5 inline-block animate-pulse-logo">
        <Shield className="w-16 h-16" />
      </div>
      <h1 className="text-5xl font-bold mb-2.5 text-shadow-lg">DeepGuard</h1>
      <p className="text-lg opacity-95">Enterprise-Grade AI Deepfake Detection Platform</p>
    </header>
  );
};

export default Header;
