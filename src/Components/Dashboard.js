import React, { useState } from 'react';
import AssessButton from './AssessButton'; // Floating Button Import


export default function Dashboard() {
    const [popupVisible, setPopupVisible] = useState(false);
    const [showDetailsPopup, setShowDetailsPopup] = useState(false); // State for showing details popup
    const [ticketNumber, setTicketNumber] = useState('');
    const [ticketValid, setTicketValid] = useState(true); // Track validity of ticket number
    const [defectDetails, setDefectDetails] = useState({
        id: 'CHART-2300',
        title: 'Bug in Chart Rendering',
        fixVersion: 'v2.1.4',
        resolution: 'Resolved',
        component: 'Frontend',
        labels: ['UI', 'Critical'],
        description: 'There is a bug where the chart does not render correctly when filtered by date range.',
        attachments: [
            { name: 'screenshot1.png', url: '/path/to/screenshot1.png' },
            { name: 'log.txt', url: '/path/to/log.txt' },
        ],
        linkedTickets: ['CHART-2301', 'CHART-2302'],
        // { author: 'John Doe', date: '2025-04-25', text: 'This bug is fixed in the latest commit.' },
        //     { author: 'Jane Smith', date: '2025-04-24', text: 'Reproduced the issue on the staging server.' },
        comments: [
            { author: 'John Doe', date: '2025-04-25', text: 'This bug is fixed in the latest commit.' },
            { author: 'Jane Smith', date: '2025-04-24', text: 'Reproduced the issue on the staging server.' },
        ],
        history: [
            { date: '2025-04-23', action: 'Ticket Created' },
            { date: '2025-04-24', action: 'Assigned to John Doe' },
        ],
    });

    const onCommentSubmit = (newCommentText) => {
        setDefectDetails((prev) => ({
            ...prev,
            comments: [...(prev.comments || []), newCommentText],
        }));
    };
    const onClose = () => {
        setShowDetailsPopup(false);
    }
    const handleSubmitComment = () => {
        const newComment = {
            author: 'John Doe', date: '2025-04-25', text: `
      🛠 **Defect Details** <br>
      • ID: ${defectDetails.id}<br>
      • Title: ${defectDetails.title}<br>
      • Dev: John Doe<br>
      • Design: [Figma Link](#)<br>
      • BA: Jane Doe<br>
      • QA Test Cases: [Test Link](#)<br>
      • QA: Alan Tester<br>
      <br>
      🔁 **Duplicate Suggestions**<br>
      • CHART-2201 (Release 1)<br>
      • CHART-2290 (Sprint 3)<br>
      <br>
      ✅ **Previous Fix**<br>
      • CHART-2250<br>
      • Merge Request: [MR-1234](#)<br>
      <br>
      📎 **Assessment Note**<br>
      This defect is ready for assessment. Can be re-routed to relevant team or marked for RFT.<br>
      `
        };
        // const newComment = 
        if (onCommentSubmit) {
            onCommentSubmit(newComment);
        }
        onClose();
    };


    const handleAssessClick = () => {
        setPopupVisible(true); // Show the popup when the button is clicked
    };

    const handlePopupSubmit = () => {
        // Validate the ticket number (example validation)
        const ticketPattern = /^[A-Z]+-\d{4}$/; // Example regex for TMS/Jira-like ticket numbers
        if (ticketPattern.test(ticketNumber)) {
            setTicketValid(true);
            // After validation, show the detailed defect info popup
            setShowDetailsPopup(true);
            setPopupVisible(false); // Close the ticket number input popup
        } else {
            setTicketValid(false); // Mark the ticket as invalid
        }
    };

    const handleClose = () => {
        setPopupVisible(false); // Close the ticket number input popup without submission
    };

    const handleDetailsPopupClose = () => {
        setShowDetailsPopup(false); // Close the defect details popup
    };

    return (
        <div className="main-container">
            <header className="header">TMS Defect Details</header>

            <div className="sidebar">
                <h4>By <br/> Babu Miya Mohammad & Team</h4>
                {/* <a href="#ticket-details">Ticket Details</a>
                <a href="#comments">Comments</a>
                <a href="#attachments">Attachments</a> */}
            </div>

            <div className="content">
                <h2>{defectDetails.title}</h2>
                <p><strong>Ticket ID:</strong> {defectDetails.id}</p>
                <p><strong>Fix Version:</strong> {defectDetails.fixVersion}</p>
                <p><strong>Resolution:</strong> {defectDetails.resolution}</p>
                <p><strong>Component:</strong> {defectDetails.component}</p>
                <p><strong>Labels:</strong> {defectDetails.labels.join(', ')}</p>
                <p><strong>Description:</strong> {defectDetails.description}</p>

                <h3>Attachments</h3>
                <ul>
                    {defectDetails.attachments.map((attachment, index) => (
                        <li key={index}><a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.name}</a></li>
                    ))}
                </ul>

                <h3>Linked Tickets</h3>
                <ul>
                    {defectDetails.linkedTickets.map((ticket, index) => (
                        <li key={index}>{ticket}</li>
                    ))}
                </ul>

                <h3>Comments</h3>
                {defectDetails.comments.map((comment, index) => (
                    <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
                        <p><strong>{comment.author} ({comment.date}):</strong></p>
                        {/* <p dangerouslySetInnerHTML={comment.text}></p> */}
                        <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
                    </div>
                ))}
                {/* <div className="comments-section">
                    <h3>Defect Comments</h3>
                    {defectDetails.comments.length === 0 ? (
                        <p>No comments yet.</p>
                    ) : (
                        defectDetails.comments.map((cmt, index) => (
                            <div key={index} className="comment-box">
                                <pre>{cmt}</pre>
                            </div>
                        ))
                    )}
                </div> */}

                <h3>History</h3>
                <ul>
                    {defectDetails.history.map((historyItem, index) => (
                        <li key={index}>{historyItem.date}: {historyItem.action}</li>
                    ))}
                </ul>
            </div>

            {/* Floating Button for Assess */}
            <AssessButton onClick={handleAssessClick} />

            {/* Popup for Defect Number Input */}
            {popupVisible && (
                <div className="popup">
                    <span className="close" onClick={handleClose}>&times;</span>
                    <h2>Enter Ticket Number</h2>
                    <input
                        type="text"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        placeholder="e.g. CHART-2300"
                        style={{ borderColor: ticketValid ? '#ddd' : 'red' }}
                    />
                    {!ticketValid && <p style={{ color: 'red' }}>Please enter a valid ticket number (e.g., CHART-2300)</p>}
                    <br />
                    <button onClick={handlePopupSubmit}>Submit</button>
                </div>
            )}

            {/* Detailed Defect Information Popup */}
            {showDetailsPopup && (
                <div className="popup-overlay">
                    <div className="popup-modal">
                        <span className="close" onClick={handleDetailsPopupClose}>&times;</span>
                        <h2>Defect Details: {defectDetails.id}</h2>

                        <h3>Initial Story Implemented</h3>
                        <p><strong>Dev Name:</strong> John Doe</p>
                        <p><strong>Design Link:</strong> <a href="#">Design Document</a></p>
                        <p><strong>BA Name:</strong> Jane Doe</p>
                        <p><strong>QA Test Cases:</strong> <a href="#">Test Cases</a></p>
                        <p><strong>QA Name:</strong> John Smith</p>

                        <h3>Duplicate Defect Suggestions</h3>
                        <ul>
                            <li>CHART-2299 (Different Sprint)</li>
                            <li>CHART-2301 (Different Release)</li>
                        </ul>

                        <h3>Previous Fixed Defect and MR</h3>
                        <p><strong>Fixed Defect:</strong> CHART-2250</p>
                        <p><strong>Merge Request:</strong> <a href="#">MR-1234</a></p>

                        <h3>Additional Information</h3>
                        <p>This defect is ready to be assessed and can be assigned to other teams if necessary.</p>

                        {/* <h3>Comments</h3>
                        <textarea placeholder="Add your comment here..."></textarea> */}
                        <button onClick={handleSubmitComment}>Submit Comment</button>
                    </div>
                </div>
            )}

        </div>
    );
}
