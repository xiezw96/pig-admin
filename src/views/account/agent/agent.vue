<script lang="ts" src="./agent.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="名称">
          <a-input v-decorator="queryingFormGroup.name"></a-input>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="onReset()">
            重置
          </a-button>
          <a-button type="primary" @click="onCreate()">新增</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      :loading="loading"
      size="middle"
      rowKey="agentId"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
    >
      <template #status="text">
        {{ text | activedstatus }}
      </template>
      <template #actions="text, record">
        <app-button-for-update
          @click="onUpdate(record)"
        ></app-button-for-update>
        <a-divider type="vertical" />
        <button-for-change-password
          :id="record.agentId"
        ></button-for-change-password>
        <a-divider type="vertical" />
        <app-button-for-delete
          @click="onDelete(record.agentId)"
        ></app-button-for-delete>
      </template>
    </a-table>
    <a-modal
      class="reset"
      v-model="editingModalVisible"
      v-bind="editingModal"
      centered
      :width="1000"
      :maskClosable="false"
      destroyOnClose
      @ok="onConfirm()"
    >
      <a-form :form="editingForm">
        <a-row>
          <a-col :span="12">
            <a-form-item label="姓名" v-bind="layout">
              <a-input
                v-decorator="editingFormGroup.name"
                :disabled="mode === 2"
              ></a-input>
            </a-form-item>
            <a-form-item label="手机号" v-bind="layout">
              <a-input v-decorator="editingFormGroup.phone"></a-input>
            </a-form-item>
            <a-form-item label="微信号" v-bind="layout">
              <a-input v-decorator="editingFormGroup.wechatId"></a-input>
            </a-form-item>
            <a-form-item label="身份证号" v-bind="layout">
              <a-input
                v-decorator="editingFormGroup.idCard"
                :disabled="mode === 2"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="证件照"
              v-bind="layout"
              style="margin-bottom: 0"
              required
            >
              <a-row type="flex" justify="space-around">
                <a-col>
                  <div>
                    <a-upload
                      v-decorator="editingFormGroup.identityCardFront"
                      action="api/admin/file"
                      accept=".jpg,.png,.gif"
                      listType="picture-card"
                      :headers="{ authorization }"
                    >
                      <div v-if="!checkUploaded('identityCardFront')">
                        <a-icon type="plus"></a-icon>
                      </div>
                    </a-upload>
                    <div class="image-title">正面</div>
                  </div>
                </a-col>
                <a-col>
                  <div>
                    <a-upload
                      v-decorator="editingFormGroup.identityCardVerso"
                      action="api/admin/file"
                      accept=".jpg,.png,.gif"
                      listType="picture-card"
                      :headers="{ authorization }"
                    >
                      <div v-if="!checkUploaded('identityCardVerso')">
                        <a-icon type="plus"></a-icon>
                      </div>
                    </a-upload>
                    <div class="image-title">背面</div>
                  </div>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item
              label="银行卡"
              v-bind="layout"
              style="margin-bottom: 0"
              required
            >
              <a-row type="flex" justify="space-around">
                <a-col>
                  <div>
                    <a-upload
                      v-decorator="editingFormGroup.bankCardFront"
                      action="api/admin/file"
                      accept=".jpg,.png,.gif"
                      listType="picture-card"
                      :headers="{ authorization }"
                    >
                      <div v-if="!checkUploaded('bankCardFront')">
                        <a-icon type="plus"></a-icon>
                      </div>
                    </a-upload>
                    <div class="image-title">正面</div>
                  </div>
                </a-col>
                <a-col>
                  <div>
                    <a-upload
                      v-decorator="editingFormGroup.bankCardVerso"
                      action="api/admin/file"
                      accept=".jpg,.png,.gif"
                      listType="picture-card"
                      :headers="{ authorization }"
                    >
                      <div v-if="!checkUploaded('bankCardVerso')">
                        <a-icon type="plus"></a-icon>
                      </div>
                    </a-upload>
                    <div class="image-title">
                      背面
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="推荐人" v-bind="layout">
              <a-input
                v-decorator="editingFormGroup.referrerCode"
                :disabled="mode === 2"
              ></a-input>
            </a-form-item>
            <a-form-item label="类型" v-bind="layout">
              <a-select v-decorator="editingFormGroup.level">
                <a-select-option value="1">普通</a-select-option>
                <a-select-option value="2">高级</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="负责片区" v-bind="layout">
              <a-cascader
                v-decorator="editingFormGroup.location"
                :options="area"
                placeholder=""
              ></a-cascader>
            </a-form-item>
            <a-form-item label="公司名称" v-bind="layout">
              <a-input v-decorator="editingFormGroup.company"></a-input>
            </a-form-item>
            <a-form-item label="状态" v-bind="layout">
              <a-radio-group v-decorator="editingFormGroup.auditStatus">
                <a-radio :value="0">待激活</a-radio>
                <a-radio :value="1">正常</a-radio>
                <a-radio :value="2">冻结</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item v-if="mode === 1" label="密码" v-bind="layout">
              <a-input
                v-decorator="editingFormGroup.pwd"
                type="password"
              ></a-input>
            </a-form-item>
            <div v-if="mode === 2">
              <a-form-item label="设备数量" v-bind="layout">
                <label v-decorator="record.activeSalesMachines"></label>
                {{record.activeSalesMachines}}/{{record.inactiveSalesMachines}} </a-form-item>
              <a-form-item label="发展数" v-bind="layout">{{record.activeDevelopAgents}}/{{record.inactiveDevelopAgents}} </a-form-item>
              <a-form-item label="归属用户数" v-bind="layout">{{record.userCount}}</a-form-item>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
<style lang="less">
.reset /deep/ .ant-upload-select-picture-card,
.reset /deep/ .ant-upload-list-picture-card {
  margin: 0 !important;
}
</style>
<style lang="less" scoped>
.image-title {
  text-align: center;
}
</style>
