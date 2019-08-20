<script lang="ts" src="./button-for-add-goods.component.ts"></script>
<template>
  <a-button type="primary" @click="onAdd()">
    添加商品
    <a-modal
      v-model="visible"
      title="添加商品"
      :width="400"
      centered
      @ok="onConfirm()"
    >
      <a-form :form="form">
        <a-form-item label="商品" v-bind="layout">
          <a-select
            v-decorator="formGroup.goods"
            @change="onChangeGoods(...arguments)"
          >
            <a-select-option
              v-for="goods in goodsList"
              :key="goods.id"
              :value="goods.id"
            >
              {{ goods.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="规格" v-bind="layout">
          <a-select v-decorator="formGroup.spec">
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
            v-decorator="formGroup.num"
            style="width: 100%;"
          ></a-input-number>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-button>
</template>
