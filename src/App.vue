<template>
  <v-app>
    <v-app-bar app color="primary" dark> Meetinator </v-app-bar>
    <v-container>
      <v-main>
        <Meetinator />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import Meetinator from "./components/Meetinator";

export default {
  name: "App",

  components: {
    Meetinator,
  },

  data: () => ({
    //
  }),
};
</script>
