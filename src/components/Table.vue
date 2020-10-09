<template>
  <v-card class="mx-auto" tile>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="(person, index) in persons" :key="person.name">
          <v-list-item-content>
            <v-list-item-title v-text="person.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn @click="deleteRow(index)">
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
      persons: [
        {
          name: "Kerstin",
        },
        {
          name: "Pete",
        },
        {
          name: "Corinna",
        },
      ],
    };
  },
  methods: {
    deleteRow: function (index) {
      console.log("deleteRow");
      this.persons.splice(index, 1);
    },
  },
};
</script>

<style>
</style>