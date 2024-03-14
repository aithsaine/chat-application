import { createBrowserRouter } from "react-router-dom";
import GestLayout from "../layouts/GestLayout";
import Home from "../pages/Gest/home";
import Login from "../pages/Gest/login";
import Register from "../pages/Gest/register";

const router = createBrowserRouter([
    {
        path: "/",
        Component: GestLayout,
        children: [
            {
                path: "/",
                Component: Home
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            }
        ]
    }
]);
export default router;