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

export async function generateDOC(formData: FormData) {
  // Import docx dynamically
  const { Document, Paragraph, TextRun, AlignmentType, HeadingLevel, BorderStyle } = await import('docx');
  const { saveAs } = await import('file-saver');

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

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Title
        new Paragraph({
          children: [
            new TextRun({
              text: "LEASE AGREEMENT FOR RENT",
              bold: true,
              size: 32,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // Main content paragraphs
        new Paragraph({
          children: [
            new TextRun({
              text: `This `,
            }),
            new TextRun({
              text: "AGREEMENT",
              bold: true,
            }),
            new TextRun({
              text: ` is made on the ${getOrdinalDay(formData.agremntMadeOn)} day of ${formatDate(formData.agremntMadeOn)} between `,
            }),
            new TextRun({
              text: "SMT. Rinku Podder",
              bold: true,
            }),
            new TextRun({
              text: ` wife of Biswanath Podder, by religion Hindu, by occupation house wife, residing at 369/3614, Mohadev Nagar, Road No-03, Jharpada, BHUBANESWAR-751006 hereinafter referred to as the `,
            }),
            new TextRun({
              text: "LAND OWNER",
              bold: true,
            }),
            new TextRun({
              text: ` (which expression shall unless repugnant to the subject or context be deemed to include her heirs, executors, administrators, representative and assigns) of the ONE PART.`,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: formData.tenantName || "____________",
              bold: true,
            }),
            new TextRun({
              text: ` S/O of ${formData.tenantFatherName || "____________"}, religion ${formData.tenantReligion || "____________"}, occupation ${formData.tenantOccupation || "____________"}, residing at ${formData.tenantResiding || "____________"}, hereinafter referred to as the `,
            }),
            new TextRun({
              text: "TENANT",
              bold: true,
            }),
            new TextRun({
              text: ` (which expression shall unless repugnant to the subject or context be deemed to include his heirs, executors, administrators, representative and assigns) of the OTHER PART.`,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: `Whereas the land owner has agreed to let out the premises No. 369/3614, Mohadev Nagar, Road NO. 03, Jharpada, BHUBANESWAR–751006 (entire Ground floor except stair case room), and the tenant has agreed to take on a monthly lease basis a flat consisting of ${formData.tenantRoomConsist || "two bedrooms, two toilets, and one kitchen"} on the ground floor of the said premises.`,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "NOW THIS INDENTURE WITNESSETH AS FOLLOWS:",
              bold: true,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Terms and conditions
        new Paragraph({
          children: [new TextRun({ text: "• The landlady will let out and the tenant will take on lease basis a flat as described above." })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: `• The rent will be Rs. ${formData.rentAmt || "____________"}/- (${formData.amtinWord || "____________"}) per month effective from ${getOrdinalDay(formData.agremntMadeOn)} ${formatDate(formData.agremntMadeOn)}.` })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: `• The tenant has paid Rs. ${formData.tenantRefundAmt || "____________"}/- as a refundable deposit (no interest), refundable after 11 months upon vacation.` })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: `• Tenant must pay rent by the ${getOrdinalDay(formData.agremntMadeOn)} ${formatDate(formData.agremntMadeOn)} of each month; non-compliance may lead to termination without notice.` })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: `• Tenant will take possession from ${getOrdinalDay(formData.agremntMadeOn)} ${formatDate(formData.agremntMadeOn)}.` })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: `• Rent will increase by Rs. ${formData.tenantIncreaseAmt || "____________"}/- after 11 months.` })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: "• Flat shall only be used for residential purpose." })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: "• Tenant will maintain the flat in good condition at their own cost." })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: "• Tenant is responsible for their own electricity bill." })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: "• Tenant shall not sublet or misuse the demised flat, especially during rainy season." })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: "• No structural changes shall be made without the written consent of the landlady." })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: "• Inflammable or combustible objects allowed except domestic use items in small quantities." })],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [new TextRun({ text: "• Three months non-payment of rent may lead to lease termination." })],
          spacing: { after: 100 },
        }),



        new Paragraph({
          children: [
            new TextRun({
              text: "IN WITNESS whereof the parties here to have unto set and subscribed their respective hands...",
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 400, after: 600 },
        }),

        // Signature section
        new Paragraph({
          children: [
            new TextRun({
              text: "SIGNATURE OF THE OWNER/LANDLADY",
              bold: true,
            }),
            new TextRun({
              text: "\t\t\t\t\t\t\t\t\t\t",
            }),
            new TextRun({
              text: "SIGNATURE OF THE TENANT",
              bold: true,
            }),
          ],
          spacing: { before: 400, after: 400 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "_________________________",
            }),
            new TextRun({
              text: "\t\t\t\t\t\t\t",
            }),
            new TextRun({
              text: "_________________________",
            }),
          ],
          spacing: { after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "Signature & Date",
              size: 18,
            }),
            new TextRun({
              text: "\t\t\t\t\t\t\t\t\t\t\t\t\t",
            }),
            new TextRun({
              text: "Signature & Date",
              size: 18,
            }),
          ],
          spacing: { after: 400 },
        }),

        // Footer
        new Paragraph({
          children: [
            new TextRun({
              text: `PLACE: BHUBANESWAR\t\t\t\t\t\t\t\t\t\t\t\tDATE: ${formatDate(formData.agremntMadeOn)}`,
              bold: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
        }),
      ],
    }],
  });

  // Generate and save the document
  const { Packer } = await import('docx');
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `lease-agreement-${formData.tenantName || 'document'}.docx`);
}
