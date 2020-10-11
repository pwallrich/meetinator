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
      <v-alert
        border="top"
        color="red lighten-2"
        v-if="personAlreadyPresent"
        dark
      >
        Die Person ist schon hinzugefügt
      </v-alert>
    </div>
    <div v-for="(persons, index) in splitPersons" :key="index">
      <v-chip
        label
        v-if="meeting.numberOfClasses > 1 && currentNumberOfClasses > 1"
        class="mr-3"
      >
        Kurs {{ index + 1 }}
      </v-chip>
      <v-chip label>
        {{ persons.length }} / {{ meeting.splitAfter }} Personen angemeldet
      </v-chip>
      <Table
        :offset="index"
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
      splitPersons: [],
      personAlreadyPresent: false,
      succesfullyAddded: false,
    };
  },
  props: {
    meetingId: String,
  },
  methods: {
    showAddView: function () {
      this.isAdding = true;
    },
    addUser: function (user) {
      if (this.persons.find((element) => element.name == user.name)) {
        this.personAlreadyPresent = true;
        return;
      }
      this.$store.dispatch("addPerson", user);
      this.isAdding = false;
    },
    deleteRow: function (item) {
      console.log("should delete");
      console.log(item);
      this.$store.dispatch("removePerson", item);
    },
    updateTable: function () {
      if (this.meeting === undefined) {
        return;
      }
      var i,
        j = this.meeting.splitAfter;

      this.splitPersons = [];
      for (
        i = 0, j = this.persons.length;
        i < j;
        i += this.meeting.splitAfter
      ) {
        this.splitPersons.push(
          this.persons.slice(i, i + this.meeting.splitAfter)
        );
      }
    },
  },
  computed: {
    meeting: {
      get() {
        return this.$store.getters.meeting;
      },
    },
    persons: {
      get() {
        return this.$store.getters.persons;
      },
    },
    canAddPerson: {
      get() {
        if (this.persons !== undefined) {
          return (
            this.persons.length <
            this.meeting.splitAfter * this.meeting.numberOfClasses
          );
        } else {
          return true;
        }
      },
    },
    currentNumberOfClasses: {
      get() {
        return parseInt(this.persons.length / this.meeting.splitAfter) + 1;
      },
    },
  },
  watch: {
    meeting() {
      this.updateTable();
    },
  },
  created() {
    this.$store.dispatch("getMeeting", this.meetingId);
  },
};
</script>