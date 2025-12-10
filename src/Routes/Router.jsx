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
import UpdateTuitions from "../Pages/StudentDashboard/UpdateTuitions";
import BeATutor from "../Pages/BeATutor/BeATutor";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import TutorRoutes from "./TutorRoutes";
import MyApplications from "../Pages/TutorDashboard/MyApplications";
import OngoingTuitions from "../Pages/TutorDashboard/OngoingTuitions";
import RevenueHistory from "../Pages/TutorDashboard/RevenueHistory";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement:<ErrorPage></ErrorPage>,
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
        },
        {
            path:'/beATutor',
            Component:BeATutor,
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
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
      },
      {
        path:'myTuitions',
        element:<PrivateRoutes><MyTuitions></MyTuitions></PrivateRoutes>
      },
      {
        path: 'postTuition',
       element:<PrivateRoutes><PostTuition></PostTuition></PrivateRoutes>
      },
      {
        path: 'updateTuition/:id',
       element:<PrivateRoutes><UpdateTuitions></UpdateTuitions></PrivateRoutes>,
      },
      {
        path:'appliedTutors',
        element:<PrivateRoutes><AppliedTutors></AppliedTutors></PrivateRoutes>

      },
      {
        path:'payment-success',
        element:<PrivateRoutes><PaymentSuccess></PaymentSuccess></PrivateRoutes>
      },
      {
        path:'payment-cancelled',
        element:<PrivateRoutes><PaymentCanceled></PaymentCanceled></PrivateRoutes>
      },
      {
        path:'payments',
        element:<PrivateRoutes><Payments></Payments></PrivateRoutes>
      }
      ,
      {
        path:'profile-settings',
        element:<PrivateRoutes><ProfileSettings></ProfileSettings></PrivateRoutes>
      },
      {
        path:'my-applications',
        element:<TutorRoutes><MyApplications></MyApplications></TutorRoutes>
      },
      {
        path:'ongoing-tuitions',
        element:<TutorRoutes><OngoingTuitions></OngoingTuitions></TutorRoutes>
      },
      {
        path:'revenue-history',
        element:<TutorRoutes><RevenueHistory></RevenueHistory></TutorRoutes>
      }
    ]
  }
  
]);