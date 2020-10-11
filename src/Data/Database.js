import * as fb from '../firebaseDatabase'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

const db = {
    async updateMeeting(meeting) {
        await fb.personsCollection
            .doc(meeting.id)
            .update(meeting)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    },
    async getMeeting(id) {
        console.log("getting meeting for: " + id)
        const doc = await fb.personsCollection.doc(id).get()
        return doc.data()
    },
    async removePerson(person, id) {
        console.log("inside database")
        await fb.personsCollection.doc(id)
            .update({
                persons: firebase.firestore.FieldValue.arrayRemove(person)
            })
        console.log("inside database after await")
    },
    async addPerson(person, id) {
        return fb.personsCollection.doc(id)
            .update({
                persons: firebase.firestore.FieldValue.arrayUnion(person)
            })
    }
}

export default db