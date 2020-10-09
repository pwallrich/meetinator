<template>
  <div>
    <Table :deleteRow="deleteRow" />
    <PersonInput :addUser="addUser" class="mt-10" v-if="isAdding" />
    <v-btn @click="showAddView" class="mt-10" v-if="!isAdding">
      <v-icon left large color="green">mdi-plus-circle</v-icon>
      Teilnehmen
    </v-btn>
  </div>
</template>

<script>
// import { db } from '../firebaseDatabase'
import Table from "./Table";
import PersonInput from "./PersonInput";
export default {
  components: {
    Table,
    PersonInput,
  },
  data() {
    return {
      isAdding: false,
    };
  },
  methods: {
    showAddView: function () {
      this.isAdding = true;
    },
    addUser: function (user) {
      this.$store.commit("addPerson", user);
    },
    deleteRow: function (index) {
      this.$store.commit("removePerson", index);
    },
  },
  // firestore: {
  //   persons: db.collection('persons')
  // }
};
</script>