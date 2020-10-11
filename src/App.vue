<template>
  <v-app>
    <v-app-bar app color="primary" dark> Meetinator </v-app-bar>
    <v-container>
      <v-main> <router-view /> </v-main>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  data: () => ({}),
};
</script>
