<script lang="ts" src="./development-reword-auditing.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="代理名称">
          <a-input
            v-decorator="queryingFormGroup.agentName"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-decorator="queryingFormGroup.auditStatus"
            placeholder="全部"
            style="width: 170px;"
          >
            <a-select-option :value="0">待审核</a-select-option>
            <a-select-option :value="1">通过</a-select-option>
            <a-select-option :value="2">拒绝</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="申请日期">
          <a-range-picker v-decorator="queryingFormGroup.dateRange"></a-range-picker>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="queryingForm.resetFields()">
            重置
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      rowKey="id"
      size="middle"
      :loading="loading"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
    >
      <template #status="text">
        {{ text | auditedstatus }}
      </template>
      <template #actions="record">
        <app-button-for-auditing
          :record="record"
          @audit="onAudit($event)"
        ></app-button-for-auditing>
      </template>
    </a-table>
  </div>
</template>

