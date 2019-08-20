<script lang="ts" src="./customer.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="form" layout="inline">
        <a-form-item label="昵称">
          <a-input
            v-decorator="formGroup.nickname"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="手机号">
          <a-input v-decorator="formGroup.phone" placeholder="全部"></a-input>
        </a-form-item>
        <a-form-item label="代理归属">
          <a-input v-decorator="formGroup.ofProxyName" placeholder="全部"></a-input>
        </a-form-item>
        <a-form-item label="开始日期">
          <a-date-picker
            v-decorator="formGroup.registerStartDate"
            placeholder="注册开始日期"
          ></a-date-picker>
        </a-form-item>
        <a-form-item label="注册结束日期">
          <a-date-picker
            v-decorator="formGroup.registerEndDate"
            placeholder="注册结束日期"
          ></a-date-picker>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="onReset()">重置</a-button>
          <!-- <a-button type="primary" @click="onCreate()">新增</a-button> -->
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
      <template #actions="text, record">
        <a-tooltip placement="top" :mouseLeaveDelay="0">
          <template #title>
            查看
          </template>
          <a-button
            size="small"
            shape="circle"
            icon="edit"
            @click="onRead(record)"
          ></a-button>
        </a-tooltip>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm v-if="record.state === 0" title="确认冻结账号？" @confirm="onUpdateState(record.id, 1)">
          <a-tooltip :mouseLeaveDelay="0">
            <template #title>
              确认冻结账号
            </template>
            <a-button
              type="primary"
              size="small"
              shape="circle"
              icon="stop"
            ></a-button>
          </a-tooltip>
        </a-popconfirm>
        <a-popconfirm v-if="record.state === 1" title="确认解冻账号？" @confirm="onUpdateState(record.id, 0)">
          <a-tooltip :mouseLeaveDelay="0">
            <template #title>
              确认解冻账号
            </template>
            <a-button
              type="primary"
              size="small"
              shape="circle"
              icon="check-circle"
            ></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </a-table>
    <a-modal v-model="visible" :width="600" :footer="null">
      <template v-if="record">
        <a-row type="flex" align="middle" :gutter="24">
          <a-col :offset="1">
            <a-avatar :size="64" :src="record.image"></a-avatar>
          </a-col>
          <a-col>{{ record.nickname }}</a-col>
        </a-row>
        <a-row type="flex" :gutter="16">
          <a-col :span="12">
            <a-row type="flex" :gutter="16">
              <a-col :span="10" class="field-label">生日</a-col>
              <a-col :span="14" class="field-value">{{ record.birthday }}</a-col>
              <a-col :span="10" class="field-label">地区</a-col>
              <a-col :span="14" class="field-value">{{ record.region }}</a-col>
              <a-col :span="10" class="field-label">注册IP</a-col>
              <a-col :span="14" class="field-value">{{ record.registerId }}</a-col>
              <a-col :span="10" class="field-label">注册时间</a-col>
              <a-col :span="14" class="field-value">{{ record.registerDate }}</a-col>
              <a-col :span="10" class="field-label">最近登录IP</a-col>
              <a-col :span="14" class="field-value">{{ record.loginIp }}</a-col>
              <a-col :span="10" class="field-label">累积消费</a-col>
              <a-col :span="14" class="field-value">{{ record.totleConsumption }}</a-col>
            </a-row>
          </a-col>
          <a-col :span="12">
            <a-row type="flex" :gutter="16">
              <a-col :span="10" class="field-label">性别</a-col>
              <a-col :span="14" class="field-value">{{ record.sex | gender }}</a-col>
              <a-col :span="10" class="field-label">手机号</a-col>
              <a-col :span="14" class="field-value">{{ record.phone }}</a-col>
              <a-col :span="10" class="field-label">注册设备</a-col>
              <a-col :span="14" class="field-value">{{ record.registerEq }}</a-col>
              <a-col :span="10" class="field-label">最近登录时间</a-col>
              <a-col :span="14" class="field-value">{{ record.loginTime }}</a-col>
              <a-col :span="10" class="field-label">代理归属</a-col>
              <a-col :span="14" class="field-value">{{ record.ofProxyName }}</a-col>
              <a-col :span="10" class="field-label">近期消费</a-col>
              <a-col :span="14" class="field-value">{{ record.recentConsumption }}</a-col>
            </a-row>
          </a-col>
        </a-row>
      </template>
    </a-modal>
  </div>
</template>
<style lang="less" scoped>
.field-label {
  text-align: right;
  height: 40px;
  line-height: 40px;
}

.field-value {
  line-height: 40px;
  white-space: nowrap;
}
</style>

