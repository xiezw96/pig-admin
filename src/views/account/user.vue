<script lang="ts" src="./user.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="名称">
          <a-input v-decorator="queryingFormGroup.username"></a-input>
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
      rowKey="userId"
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
            修改密码
          </template>
          <a-button
            size="small"
            shape="circle"
            icon="key"
            @click="onChangePassword(record)"
          ></a-button>
        </a-tooltip>
        <a-divider type="vertical" />
        <app-button-for-delete
          @click="onDelete(record.userId)"
        ></app-button-for-delete>
      </template>
    </a-table>
    <a-modal
      v-model="creatingModalVisible"
      title="新增"
      :maskClosable="false"
      @ok="onConfirm()"
    >
      <a-form :form="formForCreating">
        <a-form-item label="名称" v-bind="layout">
          <a-input v-decorator="editingFormGroup.username"></a-input>
        </a-form-item>
        <a-form-item label="姓名" v-bind="layout">
          <a-input v-decorator="editingFormGroup.showName"></a-input>
        </a-form-item>
        <a-form-item label="密码" v-bind="layout">
          <a-input v-decorator="editingFormGroup.password"></a-input>
        </a-form-item>
        <a-form-item label="角色" v-bind="layout">
          <a-select v-decorator="editingFormGroup.roleId">
            <a-select-option
              v-for="role in roles"
              :key="role.roleId"
              :value="role.roleId"
            >
              {{ role.roleName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="updatingModalVisible"
      title="编辑"
      :maskClosable="false"
      @ok="onConfirm()"
    >
      <a-form :form="formForUpdating">
        <a-form-item label="名称" v-bind="layout">
          <a-input v-decorator="editingFormGroup.username"></a-input>
        </a-form-item>
        <a-form-item label="姓名" v-bind="layout">
          <a-input v-decorator="editingFormGroup.showName"></a-input>
        </a-form-item>
        <a-form-item label="角色" v-bind="layout">
          <a-select v-decorator="editingFormGroup.roleId">
            <a-select-option
              v-for="role in roles"
              :key="role.roleId"
              :value="role.roleId"
            >
              {{ role.roleName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="passwordModalVisible"
      :maskClosable="false"
      title="修改密码"
      @ok="onConfirmChangePassword()"
    >
      <a-form :form="passwordForm">
        <a-form-item label="新密码" v-bind="layout">
          <a-input v-decorator="passwordControl" type="password"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
