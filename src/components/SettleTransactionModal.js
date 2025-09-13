import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const SettleTransactionModal = ({ isOpen, onRequestClose, onSettleTransaction, customer }) => {
    const [type, setType] = useState('add');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (isOpen && customer) {
            setAmount('');
        }
    }, [isOpen, customer]);

    const handleSubmit = () => {
        const transactionAmount = parseFloat(amount);
        if (isNaN(transactionAmount) || transactionAmount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }
        const updatedBalance = type === 'add'
            ? customer.balance + transactionAmount
            : customer.balance - transactionAmount;
        
        const updatedCustomer = { ...customer, balance: updatedBalance };
        onSettleTransaction(updatedCustomer);
        onRequestClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            className="bg-white p-6 rounded shadow-md w-96 mx-auto mt-20"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
        >
            <h2 className="text-xl font-bold mb-4">Settle Transaction for {customer?.name}</h2>
            <div className="mb-4">
                <label className="block mb-2">Transaction Type:</label>
                <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    className="border border-gray-300 p-2 w-full rounded"
                >
                    <option value="add">Add</option>
                    <option value="subtract">Subtract</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Amount:</label>
                <input 
                    type="text" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    className="border border-gray-300 p-2 w-full rounded"
                />
            </div>
            <div className="flex justify-end">
                <button onClick={onRequestClose} className="mr-4 bg-gray-500 text-white p-2 rounded">Cancel</button>
                <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </div>
        </Modal>
    );
};

export default SettleTransactionModal;
