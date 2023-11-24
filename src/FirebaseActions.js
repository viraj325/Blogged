import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getFirestore, getDocs, collection } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid'

export function uploadDocToFirebase(name, tags, data, callback) {
    const file = new Blob([data], {type: 'text/html'})
    const storage = getStorage()
    const storageRef = ref(storage, 'test/testdoc.html')
    const metadata = {
        contentType: 'text/html'
    }

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file, metadata).then((snapshot) => {
        console.log('Uploaded a blob or file!')
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
        })
        createFirestoreDocObject(name, tags, (() => {
            callback(false)
        }))
    })
}

export function createFirestoreDocObject(name, url, tags, callback) {
    const db = getFirestore()
    db.collection("default").doc("").set({
        "file_id": uuidv4(),
        "file_name": name,
        "file_type": "html",
        "file_url": url,
        "date_created": Date.now(),
        "date_modified": Date.now(),
        "tags": tags
    }).then(r => {
        console.log(r)
        callback()
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

// todo support url as well
export function retrieveHTMLFromFirebase(title) {
    // do something
}

export async function retrieveAllFirebaseDocs() {
    const db = getFirestore()
    const querySnapshot = await getDocs(collection(db, "default"))
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data())
    })
}