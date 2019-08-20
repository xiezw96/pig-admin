<script lang="ts" src="./goods.component.ts"></script>
<template>
  <div>
    <a-card>
      <a-form layout="inline" :form="queryingForm">
        <a-form-item label="商品名称/编码">
          <a-input
            v-decorator="queryingFormGroup.name"
            placeholder="全部"
          ></a-input>
        </a-form-item>
        <a-form-item label="商品分组">
          <a-select
            v-decorator="queryingFormGroup.groupRelId"
            placeholder="全部"
            :allowClear="true"
            style="width: 170px;"
          >
            <a-select-option
              v-for="group in groups"
              :key="group.id"
              :value="group.id"
            >
              {{ group.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="商品类型">
          <a-select
            v-decorator="queryingFormGroup.category"
            placeholder="全部"
            :allowClear="true"
            style="width: 170px;"
          >
            <a-select-option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-decorator="queryingFormGroup.status"
            placeholder="全部"
            :allowClear="true"
            style="width: 170px;"
          >
            <a-select-option value="1" >已上架</a-select-option>
            <a-select-option value="2" >未上架</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="button-list">
          <a-button @click="onSearch()">搜索</a-button>
          <a-button type="dashed" @click="onReset()">重置</a-button>
          <app-button-for-create-goods
            :categories="categories"
            :groups="groups"
            @create="onCreate()"
          ></app-button-for-create-goods>
        </a-form-item>
      </a-form>
    </a-card>
    <a-table
      rowKey="id"
      size="middle"
      style="margin-top: 16px;"
      :columns="columns"
      :dataSource="list"
    >
      <template #image="record">
        <div
          :style="{
            height: '80px',
            width: '150px',
            background: `center / cover url(${getMainImage(record)}) #eee`,
          }"
        ></div>
      </template>
      <template #name="record">
        <div style="margin-bottom: 1em;">{{ record.name }}</div>
        <div style="clear: both;">
          <div style="float: left;">
            零售价：{{ getMinPrice(record, 'salePrice') }}
          </div>
          <div style="float: right; width: 120px;">
            统批价：{{ getMinPrice(record, 'tradePrice') }}
          </div>
        </div>
      </template>
      <template #salesVolume="text, record">
        {{ sumSalesVolume(record) }}
      </template>
      <template #inventory="text, record">
        {{ sumInventory(record) }}
      </template>
      <template #category="text, record">
        <app-dict-name :code="text" :dict="categoriesDict"></app-dict-name>
      </template>
      <template #actions="record">
        <app-button-for-update-goods
          :record="record"
          :categories="categories"
          :groups="groups"
          @update="onUpdate()"
        ></app-button-for-update-goods>
        <template v-if="record.status === 1">
          <a-divider type="vertical"></a-divider>
          <a-popconfirm title="确认下架？" @confirm="soldOutOrPutaway(record, 2)">
            <a-tooltip :mouseLeaveDelay="0">
              <template #title>
                确认下架
              </template>
              <a-button
                type="primary"
                size="small"
                shape="circle"
                icon="down-circle"
              ></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
        <template v-if="record.status === 2">
          <a-divider type="vertical"></a-divider>
          <a-popconfirm title="确认上架？" @confirm="soldOutOrPutaway(record, 1)">
            <a-tooltip :mouseLeaveDelay="0">
              <template #title>
                确认上架
              </template>
              <a-button
                type="primary"
                size="small"
                shape="circle"
                icon="up-circle"
              ></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
<style lang="less">
.group {
  display: flex !important;

  .middle {
    flex: 1 1 auto;
  }
}
</style>
