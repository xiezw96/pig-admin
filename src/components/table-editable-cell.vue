
<template>
  <div>
    <template v-if="editable">
      <a-input-number
        auto-focus
        v-model="value_"
        size="small"
        @blur="onConfirm()"
        @keyup.esc="onCancel($event)"
        @keyup.enter="onConfirm()"
      ></a-input-number>
    </template>
    <template v-else>
      <a @click.prevent="onEdit()">
        <a-icon type="edit"></a-icon>
        {{ value || ' ' }}
      </a>
    </template>
  </div>
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
      oldValue: this.value,
      value_: this.value,
      editable: false,
    };
  },
  methods: {
    onConfirm() {
      this.editable = false;
      this.oldValue = this.value_;
      this.$emit('confirm', this.value_);
    },
    onCancel() {
      this.editable = false;
      this.value_ = this.oldValue;
    },
    onEdit() {
      this.editable = true;
    },
  },
};
</script>
<style>
</style>
