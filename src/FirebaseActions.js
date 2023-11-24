import {getStorage, ref, uploadBytes} from "firebase/storage"

function uploadDocToFirebase(data, callback) {
    const file = new Blob([data], {type: 'text/html'})
    const storage = getStorage()
    const storageRef = ref(storage, 'test/testdoc.html')
    const metadata = {
        contentType: 'text/html'
    }

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file, metadata).then((snapshot) => {
        console.log('Uploaded a blob or file!')
        callback(false)
    })
}

function createFirestoreDocObject() {
    // do something
}

function deleteDocFromFirebase() {
    // something
}

function deleteFirestoreDocObject() {
    // do something
}

function renameFirebaseDoc() {
    // do something
}

module.exports = {
    uploadDocToFirebase,
    createFirestoreDocObject,
    deleteDocFromFirebase,
    deleteFirestoreDocObject,
    renameFirebaseDoc
}