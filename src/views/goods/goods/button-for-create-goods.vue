<script lang="ts" src="./button-for-create-goods.component.ts"></script>
<template>
  <a-button type="primary" @click="onCreate()">
    新增
    <a-modal
      v-model="visible"
      title="新增"
      wrapClassName="fullscreen"
      centered
      :maskClosable="false"
      destroyOnClose
      @ok="onConfirm()"
    >
      <app-editing-form
        ref="form"
        :categories="categories"
        :groups="groups"
      ></app-editing-form>
    </a-modal>
  </a-button>
</template>
<style lang="scss">
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

