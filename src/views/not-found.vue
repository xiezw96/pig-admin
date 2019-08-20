<template>
  <a-row type="flex" align="middle" style="height: 100%;">
    <a-col :span="14" style="text-align: center;">
      <img src="@/assets/404.svg" style="max-width: 100%;" />
    </a-col>
    <a-col :span="10">
      <h1 class="status-code">404</h1>
      <p class="tip">抱歉，你访问的页面不存在</p>
      <a-button type="primary" size="small" @click="onBackHome()">
        <a-icon type="home"></a-icon>
        返回首页
      </a-button>
      <a-button size="small" @click="onBack()" style="margin-left: 8px;">
        <a-icon type="arrow-left"></a-icon>
        返回上一页
      </a-button>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  methods: {
    onBackHome() {
      this.$router.push({ name: 'home' });
    },
    onBack() {
      this.$router.back();
    },
  },
});
</script>

<style lang="less" scoped>
.status-code {
  margin-bottom: 24px;
  color: #434e59;
  font-weight: 600;
  font-size: 72px;
  line-height: 72px;
}

.tip {
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 20px;
  line-height: 28px;
}
</style>

