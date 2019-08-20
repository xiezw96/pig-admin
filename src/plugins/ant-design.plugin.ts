import { PluginObject, VueConstructor } from 'vue';

import {
  Avatar,
  Button,
  Card,
  Cascader,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  LocaleProvider,
  Menu,
  message,
  Modal,
  notification,
  Popconfirm,
  Radio,
  Row,
  Select,
  Spin,
  Table,
  Tag,
  Tooltip,
  Transfer,
  Tree,
  Upload,
} from 'ant-design-vue';

export class AntDesignPlugin implements PluginObject<any> {
  install(Vue: VueConstructor) {
    Vue.use(Avatar);
    Vue.use(Button);
    Vue.use(Card);
    Vue.use(Cascader);
    Vue.use(Col);
    Vue.use(DatePicker);
    Vue.use(Divider);
    Vue.use(Dropdown);
    Vue.use(Form);
    Vue.use(Icon);
    Vue.use(Input);
    Vue.use(InputNumber);
    Vue.use(Layout);
    Vue.use(LocaleProvider);
    Vue.use(Menu);
    Vue.use(Modal);
    Vue.use(Popconfirm);
    Vue.use(Radio);
    Vue.use(Row);
    Vue.use(Select);
    Vue.use(Spin);
    Vue.use(Table);
    Vue.use(Tag);
    Vue.use(Tooltip);
    Vue.use(Transfer);
    Vue.use(Tree);
    Vue.use(Upload);
    Vue.prototype.$message = message;
    Vue.prototype.$notification = notification;
  }
}

declare module 'vue/types/vue' {
  export interface Vue {
    $message: typeof message;
    $notification: typeof notification;
  }
}
