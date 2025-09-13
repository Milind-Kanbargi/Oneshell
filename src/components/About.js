import React from 'react';
import logo from './logo.png'; 

const About = () => {
    return (
        <div className="container mx-6 p-4 w-full">
            <h1 className="text-6xl font-AVENIR-L mb-4">
                About <span className="text-red-500">
                    <img src={logo} alt="logo" className="inline w-14 h-14 mb-3" />ne Shell,
                </span>
            </h1>
            <p className="mb-4 text-lg text-justify mr-16 font-AVENIR-L">
                One Shell is a comprehensive customer management system designed to help businesses keep track of their customer interactions and financial transactions. Our application provides an easy-to-use interface for managing customer data, including contact details, balances, and transaction history.
            </p>
            <p className="mb-4 text-lg text-justify font-AVENIR-M">
                The application allows you to:
            </p>
            <ul className="list-disc list-inside mb-4 text-lg font-AVENIR-L text-justify">
                <li className="mb-2">View and manage customer information, including their balance and transaction history.</li>
                <li className="mb-2">Add new customers and update existing customer details.</li>
                <li className="mb-2">Filter and search through customer data based on various criteria.</li>
                <li className="mb-2">View summarized information on payables, receivables, and overall balance.</li>
            </ul>
            <p className="mb-4 text-lg text-justify font-AVENIR-L mr-16">
                Our goal is to streamline the process of managing customer data and provide businesses with the tools they need to maintain strong relationships with their customers. Whether you are a small business owner or part of a larger organization, One Shell is here to help you keep your customer data organized and accessible.
            </p>
            <p className="text-lg text-justify font-AVENIR-L mr-16">
                If you have any questions or feedback, please feel free to reach out to our support team. We are always here to help!
            </p>
        </div>
    );
};

export default About;
