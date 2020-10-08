<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    Meetinator
    </v-app-bar>
    <v-main>
      <Meetinator/>
    </v-main>
  </v-app>
</template>

<script>
import Meetinator from './components/Meetinator';

export default {
  name: 'App',

  components: {
    Meetinator,
  },

  data: () => ({
    //
  }),
};
</script>
