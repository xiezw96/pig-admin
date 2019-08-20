import { Col } from 'ant-design-vue';
import { FormItem } from 'ant-design-vue/types/form/form-item';
import { Component, Vue } from 'vue-property-decorator';

type FormItemLayout = Pick<FormItem, 'labelCol' | 'wrapperCol'>;

@Component<Layout>({
  beforeCreate() {
    this.layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };
  },
})
export class Layout extends Vue {
  layout: Record<keyof FormItemLayout, Partial<Col>>;
}
