<template>
  <div>
    <cac-form
      class="query-form"
      :columns="queriableColumns"
      :cols="3"
      :labelCol="queryingFormLabelCol"
      :wrapperCol="queryingFormWrapperCol"
      placeholder="全部"
    >
      <template #action="{ form }">
        <slot name="query-area"></slot>
        <a-button v-if="creatable" type="primary" @click="onCreate()">新增</a-button>
        <a-button type="primary" @click="onQuery(form)">查询</a-button>
        <a-button type="dashed" @click="form.resetFields()">重置</a-button>
      </template>
    </cac-form>
    <a-table
      rowKey="id"
      size="middle"
      :loading="loading"
      :columns="_columns"
      :dataSource="stateDataSource"
      v-bind="$attrs"
      :pagination="pagination"
      @change="onTableChange(...arguments)"
    >
      <!-- Pass on all named slots -->
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

      <!-- Pass on all scoped slots -->
      <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="...args">
        <slot :name="slot" v-bind:args="args"/>
      </template>

      <span slot="action" slot-scope="text, record">
        <template v-if="readable">
          <a-tooltip placement="top" :mouseLeaveDelay="0">
            <template #title>查看</template>
            <a-button size="small" shape="circle" icon="eye" @click="onRead(record)"></a-button>
          </a-tooltip>
        </template>

        <template v-if="updatable">
          <a-divider type="vertical"/>
          <a-tooltip placement="top" :mouseLeaveDelay="0">
            <template #title>编辑</template>
            <a-button size="small" shape="circle" icon="edit" @click="onUpdate(record)"></a-button>
          </a-tooltip>
        </template>

        <template v-if="$scopedSlots['extra-action']">
          <a-divider type="vertical"/>
          <slot name="extra-action" v-bind="{ text, record }"></slot>
        </template>

        <template v-if="deletable">
          <a-divider type="vertical"/>
          <a-popconfirm
            title="确定删除？"
            okText="是"
            okType="danger"
            cancelText="否"
            @confirm="onDelete(record)"
          >
            <a-tooltip placement="top" :mouseLeaveDelay="0">
              <template #title>删除</template>
              <a-button type="danger" size="small" shape="circle" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </span>
    </a-table>
    <a-modal
      v-bind="editingModalProps"
      :afterClose="this.resetEditingFormStatus"
      @ok="onOk($event)"
      @cancel="onCancel($event)"
    >
      <cac-form
        ref="editingForm"
        layout="horizontal"
        :cols="1"
        :labelCol="editingFormLabelCol"
        :wrapperCol="editingFormWrapperCol"
        v-bind="editingFormProps"
      ></cac-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import deepmerge from 'deepmerge';
import { invoke, mapValues } from 'lodash';
import Vue from 'vue';

import { Crud } from '@/enums';
import { Column } from '@/interfaces';

import Form from './form.vue';

const initEditingFormProps: FormProps = {
  initialValue: {},
  disabled: false,
  columns: [],
};

const initEditingModalProps: ModalProps = {
  visible: false,
  title: '',
  maskClosable: true,
};

