import React from 'react';
import Logo from '../../Components/Logo/Logo';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth'
import Swal from 'sweetalert2';
import { FaRegMoon, FaSun, FaUserCircle } from 'react-icons/fa';
const Navbar = () => {

  const { user,signOutUser } = useAuth();



const links = (
  <>
    <NavLink
      to="/"
      className={({ isActive }) =>
        `m-2 ${isActive ? "border-b-2 border-blue-500 font-semibold" : ""}`
      }
    >
      Home
    </NavLink>

    <NavLink
      to="/tuitions"
      className={({ isActive }) =>
        `m-2 ${isActive ? "border-b-2 border-blue-500 font-semibold" : ""}`
      }
    >
      Tuitions
    </NavLink>

    <NavLink
      to="/tutors"
      className={({ isActive }) =>
        `m-2 ${isActive ? "border-b-2 border-blue-500 font-semibold" : ""}`
      }
    >
      Tutors
    </NavLink>

    <NavLink
      to="/about"
      className={({ isActive }) =>
        `m-2 ${isActive ? "border-b-2 border-blue-500 font-semibold" : ""}`
      }
    >
      About
    </NavLink>

    <NavLink
      to="/contact"
      className={({ isActive }) =>
        `m-2 ${isActive ? "border-b-2 border-blue-500 font-semibold" : ""}`
      }
    >
      Contact
    </NavLink>

    <NavLink
      to="/dashboard"
      className={({ isActive }) =>
        `m-2 ${isActive ? "border-b-2 border-blue-500 font-semibold" : ""}`
      }
    >
      Dashboard
    </NavLink>
  </>
);

const navigate = useNavigate();

const handleSignOut = ()=>{
  signOutUser()
  .then( ()=>{
    Swal.fire({
  title: "Logged Out!",
  text: "You have been logged out successfully!",
  icon: "success"
});
    navigate('/login')
  })
}

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl"><Logo></Logo></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller " value="dark" />
          <span className="swap-off m-2"><FaSun /></span>
          <span className="swap-on m-2"><FaRegMoon /></span>
        </label>

       {
  user ? (
    <div className="flex items-center gap-2">
   
      <div className="avatar">
        <div className="w-8 rounded-full ">
          <img
            src={user.photoURL || <FaUserCircle />}
            alt={user.displayName || "User"}
          />
        </div>
      </div>


      <button
        onClick={handleSignOut}
        className="btn btn-primary btn-sm rounded-full"
      >
        Sign Out
      </button>
    </div>
  ) : (
    <button className="btn btn-outline btn-primary btn-sm rounded-full">
      <NavLink to="/login">Login</NavLink> /
      <NavLink to="/register">Register</NavLink>
    </button>
  )
}


      </div>
    </div>
  );
};

export default Navbar;