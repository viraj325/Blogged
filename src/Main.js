import {BrowserView, MobileView} from "react-device-detect"
import {retrieveAllFirebaseDocs} from "./FirebaseActions"
import {useNavigate} from "react-router-dom"
import {MdAdd, MdSearch} from "react-icons/md"
import React, {useEffect, useState} from "react"
import './App.css'
import './Main.css'

export default function Main() {
    const [docs, setDocs] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        retrieveAllFirebaseDocs((r => {
            setDocs(r)
        })).then(r => console.log(r))
    }, [])

    return (
        <div>
            <BrowserView>
                <h5>This is rendered only in browser</h5>
                <button className="action-button" title="New Post" onClick={() => {
                    navigate('/editor/new/test')
                }}><MdAdd/></button>
                <button className="action-button" title="Search" onClick={() => {
                    console.log('Search clicked')
                }}><MdSearch/></button>
            </BrowserView>

            <MobileView>
                <div>
                    <h5>This is rendered only on mobile</h5>
                    {
                        docs.map((doc, index) => {
                            return (
                                <div key={index}>
                                    <h3>{doc.title}</h3>
                                    <p>{doc.overview}</p>
                                </div>
                            )
                        })
                    }
                    <button className="action-button" title="New Post" onClick={() => {
                        navigate('/editor/new/test')
                    }}><MdAdd/></button>
                    <button className="action-button" title="Search" onClick={() => {
                        console.log('Search clicked')
                    }}><MdSearch/></button>
                </div>
            </MobileView>
        </div>
    )
}