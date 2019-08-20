<template>
  <a-tooltip
    :visible="tooltipVisible"
    placement="top"
    :mouseLeaveDelay="0"
    @visibleChange="onVisibleChange($event)"
  >
    <template #title>
      <slot></slot>
    </template>
    <a-button v-bind="$attrs" v-on="$listeners" @click="onOpenModal()">
      <slot v-if="!$attrs.icon"></slot>
      <a-modal
        :maskClosable="false"
        v-bind="modalProps"
        :visible="visible"
        @ok="onOk()"
        @cancel="onCancel()"
      >
        <slot name="modal-content"></slot>
      </a-modal>
    </a-button>
  </a-tooltip>
</template>

<script lang="ts">
import { get } from 'lodash';
import Vue from 'vue';

export default Vue.extend({
  name: 'cac-modal-button',
  props: {
    modal: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: false,
      tooltipVisible: false,
    };
  },
  computed: {
    handleConfirm(this: any) {
      return this.modal.onConfirm;
    },
    handleCancel(this: any) {
      return this.modal.onCancel;
    },
    modalProps(this: any) {
      const { onConfirm, onCancel, ...props } = this.modal;
      return props;
    },
  },
  methods: {
    onOpenModal() {
      this.toggleVisible(true);
    },
    onOk() {
      if (this.handleConfirm) {
        this.handleConfirm(this.toggleVisible);
        return;
      }
      this.toggleVisible(false);
    },
    onCancel() {
      if (this.handleCancel) {
        this.handleCancel(this.toggleVisible);
        return;
      }
      this.toggleVisible(false);
    },
    toggleVisible(visible?: boolean) {
      if (visible === undefined) {
        this.visible = false;
        return;
      }
      this.visible = !!visible;
    },
    onVisibleChange(visible: boolean) {
      this.tooltipVisible = this.$attrs.icon ? visible : false;
    },
  },
});
</script>
