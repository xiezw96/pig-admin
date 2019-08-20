<script lang="ts" src="./modify-info-auditing.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="代理姓名">
          <a-input
            v-decorator="queryingFormGroup.name"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-decorator="queryingFormGroup.updateAuditStatus"
            placeholder="全部"
            allowClear
            style="width: 170px;"
          >
            <a-select-option :value="0">待审核</a-select-option>
            <a-select-option :value="1">通过</a-select-option>
            <a-select-option :value="2">拒绝</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="申请日期">
          <a-range-picker
            v-decorator="queryingFormGroup.updateAuditReqTime"
          ></a-range-picker>
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
      rowKey="agentId"
      :loading="loading"
      size="middle"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
    >
      <template #status="text">
        <app-audited-status :code="text"></app-audited-status>
      </template>
      <template #image="text">
        <img class="card-image" :src="text | a2b" />
      </template>
      <template #actions="record">
        <app-button-for-auditing
          :record="record"
          @afteraudit="onAfterAudit()"
        ></app-button-for-auditing>
      </template>
    </a-table>
  </div>
</template>
<style lang="less" scoped>
.card-image {
  width: 100px;
  border-radius: 8px;
}
</style>
