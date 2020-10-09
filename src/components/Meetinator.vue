<template>
  <div>
    <v-simple-table>
      <template v-slot:default> 
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Do 15. Okt
            </th>
            <th>
              ich komme nicht
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(person, index) in persons"
            :key="person.name"
          >
            <td>
              <v-text-field
                label="Name"
                :ref="index"
                :value="person.name"
              >
                Kerstin
              </v-text-field>
            </td>
            <td>
              <v-checkbox
                :value="0"
                v-model="person.selectedIndex"
              >
              </v-checkbox>
            </td>
            <td>
              <v-checkbox
              :value="1"
              v-model="person.selectedIndex"
              
              >
              </v-checkbox>
            </td>
            <td>
              <v-btn
                @click="deleteRow(index)"
              >
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn
        @click="addRow"
      >
        <v-icon
          left
          large
          color="green"
        >mdi-plus-circle</v-icon>
        neuen Eintrag hinzufügen
      </v-btn>
  </div>
</template>

<script>
import { db } from '../firebaseDatabase'

export default {
  data() {
    return {
      persons: []
    }
  },
  methods: {
    addRow: function() {
      this.persons.push({
        selectedIndex: []
      })
      console.log(this.$refs)
      this.$nextTick(function() {
        const index = this.persons.length - 1
        this.$refs[index][0].focus()
      })
    },
    deleteRow: function(index) {
      this.persons.splice(index, 1)
    },
  },
  firestore: {
    persons: db.collection('persons')
  }
}
</script>