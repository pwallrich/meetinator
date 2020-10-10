import * as fb from '../firebaseDatabase'
import { store } from './store/store'

// realtime firebase
fb.personsCollection.onSnapshot(snapshot => {
    let personsArray = []
    snapshot.forEach(doc => {
        let person = doc.data()
        personsArray.push(person)
    })

    store.commit('setPersons', personsArray)
})