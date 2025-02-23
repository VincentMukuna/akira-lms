import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Option {
  label: string;
  value: string;
}

interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  className?: string;
  showEmptyOption?: boolean;
  emptyOptionLabel?: string;
}

export function SelectFilter({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select...',
  className,
  showEmptyOption = true,
  emptyOptionLabel = 'All',
}: SelectFilterProps) {
  // Convert empty string to 'all' for the select value
  const selectValue = value || 'all';

  // Handle value change and convert 'all' back to empty string
  const handleChange = (newValue: string) => {
    onChange(newValue === 'all' ? '' : newValue);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Select value={selectValue} onValueChange={handleChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {showEmptyOption && <SelectItem value="all">{emptyOptionLabel}</SelectItem>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
