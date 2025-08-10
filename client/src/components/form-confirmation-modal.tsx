import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface FormConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function FormConfirmationModal({ isOpen, onClose, onConfirm }: FormConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogTitle className="sr-only">Form Submission Confirmation</DialogTitle>
        <div className="text-center p-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <AlertCircle className="text-blue-600 text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Agreement</h3>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to generate the lease agreement with the provided information?
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6"
              data-testid="button-cancel-generate"
            >
              No
            </Button>
            <Button
              onClick={onConfirm}
              className="px-6"
              data-testid="button-confirm-generate"
            >
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}