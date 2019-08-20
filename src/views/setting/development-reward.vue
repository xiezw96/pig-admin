<template>
  <div>
    <a-button type="primary" @click="onCreate()">新增</a-button>
    <a-table
      rowKey="id"
      :loading="loading"
      size="middle"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="pagingList"
    >
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
      <a-form :form="form">
        <a-form-item label="奖励金额/个" v-bind="layout">
          <a-input v-decorator="formGroup.awardMoney"></a-input>
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
import { createNamespacedHelpers } from 'vuex';

import { GoodsCategoryEntity } from '@/entities';
import { EditingMode } from '@/enums';
import { Column, FormGroup, GoodsCaterogy } from '@/interfaces';
import { developmentRewardService } from '@/services';

import { Layout } from '../mixins';
import { DevelopmentRewardState } from './development-reward.state';

export default Vue.extend({
  mixins: [Layout],
  created() {
    this.find();
  },
  data() {
    return new DevelopmentRewardState(this.$form.createForm(this));
  },
  computed: {
    layout() {
      const labelColSpan = 8;
      const wrapperColSpan = 22 - labelColSpan;

      return {
        labelCol: { span: labelColSpan },
        wrapperCol: { span: wrapperColSpan },
      };
    },
    formGroup(): FormGroup {
      return {
        awardMoney: [
          'awardMoney',
          { rules: [{ pattern: /^\d*$/, message: '请输入数字' }] },
        ],
      };
    },
  },
  methods: {
    /**
     * 新增
     */
    async onCreate() {
      this.mode = EditingMode.新增;
      this.editingModal = {
        title: '新增',
      };
      await this.$nextTick();
      this.form.setFieldsValue({
        awardMoney: undefined,
      });
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
      this.form.setFieldsValue(record);
    },

    /**
     * 确认编辑
     */
    onConfirm() {
      switch (this.mode) {
        case EditingMode.新增:
          this.form.validateFields(async (errors, values) => {
            if (errors) return;
            await developmentRewardService.create(values);
            this.find();
            this.mode = EditingMode.无;
          });
          break;
        case EditingMode.编辑:
          this.form.validateFields(async (errors, values) => {
            if (errors) return;
            await developmentRewardService.update(this.record!.id, values);
            this.find();
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

    async find() {
      this.loading = true;
      try {
        const data = await developmentRewardService.find();
        this.pagingList = data;
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>
