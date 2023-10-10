import { initializeApp } from "firebase/app"
import { Editor } from "./Editor"
import './App.css'

const firebaseConfig = {
  apiKey: "AIzaSyDfWBs9pSniOs12bns86pjgLMurnZubKGE",
  authDomain: "singledb-8237b.firebaseapp.com",
  databaseURL: "https://singledb-8237b-default-rtdb.firebaseio.com",
  projectId: "singledb-8237b",
  storageBucket: "singledb-8237b.appspot.com",
  messagingSenderId: "874166345760",
  appId: "1:874166345760:web:3a8997e45acfe5ae74dc45",
  measurementId: "G-2NWBBP9VLV"
}

initializeApp(firebaseConfig)

function App() {
  return (
    <div>
      <Editor/>
    </div>
  )
}

export default App