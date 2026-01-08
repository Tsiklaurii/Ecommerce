import { Home, About, Cart, CheckOut, Contact, Favorites, Gallery, Product, Search } from '../pages';

export const routes = [
    {
        path: "/",
        element: <Home />
    },
    // {
    //     path: "/:lang",
    //     element: <Home />
    // },
    {
        path: "/:lang/",
        element: <Home />
    },
    {
        path: "/:lang/about",
        element: <About />
    },
    {
        path: "*",
        element: <Home />
    },
]