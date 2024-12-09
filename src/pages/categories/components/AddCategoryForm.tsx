import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddCategoryFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const AddCategoryForm = ({
  value,
  onChange,
  onSubmit,
}: AddCategoryFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Yeni kategori adı"
      />
      <Button type="submit">Ekle</Button>
    </form>
  );
};
