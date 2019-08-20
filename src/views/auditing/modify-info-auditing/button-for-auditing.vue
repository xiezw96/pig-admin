<script lang="ts" src="./button-for-auditing.component.ts"></script>
<template>
  <a-tooltip placement="top" :mouseLeaveDelay="0">
    <template #title>
      审核
    </template>
    <a-button size="small" shape="circle" icon="edit" @click="onAudit()">
      <a-modal
        :width="800"
        title="审核"
        v-model="visible"
        :maskClosable="false"
        centered
        destroyOnClose
        @ok="onConfirm()"
      >
        <a-form :form="form">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="原代理姓名："
                v-bind="layout"
                class="plain-content"
              >
                {{ record.name }}
              </a-form-item>
              <a-form-item
                label="原身份证："
                v-bind="layout"
                class="plain-content"
              >
                {{ record.idCard }}
              </a-form-item>
              <a-form-item label="微信号" v-bind="layout" class="plain-content">
                {{ record.wechatId }}
              </a-form-item>
              <a-form-item label="手机号" v-bind="layout" class="plain-content">
                {{ record.phone }}
              </a-form-item>
              <a-form-item
                label="原证件照："
                v-bind="layout"
                class="plain-content"
              >
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
              <a-form-item
                label="原证件照："
                v-bind="layout"
                class="plain-content"
              >
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
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="新代理姓名："
                v-bind="layout"
                class="plain-content"
              >
                {{ record.name }}
              </a-form-item>
              <a-form-item
                label="新身份证："
                v-bind="layout"
                class="plain-content"
              >
                {{ record.idCard }}
              </a-form-item>
              <a-form-item label="微信号" v-bind="layout" class="plain-content">
                {{ record.newWechatId }}
              </a-form-item>
              <a-form-item label="手机号" v-bind="layout" class="plain-content">
                {{ record.newPhone }}
              </a-form-item>
              <a-form-item
                label="新证件照："
                v-bind="layout"
                class="plain-content"
              >
                <div class="images">
                  <span
                    class="image front"
                    :style="{
                      backgroundImage: `url(${atob(
                        record.newIdentityCardFront,
                      )})`,
                    }"
                    @click="onPreview(atob(record.newIdentityCardFront))"
                  ></span>
                  <span
                    class="image back"
                    :style="{
                      backgroundImage: `url(${atob(
                        record.newIdentityCardVerso,
                      )})`,
                    }"
                    @click="onPreview(atob(record.newIdentityCardVerso))"
                  ></span>
                </div>
              </a-form-item>
              <a-form-item
                label="新银行卡："
                v-bind="layout"
                class="plain-content"
              >
                <div class="images">
                  <span
                    class="image front"
                    :style="{
                      backgroundImage: `url(${atob(record.newBankCardFront)})`,
                    }"
                    @click="onPreview(atob(record.newBankCardFront))"
                  ></span>
                  <span
                    class="image back"
                    :style="{
                      backgroundImage: `url(${atob(record.newBankCardVerso)})`,
                    }"
                    @click="onPreview(atob(record.newBankCardVerso))"
                  ></span>
                </div>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="审核"
                :labelCol="{ span: 6 }"
                :wrapperCol="{ span: 12 }"
              >
                <a-radio-group
                  v-decorator="formGroup.auditStatus"
                  :disabled="record.updateAuditStatus !== 0"
                >
                  <a-radio :value="1">通过</a-radio>
                  <a-radio :value="2">拒绝</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                label="备注"
                :labelCol="{ span: 6 }"
                :wrapperCol="{ span: 12 }"
              >
                <a-textarea
                  v-decorator="formGroup.remark"
                  :disabled="record.updateAuditStatus !== 0"
                ></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
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
    </a-button>
  </a-tooltip>
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

