<script lang="ts" src="./withdraw-auditing.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="代理">
          <a-input
            v-decorator="queryingFormGroup.userName"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="申请时间">
          <a-date-picker
            v-decorator="queryingFormGroup.reqStartTime"
          ></a-date-picker>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="queryingForm.resetFields()">
            重置
          </a-button>
          <!-- <a-button type="primary" @click="onConfirmSelected()">
            确认打款
          </a-button> -->
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
      <template #status="text">
        <app-withdraw-audited-status :code="text"></app-withdraw-audited-status>
      </template>
      <template #remitStatus="text">
        {{ text | remit_status }}
      </template>
      <template #actions="record">
        <app-button-for-auditing
          :record="record"
          @afteraudit="onAfterAudit()"
        ></app-button-for-auditing>
        <template v-if="record.auditStatus === 1 && record.remitStatus === 0">
          <a-divider type="vertical"></a-divider>
          <a-popconfirm title="确认打款？" @confirm="onPay(record.id)">
            <a-tooltip :mouseLeaveDelay="0">
              <template #title>
                确认打款
              </template>
              <a-button
                type="primary"
                size="small"
                shape="circle"
                icon="dollar"
              ></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
