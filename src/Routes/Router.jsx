import { createBrowserRouter } from "react-router";
import App from "../App";
import RootLayout from "../Pages/Layout/RootLayout/Root";
import Home from "../Pages/Home/Home";
import Tuitions from "../Pages/Tuitions/Tuitions";
import AllTutors from "../Pages/Tutors/AllTutors/AllTutors";
import Register from "../Pages/Layout/AuthLayout/Register/Register";
import Login from '../Pages/Layout/AuthLayout/Login/Login'

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index:true,
            Component: Home,
        },
        {
            path:'/tuitions',
            Component:Tuitions,
        },
        {
            path:'/tutors',
            Component:AllTutors,
        }
    ]
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/login',
    Component: Login,
  }
  
]);