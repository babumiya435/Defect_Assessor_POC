import React, { useState } from 'react';

function AssessPopup({ onClose, onSubmit }) {
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = () => {
    const pattern = /^[A-Z]+-\d+$/;  // Validate like CHART-2300
    if (pattern.test(ticketId.trim())) {
      onSubmit(ticketId.trim());
    } else {
      alert('Invalid Defect ID! Must be like CHART-2300');
    }
  };

  return (
    <div style={popupStyle}>
      <h3>Enter TMS/JIRA Ticket Number</h3>
      <input
        type="text"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        placeholder="Ex: CHART-2300"
        style={{ padding: '8px', margin: '10px 0', width: '100%' }}
      />
      <div>
        <button onClick={handleSubmit} style={btnStyle}>Submit</button>
        <button onClick={onClose} style={{ ...btnStyle, backgroundColor: '#aaa' }}>Cancel</button>
      </div>
    </div>
  );
}

const popupStyle = {
  position: 'fixed',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  zIndex: 1000,
  width: '300px',
  textAlign: 'center'
};

const btnStyle = {
  padding: '8px 15px',
  margin: '10px 5px',
  border: 'none',
  backgroundColor: '#1976d2',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AssessPopup;
