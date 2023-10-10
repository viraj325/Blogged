import {BrowserRouter, Route, Routes} from "react-router-dom"
import Main from "./Main"
import App from "./App"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/editor" element={<App/>}/>
            </Routes>
        </BrowserRouter>
    )
}