import * as fb from '../firebaseDatabase'

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
        let data = doc.data()
        data.id = id
        return data
    }
}

export default db