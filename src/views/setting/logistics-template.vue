<script lang="ts" src="./logistics-template.component.ts"></script>
<template>
  <div>
    <a-form :form="form" style="width: 500px;">
      <a-spin :delay="0" :spinning="loading">
        <a-form-item label="首重" v-bind="layout" help="单位：千克">
          <a-input-number
            v-decorator="formGroup.startingWeight"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="起步价" v-bind="layout">
          <a-input-number
            v-decorator="formGroup.startingPrice"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="续重费用" v-bind="layout">
          <a-input-number v-decorator="formGroup.increment"></a-input-number>
        </a-form-item>
        <a-form-item label="偏远地区起步价" v-bind="layout">
          <a-input-number
            v-decorator="formGroup.farawayStartingPrice"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="续重费用" v-bind="layout">
          <a-input-number
            v-decorator="formGroup.farawayIncrement"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="偏远省份" v-bind="layout">
          <a-button
            type="primary"
            size="small"
            ghost
            style="margin-right: 8px;"
            @click="onAdd()"
          >
            添加
          </a-button>
          <a-tag
            v-for="area in remoteAreas"
            :key="area"
            closable
            @close="onClose(area)"
          >
            {{ area | province }}
          </a-tag>
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
    <a-modal v-model="visible" title="偏远省份" @ok="onConfirm()">
      <a-form :form="areaForm">
        <a-form-item label="偏远省份" v-bind="layout">
          <a-select v-decorator="areaFormGroup.province">
            <a-select-option
              v-for="province in areas"
              :key="province.value"
              :lvalue="province.value"
            >
              {{ province.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
