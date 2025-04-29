import React from 'react';

function AssessmentDetailsPopup({ ticketId, onClose }) {

  // Fake data (you can later pull real API)
  const defectInfo = {
    initialStory: {
      devName: 'John Doe',
      designLink: 'https://designlink.com/story123',
      baName: 'Jane Smith',
      qaName: 'Michael Johnson',
      qaTestCases: 'https://qacases.com/testcase123',
    },
    duplicateDefects: ['CHART-2100', 'CHART-2200'],
    previousFixes: [
      { defectId: 'CHART-1800', mrLink: 'https://gitrepo.com/mr123' }
    ],
  };

  const structuredComment = `
Defect Assessment for ${ticketId}:

Initial Story Implemented:
- Developer: ${defectInfo.initialStory.devName}
- Design Link: ${defectInfo.initialStory.designLink}
- BA Name: ${defectInfo.initialStory.baName}
- QA Name: ${defectInfo.initialStory.qaName}
- QA Test Cases: ${defectInfo.initialStory.qaTestCases}

Duplicate Defect Suggestions:
${defectInfo.duplicateDefects.map(id => `- ${id}`).join('\n')}

Previous Fixed Defects:
${defectInfo.previousFixes.map(fix => `- ${fix.defectId} (MR: ${fix.mrLink})`).join('\n')}

Assessment Completed.
`;

  return (
    <div style={popupStyle}>
      <h3>Assessment Details for {ticketId}</h3>

      <div style={{ textAlign: 'left', marginTop: '15px' }}>
        <strong>Initial Story:</strong>
        <ul>
          <li>Dev Name: {defectInfo.initialStory.devName}</li>
          <li>Design Link: <a href={defectInfo.initialStory.designLink} target="_blank" rel="noopener noreferrer">View</a></li>
          <li>BA Name: {defectInfo.initialStory.baName}</li>
          <li>QA Name: {defectInfo.initialStory.qaName}</li>
          <li>QA Test Cases: <a href={defectInfo.initialStory.qaTestCases} target="_blank" rel="noopener noreferrer">View</a></li>
        </ul>

        <strong>Duplicate Defect Suggestions:</strong>
        <ul>
          {defectInfo.duplicateDefects.map(id => <li key={id}>{id}</li>)}
        </ul>

        <strong>Previous Fixed Defects:</strong>
        <ul>
          {defectInfo.previousFixes.map(fix => (
            <li key={fix.defectId}>
              {fix.defectId} (<a href={fix.mrLink} target="_blank" rel="noopener noreferrer">MR Link</a>)
            </li>
          ))}
        </ul>

        <strong>Structured Comment:</strong>
        <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
          {structuredComment}
        </pre>
      </div>

      <button onClick={onClose} style={btnStyle}>Close</button>
    </div>
  );
}

const popupStyle = {
  position: 'fixed',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  zIndex: 1000,
  width: '500px',
  maxHeight: '80vh',
  overflowY: 'auto',
  textAlign: 'center'
};

const btnStyle = {
  marginTop: '20px',
  padding: '8px 15px',
  border: 'none',
  backgroundColor: '#1976d2',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AssessmentDetailsPopup;
