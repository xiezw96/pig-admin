<script lang="ts" src="./button-for-add-equipment.component.ts"></script>
<template>
  <a-button type="primary" size="small" @click="onClick()">
    添加柜子
    <a-modal v-model="visible" title="添加柜子" @ok="onConfirm()">
      <a-form :form="form">
        <a-form-item label="柜子型号" v-bind="layout">
          <a-select v-decorator="formGroup.machineSpecId">
            <a-select-option
              v-for="type in equipmentTypes"
              :key="type.id"
              :value="type.id"
            >
              {{ type.spec }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="柜子数量" v-bind="layout">
          <a-input-number v-decorator="formGroup.num"></a-input-number>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-button>
</template>
