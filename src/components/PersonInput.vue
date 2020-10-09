<template>
  <v-row align="center">
    <v-col cols="9" sm="9" md="9">
      <v-text-field label="Name" ref="input"></v-text-field>
    </v-col>
    <v-col cols="3" sm="3" md="3">
      <v-btn block> Teilnehmen </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    this.$refs.input.focus();
  },
};
</script>