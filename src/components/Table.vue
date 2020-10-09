<template>
  <v-card class="mx-auto" tile>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="(person, index) in persons" :key="person.name">
          <v-list-item-content>
            <v-list-item-title v-text="person.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn @click="shouldDelete(index)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      persons: [],
    };
  },
  methods: {
    shouldDelete: function (index) {
      this.deleteRow(index);
    },
  },
  mounted() {
    this.persons = this.$store.getters.persons;
  },
  props: {
    deleteRow: Function,
  },
};
</script>

<style>
</style>