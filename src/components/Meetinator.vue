<template>
  <div>
    <Table :deleteRow="deleteRow" :items="persons" />
    <PersonInput :addUser="addUser" class="mt-10" v-if="isAdding" />

    <v-btn @click="showAddView" class="mt-10" v-if="!isAdding && canAddPerson">
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
      canAddPerson: true,
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
  },
  computed: {
    personsComp() {
      return this.$store.getters.persons;
    },
  },
  watch: {
    personsComp(newPersons) {
      this.canAddPerson = newPersons.length < 5;
    },
  },
  mounted() {
    this.persons = this.$store.getters.persons;
  },
};
</script>