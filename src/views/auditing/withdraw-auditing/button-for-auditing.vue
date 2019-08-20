<script lang="ts" src="./button-for-auditing.component.ts"></script>
<template>
  <div style="display: inline-block;">
    <template v-if="record.auditStatus === 0">
      <a-tooltip placement="top" :mouseLeaveDelay="0">
        <template #title>
          审核
        </template>
        <a-button
          size="small"
          shape="circle"
          icon="edit"
          @click="onAudit()"
        ></a-button>
      </a-tooltip>
    </template>
    <template v-else>
      <a-tooltip placement="top" :mouseLeaveDelay="0">
        <template #title>
          查看
        </template>
        <a-button
          size="small"
          shape="circle"
          icon="eye"
          @click="onRead()"
        ></a-button>
      </a-tooltip>
    </template>
    <a-modal
      title="审核"
      v-model="visible"
      :maskClosable="false"
      @ok="onConfirm()"
      destroyOnClose
      :footer="isReadonly ? null : undefined"
    >
      <a-form :form="form">
        <a-form-item label="代理" v-bind="layout" class="plain-content">
          {{ record.userName }}
        </a-form-item>
        <a-form-item label="当前金额" v-bind="layout" class="plain-content">
          {{ record.total }}
        </a-form-item>
        <a-form-item label="提现金额" v-bind="layout" class="plain-content">
          {{ record.withdrawalPrice }}
        </a-form-item>
        <a-form-item label="身份证" v-bind="layout" class="plain-content">
          <div class="images">
            <span
              class="image front"
              :style="{
                backgroundImage: `url(${atob(record.identityCardFront)})`,
              }"
              @click="onPreview(atob(record.identityCardFront))"
            ></span>
            <span
              class="image back"
              :style="{
                backgroundImage: `url(${atob(record.identityCardVerso)})`,
              }"
              @click="onPreview(atob(record.identityCardVerso))"
            ></span>
          </div>
        </a-form-item>
        <a-form-item label="银行卡" v-bind="layout" class="plain-content">
          <div class="images">
            <span
              class="image front"
              :style="{
                backgroundImage: `url(${atob(record.bankCardFront)})`,
              }"
              @click="onPreview(atob(record.bankCardFront))"
            ></span>
            <span
              class="image back"
              :style="{
                backgroundImage: `url(${atob(record.bankCardVerso)})`,
              }"
              @click="onPreview(atob(record.bankCardVerso))"
            ></span>
          </div>
        </a-form-item>
        <a-form-item label="审核" v-bind="layout">
          <a-radio-group
            v-decorator="formGroup.auditStatus"
            :disabled="isReadonly"
          >
            <a-radio :value="1">通过</a-radio>
            <a-radio :value="2">拒绝</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="备注" v-bind="layout">
          <a-textarea
            v-decorator="formGroup.remark"
            :disabled="isReadonly"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="preview"
      :zIndex="9999"
      :footer="null"
      centered
      :mask="false"
      :bodyStyle="{ padding: '8px', textAlign: 'center' }"
    >
      <img class="preview" :src="previewUrl" />
    </a-modal>
  </div>
</template>
<style lang="scss" scoped>
$image-width: 100px;
$image-height: $image-width * 9 / 16;

.images {
  .image {
    cursor: pointer;
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .image + .image {
    margin-left: 14px;
  }

  .image.front,
  .image.back {
    display: inline-block;
    width: $image-width;
    height: $image-height;
  }
}

.plain-content {
  min-height: 40px;
  margin-bottom: 8px;
}

.preview {
  max-width: 100%;
}
</style>
