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
    async getPersons() {
        let doc = await fb.personsCollection.doc("lno4r0VzSMdf6KrFMFPO").get()
        // let personsArray = []
        const persons = doc.data().persons
        return persons
        // console.log(persons)
        // persons.forEach(personMap => {
        //     let person = {
        //         id: personMap.id,
        //         name: personMap.name
        //     }
        //     personsArray.push(person)
        // })
        // return personsArray

        // console.log("getPersons")
        // console.log(ref)
        // .then(doc => {
        //     let personsArray = []
        //     const persons = doc.data()
        //     persons.forEach(personMap => {
        //         let person = {
        //             id: personMap.id,
        //             name: personMap.name
        //         }
        //         personsArray.push(person)
        //     })
        //     return personsArray
        // })
    }
}

export default db