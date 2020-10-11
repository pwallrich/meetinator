<template>
  <div>
    <h1>Meeting Creator</h1>
    <v-alert color="green lighten-2" v-if="url" dark>
      Ein neuer Fragebogen wurde unter
      <a :href="url">{{ url }}</a> erstellt
    </v-alert>
    <v-alert color="red lighten-2" v-if="errorMessage" dark>
      Beim erstellen des Fragebogen ist ein Fehler aufgetreten
    </v-alert>
    <div v-if="!url">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startDate"
              label="Start Datum"
              prepend-icon="mdi-calendar"
              readonly
              required
              :rules="startDateRules"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>

        <v-text-field
          v-model="numberOfClassesInput"
          :rules="numberOfClassesRules"
          label="Anzahl an Gruppen"
          required
        ></v-text-field>

        <v-text-field
          v-model="splitAfterInput"
          :rules="splitAfterRules"
          label="Teilnehmerzahl pro Gruppe"
          required
        ></v-text-field>

        <v-text-field
          v-for="index in numberOfClasses"
          :key="index"
          :label="'Extrainfos für Gruppe ' + index"
          v-model="extras[index - 1]"
        >
        </v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="create">
          Erstellen
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import db from "../Data/Database";
export default {
  data: () => ({
    valid: true,
    startDate: "",
    startDateRules: [(v) => !!v || "Startdatum ist ein Pflichtfeld"],
    numberOfClassesInput: 1,
    numberOfClassesRules: [
      (v) => !!v || "Die Anzahl an gewünschten Gruppen ist ein Pflichtfeld",
      (v) => !isNaN(Number.parseInt(v)) || "Gruppen muss eine Zahl sein",
    ],
    splitAfterInput: 1,
    splitAfterRules: [
      (v) => !!v || "Teilnehmerzahl ist ein Pflichtfeld",
      (v) =>
        !isNaN(Number.parseInt(v)) ||
        "Teilnehmerzahl pro Gruppe muss eine Zahl sein",
    ],
    menu2: false,
    extras: [],
    url: null,
    errorMessage: null,
  }),

  methods: {
    create() {
      this.$refs.form.validate();
      if (this.valid) {
        this.createNewMeeting();
      }
    },
    createNewMeeting() {
      this.errorMessage = false;
      const meeting = {
        startDate: this.startDate,
        numberOfClasses: this.numberOfClasses,
        splitAfter: this.splitAfter,
        extras: this.extras,
        persons: [],
      };
      db.createNewMeeting(meeting)
        .then((id) => {
          this.url = "https://fistudios.de/#/meetinator/" + id;
        })
        .catch(() => {
          this.errorMessage = true;
          window.scrollTo(0, 0);
        });
    },
  },

  computed: {
    numberOfClasses() {
      return Number.parseInt(this.numberOfClassesInput);
    },
    splitAfter() {
      return Number.parseInt(this.splitAfterInput);
    },
  },
};
</script>