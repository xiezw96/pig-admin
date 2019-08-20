<template>
  <a-dropdown v-model="visible" :trigger="['click']" @visibleChange="onChange($event)">
    <a @click.prevent="0">
      <a-icon type="edit"></a-icon>
      {{ title }}
    </a>
    <template #overlay>
      <div class="dropdown-container">
        <label>批量修改{{ title }}</label>
        <a-input-number
          auto-focus
          v-model="value"
          @keyup.esc="onCancel()"
          @keyup.enter="onConfirm()"
        ></a-input-number>
      </div>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { InputNumber } from 'ant-design-vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'app-table-header-cell',
  props: ['field', 'title'],
  data() {
    return {
      value: '',
      visible: false,
    };
  },
  methods: {
    onClick(e: Event) {
      e.stopPropagation();
    },
    onConfirm() {
      this.visible = false;
      this.$emit('confirm', this.value);
    },
    onCancel() {
      this.visible = false;
    },
    onChange(visible: boolean) {
      if (visible) {
        this.value = '';
      }
    },
  },
});
</script>

<style lang="less" scoped>
.dropdown-container {
  display: flex;
  align-items: center;
  width: auto;
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  label {
    flex: 1 0 auto;
    margin-right: 8px;
  }
}

.title {
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-color: #fff;
  }
}
</style>

