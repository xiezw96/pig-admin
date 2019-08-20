<script lang="ts" src="./spec.component.ts"></script>
<template>
  <a @click.prevent="onClick()">
    重新生成价格列表
    <a-icon type="redo"></a-icon>
    <a-modal
      v-model="visible"
      title="规格"
      :maskClosable="false"
      destroyOnClose
      @ok="onConfirm()"
    >
      <a-form :form="form">
        <a-form-item label="规格1名称" v-bind="layout">
          <a-input v-decorator="formGroup.speName1"></a-input>
        </a-form-item>
        <a-form-item
          label="规格值"
          v-bind="layout"
          extra="输入规格值后按回车键确认添加"
        >
          <a-select
            v-decorator="formGroup.specs1"
            class="middle"
            mode="tags"
          ></a-select>
        </a-form-item>
        <a-form-item label="规格2名称" v-bind="layout">
          <a-input v-decorator="formGroup.speName2"></a-input>
        </a-form-item>
        <a-form-item
          label="规格值"
          v-bind="layout"
          help="输入规格值后按回车键确认添加"
        >
          <a-select
            v-decorator="formGroup.specs2"
            class="middle"
            mode="tags"
          ></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a>
</template>

