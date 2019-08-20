<script lang="ts" src="./agent-purchase-data.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form layout="inline" :form="queryingForm">
        <a-form-item label="代理姓名">
          <a-input
            v-decorator="queryingFormGroup.agentName"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="订单号">
          <a-input
            v-decorator="queryingFormGroup.code"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="类型">
          <a-select
            v-decorator="queryingFormGroup.sourceType"
            placeholder="全部"
            :allowClear="true"
            style="width: 170px;"
          >
            <a-select-option :value="0">自有</a-select-option>
            <a-select-option :value="1">商城</a-select-option>
            <a-select-option :value="2">下级</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="onReset()">重置</a-button>
          <button-for-create @created="onCreatedOrder()"></button-for-create>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      rowKey="id"
      size="middle"
      style="margin-top: 16px;"
      :loading="loading"
      :columns="columns"
      :dataSource="list"
      :pagination="pagination"
      @change="onChangePage(...arguments)"
    >
      <template #status="val">
        {{ val | agent_order_status }}
      </template>
      <template #sourceType="data">
        {{ data | source }}
      </template>
      <template #actions="record">
        <a-tooltip placement="top" :mouseLeaveDelay="0">
          <template #title>
            查看
          </template>
          <a-button
            size="small"
            shape="circle"
            icon="eye"
            @click="onView(record)"
          ></a-button>
        </a-tooltip>
      </template>
    </a-table>
    <a-modal v-model="visible" :width="1000" title="订单详情" :footer="null">
      <div class="address">
        <a-row>
          <a-col :span="8">代理商：{{ address.agentName }}</a-col>
          <a-col :span="8">收货人：{{ address.name }}</a-col>
          <a-col :span="8">电话：{{ address.phone }}</a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            收获地址：{{
              [address.privince, address.city, address.area] | location
            }}
            {{ address.address }}
          </a-col>
        </a-row>
      </div>
      <a-table
        rowKey="id"
        style="margin-top: 16px;"
        size="small"
        :dataSource="goodsList"
        :columns="goodsColumns"
      >
        <template #image="val">
          <div
            :style="{
              height: '80px',
              width: '150px',
              background: `center / cover url(${atob(val)}) #eee`,
            }"
          ></div>
        </template>
        <template #spec="record">
          {{ [record.goodsSpe1, record.goodsSpe2] | spec }}
        </template>
        <template #total="record">
          {{ record.payNum * record.tradePrice }}
        </template>
      </a-table>
    </a-modal>
  </div>
</template>
<style lang="less">
.group {
  display: flex !important;

  .middle {
    flex: 1 1 auto;
  }
}

.address {
  line-height: 2;
}
</style>
