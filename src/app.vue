<template>
  <a-locale-provider :locale="localData">
    <global-error-handler>
      <router-view></router-view>
    </global-error-handler>
  </a-locale-provider>
</template>

<script lang="ts">
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { Component, Vue } from 'vue-property-decorator';

import { GlobalErrorHandlerComponent } from '@/core';

@Component({
  components: {
    GlobalErrorHandler: GlobalErrorHandlerComponent,
  },
})
export default class AppComponent extends Vue {
  localData = zh_CN;
}
</script>
