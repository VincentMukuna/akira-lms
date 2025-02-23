import { BaseModule } from '@/components/CourseBuilder/types/course';
import { Input } from '@/components/ui/input';

interface BaseModuleEditorProps<T extends BaseModule> {
  module: T;
  onChange: (module: Partial<T>) => void;
  children?: React.ReactNode;
}

export default function BaseModuleEditor<T extends BaseModule>({
  module,
  onChange,
  children,
}: BaseModuleEditorProps<T>) {
  const handleTitleChange = (title: string) => {
    onChange({ title } as Partial<T>);
  };

  return (
    <div className="space-y-4">
      <Input
        value={module.title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="Module Title"
        className="text-lg font-semibold"
      />
      <div className="space-y-4">{children}</div>
    </div>
  );
}
