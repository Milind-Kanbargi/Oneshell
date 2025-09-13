import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddCustomerModal = ({ isOpen, onRequestClose, onAddCustomer, customerToEdit }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [balance, setBalance] = useState('');
    const [isReceivable, setIsReceivable] = useState(true);
    const [errors, setErrors] = useState({ name: '', phone: '', balance: '' });

    useEffect(() => {
        if (isOpen && customerToEdit) {
            setName(customerToEdit.name);
            setPhone(customerToEdit.phone);
            setBalance(Math.abs(customerToEdit.balance).toString());
            setIsReceivable(customerToEdit.balance > 0);
        } else {
            setName('');
            setPhone('');
            setBalance('');
            setIsReceivable(true);
            setErrors({ name: '', phone: '', balance: '' });
        }
    }, [isOpen, customerToEdit]);

    const validateFields = () => {
        const newErrors = { name: '', phone: '', balance: '' };
        let isValid = true;

        if (name.trim() === '') {
            newErrors.name = 'Name is required.';
            isValid = false;
        }

        if (phone.trim() === '' || !/^\d+$/.test(phone)) {
            newErrors.phone = 'Valid phone number is required.';
            isValid = false;
        }

        if (balance.trim() === '' || isNaN(parseFloat(balance))) {
            newErrors.balance = 'Valid balance is required.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (!validateFields()) return;

        const balanceValue = isReceivable ? parseFloat(balance) : -parseFloat(balance);
        const updatedCustomer = { name, phone, balance: balanceValue };
        
        if (customerToEdit) {
            onAddCustomer({ ...customerToEdit, ...updatedCustomer }); 
        } else {
            onAddCustomer(updatedCustomer); 
        }
        
        onRequestClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            className="bg-white p-6 rounded shadow-md w-96 mx-auto mt-20"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
        >
            <h2 className="text-xl font-bold mb-4">{customerToEdit ? 'Edit Customer' : 'Add Customer'}</h2>
            <div className="mb-4">
                <label className="block mb-2">Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-2">Phone No:</label>
                <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-2">Balance:</label>
                <input 
                    type="text" 
                    value={balance} 
                    onChange={(e) => setBalance(e.target.value)} 
                    className={`border ${errors.balance ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                />
                {errors.balance && <p className="text-red-500 text-sm">{errors.balance}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-2">Balance Type:</label>
                <div>
                    <label className="mr-4">
                        <input 
                            type="radio" 
                            checked={isReceivable} 
                            onChange={() => setIsReceivable(true)} 
                            className="mr-1"
                        />
                        Receivable
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            checked={!isReceivable} 
                            onChange={() => setIsReceivable(false)} 
                            className="mr-1"
                        />
                        Payable
                    </label>
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={onRequestClose} className="mr-4 bg-gray-500 text-white p-2 rounded">Cancel</button>
                <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">{customerToEdit ? 'Update' : 'Add'}</button>
            </div>
        </Modal>
    );
};

export default AddCustomerModal;
