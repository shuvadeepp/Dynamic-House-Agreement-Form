import React from 'react';
import { useRef } from "react";
import { useLocation } from 'react-router-dom';
import '../Styles/ViewLeaseAgreementStyle.css';
import { downloadPDF } from "../Components/downloadPDF ";

const ViewLeaseAgreement = () => {
  const contentRef = useRef();
  const { state: formData } = useLocation(); 
  console.log('Received formData:', formData);

  const handleDownload = () => {
 
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) downloadBtn.style.display = 'none';

    // Download PDF
    downloadPDF(contentRef.current);

    // Optionally, show the button again after the download
    setTimeout(() => {
      if (downloadBtn) downloadBtn.style.display = 'block';
    }, 500);
  };

  const RentDate = formData?.agremntMadeOn ?? "____________"; 
  const [day, month, year] = RentDate.split('/');
  const dateObj = new Date(`${month}`);
  const date = new Date(dateObj);
  const monthName = date.toLocaleString('default', { month: 'long' });
  // console.log(monthName);
  
  return (
    <div className="lease-wrapper">
      <div className="lease-container" ref={contentRef}>
        <h2 className="lease-title">LEASE AGREEMENT FOR RENT</h2>

        <p>This AGREEMENT is made on the {day ?? "____________"}<sup>th</sup> day of {monthName + ' ' + year ?? "____________"} between <strong>SMT. Rinku Podder</strong> wife of Biswanath Podder, by religion Hindu, by occupation house wife, residing at 369/3614, Mohadev Nagar, Road No-03, Jharpada, BHUBANESWAR-751006 hereinafter referred to as the <strong>LAND OWNER</strong> (which expression shall unless repugnant to the subject or context be deemed to include her heirs, executors, administrators, representative and assigns) of the ONE PART.</p>

        <p><strong>{formData?.tenantName ?? "____________"}</strong> S/O of {formData?.tenantFatherName ?? "____________"}, religion {formData?.tenantReligion ?? "____________"}, occupation {formData?.tenantOccupation ?? "____________"}, residing at {formData?.tenantResiding ?? "____________"}, hereinafter referred to as the <strong>TENANT</strong> (which expression shall unless repugnant to the subject or context be deemed to include his heirs, executors, administrators, representative and assigns) of the OTHER PART.</p>

        <p>Whereas the land owner has agreed to let out the premises No. 369/3614, Mohadev Nagar, Road NO. 03, Jharpada, BHUBANESWAR–751006 (entire Ground floor except stair case room), and the tenant has agreed to take on a monthly lease basis a flat consisting of two bedrooms, two toilets, and one kitchen on the ground floor of the said premises.</p>

        <h3 className="section-title">NOW THIS INDENTURE WITNESSETH AS FOLLOWS:</h3>
        <ul>
          <li>The landlady will let out and the tenant will take on lease basis a flat as described above.</li>
          <li>The rent will be Rs. {formData?.rentAmt ?? "____________"}/- ({formData?.amtinWord ?? "____________"}) per month effective from {day ?? "____________"}<sup>th</sup> {monthName + ' ' + year ?? "____________"}.</li>
          <li>The tenant has paid Rs. {formData?.tenantRefundAmt ?? "____________"}/- as a refundable deposit (no interest), refundable after 11 months upon vacation.</li>
          <li>Tenant must pay rent by the {day ?? "____________"}<sup>th</sup> of each month; non-compliance may lead to termination without notice.</li>
          <li>Tenant will take possession from {day ?? "____________"}<sup>th</sup> {monthName + ' ' + year ?? "____________"}.</li>
          <li>Rent will increase by Rs. {formData?.tenantIncreaseAmt ?? "____________"}/- after 11 months.</li>
          <li>Flat shall only be used for residential purpose.</li>
          <li>Tenant will maintain the flat in good condition at their own cost.</li>
          <li>Tenant is responsible for their own electricity bill.</li>
          <li>Tenant shall not sublet or misuse the demised flat, especially during rainy season.</li>
          <li>No structural changes shall be made without the written consent of the landlady.</li>
          <li>Inflammable or combustible objects allowed except domestic use items in small quantities.</li>
          <li>Three months non-payment of rent may lead to lease termination.</li>
        </ul>

        <div className="signature-section">
          <p>IN WITNESS whereof the parties here to have unto set and subscribed their respective hands...</p>
          <div className="signature-line">
            <div>SIGNATURE OF THE OWNER/LANDLADY</div>
            <div>SIGNATURE OF THE TENANT</div>
          </div>
          <p className="footer">PLACE: BHUBANESWAR<br />DATE: {formData?.agremntMadeOn ?? "__________"}</p>
        </div>
        
        <button
          className="download-btn"
          onClick={handleDownload}
          disabled={!formData}
          style={{
            cursor: !formData ? 'not-allowed' : 'pointer', 
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ViewLeaseAgreement;
