<template>
  <div>
    <Table />
    <v-divider class="mt-10 mb-10"></v-divider>
    <v-btn @click="addRow">
      <v-icon left large color="green">mdi-plus-circle</v-icon>
      neuen Eintrag hinzufügen
    </v-btn>
  </div>
</template>

<script>
// import { db } from '../firebaseDatabase'
import Table from "./Table";
export default {
  components: {
    Table,
  },
  data() {
    return {};
  },
  methods: {
    addRow: function () {
      this.persons.push({
        selectedIndex: [],
      });
      console.log(this.$refs);
      this.$nextTick(function () {
        const index = this.persons.length - 1;
        this.$refs[index][0].focus();
      });
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