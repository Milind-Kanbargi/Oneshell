import React, { useState } from 'react';
import logo from './support.png'; // Adjust the path to your logo image

const Support = () => {
    const [issue, setIssue] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!issue) {
            setMessage('Please describe your issue.');
            return;
        }

        try {
            const response = await fetch('https://formspree.io/f/myzgkyng', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'User',
                    email: 'user@example.com',
                    message: issue,
                }),
            });

            if (response.ok) {
                setMessage('Your issue has been submitted successfully.');
                setIssue('');
            } else {
                setMessage('Failed to submit your issue. Please try again later.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-7xl font-AVENIR-L mb-2 mx-4">
                Supp<img src={logo} alt="logo" className="inline w-10 h-10" />rt
            </h1>
            <p className="mb-2 mx-8 text-lg">
                If you encounter any issues or have concerns regarding our service, we're here to assist you. Please don't hesitate to reach out to us for support. Simply describe the problem or question you have in detail, and our dedicated support team will be happy to help you resolve it as quickly as possible.
            </p>
            <ul className="list-disc list-inside mb-2 mx-8 text-lg text-justify">
                <li className="mb-2">Feedback: Share suggestions to help us improve.</li>
                <li className="mb-2">Privacy: Your information is handled with confidentiality.</li>
                <li className="mb-2">Follow-Up: We’ll follow up to ensure satisfaction.</li>
                <li className="mb-2">Quick Response: Expect a reply within 24 hours.</li>
            </ul>
            <form onSubmit={handleSubmit} className="bg-white p-2 mx-6 rounded shadow">
                <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    rows="6"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Describe your issue..."
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Submit
                </button>
                {message && <p className="mt-4">{message}</p>}
            </form>
        </div>
    );
};

export default Support;
