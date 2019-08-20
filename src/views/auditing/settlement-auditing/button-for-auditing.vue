<script lang="ts" src="./button-for-auditing.component.ts"></script>
<template>
  <a-tooltip placement="top" :mouseLeaveDelay="0">
    <template #title>
      审核
    </template>
    <a-button size="small" shape="circle" icon="edit" @click="onAudit()">
      <a-modal
        :width="1200"
        title="审核"
        v-model="visible"
        :maskClosable="false"
        destroyOnClose
        @ok="onConfirm()"
      >
        <a-form :form="form">
          <a-row>
            <a-col :span="6">
              <a-form-item
                label="代理姓名"
                :labelCol="{ span: 12 }"
                :wrapperCol="{ span: 12 }"
              >
                <span>{{ record.userName }}</span>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item
                label="结算金额"
                :labelCol="{ span: 12 }"
                :wrapperCol="{ span: 12 }"
              >
                {{ record.originalTotal }}
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item
                label="结算到账金额"
                :labelCol="{ span: 12 }"
                :wrapperCol="{ span: 12 }"
              >
                {{ record.total }}
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item
                label="通道费用"
                :labelCol="{ span: 12 }"
                :wrapperCol="{ span: 12 }"
              >
                {{ record.commission }}
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6">
              <a-form-item
                label="审核"
                :labelCol="{ span: 12 }"
                :wrapperCol="{ span: 12 }"
              >
                <a-radio-group
                  v-decorator="formGroup.status"
                  :disabled="record.status !== 0"
                >
                  <a-radio :value="1">通过</a-radio>
                  <a-radio :value="2">拒绝</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="备注" v-bind="layout">
                <a-input
                  v-decorator="formGroup.remark"
                  :disabled="record.status !== 0"
                ></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-table
            rowKey="id"
            :loading="loading"
            size="middle"
            :columns="columns"
            :dataSource="list"
            :scroll="{ x: 1400 }"
          >
            <template #name="record">
              <div style="margin-bottom: 1em;">{{ record.name }}</div>
              <div style="clear: both;">
                <div style="float: left;">零售价：{{ record.salePrice }}</div>
                <div style="float: right; width: 120px;">
                  统批价：{{ record.tradePrice }}
                </div>
              </div>
            </template>
            <template #image="data, record">
              <div
                :style="{
                  height: '80px',
                  width: '150px',
                  background: `center / cover url(${atob(data)}) #eee`,
                }"
              ></div>
            </template>
            <template #source="data">
              {{ data | source }}
            </template>
          </a-table>
        </a-form>
      </a-modal>
    </a-button>
  </a-tooltip>
</template>

