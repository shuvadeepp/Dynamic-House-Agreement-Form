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

export async function generatePDF(formData: FormData) {
  // Import jsPDF dynamically to avoid SSR issues
  const { jsPDF } = await import('jspdf');
  
  const doc = new jsPDF();
  
  // Set up fonts and margins
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const lineHeight = 6;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const textLines = doc.splitTextToSize(text, maxWidth);
    doc.text(textLines, x, y);
    return y + (textLines.length * lineHeight);
  };

  // Helper function to format date
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

  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const title = 'LEASE AGREEMENT FOR RENT';
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, yPosition);
  yPosition += 15;

  // Line under title
  doc.setLineWidth(0.5);
  doc.line((pageWidth - 50) / 2, yPosition, (pageWidth + 50) / 2, yPosition);
  yPosition += 15;

  // Agreement content
  doc.setFont('helvetica', 'normal');
  
  const agreementText = `This AGREEMENT is made on the ${getOrdinalDay(formData.agremntMadeOn)} day of ${formatDate(formData.agremntMadeOn)} between SMT. Rinku Podder wife of Biswanath Podder, by religion Hindu, by occupation house wife, residing at 369/3614, Mohadev Nagar, Road No-03, Jharpada, BHUBANESWAR-751006 hereinafter referred to as the LAND OWNER (which expression shall unless repugnant to the subject or context be deemed to include her heirs, executors, administrators, representative and assigns) of the ONE PART.

${formData.tenantName || "____________"} S/O of ${formData.tenantFatherName || "____________"}, religion ${formData.tenantReligion || "____________"}, occupation ${formData.tenantOccupation || "____________"}, residing at ${formData.tenantResiding || "____________"}, hereinafter referred to as the TENANT (which expression shall unless repugnant to the subject or context be deemed to include his heirs, executors, administrators, representative and assigns) of the OTHER PART.

Whereas the land owner has agreed to let out the premises No. 369/3614, Mohadev Nagar, Road NO. 03, Jharpada, BHUBANESWAR–751006 (entire Ground floor except stair case room), and the tenant has agreed to take on a monthly lease basis a flat consisting of ${formData.tenantRoomConsist || "two bedrooms, two toilets, and one kitchen"} on the ground floor of the said premises.

NOW THIS INDENTURE WITNESSETH AS FOLLOWS:

• The landlady will let out and the tenant will take on lease basis a flat as described above.
• The rent will be Rs. ${formData.rentAmt || "____________"}/- (${formData.amtinWord || "____________"}) per month effective from ${getOrdinalDay(formData.agremntMadeOn)} ${formatDate(formData.agremntMadeOn)}.
• The tenant has paid Rs. ${formData.tenantRefundAmt || "____________"}/- as a refundable deposit (no interest), refundable after 11 months upon vacation.
• Tenant must pay rent by the ${getOrdinalDay(formData.agremntMadeOn)} ${formatDate(formData.agremntMadeOn)} of each month; non-compliance may lead to termination without notice.
• Tenant will take possession from ${getOrdinalDay(formData.agremntMadeOn)} ${formatDate(formData.agremntMadeOn)}.
• Rent will increase by Rs. ${formData.tenantIncreaseAmt || "____________"}/- after 11 months.
• Flat shall only be used for residential purpose.
• Tenant will maintain the flat in good condition at their own cost.
• Tenant is responsible for their own electricity bill.
• Tenant shall not sublet or misuse the demised flat, especially during rainy season.
• No structural changes shall be made without the written consent of the landlady.
• Inflammable or combustible objects allowed except domestic use items in small quantities.
• Three months non-payment of rent may lead to lease termination.

IN WITNESS whereof the parties here to have unto set and subscribed their respective hands...`;

  yPosition = addWrappedText(agreementText, margin, yPosition, pageWidth - 2 * margin, 10);

  // Add some space before signatures
  yPosition += 20;

  // Check if we need a new page
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = margin;
  }

  // Signature section
  const signatureY = yPosition;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  
  // Owner signature
  doc.text('SIGNATURE OF THE OWNER/LANDLADY', margin, signatureY);
  doc.setLineWidth(0.3);
  doc.line(margin, signatureY + 20, margin + 80, signatureY + 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Signature & Date', margin, signatureY + 25);

  // Tenant signature
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('SIGNATURE OF THE TENANT', pageWidth - margin - 80, signatureY);
  doc.setLineWidth(0.3);
  doc.line(pageWidth - margin - 80, signatureY + 20, pageWidth - margin, signatureY + 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Signature & Date', pageWidth - margin - 80, signatureY + 25);

  // Footer
  yPosition = signatureY + 40;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  const footerText = `PLACE: BHUBANESWAR                    DATE: ${formatDate(formData.agremntMadeOn)}`;
  doc.text(footerText, (pageWidth - doc.getTextWidth(footerText)) / 2, yPosition);

  // Save the PDF
  doc.save(`lease-agreement-${formData.tenantName || 'document'}.pdf`);
}
