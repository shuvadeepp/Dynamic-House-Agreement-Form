import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText, File } from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFormat: (format: 'PDF' | 'DOC') => void;
}

export default function DownloadModal({ isOpen, onClose, onSelectFormat }: DownloadModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogTitle className="sr-only">Download Format Selection</DialogTitle>
        <div className="text-center p-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
            <Download className="text-primary text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Download Format</h3>
          <p className="text-gray-600 mb-6">Select the format you want to download the agreement in</p>
          
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 h-12"
              onClick={() => onSelectFormat('PDF')}
              data-testid="button-download-pdf"
            >
              <FileText className="text-red-500 text-lg" />
              <span className="font-medium">Download as PDF</span>
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 h-12"
              onClick={() => onSelectFormat('DOC')}
              data-testid="button-download-doc"
            >
              <File className="text-blue-500 text-lg" />
              <span className="font-medium">Download as DOC</span>
            </Button>
          </div>
          
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
            data-testid="button-cancel-download"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
