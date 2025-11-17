import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('bg-white rounded-3xl p-9 shadow-2xl animate-slide-up', className)}>
      {children}
    </div>
  );
};

export default Card;
