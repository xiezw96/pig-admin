<script lang="ts" src="./button-for-auditing.component.ts"></script>
<template>
  <a-tooltip placement="top" :mouseLeaveDelay="0">
    <template #title>
      审核
    </template>
    <a-button size="small" shape="circle" icon="edit" @click="onAudit()">
      <a-modal
        :width="1000"
        title="审核"
        v-model="visible"
        :maskClosable="false"
        @ok="onConfirm()"
      >
        <a-form :form="form">
          <a-row>
            <a-col :span="12">
              <a-form-item label="姓名" v-bind="layout" class="plain-content">
                {{ record.name }}
              </a-form-item>
              <a-form-item label="手机号" v-bind="layout" class="plain-content">
                {{ record.phone }}
              </a-form-item>
              <a-form-item
                label="微信号："
                v-bind="layout"
                class="plain-content"
              >
                {{ record.wechatId }}
              </a-form-item>
              <a-form-item
                label="推荐人："
                v-bind="layout"
                class="plain-content"
              >
                {{ record.referrerName }}
              </a-form-item>
              <a-form-item
                label="身份证号："
                v-bind="layout"
                class="plain-content"
              >
                {{ record.idCard }}
              </a-form-item>
              <a-form-item label="证件照" v-bind="layout" class="plain-content">
                <div class="images">
                  <span
                    class="image front"
                    :style="{
                      backgroundImage: `url('${a2b(
                        record.identityCardFront,
                      )}')`,
                    }"
                    @click="onPreview(a2b(record.identityCardFront))"
                  ></span>
                  <span
                    class="image back"
                    :style="{
                      backgroundImage: `url('${a2b(
                        record.identityCardVerso,
                      )}')`,
                    }"
                    @click="onPreview(a2b(record.identityCardVerso))"
                  ></span>
                </div>
              </a-form-item>
              <a-form-item label="银行卡" v-bind="layout" class="plain-content">
                <div class="images">
                  <span
                    class="image front"
                    :style="{
                      backgroundImage: `url('${a2b(record.bankCardFront)}')`,
                    }"
                    @click="onPreview(a2b(record.bankCardFront))"
                  ></span>
                  <span
                    class="image back"
                    :style="{
                      backgroundImage: `url('${a2b(record.bankCardVerso)}')`,
                    }"
                    @click="onPreview(a2b(record.bankCardVerso))"
                  ></span>
                </div>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="代理类型" v-bind="layout">
                <a-select
                  v-decorator="formGroup.level"
                  :disabled="record.auditStatus !== 0"
                >
                  <a-select-option :value="0">省级代理</a-select-option>
                  <a-select-option :value="1">市级代理</a-select-option>
                  <a-select-option :value="2">区级代理</a-select-option>
                  <a-select-option :value="3">初级代理</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="负责片区" v-bind="layout">
                <a-cascader
                  v-decorator="formGroup.area"
                  :options="areas"
                  placeholder=""
                  :disabled="record.auditStatus !== 0"
                ></a-cascader>
              </a-form-item>
              <a-form-item label="审核" v-bind="layout">
                <a-radio-group
                  v-decorator="formGroup.auditStatus"
                  :disabled="record.auditStatus !== 0"
                >
                  <a-radio :value="1">通过</a-radio>
                  <a-radio :value="2">拒绝</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="备注" v-bind="layout">
                <a-textarea
                  v-decorator="formGroup.remark"
                  :disabled="record.auditStatus !== 0"
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
        :bodyStyle="{ padding: '8px' }"
      >
        <div class="preview-container">
          <img class="preview" :src="previewUrl" />
        </div>
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
  margin-bottom: 0 !important;
}

.preview-container {
  height: 100%;
  text-align: center;
}

.preview {
  display: inline-block;
  max-width: 100%;
}
</style>

