<script lang="ts" src="./return-auditing.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="代理名称">
          <a-input
            v-decorator="queryingFormGroup.name"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="申请日期">
          <a-range-picker v-decorator="queryingFormGroup.time"></a-range-picker>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-decorator="queryingFormGroup.status"
            placeholder="全部"
            style="width: 170px;"
          >
            <a-select-option :value="1">待审核</a-select-option>
            <a-select-option :value="2">通过</a-select-option>
            <a-select-option :value="3">拒绝</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button
            type="dashed"
            @click="
              queryingForm.resetFields();
              onSearch();
            "
            >重置</a-button
          >
          <a-button type="primary" @click="onCreate()">新增</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      rowKey="id"
      :loading="loading"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
    >
      <template #action="...args">
        <a-tooltip placement="top" :mouseLeaveDelay="0">
          <template #title>
            编辑
          </template>
          <a-button
            size="small"
            shape="circle"
            icon="edit"
            @click="onAudit(...args)"
          ></a-button>
        </a-tooltip>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确定删除？">
          <a-tooltip>
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
      :width="1200"
      title="审核"
      :visible="visible"
      :maskClosable="false"
      @ok="onConfirm()"
      @cancel="onCancel()"
    >
      <a-form :form="editingForm">
        <a-row>
          <a-col :span="8">
            <a-form-item
              label="代理姓名"
              :labelCol="{ span: 12 }"
              :wrapperCol="{ span: 12 }"
            >
              <span>代理1</span>
            </a-form-item>
            <a-form-item
              label="结算金额/收益总金额"
              :labelCol="{ span: 12 }"
              :wrapperCol="{ span: 12 }"
            >
              100000
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="审核" v-bind="layout">
              <a-radio-group>
                <a-radio :value="1">通过</a-radio>
                <a-radio :value="2">拒绝</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="备注" v-bind="layout">
              <a-input></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-table :columns="orderColumns"></a-table>
      </a-form>
    </a-modal>
    <a-modal
      v-model="preview"
      :zIndex="9999"
      :footer="null"
      centered
      :mask="false"
      :bodyStyle="{ padding: '8px' }"
    >
      <img
        class="preview"
        src="https://cn.bing.com/th?id=OHR.YukonEmerald_ZH-CN1893750172_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"
      />
    </a-modal>
  </div>
</template>
