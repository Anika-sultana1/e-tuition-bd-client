import { createBrowserRouter } from "react-router";
import App from "../App";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import Tuitions from "../Pages/Tuitions/Tuitions";
import AllTutors from "../Pages/Tutors/AllTutors/AllTutors";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
  
]);