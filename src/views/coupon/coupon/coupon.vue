<script lang="ts" src="./coupon.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="名称">
          <a-input v-decorator="queryingFormGroup.name"></a-input>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-decorator="queryingFormGroup.status"
            allowClear
            style="width: 170px;"
          >
            <a-select-option :value="0">未生效</a-select-option>
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">已失效</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="onReset()">重置</a-button>
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
      :dataSource="list"
    >
      <template #range="text, record">
        {{ record.startTime | date }} ~ {{ record.endTime | date }}
      </template>
      <template #actions="...args">
        <a-tooltip placement="top" :mouseLeaveDelay="0">
          <template #title>
            编辑
          </template>
          <a-button
            size="small"
            shape="circle"
            icon="edit"
            @click="onUpdate(...args)"
          ></a-button>
        </a-tooltip>

        <a-divider type="vertical" />

        <a-popconfirm
          title="确定删除？"
          okText="是"
          okType="danger"
          cancelText="否"
          @confirm="onDelete(...args)"
        >
          <a-tooltip placement="top" :mouseLeaveDelay="0">
            <template #title>
              删除
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
        <a-form-item label="面额" v-bind="layout">
          <a-input-number
            v-decorator="editingFormGroup.price"
            :disabled="mode === 2"
            style="width: 100%"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="最低消费" v-bind="layout">
          <a-input-number
            v-decorator="editingFormGroup.minPrice"
            style="width: 100%"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="有效时间" v-bind="layout">
          <a-range-picker
            v-decorator="editingFormGroup.timeRange"
            style="width: 100%;"
          ></a-range-picker>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
