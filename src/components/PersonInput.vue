<template>
  <v-row align="center">
    <v-col cols="12">
      <v-text-field
        v-model="name"
        ref="input"
        label="Name"
        outlined
        type="text"
      >
        <template v-slot:append-outer>
          <v-btn @click="submit()" :disabled="name.length <= 0"
            >Teilnehmen</v-btn
          >
        </template>
      </v-text-field>
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