import { IconType } from 'react-icons';

interface ValueCardProps {
  icon: IconType;
  title: string;
  description: string;
}

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 bg-primary-50">
        <Icon className="h-6 w-6 text-primary-600" />
      </div>
      <h3 className="text-gray-900">{title}</h3>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}
