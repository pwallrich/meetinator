<template>
  <div>
    <div class="mb-2">
      <h1>Teilnehmerliste für {{ meetingTime }}</h1>
    </div>
    <div class="inputs mb-5">
      <PersonInput :addUser="addUser" v-if="state.isAdding" />
      <div v-else>
        <v-btn @click="showAddView" v-if="canAddPerson">
          <v-icon left large color="green">mdi-plus-circle</v-icon>
          Teilnehmen
        </v-btn>
        <v-alert
          color="red lighten-2"
          v-if="!canAddPerson && !state.successfullyAdded"
          dark
        >
          Leider sind die Kurse schon voll
        </v-alert>
      </div>
    </div>
    <div>
      <v-alert color="red lighten-2" v-if="state.personAlreadyPresent" dark>
        Die Person ist schon hinzugefügt
      </v-alert>
      <v-alert color="red lighten-2" v-if="state.errorFromAdding" dark>
        Leider ist beim Hinzüfgen ein Fehler passiert. Bitte nochmal versuchen.
      </v-alert>
      <v-alert color="green lighten-2" v-if="state.successfullyAdded" dark>
        Erfolgreich fürs Training eingetragen
      </v-alert>
      <v-alert color="red lighten-2" v-if="state.errorFromDeleting" dark>
        Leider ist beim Löschen ein Fehler passiert. Bitte nochmal versuchen.
      </v-alert>
      <v-alert color="green lighten-2" v-if="state.successfullyDeleted" dark>
        Eintrag erfolgreich gelöscht
      </v-alert>
    </div>
    <div v-for="(persons, index) in splitPersons" :key="index">
      <v-chip
        label
        large
        v-if="meeting.numberOfClasses > 1 && currentNumberOfClasses > 1"
        class="mr-3"
      >
        Kurs {{ index + 1 }}
      </v-chip>
      <v-chip label large class="mr-3">
        {{ meeting.extras[index] }}
      </v-chip>
      <v-chip label large>
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
import Table from "../views/Table";
import PersonInput from "../views/PersonInput";

export default {
  components: {
    Table,
    PersonInput,
  },
  data() {
    return {
      splitPersons: [],
      state: {
        isAdding: false,
        personAlreadyPresent: false,
        errorFromAdding: false,
        errorFromDeleting: false,
        successfullyDeleted: false,
        successfullyAdded: false,
      },
    };
  },
  props: {
    meetingId: String,
  },
  methods: {
    showAddView: function () {
      this.state.isAdding = true;
    },
    addUser: function (user) {
      this.resetErrorState();
      if (
        this.persons !== undefined &&
        this.persons.find((element) => element.name == user.name)
      ) {
        this.state.personAlreadyPresent = true;
        return;
      }
      this.$store
        .dispatch("addPerson", user)
        .then(() => {
          this.state.successfullyAdded = true;
          this.state.isAdding = false;
        })
        .catch(() => {
          this.state.errorFromAdding = true;
        });
    },
    deleteRow: function (item) {
      this.resetErrorState();
      this.$store
        .dispatch("removePerson", item)
        .then(() => {
          this.state.successfullyDeleted = true;
          window.scrollTo(0, 0);
        })
        .catch(() => {
          this.state.errorFromDeleting = true;
          window.scrollTo(0, 0);
        });
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
    resetErrorState() {
      this.state.successfullyAdded = false;
      this.state.errorFromAdding = false;
      this.state.successfullyDeleted = false;
      this.state.errorFromDeleting = false;
      this.state.personAlreadyPresent = false;
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
    meetingTime() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      if (this.meeting.startDate === undefined) {
        return;
      }
      return this.meeting.startDate
        .toDate()
        .toLocaleDateString("de-DE", options);
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