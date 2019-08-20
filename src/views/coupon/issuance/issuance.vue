<script lang="ts" src="./issuance.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="名称">
          <a-input v-decorator="queryingFormGroup.name"></a-input>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-decorator="queryingFormGroup.grantType"
            allowClear
            style="width: 170px;"
          >
            <a-select-option :value="0">自动发放</a-select-option>
            <a-select-option :value="1">手动发放</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button @click="onReset()">重置</a-button>
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
      <template #type="text, record">
        <app-coupon-issuance-type
          :code="record.voucherId"
        ></app-coupon-issuance-type>
      </template>
    </a-table>
    <a-modal
      :visible="visible"
      title="发放"
      :maskClosable="false"
      @ok="onConfirm()"
      @cancel="onCancel()"
    >
      <a-form :form="editingForm">
        <a-form-item label="代金券" v-bind="layout">
          <a-select v-decorator="editingFormGroup.voucherId">
            <a-select-option
              v-for="coupon in coupons"
              :key="coupon.id"
              :value="coupon.id"
            >
              {{ coupon.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <template v-if="selectedCoupon">
          <a-form-item label="面额" v-bind="layout">
            <span>{{ selectedCoupon.price }}</span>
          </a-form-item>
          <a-form-item label="有效期" v-bind="layout">
            <span>
              {{ selectedCoupon.startTime | date }} ~
              {{ selectedCoupon.endTime | date }}
            </span>
          </a-form-item>
          <a-form-item label="最低消费" v-bind="layout">
            <span>{{ selectedCoupon.minPrice }}</span>
          </a-form-item>
        </template>
        <a-form-item label="代理" v-bind="layout">
          <a-select v-decorator="editingFormGroup.userId">
            <a-select-option
              v-for="agent in agents"
              :key="agent.agentId"
              :value="agent.agentId"
            >
              {{ agent.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
