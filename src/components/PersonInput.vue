<template>
  <v-row align="center">
    <v-col cols="9" sm="9" md="9">
      <v-text-field label="Name" v-model="name" ref="input"></v-text-field>
    </v-col>
    <v-col cols="3" sm="3" md="3">
      <v-btn block @click="submit()"> Teilnehmen </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    submit: function () {
      this.addUser({ name: this.name });
    },
  },
  props: {
    addUser: Function,
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>