import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Store from "./store/store.js";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthPage from "./components/Auth/AuthPage.jsx";
import Registration from "./components/Registration/Registration.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import History from "./components/History/History.jsx";
import Settings from "./components/Settings/Settings.jsx";

const store = new Store();
export const Context = createContext({
    store,
})

const router = createBrowserRouter([
    {
        path:"/",
        element: <AuthPage />
    },
    {
        path:"/registration",
        element: <Registration />,
    },
    {
        path:"/main",
        element: <MainPage />
    },
    {
        path:"/history",
        element: <History />
    },
    {
        path:"/settings",
        element: <Settings />
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <Context.Provider value={{store, router}}>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    </Context.Provider>
)
