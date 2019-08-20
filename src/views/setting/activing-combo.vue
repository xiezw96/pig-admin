<script lang="ts" src="./activing-combo.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form :form="queryingForm" layout="inline">
        <a-form-item label="名称">
          <a-input v-decorator="queryingFormGroup.name"></a-input>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="primary" @click="onCreate()">新增</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      rowKey="id"
      :loading="loading"
      size="middle"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
    >
      <template #actions="...args">
        <a-tooltip placement="top" :mouseLeaveDelay="0">
          <template #title>
            编辑
          </template>
          <a-button
            size="small"
            shape="circle"
            icon="edit"
            @click="onUpdate(...args)"
          ></a-button>
        </a-tooltip>

        <a-divider type="vertical" />

        <a-popconfirm
          title="确定删除？"
          okText="是"
          okType="danger"
          cancelText="否"
          @confirm="onDelete(...args)"
        >
          <a-tooltip placement="top" :mouseLeaveDelay="0">
            <template #title>
              删除
            </template>
            <a-button
              type="danger"
              size="small"
              shape="circle"
              icon="delete"
            ></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </a-table>
    <a-modal
      v-bind="editingModal"
      :bodyStyle="{ maxHeight: 'calc(90vh - 110px)', overflow: 'auto' }"
      :visible="!!mode"
      :maskClosable="false"
      centered
      :width="700"
      @ok="onConfirm()"
      @cancel="onCancel()"
    >
      <a-form :form="editingForm">
        <a-form-item label="套餐名称" v-bind="layout">
          <a-input v-decorator="editingFormGroup.name"></a-input>
        </a-form-item>
        <!-- <h3 style="margin-bottom: 24px;">激活条件</h3> -->
        <a-form-item label="代理类型" v-bind="layout">
          <a-select v-decorator="editingFormGroup.type">
            <a-select-option :value="0">自购柜子</a-select-option>
            <a-select-option :value="1">购买指定商品组合</a-select-option>
            <a-select-option :value="2">购买指定金额商品</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="柜子"
          :required="selectedType === 0"
          v-bind="layout"
        >
          <a-table
            rowKey="id"
            size="small"
            :columns="addedEquipmentColumns"
            :dataSource="selectedEquipments"
            :pagination="{ hideOnSinglePage: true }"
          >
            <template #actions="data, record">
              <app-button-for-delete
                @click="onDeleteEquipment(record)"
              ></app-button-for-delete>
            </template>
          </a-table>
          <button-for-add-equipment
            :equipment-types="equipmentTypes"
            @select="onSelectEquipment($event)"
          ></button-for-add-equipment>
        </a-form-item>
        <template v-if="selectedType === 0">
          <a-form-item label="总金额" v-bind="layout">
            <a-input-number
              v-decorator="editingFormGroup.goodPrice"
              style="width: 100%;"
            ></a-input-number>
          </a-form-item>
        </template>
        <template v-else-if="selectedType === 1">
          <a-form-item label="商品" v-bind="layout" required>
            <a-table
              :rowKey="getGoodsListRowKey"
              size="small"
              :pagination="{ pageSize: 5 }"
              :columns="bundleColumns"
              :dataSource="selectedGoodsList"
            >
              <template #actions="data, record">
                <app-button-for-delete
                  @click="onDeleteGoods(record)"
                ></app-button-for-delete>
              </template>
            </a-table>
            <a-button type="primary" size="small" @click="onAddGoods()">
              添加商品
            </a-button>
          </a-form-item>
        </template>
        <template v-else-if="selectedType === 2">
          <a-form-item label="商品总额" v-bind="layout">
            <a-input-number
              v-decorator="editingFormGroup.goodPrice"
              style="width: 100%;"
            ></a-input-number>
          </a-form-item>
        </template>
        
        <a-form-item label="代金券" v-bind="layout">
          <a-select v-decorator="editingFormGroup.voucherId">
            <a-select-option
              v-for="coupon in coupons"
              :key="coupon.id"
              :value="coupon.id"
            >
              {{ coupon.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="goodsModalVisible"
      title="添加商品"
      :width="400"
      centered
      @ok="onConfirmAddGoods()"
    >
      <a-form :form="goodsForm">
        <a-form-item label="商品" v-bind="layout">
          <a-select
            v-decorator="goodsFormGroup.goods"
            @change="onChangeGoods(...arguments)"
          >
            <a-select-option
              v-for="goods in goodsList"
              :key="goods.id"
              :value="goods.id"
              >{{ goods.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="规格" v-bind="layout">
          <a-select v-decorator="goodsFormGroup.spec">
            <a-select-option
              v-for="spec in specs"
              :key="spec.id"
              :value="spec.id"
            >
              {{ spec.speId1 }} {{ spec.speId2 }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="数量" v-bind="layout">
          <a-input-number
            v-decorator="goodsFormGroup.num"
            style="width: 100%;"
          ></a-input-number>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
