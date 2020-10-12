<template>
  <div>
    <v-app>
      <v-app-bar app color="primary" dark> Meetinator </v-app-bar>
      <v-container class="mb-15">
        <v-main> <router-view /> </v-main>
      </v-container>
      <v-spacer class="mb-15" />
      <v-footer
        fixed
        color="primary lighten-1"
        class="font-weight-medium"
        style="color: white"
      >
        <v-col class="text-center">
          2020 — <strong>Philipp Wallrich</strong>
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({}),
};
</script>
