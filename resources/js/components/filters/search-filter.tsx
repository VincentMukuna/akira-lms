import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function SearchFilter({
  value,
  onChange,
  label,
  placeholder = 'Search...',
  className,
}: SearchFilterProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}
