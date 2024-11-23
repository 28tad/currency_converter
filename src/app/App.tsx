import { Route, Routes } from "react-router-dom";
import { RatesPageAsync as RatesPage } from "../pages/Rates/RatesPage.async";
import { ConvertPage } from "../pages/Convert/ConvertPage";
import AppRouter from "./router/AppRouter";

const App = () => {
    return (
        <div className="app">
            <AppRouter />
        </div>
    )
}

export default App;