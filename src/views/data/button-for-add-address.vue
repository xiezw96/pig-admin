<script lang="ts" src="./button-for-add-address.component.ts"></script>
<template>
  <a-button type="primary" @click="onAdd()">
    添加地址
    <a-modal
      v-model="visible"
      title="添加地址"
      :width="400"
      centered
      @ok="onConfirm()"
    >
      <a-form :form="form">
        <a-form-item label="收货人" v-bind="layout">
          <a-input v-decorator="formGroup.name"></a-input>
        </a-form-item>
        <a-form-item label="联系电话" v-bind="layout">
          <a-input v-decorator="formGroup.phone"></a-input>
        </a-form-item>
        <a-form-item label="地区" v-bind="layout">
          <a-cascader
            v-decorator="formGroup.location"
            :options="area"
            placeholder=""
          ></a-cascader>
        </a-form-item>
        <a-form-item label="详细地址" v-bind="layout">
          <a-input v-decorator="formGroup.detail"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-button>
</template>
