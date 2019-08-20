<template>
  <div class="dict">{{ text }}</div>
</template>

<script lang="ts">
import { isFinite, isPlainObject, toNumber } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DictNameComponent extends Vue {
  @Prop()
  dict: any;

  @Prop()
  code: any;

  get text() {
    if (!isPlainObject(this.dict)) return '';
    const num = toNumber(this.code);
    if (!isFinite(num)) return '';

    return this.dict[num];
  }
}
</script>

<style lang="less" scoped>
.dict {
  display: inline-block;
}
</style>

