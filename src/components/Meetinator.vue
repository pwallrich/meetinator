<template>
  <div>
    <Table />
    <PersonInput class="mt-10" v-if="isAdding" />
    <v-btn @click="addRow" class="mt-10" v-if="!isAdding">
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
    addRow: function () {
      this.isAdding = true;
      // this.persons.push({
      //   selectedIndex: [],
      // });
      // console.log(this.$refs);
      // this.$nextTick(function () {
      //   const index = this.persons.length - 1;
      //   this.$refs[index][0].focus();
      // });
    },
    deleteRow: function (index) {
      this.persons.splice(index, 1);
    },
  },
  // firestore: {
  //   persons: db.collection('persons')
  // }
};
</script>