import { cn } from "@/lib/utils";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ModalContainer({
  isOpen,
  onClose,
  children,
  className,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("rounded-xl", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
