<script lang="ts" src="./equipment.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="设备码">
          <a-input
            v-decorator="queryingFormGroup.code"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="代理商/手机号">
          <a-input
            v-decorator="queryingFormGroup.name"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="当前地址">
          <a-input
            v-decorator="queryingFormGroup.address"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            style="width: 171px;"
            v-decorator="queryingFormGroup.status"
            placeholder="全部"
            allowClear
          >
            <a-select-option
              v-for="option in activeStatusOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="归属类型">
          <a-select
            v-decorator="queryingFormGroup.belongsType"
            placeholder="全部"
            style="width: 171px;"
            allowClear
          >
            <a-select-option :value="1">所有权</a-select-option>
            <a-select-option :value="2">仅使用权</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="queryingForm.resetFields()">
            重置
          </a-button>
          <a-button type="primary" @click="onCreate()">新增</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      rowKey="id"
      size="middle"
      :loading="loading"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
    >
      <template #status="value">
        <app-dict-name :dict="status" :code="value"></app-dict-name>
      </template>
      <template #belongsType="value">
        <app-dict-name :dict="belongsTypes" :code="value"></app-dict-name>
      </template>
      <template #actions="...args">
        <app-button-for-update
          @click="onUpdate(...args)"
        ></app-button-for-update>
        <a-divider type="vertical"></a-divider>
        <a-tooltip placement="top" :mouseLeaveDelay="0">
          <template #title>
            状态
          </template>
          <a-button
            size="small"
            shape="circle"
            icon="info-circle"
            @click="onShowStatus(...args)"
          ></a-button>
        </a-tooltip>
        <a-divider type="vertical"></a-divider>
        <app-button-for-delete
          @click="onDelete(...args)"
        ></app-button-for-delete>
      </template>
    </a-table>
    <a-modal
      centered
      v-bind="editingModal"
      :visible="!!mode"
      :maskClosable="false"
      @ok="onConfirm()"
      @cancel="onCancel()"
    >
      <a-form :form="editingForm">
        <a-form-item label="设备名称" v-bind="layout">
          <a-input v-decorator="editingFormGroup.name"></a-input>
        </a-form-item>
        <a-form-item label="设备编码" v-bind="layout">
          <a-input
            v-decorator="editingFormGroup.code"
            :disabled="mode === 2"
          ></a-input>
        </a-form-item>
        <a-form-item label="设备型号" v-bind="layout">
          <a-select
            v-decorator="editingFormGroup.specId"
            :disabled="mode === 2"
          >
            <a-select-option
              v-for="type in equipmentTypes"
              :key="type.id"
              :value="type.id"
            >
              {{ type.spec }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="归属类型" v-bind="layout">
          <a-select v-decorator="editingFormGroup.belongsType">
            <a-select-option :value="1">所有权</a-select-option>
            <a-select-option :value="2">仅使用权</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="代理商" v-bind="layout">
          <a-select v-decorator="editingFormGroup.belongsUser">
            <a-select-option
              v-for="agent in agents"
              :key="agent.agentId"
              :value="agent.agentId"
            >
              {{ agent.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <template v-if="mode === 2">
          <a-form-item label="激活地址" v-bind="layout">
            {{ record && record.activateAddress }}
          </a-form-item>
        </template>
        <a-form-item label="当前地址" v-bind="layout">
          <a-input v-decorator="editingFormGroup.currAddreaa"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      :width="350"
      centered
      :bodyStyle="{ maxHeight: '80vh', overflowY: 'scroll' }"
      v-model="statusModalVisible"
      :footer="null"
      :closable="false"
    >
      <template #title>
        <a-row type="flex" justify="space-between">
          <a-col>
            整机状态
          </a-col>
          <a-col>
            {{ recordDetail && recordDetail.status | equipmentstatus }}
          </a-col>
          <a-col>
            <a @click="onBatchGenerateShortUrl()">
            排量生成
            </a>
          </a-col>
        </a-row>
      </template>
      <a-table
        :loading="loadingStatus"
        rowKey="id"
        size="small"
        :bordered="false"
        :columns="statusColumns"
        :dataSource="aisles"
        :pagination="{ hideOnSinglePage: true }"
      >
        <template #status="value">
          {{ value | trackstatus }}
        </template>
        <template #qrcode="record">
          <a
            v-if="shortUrls.has(record.id)"
            v-clipboard="shortUrls.get(record.id)"
            @success="onCopyed()"
          >
            复制
          </a>
          <a
            v-else
            :disabled="generateUrl(record) === ''"
            @click="onGenerateShortUrl(record)"
          >
            生成短链接
          </a>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>
