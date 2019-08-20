<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="标题">
          <a-input
            v-decorator="queryingFormGroup.title"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-decorator="queryingFormGroup.status"
            style="width: 170px;"
            placeholder="全部"
            allowClear
          >
            <a-select-option :value="0">开启</a-select-option>
            <a-select-option :value="1">关闭</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="onReset()">重置</a-button>
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
      :dataSource="pagingList"
    >
      <template #status="text">
        {{ text | announcement_status }}
      </template>
      <template #actions="...args">
        <a-tooltip placement="top" :mouseLeaveDelay="0">
          <template #title>
            编辑
          </template>
          <a-button
            size="small"
            shape="circle"
            icon="edit"
            @click="onUpdate(...args)"
          ></a-button>
        </a-tooltip>
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
        <a-form-item label="标题" v-bind="layout">
          <a-input v-decorator="editingFormGroup.title"></a-input>
        </a-form-item>
        <a-form-item label="状态" v-bind="layout">
          <a-radio-group v-decorator="editingFormGroup.status">
            <a-radio :value="0">开启</a-radio>
            <a-radio :value="1">关闭</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="弹窗周期" v-bind="layout">
          <a-select v-decorator="editingFormGroup.period">
            <a-select-option :value="0">仅一次</a-select-option>
            <a-select-option :value="1">每周一次</a-select-option>
            <a-select-option :value="2">每月一次</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="内容" v-bind="layout">
          <a-textarea
            v-decorator="editingFormGroup.content"
            :rows="4"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  FieldDecoratorOptions,
  WrappedFormUtils,
} from 'ant-design-vue/types/form/form';
import { ModalOptions } from 'ant-design-vue/types/modal';
import Vue from 'vue';

import { AnnouncementEntity, GoodsCategoryEntity } from '@/entities';
import { EditingMode } from '@/enums';
import { Column, FormGroup, GoodsCaterogy } from '@/interfaces';
import {
  announcementService,
  categoryService,
  FindAnnouncementsDto,
} from '@/services';

import { Layout } from '../mixins';
import { columns } from './announcement.columns';
import { AnnouncementState } from './announcement.state';

export default Vue.extend({
  mixins: [Layout],
  created() {
    this.find(this.prevFindDto);
  },
  data() {
    return new AnnouncementState(
      this.$form.createForm(this),
      this.$form.createForm(this),
    );
  },
  computed: {
    queryingFormGroup(): FormGroup {
      return {
        title: ['title'],
        status: ['status'],
      };
    },
    editingFormGroup(): FormGroup {
      return {
        title: [
          'title',
          { rules: [{ required: true, message: '请输入标题' }] },
        ],
        status: [
          'status',
          { rules: [{ required: true, message: '请选择状态' }] },
        ],
        period: [
          'period',
          { rules: [{ required: true, message: '请选择弹窗周期' }] },
        ],
        content: [
          'content',
          { rules: [{ required: true, message: '请输入内容' }] },
        ],
      };
    },
  },
  methods: {
    /**
     * 搜索
     */
    onSearch() {
      this.queryingForm.validateFields(async (errors, values) => {
        if (errors) return;
        this.find({
          ...values,
          size: this.pagination.pageSize,
          current: 1,
        });
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
      this.editingForm.setFieldsValue({
        title: undefined,
        status: undefined,
        period: undefined,
        content: undefined,
      });
    },

    /**
     * 更新
     */
    async onUpdate(record: AnnouncementEntity) {
      this.mode = EditingMode.编辑;
      this.record = record;
      this.editingModal = {
        title: '编辑',
      };
      await this.$nextTick();
      this.editingForm.setFieldsValue({
        title: record.title,
        status: record.status,
        period: record.period,
        content: record.content,
      });
    },

    /**
     * 确认编辑
     */
    onConfirm() {
      switch (this.mode) {
        case EditingMode.新增:
          this.editingForm.validateFields(async (errors, values) => {
            if (errors) return;
            await announcementService.create(values);
            this.refresh();
            this.mode = EditingMode.无;
          });
          break;
        case EditingMode.编辑:
          this.editingForm.validateFields(async (errors, values) => {
            if (errors) return;
            await announcementService.update(this.record!.id, values);
            this.refresh();
            this.mode = EditingMode.无;
            this.record = undefined;
          });
          break;
      }
    },

    /**
     * 取消编辑
     */
    onCancel() {
      this.mode = EditingMode.无;
    },

    onReset() {
      this.queryingForm.resetFields();
    },

    async find(dto: FindAnnouncementsDto) {
      this.loading = true;

      try {
        const data = await announcementService.find(dto);
        this.pagingList = data.list;
        this.pagination.total = data.total;
        this.prevFindDto = dto;
      } finally {
        this.loading = false;
      }
    },

    async refresh() {
      this.find(this.prevFindDto);
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
