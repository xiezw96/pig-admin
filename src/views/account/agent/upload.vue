<script src="./upload.component.ts"></script>
<template>
  <div>
    <a-upload
      action="api/admin/file"
      accept=".jpg,.png,.gif"
      listType="picture-card"
      v-bind="$attrs"
      :defaultFileList="fileList"
      @change="onUpload($event)"
    >
      <div v-if="!value">
        <a-icon type="plus"></a-icon>
      </div>
    </a-upload>
    <div class="image-title">{{ title }}</div>
  </div>
</template>
<style lang="less" scoped>
.image-title {
  text-align: center;
}
</style>
