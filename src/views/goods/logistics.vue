<script lang="ts" src="./logistics.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="商品编码/商品名称">
          <a-input
            v-decorator="queryingFormGroup.name"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="买家账号">
          <a-input
            v-decorator="queryingFormGroup.account"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-decorator="queryingFormGroup.status"
            :allowClear="true"
            placeholder="全部"
            style="width: 171px;"
          >
            <a-select-option
              v-for="option in logisticsStatusOptions"
              :key="option.value"
              :value="option.value"
              >{{ option.label }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="订单号">
          <a-input
            v-decorator="queryingFormGroup.order"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="是否退换货">
          <a-select
            v-decorator="queryingFormGroup.returned"
            :allowClear="true"
            style="width: 171px;"
            placeholder="全部"
          >
            <a-select-option :value="0">否</a-select-option>
            <a-select-option :value="1">是</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="操作日期">
          <a-range-picker v-decorator="queryingFormGroup.time"></a-range-picker>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="queryingForm.resetFields()">
            重置
          </a-button>
          <a-button type="primary" @click="onExport()">导出</a-button>
          <a-button type="primary" @click="onImport()">导入</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      :loading="loading"
      rowKey="id"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="groups"
    >
      <template #action="...args">
        <a-tooltip placement="top" :mouseLeaveDelay="0">
          <template #title>
            修改物流单
          </template>
          <a-button size="small" shape="circle" icon="edit"></a-button>
        </a-tooltip>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定发货？"
          okText="是"
          okType="danger"
          cancelText="否"
        >
          <a-tooltip placement="top" :mouseLeaveDelay="0">
            <template #title>
              发货
            </template>
            <a-button
              type="danger"
              size="small"
              shape="circle"
              icon="delete"
            ></a-button>
          </a-tooltip>
        </a-popconfirm>
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
        <a-form-item label="名称" v-bind="layout">
          <a-input v-decorator="editingFormGroup.name"></a-input>
        </a-form-item>
        <a-form-item label="序号" v-bind="layout">
          <a-input v-decorator="editingFormGroup.sort"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
