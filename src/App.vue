<template>
  <v-app>
    <v-app-bar app color="primary" dark> Meetinator </v-app-bar>
    <v-container>
      <v-main>
        <Meetinator
          :splitAfter="splitAfter"
          :numberOfClasses="numberOfClasses"
        />
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
    splitAfter: 4,
    numberOfClasses: 2,
  }),
};
</script>
