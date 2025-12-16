import React from 'react';
import { Link } from 'react-router';
import { XCircle } from 'lucide-react';

const PaymentCanceled = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-red-50 to-red-100 px-6">
           <title>eTuitionBd-Dashboard-PaymentCancelled</title> 
            <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
                
                <XCircle className="mx-auto text-red-500" size={80} />

                <h3 className="text-3xl font-bold mt-4 text-red-600">
                    Payment Cancelled
                </h3>

                <p className="text-gray-600 mt-2 mb-6">
                    Your payment could not be completed.  
                    You can try again anytime.
                </p>

                <Link to="../myTuitions">
                    <button className="btn btn-error text-white w-full">
                        Try Again
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default PaymentCanceled;
