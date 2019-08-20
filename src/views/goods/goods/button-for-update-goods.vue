<script lang="ts" src="./button-for-update-goods.component.ts"></script>
<template>
  <app-button-for-update @click="onUpdate()">
    <a-modal
      v-model="visible"
      title="编辑"
      wrapClassName="fullscreen"
      centered
      :keyboard="false"
      :maskClosable="false"
      destroyOnClose
      @ok="onConfirm()"
    >
      <app-editing-form
        ref="form"
        :record="record"
        :categories="categories"
        :groups="groups"
      ></app-editing-form>
    </a-modal>
  </app-button-for-update>
</template>
<style lang="less">
.fullscreen {
  .ant-modal {
    width: 90% !important;
    height: 90%;
    padding-bottom: 0;
    overflow: hidden;
  }

  .ant-modal-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .ant-modal-body {
    overflow: auto;
    height: 100%;
  }
}
</style>