export default Vue.extend({
  name: 'cac-table',
  model: {
    prop: 'dataSource',
    event: 'update:dataSource',
  },
  props: ['columns', 'source', 'dataSource', 'initialDataSource', 'mask'],
  components: {
    'cac-form': Form,
  },
  created(this: any) {
    this.queryingForm = this.$form.createForm(this);
  },
  data(this: any): any {
    const stateDataSource: any[] =
      this.$props.dataSource === undefined ? this.initialDataSource : this.dataSource;

    return {
      loading: false,
      editingMode: undefined,
      editingModalProps: initEditingModalProps,
      editingFormProps: initEditingFormProps,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      prevFormValues: undefined,
      stateDataSource,
    };
  },
  watch: {
    dataSource(val) {
      this.stateDataSource = val;
    },
  },
  mounted(this: any) {
    if (!this.stateDataSource) {
      this.onQuery(this.queryingForm);
    }
  },
  computed: {
    isUncontroled(this: any) {
      return this.$props.dataSource === undefined;
    },
    _mask(): number {
      let caps: Array<Exclude<keyof typeof Crud, 'All' | 'None'>> = [];
      if (typeof this.mask === 'string') {
        caps = this.mask.split(',');
      } else if (Array.isArray(this.mask)) {
        caps = this.mask;
      }

      const mask = caps.reduce(
        (result: number, cap: Exclude<keyof typeof Crud, 'All' | 'None'>) => {
          result += Crud[cap];
          return result;
        },
        0,
      );

      return mask;
    },

    crud() {
      return Crud.All ^ (this._mask as any);
    },

    creatable() {
      return Boolean((this.crud as any) & Crud.Create);
    },

    updatable() {
      return Boolean((this.crud as any) & Crud.Update);
    },

    deletable() {
      return Boolean((this.crud as any) & Crud.Delete);
    },

    readable() {
      return Boolean((this.crud as any) & Crud.Read);
    },

    _source(): Source {
      if (typeof this.source === 'string') {
        return {
          readAll: {
            source: this.source,
          },
          create: {
            source: this.source,
          },
          read: {
            source: this.source,
          },
          update: {
            source: this.source,
          },
          delete: {
            source: this.source,
          },
        };
      }

      return mapValues(this.source, (value, key) => {
        if (typeof value !== 'string') return value;
        return {
          source: value,
        };
      }) as Source;
    },

    _columns(this: any) {
      const actionColumn = {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        control: false,
      };
      return this.columns.filter((col: Column) => col.display !== false).concat(actionColumn);
    },

    queryingFormLabelCol() {
      return { span: 6 };
    },
    queryingFormWrapperCol() {
      return { span: 16 };
    },

    editingFormLabelCol() {
      return { span: 4 };
    },

    editingFormWrapperCol() {
      return { span: 18 };
    },

    queriableColumns(): any[] {
      return this.columns.filter((col: Column) => col.queriable).map(this._mergeOption('querying'));
    },

    editableColumns(): any[] {
      return this.columns
        .filter((col: Column) => col.control !== false)
        .filter((col: Column) => col.editable !== false)
        .map(this._mergeOption('editing'));
    },

    editableCreateColumns(): any[] {
      return this._filterEditableColumns('create');
    },

    editableReadColumns(): any[] {
      return this._filterEditableColumns('read');
    },

    editableUpdateColumns(): any[] {
      return this._filterEditableColumns('update');
    },
  },
  methods: {
    onQuery(form: WrappedFormUtils) {
      if (this.$listeners.overrideQuery) {
        this.$emit('overrideQuery', { form: this.form });

        return;
      }
      this.$emit('query');
      form.validateFields(async (errors, values) => {
        if (errors) return;

        await this._fetchData(values, this.pagination);

        this.prevFormValues = values;
      });
    },

    onCreate() {
      if (this.$listeners.overrideCreate) {
        this.$emit('overrideCreate', { columns: this.editableCreateColumns });
        return;
      }

      this.$emit('create');

      this._openEditingModal(
        {
          title: '新建',
          maskClosable: false,
          visible: true,
        },
        {
          disabled: false,
          columns: this.editableCreateColumns,
        },
      );
    },

    onRead(record: any) {
      if (this.$listeners.overrideRead) {
        this.$emit('overrideRead', { columns: this.editableReadColumns, record });
        return;
      }

      this.$emit('read', record);

      this._openEditingModal(
        {
          title: '查看',
          maskClosable: true,
          visible: true,
        },
        {
          initialValue: record,
          disabled: true,
          columns: this.editableReadColumns,
        },
      );
    },

    onUpdate(record: any) {
      if (this.$listeners.overrideUpdate) {
        this.$emit('overrideUpdate', { columns: this.editableUpdateColumns, record });
        return;
      }

      this.$emit('update', record);

      this._openEditingModal(
        {
          title: '编辑',
          maskClosable: false,
          visible: true,
        },
        {
          initialValue: record,
          disabled: false,
          columns: this.editableUpdateColumns,
        },
      );
    },

    onDelete(record: any) {
      if (this.$listeners.overrideDelete) {
        this.$emit('overrideDelete', { columns: this.editableDeleteColumns, record });
        return;
      }

      this.$emit('delete', record);
    },

    onOk() {
      this._closeEditingModal();
    },

    onCancel() {
      this._closeEditingModal();
    },

    async onTableChange(pagination: any) {
      await this._fetchData(this.prevFormValues, pagination);
    },

    resetEditingFormStatus() {
      this._setEditingForm(initEditingFormProps);
      this._setEditingModal(initEditingModalProps);
      ((this.$refs.editingForm as any).form as WrappedFormUtils).resetFields();
    },

    async _fetchData(formValues: any, pagination: any) {
      try {
        this.loading = true;
        let params: any = {
          ...formValues,
          pageSize: pagination.pageSize,
          nowPage: pagination.current,
        };
        if ((this._source.readAll as SourceConfig).transformParams) {
          params = invoke(this._source.readAll, 'transformParams', formValues, {
            page: pagination.current,
            pageSize: pagination.pageSize,
          });
        }

        const { data } = await axios.post((this._source.readAll as SourceConfig).source, params);
        this.pagination = {
          total: data.recordCount,
          current: pagination.current,
          pageSize: pagination.pageSize,
        };
        this.$emit('update:dataSource', data.exhibitDatas);
        if (this.isUncontroled) {
          this.stateDataSource = data.exhibitDatas;
        }
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },

    _filterEditableColumns(editingMode: 'create' | 'read' | 'update') {
      return this.editableColumns.filter((col: Column) => {
        if (Array.isArray(col.editable)) {
          return col.editable.includes(editingMode);
        }
        if (typeof col.editable === 'string') {
          return col.editable === editingMode;
        }

        return true;
      });
    },

    _openEditingModal(modal: ModalProps, form: FormProps) {
      this._setEditingModal(modal);
      this._setEditingForm(form);
    },

    _closeEditingModal() {
      this._setEditingModal({
        ...this.editingModalProps,
        visible: false,
      });
    },

    _setEditingModal(props: ModalProps) {
      this.editingModalProps = props;
    },

    _setEditingForm(props: FormProps) {
      this.editingFormProps = props;
    },

    _mergeOption(usage: 'querying' | 'editing') {
      return (col: Column) => {
        const { control, field } = col;

        let mergedControl;
        let mergedField;

        if (typeof control === 'object') {
          const { querying, editing, ...controlOptions } = control;
          const override = control[usage];
          mergedControl = override ? deepmerge(controlOptions, override) : controlOptions;
        }

        if (field !== undefined) {
          const { querying, editing, ...fieldOptions } = field;
          const override = field[usage];
          mergedField = override ? deepmerge(fieldOptions, override) : fieldOptions;
        }

        return {
          ...col,
          control: mergedControl,
          field: mergedField,
        };
      };
    },
  },
});

interface Source {
  readAll: string | SourceConfig;
  create: string | SourceConfig;
  read: string | SourceConfig;
  update: string | SourceConfig;
  delete: string | SourceConfig;
}

interface SourceConfig {
  source: string;
  transformParams?: (...args: any[]) => any;
}

interface ModalProps {
  visible: false;
  title: string;
  maskClosable: boolean;
}

interface FormProps {
  initialValue?: any;
  disabled: boolean;
  columns: Column[];
}
</script>

<style lang="less" scoped>
.query-form {
  .ant-btn + .ant-btn {
    margin-left: 8px;
  }
}
</style>

