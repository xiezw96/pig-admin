<script lang="ts" src="./purchasing-logistics.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="订单号">
          <a-input
            v-decorator="queryingFormGroup.code"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="代理账号">
          <a-input
            v-decorator="queryingFormGroup.agentName"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-decorator="queryingFormGroup.status"
            :allowClear="true"
            style="width: 171px;"
            placeholder="全部"
          >
            <a-select-option
              v-for="option in logisticsStatusOptions"
              :key="option.value"
              :value="option.value"
              >{{ option.label }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="发货日期">
          <a-range-picker
            v-decorator="queryingFormGroup.sendTime"
            :placeholder="['全部', '全部']"
          ></a-range-picker>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="queryingForm.resetFields()">
            重置
          </a-button>
          <!-- <a-button type="primary" @click="onExport()">导出</a-button> -->
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      :loading="loading"
      rowKey="id"
      size="middle"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
    >
      <template #status="data">
        {{ data | send_status }}
      </template>
      <template #address="data, record">
        {{ [record.privince, record.city, record.area] | location
        }}{{ record.address }}
      </template>
      <template #actions="data, record">
        <template v-if="record.status === 1">
          <a-tooltip placement="top" :mouseLeaveDelay="0">
            <template #title>
              发货
            </template>
            <a-button
              size="small"
              shape="circle"
              icon="right-square"
              type="primary"
              ghost
              @click="onSend(record)"
            ></a-button>
          </a-tooltip>
        </template>
        <template v-else-if="record.status === 2">
          <a-tooltip placement="top" :mouseLeaveDelay="0">
            <template #title>
              修改物流
            </template>
            <a-button
              size="small"
              shape="circle"
              icon="edit"
              @click="onUpdate(record)"
            ></a-button>
          </a-tooltip>
        </template>
      </template>
    </a-table>
    <a-modal v-model="visible" title="物流信息" :width="700" @ok="onConfirm()">
      <template v-if="record">
        <a-form :form="logisticsForm">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="收货人姓名"
                v-bind="layout"
                style="margin-bottom: 0;"
                >{{ record.name }}</a-form-item
              >
              <a-form-item
                label="收货人电话"
                v-bind="layout"
                style="margin-bottom: 0;"
                >{{ record.phone }}</a-form-item
              >
              <a-form-item
                label="收货人地址"
                v-bind="layout"
                style="margin-bottom: 0;"
              >
                {{ [record.privince, record.city, record.area] | location
                }}{{ record.address }}
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="物流公司" v-bind="layout">
                <a-input
                  v-decorator="logisticsFormGroup.logisticsCompany"
                ></a-input>
              </a-form-item>
              <a-form-item label="物流单号" v-bind="layout">
                <a-input
                  v-decorator="logisticsFormGroup.logisticsCode"
                ></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-table
          rowKey="id"
          :columns="orderColumns"
          :dataSource="record.orderDetails"
          size="small"
          :pagination="{ pageSize: 5 }"
        >
          <template #image="data">
            <div
              :style="{
                height: '80px',
                width: '150px',
                background: `center / cover url(${atob(data)}) #eee`,
              }"
            ></div>
          </template>
          <template #spec="data, record">
            {{ [record.goodsSpe1, record.goodsSpe2] | spec }}
          </template>
        </a-table>
      </template>
    </a-modal>
  </div>
</template>
