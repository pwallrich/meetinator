<template>
  <div>
    <v-card class="mx-auto" tile>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-content>
              <v-list-item-title
                >{{ index + 1 }}. {{ item.name }}</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn @click="shouldDelete(item)">
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
    shouldDelete: function (item) {
      this.deleteRow(item);
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