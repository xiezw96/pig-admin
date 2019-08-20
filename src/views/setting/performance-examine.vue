<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="名称">
          <a-input v-decorator="queryingFormGroup.level"></a-input>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="primary" @click="onCreate()">新增</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      rowKey="id"
      :loading="loading"
      size="middle"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
    >
      <template #action="...args">
        <a-tooltip placement="top" :mouseLeaveDelay="0">
          <template #title>编辑</template>
          <a-button size="small" shape="circle" icon="edit" @click="onUpdate(...args)"></a-button>
        </a-tooltip>

        <a-divider type="vertical"/>

        <a-popconfirm
          title="确定删除？"
          okText="是"
          okType="danger"
          cancelText="否"
          @confirm="onDelete(...args)"
        >
          <a-tooltip placement="top" :mouseLeaveDelay="0">
            <template #title>删除</template>
            <a-button type="danger" size="small" shape="circle" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </a-table>
    <a-modal
      v-bind="editingModal"
      :visible="!!mode"
      :maskClosable="false"
      @ok="onConfirm()"
      @cancel="onCancel()"
    >
      <a-form :form="editingForm">
        <a-form-item label="代理等级" v-bind="layout">
          <a-input v-decorator="editingFormGroup.level"></a-input>
        </a-form-item>
        <a-form-item label="升级流水" v-bind="layout">
          <a-input-number v-decorator="editingFormGroup.upgrade" style="width: 100%"></a-input-number>
        </a-form-item>
        <a-form-item label="降级流水" v-bind="layout">
          <a-input-number v-decorator="editingFormGroup.downgrade" style="width: 100%"></a-input-number>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { FieldDecoratorOptions, WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { ModalOptions } from 'ant-design-vue/types/modal';
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';

import { GoodsCategoryEntity } from '@/entities';
import { EditingMode } from '@/enums';
import { Column, FormGroup, GoodsCaterogy } from '@/interfaces';

import { Layout } from '../mixins';
import { columns } from './performance-examine.columns';

const { mapState } = createNamespacedHelpers('setting/performance-examine');

export default Vue.extend({
  mixins: [Layout],
  created() {
    this.$store.dispatch('setting/performance-examine/getAll');
  },
  data(): State {
    return {
      record: undefined,
      mode: undefined,
      columns,
      editingModal: undefined,
      queryingForm: this.$form.createForm(this),
      editingForm: this.$form.createForm(this),
    };
  },
  computed: {
    ...mapState(['list', 'loading']),
    queryingFormGroup(): FormGroup {
      return {
        level: ['level'],
      };
    },
    editingFormGroup(): FormGroup {
      return {
        level: ['level', { rules: [{ required: true, message: '请输入代理类型' }] }],
        upgrade: ['upgrade', { rules: [{ required: true, message: '请输入升级流水' }] }],
        downgrade: ['downgrade', { rules: [{ required: true, message: '请输入降级流水' }] }],
      };
    },
  },
  methods: {
    /**
     * 搜索
     */
    onSearch() {
      this.queryingForm.validateFields((errors, values) => {
        if (errors) return;
        this.$store.dispatch('setting/performance-examine/search', values);
      });
    },

    /**
     * 新增
     */
    async onCreate() {
      this.mode = EditingMode.新增;
      this.editingModal = {
        title: '新增',
      };
      await this.$nextTick();
      this.editingForm.setFieldsValue({ name: undefined, sort: undefined });
    },

    /**
     * 更新
     */
    async onUpdate(record: GoodsCaterogy) {
      this.mode = EditingMode.编辑;
      this.record = record;
      this.editingModal = {
        title: '编辑',
      };
      await this.$nextTick();
      this.editingForm.setFieldsValue({ name: record.name, sort: record.sort });
    },
    async onDelete(record: GoodsCaterogy) {
      this.$store.dispatch('setting/performance-examine/delete', record.id);
    },

    /**
     * 确认编辑
     */
    onConfirm() {
      switch (this.mode) {
        case EditingMode.新增:
          this.editingForm.validateFields(async (errors, values) => {
            if (errors) return;
            await this.$store.dispatch('setting/performance-examine/create', values);
            this.mode = undefined;
          });
          break;
        case EditingMode.编辑:
          this.editingForm.validateFields(async (errors, values) => {
            if (errors) return;
            await this.$store.dispatch('setting/performance-examine/update', {
              id: this.record!.id,
              ...values,
            });
            this.mode = undefined;
            this.record = undefined;
          });
          break;
      }
    },

    /**
     * 取消编辑
     */
    onCancel() {
      this.mode = undefined;
    },
  },
});

interface State {
  mode: EditingMode | undefined;
  record: GoodsCategoryEntity | undefined;
  columns: Column[];
  editingModal: Partial<ModalOptions> | undefined;
  queryingForm: WrappedFormUtils;
  editingForm: WrappedFormUtils;
}
</script>
