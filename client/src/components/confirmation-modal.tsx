import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  format: 'PDF' | 'DOC' | '';
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, format }: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogTitle className="sr-only">Download Confirmation</DialogTitle>
        <div className="text-center p-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
            <AlertTriangle className="text-yellow-600 text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Download</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to download the agreement as{" "}
            <span className="font-semibold" data-testid="text-selected-format">{format}</span>?
          </p>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-testid="button-confirm-no"
            >
              No, Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1"
              data-testid="button-confirm-yes"
            >
              Yes, Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
