import React from 'react';
import logo from '../../assets/Logo.png'

const Logo = () => {
    return (
        <div className='flex justify-center items-center'>
            <img className='w-[21px] h-[21px] m-2' src={logo} alt="" />
            <h2>TUITION BD</h2>
        </div>
    );
};

export default Logo;