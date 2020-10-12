<template>
  <v-alert color="green lighten-2" dark>
    Ein neuer Fragebogen wurde unter
    <a :href="url" target="_blank">{{ url }}</a> erstellt
  </v-alert>
</template>

<script>
export default {
  props: {
    meetingId: String,
  },
  computed: {
    url() {
      return "https://fistudios.de/#/meetinator/" + this.meetingId;
    },
  },
};
</script>