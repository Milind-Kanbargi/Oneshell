import React from 'react';

const Summary = ({ totalPayables, totalReceivables, totalBalance }) => {
    return (
        <div className="flex space-x-4 md:pr-12 my-4">
            <div className="flex flex-col items-center text-red-600 text-lg md:text-2xl lg:text-4xl xl:text-5xl px-2 font-AVENIR-H">
                {totalPayables.toLocaleString('en-IN')}
                <div className="text-xs md:text-sm font-normal font-AVENIR-H">Payables</div>
            </div>
            <div className="flex flex-col items-center text-green-600 text-lg md:text-2xl lg:text-4xl xl:text-5xl px-3 font-AVENIR-H">
                {totalReceivables.toLocaleString('en-IN')}
                <div className="text-xs md:text-sm font-normal font-AVENIR-H">Receivables</div>
            </div>
            <div className="flex flex-col items-center text-blue-600 text-lg md:text-2xl lg:text-4xl xl:text-5xl px-2 font-AVENIR-H">
                {totalBalance.toLocaleString('en-IN')}
                <div className="text-xs md:text-sm font-normal font-AVENIR-H">Balance</div>
            </div>
        </div>
    );
};

export default Summary;
