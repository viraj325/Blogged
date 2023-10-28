import {useNavigate} from "react-router-dom"

export default function Main() {
    let navigate = useNavigate()

    return (
        <div>
            <button onClick={() => {
                navigate('/editor')
            }}>Editor</button>
        </div>
    )
}