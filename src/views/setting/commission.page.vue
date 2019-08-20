<script lang="ts" src="./commission.page.ts"></script>
<template>
  <div>
    <a-form :form="form" style="width: 500px;">
      <a-spin :delay="0" :spinning="loading">
        <a-form-item label="通道比例" v-bind="layout">
          <a-input-number
            v-decorator="formGroup.commission"
            :min="0"
            :max="100"
          ></a-input-number>
          %
        </a-form-item>
        <a-row>
          <a-col :span="22">
            <a-button type="primary" style="float: right;" @click="onSubmit()">
              提交
            </a-button>
          </a-col>
        </a-row>
      </a-spin>
    </a-form>
  </div>
</template>
