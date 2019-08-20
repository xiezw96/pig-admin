<script lang="ts" src="./button-for-create.component.ts"></script>
<template>
  <a-button type="primary" @click="onClick()">
    新增
    <a-modal v-model="visible" title="新增" :width="900" @ok="onConfirm()">
      <a-form :form="form">
        <a-col :span="12">
          <a-form-item label="代理" v-bind="layout">
            <a-select
              v-decorator="formGroup.agentId"
              @change="onSelectAgent($event)"
            >
              <a-select-option
                v-for="agent in agents"
                :key="agent.agentId"
                :value="agent.agentId"
              >
                {{ agent.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="form.getFieldValue('agentId')"
            label="地址"
            required
            v-bind="layout"
          >
            <button-for-add-address
              v-if="addresses.length === 0"
              :agent="form.getFieldValue('agentId')"
              @added="onAddedAddress()"
            ></button-for-add-address>
            <a-select
              v-show="addresses.length !== 0"
              v-decorator="formGroup.addressId"
              @change="onSelectAddress($event)"
            >
              <a-select-option
                v-for="address in addresses"
                :key="address.id"
                :value="address.id"
                >{{ [address.privince, address.city, address.area] | location }}
                {{ address.address }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="收货人" v-bind="layout">{{
            selectedAddress.name
          }}</a-form-item>
          <a-form-item label="联系电话" v-bind="layout">{{
            selectedAddress.phone
          }}</a-form-item>
          <a-form-item label="收货地址" v-bind="layout">
            {{
              [
                selectedAddress.privince,
                selectedAddress.city,
                selectedAddress.area,
              ] | location
            }}{{ selectedAddress.address }}
          </a-form-item>
        </a-col>
      </a-form>
      <button-for-add-goods
        :goods-list="goodsList"
        @select="onSelectGoods($event)"
      ></button-for-add-goods>
      <a-table
        rowKey="spePriceKey"
        style="margin-top: 16px;"
        size="small"
        :dataSource="list"
        :columns="columns"
        :pagination="{ pageSize: 5 }"
      >
        <template #image="val">
          <div
            :style="{
              height: '80px',
              width: '150px',
              background: `center / cover url(${atob(val)}) #eee`,
            }"
          ></div>
        </template>
        <template #spec="record">
          {{ [record.goodsSpe1, record.goodsSpe2] | spec }}
        </template>
        <template #actions="data, record">
          <app-button-for-delete
            @click="onDelete(record)"
          ></app-button-for-delete>
        </template>
      </a-table>
    </a-modal>
  </a-button>
</template>
