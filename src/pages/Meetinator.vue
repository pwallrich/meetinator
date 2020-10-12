<template>
  <div>
    <div class="mb-3">
      <h3>Liste für {{ meetingTime }}</h3>
    </div>
    <div class="inputs mb-5">
      <PersonInput :addUser="addUser" v-if="state.isAdding" />
      <div v-else>
        <v-btn
          @click="showAddView"
          v-if="canAddPerson"
          color="primary"
          x-large
          block
        >
          <v-icon left x-large>mdi-plus-circle</v-icon>
          <span class="ml-2">Teilnehmen</span>
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
    <v-alert outlined rounded class="mb-3" v-if="canAddPerson">
      <div>
        <strong>
          {{ meeting.persons.length }} /
          {{ meeting.numberOfClasses * meeting.splitAfter }}</strong
        >
        Teilnehmer eingetragen
      </div>
    </v-alert>
    <div v-for="(persons, index) in splitPersons" :key="index">
      <v-chip label large>
        {{ meeting.extras[index] }}
      </v-chip>
      <Table
        :offset="index"
        :deleteRow="deleteRow"
        :items="persons"
        class="mb-5"
      />
    </div>
    <v-footer fixed class="font-weight-medium mb-15"> </v-footer>
  </div>
</template>

<script>
import Table from "../components/Table";
import PersonInput from "../components/PersonInput";

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
    meetingTime() {
      const options = {
        weekday: "long",
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
    filledPercentageOfClasses() {
      let result = [];
      for (let i = 0; i < this.meeting.numberOfClasses; i++) {
        let participating = 0;
        let value = 0;
        if (!(this.splitPersons[i] === undefined)) {
          value = (this.splitPersons[i].length / this.meeting.splitAfter) * 100;
          participating = this.splitPersons[i].length;
        }
        result.push({
          value: value,
          checkedIn: participating,
          totalCount: this.meeting.splitAfter,
          description: this.meeting.extras[i],
        });
      }
      return result;
    },
  },
  methods: {
    showAddView: function () {
      this.state.isAdding = true;
    },
    addUser: function (user) {
      this.resetErrorState();
      if (
        this.persons !== undefined &&
        this.persons.find((element) => element.name === user.name)
      ) {
        this.state.personAlreadyPresent = true;
        return;
      }
      this.$store
        .dispatch("addPerson", {
          person: user,
          meetingId: this.meetingId,
        })
        .then(() => {
          this.state.successfullyAdded = true;
          this.state.isAdding = false;
        })
        .catch((error) => {
          console.log(error);
          this.state.errorFromAdding = true;
        });
    },
    deleteRow: function (item) {
      this.resetErrorState();
      console.log(item);
      this.$store
        .dispatch("removePerson", {
          person: item,
          meetingId: this.meetingId,
        })
        .then(() => {
          this.state.successfullyDeleted = true;
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.log(error);
          this.state.errorFromDeleting = true;
          window.scrollTo(0, 0);
        });
    },
    updateTable: function () {
      if (this.meeting === undefined || this.meeting.persons === undefined) {
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