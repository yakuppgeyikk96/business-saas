import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
}

export default function NotFound({
  title = "Sayfa Bulunamadı",
  message = "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
  showBackButton = true,
}: NotFoundProps) {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 border rounded-lg">
      <div className="text-center space-y-5">
        <FileQuestion className="h-20 w-20 mx-auto text-muted-foreground" />
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-sm mx-auto">
          {message}
        </p>
        {showBackButton && (
          <div className="mt-8">
            <Button onClick={() => navigate(-1)} variant="default" size="lg">
              Geri Dön
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
