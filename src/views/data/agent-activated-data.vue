<script lang="ts" src="./agent-activated-data.component.ts"></script>
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
        <a-form-item label="代理名称">
          <a-input
            v-decorator="queryingFormGroup.agentName"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="套餐名称">
          <a-input
            v-decorator="queryingFormGroup.comboName"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="套餐类型">
          <a-select
            v-decorator="queryingFormGroup.comboType"
            placeholder="全部"
            :allowClear="true"
            style="width: 170px;"
          >
            <a-select-option value="0">自购柜子</a-select-option>
            <a-select-option value="1">购买指定商品组合</a-select-option>
            <a-select-option value="2">购买指定金额商品</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="激活日期">
          <a-range-picker
            v-decorator="queryingFormGroup.createDate"
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
      rowKey="id"
      size="middle"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
      :loading="loading"
      :pagination="pagination"
      @change="onChangePage(...arguments)"
    >
      <template #type="data">
        {{ data | activate_type }}
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
