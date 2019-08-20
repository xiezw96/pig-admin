<script lang="ts" src="./button-for-auditing.component.ts"></script>
<template>
  <a-tooltip placement="top" :mouseLeaveDelay="0">
    <template #title>
      编辑
    </template>
    <a-button size="small" shape="circle" icon="edit" @click="onAudit()">
      <a-modal
        title="审核"
        v-model="visible"
        :maskClosable="false"
        destroyOnClose
        @ok="onConfirm()"
      >
        <a-form :form="form">
          <a-table
            :loading="loading"
            size="small"
            :columns="columns"
            :dataSource="list"
            :pagination="{ hideOnSinglePage: true }"
            style="margin-bottom: 24px;"
          ></a-table>
          <a-form-item label="审核" v-bind="layout">
            <a-radio-group v-decorator="formGroup.status">
              <a-radio :value="1">通过</a-radio>
              <a-radio :value="2">拒绝</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="备注" v-bind="layout">
            <a-input v-decorator="formGroup.remark"></a-input>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-button>
  </a-tooltip>
</template>

