<template>
  <div>
    <v-card class="mx-auto" tile>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, index) in items" :key="item.name">
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
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
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    shouldDelete: function (index) {
      this.deleteRow(index);
    },
  },
  mounted() {},
  props: {
    deleteRow: Function,
    items: Array,
  },
};
</script>

<style>
</style>