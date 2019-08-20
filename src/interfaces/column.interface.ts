import {
  FieldDecoratorOptions,
  ValidationRule,
  WrappedFormUtils,
} from 'ant-design-vue/types/form/form';
import { Column as AColumn } from 'ant-design-vue/types/table/column';

export interface Column extends Partial<AColumn> {
  /**
   * 是否用于查询
   *
   * @default false
   */
  queriable?: boolean;

  /**
   * 表单控件配置
   *
   * 当为 `false` 时，表示不生成表单控件
   *
   * @default 'input'
   */
  control?: boolean | string | OverridableControlOption;

  field?: OverridableFieldOptions;

  /**
   * 是否只读
   *
   * 当为 `false` 时，只在表格中显示
   */
  editable?: boolean | 'create' | 'update' | 'read' | Array<'create' | 'update' | 'read'>;

  /**
   * 是否在列表中展示
   *
   * 当为 `false` 时，列表中将不会显示该字段
   */
  display?: boolean;
}

export interface ControlOption {
  /**
   * 组件名称
   */
  name: string;

  [key: string]: any;
}

export interface OverridableControlOption extends ControlOption {
  /**
   * 查询表单的特殊化配置
   */
  querying?: Partial<ControlOption>;

  /**
   * 编辑表单的特殊化配置
   */
  editing?: Partial<ControlOption>;
}

interface CustomValidationRule extends ValidationRule {
  // tslint:disable-next-line: ban-types
  validator?: (rule: any, value: any, callback: Function, form?: WrappedFormUtils) => any;
}

export interface OverridableFieldOptions extends FieldDecoratorOptions {
  rules?: CustomValidationRule[];

  /**
   * 查询表单的特殊化配置
   */
  querying?: Partial<FieldDecoratorOptions>;

  /**
   * 编辑表单的特殊化配置
   */
  editing?: Partial<FieldDecoratorOptions>;
}
