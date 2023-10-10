import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Main from "./Main"
import App from "./App"

export default function AppRouter() {
    return (
        <Router basename="/main">
            <Routes>
                <Route path={"/editor"} component={App}/>
                <Route path={"/"} component={Main}/>
            </Routes>
        </Router>
    )
}