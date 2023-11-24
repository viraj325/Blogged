import {getStorage, ref, uploadBytes} from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid'

export function uploadDocToFirebase(data, callback) {
    const file = new Blob([data], {type: 'text/html'})
    const storage = getStorage()
    const storageRef = ref(storage, 'test/testdoc.html')
    const metadata = {
        contentType: 'text/html'
    }

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file, metadata).then((snapshot) => {
        console.log('Uploaded a blob or file!')
        createFirestoreDocObject()
        callback(false)
    })
}

export function createFirestoreDocObject(name, url, tags) {
    const db = getFirestore()
    db.collection("default").doc("").set({
        "file_id": uuidv4(),
        "file_name": name,
        "file_type": "html",
        "file_url": url,
        "date_created": Date.now(),
        "date_modified": Date.now(),
        "tags": ""
    }).then(r => {
        console.log(r)
    })
}

export function deleteDocFromFirebase() {
    // something
}

export function deleteFirestoreDocObject() {
    // do something
}

export function renameFirebaseDoc() {
    // do something
}