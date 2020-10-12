<template>
  <v-app>
    <v-app-bar app color="primary" dark> Meetinator </v-app-bar>
    <v-container>
      <v-main> <router-view /> </v-main>
    </v-container>
    <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12">
        2020 — <strong>Philipp Wallrich</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  data: () => ({}),
};
</script>
