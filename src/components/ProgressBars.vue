<template>
  <div class="mb-5">
    <v-row v-for="(item, index) in numberOfItems" :key="index" class="mb-1">
      <v-col>
        {{ status[index].description }}
        <v-progress-linear :value="status[index].value" height="25">
          {{ status[index].checkedIn }} / {{ status[index].totalCount }}
        </v-progress-linear>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    numberOfItems: Number,
    status: Array,
  },
};
</script>