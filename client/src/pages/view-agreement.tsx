import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import DownloadModal from "@/components/download-modal";
import ConfirmationModal from "@/components/confirmation-modal";

interface FormData {
  agremntMadeOn: string;
  effectiveFromDate: string;
  tenantName: string;
  tenantFatherName: string;
  tenantReligion: string;
  tenantOccupation: string;
  tenantAllowFloor: string;
  tenantRoomConsist: string;
  tenantResiding: string;
  rentAmt: string;
  amtinWord: string;
  tenantRefundAmt: string;
  tenantIncreaseAmt: string;
}

export default function ViewAgreement() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'DOC' | ''>('');

  useEffect(() => {
    const storedData = localStorage.getItem('agreementFormData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "___________";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getOrdinalDay = (dateString: string) => {
    if (!dateString) return "__";
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    return day + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
  };

  const handleDownload = () => {
    if (!formData) {
      alert('No form data available. Please fill out the form first.');
      setLocation('/');
      return;
    }
    setShowDownloadModal(true);
  };

  const handleFormatSelection = (format: 'PDF' | 'DOC') => {
    setSelectedFormat(format);
    setShowDownloadModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmDownload = async () => {
    if (!formData || !selectedFormat) return;

    try {
      if (selectedFormat === 'PDF') {
        const { generatePDF } = await import('@/lib/pdf-generator');
        await generatePDF(formData);
      } else if (selectedFormat === 'DOC') {
        const { generateDOC } = await import('@/lib/doc-generator');
        await generateDOC(formData);
      }
      setShowConfirmationModal(false);
      setSelectedFormat('');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  if (!formData) {
    return (
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">No Agreement Data Found</h2>
            <p className="text-gray-600 mb-6">Please fill out the form first to generate an agreement.</p>
            <Button onClick={() => setLocation('/')} data-testid="button-go-to-form">
              Go to Form
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className="gradient-header text-white p-6 flex flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Lease Agreement Document</h2>
              <p className="text-blue-100 text-sm mt-1">Review and download your agreement</p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={handleDownload}
                className="flex items-center gap-2"
                data-testid="button-download"
              >
                <Download size={16} />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={() => setLocation('/')}
                className="flex items-center gap-2 bg-blue-700 text-white border-blue-700 hover:bg-blue-800"
                data-testid="button-back-to-form"
              >
                <ArrowLeft size={16} />
                Back to Form
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-8 bg-white" id="agreement-content">
            <div className="max-w-3xl mx-auto">
              {/* Document Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">LEASE AGREEMENT FOR RENT</h1>
                <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
              </div>

              {/* Agreement Content */}
              <div className="space-y-6 text-gray-700 leading-relaxed" data-testid="agreement-content">
                <p className="text-justify">
                  This <strong>AGREEMENT</strong> is made on the{" "}
                  <span className="font-semibold border-b border-gray-300 px-1" data-testid="text-agreement-date">
                    {getOrdinalDay(formData.agremntMadeOn)}
                  </span>{" "}
                  day of{" "}
                  <span className="font-semibold border-b border-gray-300 px-1">
                    {formatDate(formData.agremntMadeOn)}
                  </span>{" "}
                  between <strong>SMT. Rinku Podder</strong> wife of Biswanath Podder, by religion Hindu, by occupation house wife, residing at 369/3614, Mohadev Nagar, Road No-03, Jharpada, BHUBANESWAR-751006 hereinafter referred to as the <strong>LAND OWNER</strong> (which expression shall unless repugnant to the subject or context be deemed to include her heirs, executors, administrators, representative and assigns) of the ONE PART.
                </p>

                <p className="text-justify">
                  <strong>
                    <span className="font-semibold border-b border-gray-300 px-1" data-testid="text-tenant-name">
                      {formData.tenantName || "____________"}
                    </span>
                  </strong>{" "}
                  S/O of{" "}
                  <span className="font-semibold border-b border-gray-300 px-1" data-testid="text-father-name">
                    {formData.tenantFatherName || "____________"}
                  </span>
                  , religion{" "}
                  <span className="font-semibold border-b border-gray-300 px-1" data-testid="text-religion">
                    {formData.tenantReligion || "____________"}
                  </span>
                  , occupation{" "}
                  <span className="font-semibold border-b border-gray-300 px-1" data-testid="text-occupation">
                    {formData.tenantOccupation || "____________"}
                  </span>
                  , residing at{" "}
                  <span className="font-semibold border-b border-gray-300 px-1">
                    {formData.tenantResiding || "____________"}
                  </span>
                  , hereinafter referred to as the <strong>TENANT</strong> (which expression shall unless repugnant to the subject or context be deemed to include his heirs, executors, administrators, representative and assigns) of the OTHER PART.
                </p>

                <p className="text-justify">
                  Whereas the land owner has agreed to let out the premises No. 369/3614, Mohadev Nagar, Road NO. 03, Jharpada, BHUBANESWAR–751006 (entire Ground floor except stair case room), and the tenant has agreed to take on a monthly lease basis a flat consisting of{" "}
                  <span className="font-semibold border-b border-gray-300 px-1" data-testid="text-rooms-consisting">
                    {formData.tenantRoomConsist || "two bedrooms, two toilets, and one kitchen"}
                  </span>{" "}
                  on the ground floor of the said premises.
                </p>

                <h3 className="font-semibold text-gray-900 mb-4">NOW THIS INDENTURE WITNESSETH AS FOLLOWS:</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>The landlady will let out and the tenant will take on lease basis a flat as described above.</li>
                  <li>
                    The rent will be Rs.{" "}
                    <span className="font-semibold border-b border-gray-300 px-1" data-testid="text-monthly-rent">
                      {formData.rentAmt || "____________"}
                    </span>
                    /- ({" "}
                    <span className="font-semibold border-b border-gray-300 px-1">
                      {formData.amtinWord || "____________"}
                    </span>
                    ) per month effective from{" "}
                    <span className="font-semibold border-b border-gray-300 px-1">
                      {getOrdinalDay(formData.agremntMadeOn)} {formatDate(formData.agremntMadeOn)}
                    </span>
                    .
                  </li>
                  <li>
                    The tenant has paid Rs.{" "}
                    <span className="font-semibold border-b border-gray-300 px-1" data-testid="text-refund-amount">
                      {formData.tenantRefundAmt || "____________"}
                    </span>
                    /- as a refundable deposit (no interest), refundable after 11 months upon vacation.
                  </li>
                  <li>
                    Tenant must pay rent by the{" "}
                    <span className="font-semibold border-b border-gray-300 px-1">
                      {getOrdinalDay(formData.agremntMadeOn)}  {formatDate(formData.agremntMadeOn)}
                    </span>{" "}
                    of each month; non-compliance may lead to termination without notice.
                  </li>
                  <li>
                    Tenant will take possession from{" "}
                    <span className="font-semibold border-b border-gray-300 px-1">
                      {getOrdinalDay(formData.agremntMadeOn)} {formatDate(formData.agremntMadeOn)}
                    </span>
                    .
                  </li>
                  <li>
                    Rent will increase by Rs.{" "}
                    <span className="font-semibold border-b border-gray-300 px-1" data-testid="text-increase-amount">
                      {formData.tenantIncreaseAmt || "____________"}
                    </span>
                    /- after 11 months.
                  </li>
                  <li>Flat shall only be used for residential purpose.</li>
                  <li>Tenant will maintain the flat in good condition at their own cost.</li>
                  <li>Tenant is responsible for their own electricity bill.</li>
                  <li>Tenant shall not sublet or misuse the demised flat, especially during rainy season.</li>
                  <li>No structural changes shall be made without the written consent of the landlady.</li>
                  <li>Inflammable or combustible objects allowed except domestic use items in small quantities.</li>
                  <li>Three months non-payment of rent may lead to lease termination.</li>
                </ul>

                <div className="mt-8">
                  <p className="text-justify">
                    IN WITNESS whereof the parties here to have unto set and subscribed their respective hands...
                  </p>
                </div>

                {/* Signature Section */}
                <div className="signature-line">
                  <div className="signature-box">
                    <div className="signature-title">SIGNATURE OF THE OWNER/LANDLADY</div>
                    <div className="signature-space"></div>
                    <div className="signature-label">Signature & Date</div>
                  </div>
                  <div className="signature-box">
                    <div className="signature-title">SIGNATURE OF THE TENANT</div>
                    <div className="signature-space"></div>
                    <div className="signature-label">Signature & Date</div>
                  </div>
                </div>

                <p className="text-center mt-8 text-sm">
                  <strong>PLACE:</strong> BHUBANESWAR<br />
                  <strong>DATE:</strong> {formatDate(formData.agremntMadeOn)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        onSelectFormat={handleFormatSelection}
      />

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmDownload}
        format={selectedFormat}
      />
    </main>
  );
}
