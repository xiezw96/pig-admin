<script lang="ts" src="./agent-data.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form layout="inline" :form="queryingForm">
        <a-form-item label="代理名称">
          <a-select
            v-decorator="queryingFormGroup.agentId"
            showSearch
            style="width: 170px;"
            :filterOption="filterAgent"
            @change="onChange()"
          >
            <a-select-option
              v-for="agent in agents"
              :key="agent.agentId"
              :value="agent.agentId"
            >
              {{ agent.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="日期范围">
          <a-range-picker
            v-decorator="queryingFormGroup.createDate"
            :allowClear="false"
            @change="onChange()"
          ></a-range-picker>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button type="primary" @click="onChange()">刷新</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-row style="margin-top: 16px; margin-bottom: 16px;">
      <a-col :span="4">总流水：{{ sum.total }}</a-col>
      <a-col :span="4">总流水：{{ sum.newUserCount }}</a-col>
      <a-col :span="4">总流水：{{ sum.onlineTotal }}</a-col>
      <a-col :span="4">总流水：{{ sum.offlineTotal }}</a-col>
      <a-col :span="4">总流水：{{ sum.developCount }}</a-col>
    </a-row>
    <a-table
      rowKey="id"
      size="middle"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
      :loading="loading"
    >
      <template #date="data">
        {{ data | date }}
      </template>
    </a-table>
  </div>
</template>
