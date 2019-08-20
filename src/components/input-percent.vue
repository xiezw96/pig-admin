<template>
  <a-input-number
    v-bind="$attrs"
    v-on="$listeners"
    style="min-width: 170px; max-width: 100%; width: 100%;"
  ></a-input-number>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app-input-percent',
  methods: {
    formatter(value: number) {
      return `${value}%`;
    },
    parser(value: string) {
      return +value.replace('%', '');
    },
  },
});
</script>
