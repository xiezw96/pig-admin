import Vue from 'vue';

export const Layout = Vue.extend({
  computed: {
    layout() {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
      };
    },
  },
});
