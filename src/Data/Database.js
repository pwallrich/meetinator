import * as fb from '../firebaseDatabase'

const db = {
    async updatePersons(persons) {
        await fb.personsCollection
            .doc("lno4r0VzSMdf6KrFMFPO")
            .update({
                persons: persons
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    },
}

export default db