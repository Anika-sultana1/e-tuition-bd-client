import { createBrowserRouter } from "react-router";
import App from "../App";
import RootLayout from "../Pages/Layout/RootLayout/Root";
import Home from "../Pages/Home/Home";
import Tuitions from "../Pages/Tuitions/Tuitions";
import AllTutors from "../Pages/Tutors/AllTutors/AllTutors";
import Register from "../Pages/Layout/AuthLayout/Register/Register";
import Login from '../Pages/Layout/AuthLayout/Login/Login'
import DashboardLayout from "../Pages/Layout/DashboardLayout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyTuitions from "../Pages/StudentDashboard/MyTuitions";
import PostTuition from "../Pages/StudentDashboard/PostTuition";
import AppliedTutors from "../Pages/StudentDashboard/AppliedTutors";
import Payments from "../Pages/StudentDashboard/Payments";
import ProfileSettings from "../Pages/StudentDashboard/ProfileSettings";
import PaymentCanceled from "../Pages/StudentDashboard/PaymentCanceled";
import PaymentSuccess from "../Pages/StudentDashboard/PaymentSuccess";

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
  },
  {
    path: '/dashboard',
    Component:DashboardLayout,
    children:[
      {
        index:true,
        Component:Dashboard,
      },
      {
        path:'myTuitions',
        Component: MyTuitions,
      },
      {
        path: 'postTuition',
        Component:PostTuition,
      },
      {
        path:'appliedTutors',
        Component: AppliedTutors,

      },
      {
        path:'payment-success',
        Component: PaymentSuccess,
      },
      {
        path:'payment-cancelled',
        Component: PaymentCanceled,
      },
      {
        path:'payments',
        Component: Payments,
      }
      ,
      {
        path:'profile-settings',
        Component: ProfileSettings,
      }
    ]
  }
  
]);