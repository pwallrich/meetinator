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
      <v-chip label v-if="meeting.numberOfClasses > 1">
        Kurs {{ index + 1 }}
      </v-chip>
      <v-chip label class="ml-3">
        {{ meeting.persons.length }} / {{ meeting.splitAfter }} Personen
        angemeldet
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
      this.$store.dispatch("addPerson", user);
      this.isAdding = false;
    },
    deleteRow: function (index, offset) {
      const indexToDelete = index + offset * this.meeting.splitAfter;
      this.$store.dispatch("removePersonAt", indexToDelete);
    },
    updateTable: function () {
      if (this.meeting === undefined) {
        return;
      }
      var i,
        j = this.meeting.splitAfter;

      this.splitPersons = [];
      for (
        i = 0, j = this.meeting.persons.length;
        i < j;
        i += this.meeting.splitAfter
      ) {
        this.splitPersons.push(
          this.meeting.persons.slice(i, i + this.meeting.splitAfter)
        );
      }
    },
  },
  computed: {
    meeting: {
      get() {
        console.log("meeting");
        return this.$store.getters.meeting;
      },
    },
    canAddPerson: {
      get() {
        if (this.meeting.persons !== undefined) {
          return (
            this.meeting.persons.length <
            this.meeting.splitAfter * this.meeting.numberOfClasses
          );
        } else {
          return false;
        }
      },
    },
    currentNumberOfClasses: {
      get() {
        return (
          parseInt(this.meeting.persons.length / this.meeting.splitAfter) + 1
        );
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