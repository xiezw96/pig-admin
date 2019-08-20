<script lang="ts" src="./order-data.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form layout="inline" :form="queryingForm">
        <a-form-item label="订单号">
          <a-input
            v-decorator="queryingFormGroup.orderCode"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="商品名称">
          <a-input
            v-decorator="queryingFormGroup.goodsName"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="商品分组">
          <a-select
            v-decorator="queryingFormGroup.groupRelId"
            placeholder="全部"
            :allowClear="true"
            style="width: 170px;"
          >
            <a-select-option
              v-for="group in groups"
              :key="group.id"
              :value="group.id"
            >
              {{ group.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="商品类型">
          <a-select
            v-decorator="queryingFormGroup.category"
            placeholder="全部"
            :allowClear="true"
            style="width: 170px;"
          >
            <a-select-option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="柜子名称">
          <a-input
            v-decorator="queryingFormGroup.machineName"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="柜子归属">
          <a-input
            v-decorator="queryingFormGroup.belongsUser"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="买家账号">
          <a-input
            v-decorator="queryingFormGroup.creatorName"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="支付方式">
          <a-select
            v-decorator="queryingFormGroup.payWay"
            placeholder="全部"
            :allowClear="true"
            style="width: 170px;"
          >
            <a-select-option :value="0">微信</a-select-option>
            <a-select-option :value="1">支付宝</a-select-option>
            <a-select-option :value="2">网银</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="交易日期">
          <a-range-picker
            v-decorator="queryingFormGroup.orderCreateTime"
            allowClear
          ></a-range-picker>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="onReset()">重置</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      rowKey="orderCode"
      size="middle"
      style="margin-top: 16px;"
      :loading="loading"
      :scroll="{ x: 1400 }"
      :columns="columns"
      :dataSource="list"
      :pagination="pagination"
      @change="onChangePage(...arguments)"
    >
      <template #image="record">
        <div
          :style="{
            height: '80px',
            width: '150px',
            background: `center / cover url(${getMainImage(record)}) #eee`,
          }"
        ></div>
      </template>
      <template #name="record">
        <div style="margin-bottom: 1em;">{{ record.goodsName }}</div>
        <div style="clear: both;">
          <span style="float: right;">统批价：{{ record.tradePrice }}</span>
          <span>零售价：{{ record.salePrice }}</span>
        </div>
      </template>
      <template #payway="text">
        {{ text | payway }}
      </template>
    </a-table>
  </div>
</template>
<style lang="less">
.group {
  display: flex !important;

  .middle {
    flex: 1 1 auto;
  }
}
</style>
