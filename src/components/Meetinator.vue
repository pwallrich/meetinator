<template>
  <div>
    <div class="input mb-5">
      <PersonInput :addUser="addUser" v-if="isAdding" />
      <v-btn @click="showAddView" v-if="!isAdding && canAddPerson">
        <v-icon left large color="green">mdi-plus-circle</v-icon>
        Teilnehmen
      </v-btn>
      <v-alert border="top" color="red lighten-2" v-if="!canAddPerson" dark>
        Leider sind die Kurse schon voll
      </v-alert>
    </div>
    <div v-for="(persons, index) in splitPersons" :key="index">
      <v-chip label v-if="numberOfClasses > 1"> Kurs {{ index + 1 }} </v-chip>
      <v-chip label class="ml-3">
        {{ persons.length }} / {{ splitAfter }} Personen angemeldet
      </v-chip>
      <Table
        :offset="index * splitAfter"
        :deleteRow="deleteRow"
        :items="persons"
        class="mb-5"
      />
    </div>
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
      // persons: [],
      splitPersons: [],
      // canAddPerson: true,
      // currentNumberOfClasses: 1,
    };
  },
  props: {
    splitAfter: Number,
    numberOfClasses: Number,
  },
  methods: {
    showAddView: function () {
      this.isAdding = true;
    },
    addUser: function (user) {
      this.$store.dispatch("addPerson", user);
      this.isAdding = false;
    },
    deleteRow: function (index) {
      this.$store.dispatch("removePerson", this.persons[index]);
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
    persons: {
      get() {
        return this.$store.getters.persons;
      },
    },
    canAddPerson: {
      get() {
        return this.persons.length < this.splitAfter * this.numberOfClasses;
      },
    },
    currentNumberOfClasses: {
      get() {
        return parseInt(this.persons.length / this.splitAfter) + 1;
      },
    },
  },
  watch: {
    persons() {
      this.updateTable();
    },
  },
  mounted() {
    // this.updateTable();
  },
};
</script>