import React, { useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import '../Styles/AddLeaseAgreementStyle.css';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
// import Navbar from './Navbar.jsx'; 

const AddLeaseAgreement = () => {
    const inputRef = useRef();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        agremntMadeOn: null,
        effectiveFromDate: null,
        tenantName: '',
        tenantFatherName: '',
        tenantReligion: '',
        tenantOccupation: '',
        tenantAllowFloor: '',
        tenantRoomConsist: '',
        tenantResiding: '',
        rentAmt: '',
        amtinWord: '',
        tenantRefundAmt: '',
        tenantIncreaseAmt: ''
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* const requiredFields = [
      'Tenant Name', 'Tenant Father Name', 'Tenant Religion', 'Tenant Occupation',
      'Tenant Allow Floor', 'Tenant Room Consist', 'Tenant Residing',
      'Rent Amount', 'Write in words', 'Tenant Refund Amount', 'Tenant IncreaseAmount'
    ];  */

    if (!formData.agremntMadeOn) {
      alert('Please select AGREEMENT Made On date.');
      return;
    }

    /* for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the "${field}" field.`);
        return;
      }
    }  */
    
    if (!formData.effectiveFromDate) {
      alert('Please select Effective From Date.');
      return;
    }

    const formattedData = {
      ...formData,
      agremntMadeOn: formData.agremntMadeOn.toLocaleDateString('en-GB'),
      effectiveFromDate: formData.effectiveFromDate.toLocaleDateString('en-GB')
    };

    // console.log('Form Submitted:', formattedData);
    navigate('/view', { state: formattedData });
  };

  const handleReset = () => { 
    inputRef.current.focus();
  }

  return (
    <div className="page-content">
      
    <div className="form-wrapper">
      <h2>Dynamic House Agrement Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="agremntMadeOn">AGREEMENT Made On ?<span style={{ color: "red" }}> *</span></label>
        <DatePicker
          selected={formData.agremntMadeOn}
          onChange={(date) => handleDateChange('agremntMadeOn', date)}
          dateFormat="dd-MM-yyyy"
          placeholderText="Select a date"
          className="date-input"
          name="agremntMadeOn"
          
        />

        <label htmlFor="tenantName">Name of the Tenant<span style={{ color: "red" }}> *</span></label>
        <input type="text" name="tenantName" placeholder="Enter your Tenant Name" ref={inputRef} onChange={handleChange} />

        <label htmlFor="tenantFatherName">S/o or D/o. (Father’s Name)<span style={{ color: "red" }}> *</span></label>
        <input type="text" name="tenantFatherName" placeholder="Enter Father Name" onChange={handleChange} />

        <label htmlFor="tenantReligion">Religion<span style={{ color: "red" }}> *</span></label>
        <select name="tenantReligion" onChange={handleChange}>
          <option value="">-- Select --</option>
          <option value="Hindu">Hindu</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
        </select>

        <label htmlFor="tenantOccupation">Tenant Occupation<span style={{ color: "red" }}> *</span></label>
        <input type="text" name="tenantOccupation" placeholder="Tenant Occupation" onChange={handleChange} />

        <label htmlFor="tenantAllowFloor">Allowed Floors<span style={{ color: "red" }}> *</span></label>
        <input type="text" name="tenantAllowFloor" placeholder="Tenant Allowed Floors" onChange={handleChange} />

        <label htmlFor="tenantRoomConsist">Room's Consisting Of<span style={{ color: "red" }}> *</span></label>
        <input type="text" name="tenantRoomConsist" placeholder="Tenant room Consisting of" onChange={handleChange} />

        <label htmlFor="tenantResiding">Tenant Residing At<span style={{ color: "red" }}> *</span></label>
        <textarea name="tenantResiding" rows="6" placeholder="Enter Residing Address" onChange={handleChange}></textarea>

        <hr />
        <h2>INDENTURE WITNESSETH AS FOLLOWS FORM</h2>

        <label htmlFor="effectiveFromDate">Effective From Date<span style={{ color: "red" }}> *</span></label>
        <DatePicker
          selected={formData.effectiveFromDate}
          onChange={(date) => handleDateChange('effectiveFromDate', date)}
          dateFormat="dd-MM-yyyy"
          placeholderText="Select a date"
          className="date-input"
          name="effectiveFromDate"
        />

        <label htmlFor="rentAmt">Rent Amount<span style={{ color: "red" }}> *</span></label>
        <input type="text" name="rentAmt" placeholder="Tenant Rent Amount" onChange={handleChange} />

        <label htmlFor="amtinWord">Amount In Word<span style={{ color: "red" }}> *</span></label>
        <input type="text" name="amtinWord" placeholder="Amount In Word" onChange={handleChange} />

        <label htmlFor="tenantRefundAmt">Tenant Refundable Amount (2 Months)<span style={{ color: "red" }}> *</span></label>
        <input type="text" name="tenantRefundAmt" placeholder="Tenant Refundable Amount" onChange={handleChange} />

        <label htmlFor="tenantIncreaseAmt">Rent Increase After (11 months)<span style={{ color: "red" }}> *</span></label>
        <input type="text" name="tenantIncreaseAmt" placeholder="Tenant Increase Amount" onChange={handleChange} />

        <div className="button-group">
            <button type="submit" className="submit-btn">Submit Application</button>
            <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>

      </form>
    </div>
    </div>
  );
};

export default AddLeaseAgreement;
