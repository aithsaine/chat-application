import { createBrowserRouter } from "react-router-dom";
import GestLayout from "../layouts/GestLayout";
import Home from "../pages/Gest/home";
import Login from "../pages/Gest/login";
import Register from "../pages/Gest/register";

const router = createBrowserRouter([
    {
        path: "/",
        element: GestLayout(),
        children: [
            {
                path: "/",
                element: Home()
            },
            {
                path: "/login",
                element: Login()
            },
            {
                path: "/register",
                element: Register()
            }
        ]
    }
]);
export default router;