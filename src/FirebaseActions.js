import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { getFirestore, getDocs, collection, deleteDoc, doc } from "firebase/firestore"
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
            createFirestoreDocObject(name, "", downloadURL, tags, (() => {
                callback(false)
            }))
        })
    })
}

export function createFirestoreDocObject(name, overview, url, tags, callback) {
    const db = getFirestore()
    db.collection("default").doc().set({
        "file_id": uuidv4(),
        "file_name": name,
        "file_type": "html",
        "file_overview": overview,
        "file_url": url,
        "file_path": "null",
        "date_created": Date.now(),
        "date_modified": Date.now(),
        "tags": tags
    }).then(r => {
        console.log(r)
        callback()
    })
}

export function deleteDocFromFirebase(ref, title) {
    const storage = getStorage()
    // Create a reference to the file to delete
    const docRef = ref(storage, ref)

    // Delete the file
    deleteObject(docRef).then(() => {
        // File deleted successfully
        console.log("File deleted successfully")
        deleteFirestoreDocObject(title).then(r => console.log(r))
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log("Uh-oh, an error occurred!")
    })
}

export async function deleteFirestoreDocObject(title) {
    const db = getFirestore()
    await deleteDoc(doc(db, "default", title))
}

// todo test this
export function renameFirebaseDoc(ref, data, newTitle, oldTitle) {
    deleteDocFromFirebase(ref, oldTitle)
    uploadDocToFirebase(newTitle, "", data, (() => {
        console.log("Renamed file successfully")
    }))
}

function retrieveHTMLFromFirebase(title) {
    // todo support url as well
    // fixme find a way to load html, meanwhile the bottom function should be used
}

export async function fetchMyDocument(url, callback) {
    try {
        let response = await fetch(url) // Gets a promise
        // document.body.innerHTML = await response.text() // Replaces body with response
        callback(response.text())
    } catch (err) {
        console.log('Fetch error:' + err) // Error handling
    }
}

export async function retrieveAllFirebaseDocs() {
    const db = getFirestore()
    const querySnapshot = await getDocs(collection(db, "default"))
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data())
    })
}