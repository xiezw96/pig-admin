<template>
  <a-form :form="form" v-if="hasControl" v-bind="$attrs">
    <a-row :gutter="24">
      <a-col v-for="column in normalizedColumns" :key="column.key" :span="colSpan">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <template v-slot:label>{{column.title}}</template>
          <component
            :is="`a-${column.control.name}`"
            v-decorator="[column.dataIndex, column.field]"
            v-bind="column.control.config"
          ></component>
        </a-form-item>
      </a-col>
      <a-col v-if="$scopedSlots.action" :span="colSpan" style="float: right">
        <a-form-item :wrapperCol="{ span: actionsColSpan }" style="text-align: right;">
          <slot name="action" :form="form"></slot>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { get, has, set } from 'lodash';
import Vue from 'vue';

import { Column, ControlOption } from '@/interfaces';

const TOTAL_SPAN = 24;

export default Vue.extend({
  name: 'cac-form',
  props: ['columns', 'cols', 'labelCol', 'wrapperCol', 'disabled', 'initialValue', 'placeholder'],
  data() {
    return {
      form: this.$form.createForm(this),
    };
  },
  computed: {
    /**
     * 将列数转换为列大小
     */
    colSpan(): number {
      return TOTAL_SPAN / (this.cols || 1);
    },

    /**
     * 交互控件的大小
     */
    actionsColSpan(): number {
      return this.labelCol.span + this.wrapperCol.span;
    },

    /**
     * 是否含有控件
     */
    hasControl(): boolean {
      return this.columns && this.columns.length > 0;
    },

    /**
     * 序列化表单控件配置
     * 1. 将control的配置标准化为详细模式
     * 1. 添加默认配置
     */
    normalizedColumns(this: any) {
      let tempColumns: Column[];

      // 序列化 column 配置中的 control 项，将 control 项的简单配置转换为详细配置
      tempColumns = this.columns.map((column: Column) => {
        if (column.control === undefined) {
          return {
            ...column,
            control: {
              name: 'input',
            },
          };
        }

        if (typeof column.control === 'string') {
          return {
            ...column,
            control: {
              name: column.control,
            },
          };
        }

        if (typeof column.control === 'object') {
          const { name, ...config } = column.control;

          return {
            ...column,
            control: {
              name,
              config,
            },
          };
        }
      });

      if (this.disabled !== undefined) {
        tempColumns = tempColumns.map(column => {
          set(column, 'control.config.disabled', this.disabled);
          return column;
        });
      }

      if (this.placeholder !== undefined) {
        tempColumns = tempColumns.map(column => {
          if (get(column.control, 'config.placeholder') !== undefined) return column;
          set(column, 'control.config.placeholder', this.placeholder);
          return column;
        });
      }

      if (this.initialValue !== undefined) {
        tempColumns = tempColumns.map(column => {
          const value = get(this.initialValue, column.dataIndex!);
          set(column, 'field.initialValue', value);
          return column;
        });
      }

      // 将 form 传给自定义 validator 以实现表单联动验证
      tempColumns = tempColumns.map(col => {
        if (!has(col.field, 'rules')) return col;
        const rules = col.field!.rules!.map(rule => {
          if (!rule.validator) return rule;
          rule.validator = (r, value, callback) => {
            return rule.validator!(r, value, callback, this.form);
          };
        });
        return {
          ...col,
          field: {
            ...col.field,
            rules,
          },
        } as Column;
      });

      return tempColumns;
    },
  },
});
</script>
