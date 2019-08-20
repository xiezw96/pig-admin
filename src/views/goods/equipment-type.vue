<script lang="ts" src="./equipment-type.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="设备型号">
          <a-input
            v-decorator="queryingFormGroup.type"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="queryingForm.resetFields()">
            重置
          </a-button>
          <a-button type="primary" @click="onCreate()">新增</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      rowKey="id"
      :loading="loading"
      size="middle"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="machineTypes"
    >
      <template #actions="...args">
        <app-button-for-update
          @click="onUpdate(...args)"
        ></app-button-for-update>
        <a-divider type="vertical"></a-divider>
        <app-button-for-delete
          @click="onDelete(...args)"
        ></app-button-for-delete>
      </template>
    </a-table>
    <a-modal
      v-bind="editingModal"
      :visible="!!mode"
      :maskClosable="false"
      @ok="onConfirm()"
      @cancel="onCancel()"
    >
      <a-form :form="editingForm">
        <a-form-item label="型号" v-bind="layout">
          <a-input v-decorator="editingFormGroup.spec"></a-input>
        </a-form-item>
        <a-form-item label="协议" v-bind="layout">
          <a-input v-decorator="editingFormGroup.protocol"></a-input>
        </a-form-item>
        <a-form-item label="厂家" v-bind="layout">
          <a-input v-decorator="editingFormGroup.provider"></a-input>
        </a-form-item>
        <a-form-item label="货道数量" v-bind="layout">
          <a-input-number
            v-decorator="editingFormGroup.aisleCount"
            :min="1"
            :step="1"
            style="width: 100%"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="采购价格" v-bind="layout">
          <a-input-number
            v-decorator="editingFormGroup.tradePrice"
            :min="0"
            :step="0.01"
            style="width: 100%;"
          ></a-input-number>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

