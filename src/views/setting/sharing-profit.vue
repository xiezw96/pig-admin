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
        <a-form-item label="商品售价" v-bind="layout">
          <a-input v-decorator="formGroup.goodsPrice"></a-input>
        </a-form-item>
        <a-form-item label="代理上级分润比例" v-bind="layout">
          <a-input
            v-decorator="formGroup.upAgentShareProfit"
            addonAfter="%"
          ></a-input>
        </a-form-item>
        <a-form-item label="代理分润比例" v-bind="layout">
          <a-input
            v-decorator="formGroup.agentShareProfit"
            addonAfter="%"
          ></a-input>
        </a-form-item>
        <!-- <a-form-item label="省代分润" v-bind="layout">
          <a-input
            v-decorator="formGroup.provinceShareProfit"
            addonAfter="%"
          ></a-input>
        </a-form-item>
        <a-form-item label="市代分润比例" v-bind="layout">
          <a-input
            v-decorator="formGroup.cityShareProfit"
            addonAfter="%"
          ></a-input>
        </a-form-item>
        <a-form-item label="区/县代分润比例" v-bind="layout">
          <a-input
            v-decorator="formGroup.areaShareProfit"
            addonAfter="%"
          ></a-input>
        </a-form-item> -->
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
import { sharingProfitService } from '@/services';

import { Layout } from '../mixins';
import { columns } from './sharing-profit.columns';
import { SharingProfitState } from './sharing-profit.state';

export default Vue.extend({
  mixins: [Layout],
  created() {
    this.find();
  },
  data() {
    return new SharingProfitState(this.$form.createForm(this));
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
        goodsPrice: [
          'goodsPrice',
          { rules: [{ pattern: /^\d*$/, message: '请输入数字' }] },
        ],
        upAgentShareProfit: [
          'upAgentShareProfit',
          {
            rules: [
              {
                pattern: /^([0-9]|([1-9][0-9])|(100))$/,
                message: '请输入0-100的数值',
              },
            ],
          },
        ],
        agentShareProfit: [
          'agentShareProfit',
          {
            rules: [
              {
                pattern: /^([0-9]|([1-9][0-9])|(100))$/,
                message: '请输入0-100的数值',
              },
            ],
          },
        ],
        provinceShareProfit: [
          'provinceShareProfit',
          {
            rules: [
              {
                pattern: /^([0-9]|([1-9][0-9])|(100))$/,
                message: '请输入0-100的数值',
              },
            ],
          },
        ],
        cityShareProfit: [
          'cityShareProfit',
          {
            rules: [
              {
                pattern: /^([0-9]|([1-9][0-9])|(100))$/,
                message: '请输入0-100的数值',
              },
            ],
          },
        ],
        areaShareProfit: [
          'areaShareProfit',
          {
            rules: [
              {
                pattern: /^([0-9]|([1-9][0-9])|(100))$/,
                message: '请输入0-100的数值',
              },
            ],
          },
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
        goodsPrice: undefined,
        upAgentShareProfit: undefined,
        agentShareProfit: undefined,
        provinceShareProfit: undefined,
        cityShareProfit: undefined,
        areaShareProfit: undefined,
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
    async onConfirm() {
      switch (this.mode) {
        case EditingMode.新增:
          this.form.validateFields(async (errors, values) => {
            if (errors) return;
            await sharingProfitService.create(values);
            this.find();
            this.mode = EditingMode.无;
          });
          break;
        case EditingMode.编辑:
          this.form.validateFields(async (errors, values) => {
            if (errors) return;
            await sharingProfitService.update(this.record!.id, values);
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
        const data = await sharingProfitService.find();
        this.pagingList = data;
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>
