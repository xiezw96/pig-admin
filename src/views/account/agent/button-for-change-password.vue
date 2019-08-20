<script lang="ts" src="./button-for-change-password.component.ts"></script>
<template>
  <a-tooltip placement="top" :mouseLeaveDelay="0">
    <template #title>
      修改密码
    </template>
    <a-button
      size="small"
      shape="circle"
      icon="key"
      @click="onChangePassword()"
    >
      <a-modal v-model="visible" title="修改密码" destroyOnClose @ok="onConfirm()">
        <a-form :form="form">
          <a-form-item label="新密码" v-bind="layout">
            <a-input v-decorator="formGroup.pwd" type="password"></a-input>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-button>
  </a-tooltip>
</template>
