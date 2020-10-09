<template>
  <div>
    <div v-for="(persons, index) in splitPersons" :key="index">
      <v-chip label v-if="numberOfClases > 1"> Kurs {{ index + 1 }} </v-chip>
      <v-chip label class="ml-3">
        {{ persons.length }} / {{ splitAfter }} Personen angemeldet
      </v-chip>
      <Table :deleteRow="deleteRow" :items="persons" class="mb-5" />
    </div>
    <PersonInput :addUser="addUser" v-if="isAdding" />

    <v-btn @click="showAddView" v-if="!isAdding && canAddPerson">
      <v-icon left large color="green">mdi-plus-circle</v-icon>
      Teilnehmen
    </v-btn>

    <v-alert
      border="top"
      color="red lighten-2"
      class="mt-10"
      v-if="!canAddPerson"
      dark
    >
      Leider sind die Kurse schon voll
    </v-alert>
  </div>
</template>

<script>
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
      persons: [],
      splitPersons: [],
      canAddPerson: true,
      splitAfter: 3,
      numberOfClases: 2,
      currentNumberOfClasses: 1,
    };
  },
  methods: {
    showAddView: function () {
      this.isAdding = true;
    },
    addUser: function (user) {
      this.$store.commit("addPerson", user);
      this.isAdding = false;
    },
    deleteRow: function (index) {
      this.$store.commit("removePerson", index);
    },
    updateTable: function () {
      var i,
        j = this.splitAfter;

      this.splitPersons = [];

      for (i = 0, j = this.persons.length; i < j; i += this.splitAfter) {
        this.splitPersons.push(this.persons.slice(i, i + this.splitAfter));
      }
    },
  },
  computed: {
    personsComp() {
      return this.$store.getters.persons;
    },
  },
  watch: {
    personsComp(newPersons) {
      this.canAddPerson =
        newPersons.length < this.splitAfter * this.numberOfClases;
      this.currentNumberOfClasses =
        parseInt(newPersons.length / this.splitAfter) + 1;

      this.updateTable();
    },
  },
  mounted() {
    this.persons = this.$store.getters.persons;
    this.updateTable();
  },
};
</script>