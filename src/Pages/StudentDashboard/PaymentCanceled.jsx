import React from 'react';
import { Link } from 'react-router';

const PaymentCanceled = () => {
    return (
        <div>
            <h3 className='text-4xl font-semibold'>Your Payment is Cancelled</h3>
            <Link to='../myTuitions'><button className='btn btn-primary'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCanceled;