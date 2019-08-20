<script lang="ts" src="./role.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="名称">
          <a-input v-decorator="queryingFormGroup.roleName"></a-input>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="onReset()">重置</a-button>
          <a-button type="primary" @click="onCreate()">新增</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      :loading="loading"
      rowKey="roleId"
      size="middle"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
    >
      <template #actions="text, record">
        <app-button-for-update
          @click="onUpdate(record)"
        ></app-button-for-update>
        <a-divider type="vertical" />
        <a-tooltip placement="top" :mouseLeaveDelay="0">
          <template #title>
            分配权限
          </template>
          <a-button
            size="small"
            shape="circle"
            icon="safety-certificate"
            @click="onSetPermission(record)"
          ></a-button>
        </a-tooltip>
        <a-divider type="vertical"></a-divider>
        <app-button-for-delete
          @click="onDelete(record.roleId)"
        ></app-button-for-delete>
      </template>
    </a-table>
    <a-modal
      v-model="editingModalVisible"
      v-bind="editingModal"
      :maskClosable="false"
      @ok="onConfirm()"
    >
      <a-form :form="editingForm">
        <a-form-item label="名称" v-bind="layout">
          <a-input v-decorator="editingFormGroup.roleName"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="permissionModalVisible"
      :maskClosable="false"
      title="分配权限"
      :centered="true"
      :bodyStyle="{ 'overflow-y': 'auto' }"
      wrapClassName="permission-modal"
      @ok="onConfirmSetPermission()"
    >
      <a-tree
        checkable
        v-model="checkedKeys"
        :selectedKeys="[]"
        :treeData="permissionTreeData"
      ></a-tree>
    </a-modal>
  </div>
</template>
<style lang="less">
.permission-modal {
  .ant-modal {
    height: 80vh;
    padding-bottom: 0 !important;

    .ant-modal-content {
      display: flex;
      flex-direction: column;
      max-height: 100%;
    }
  }
}
</style>

