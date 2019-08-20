<script lang="ts" src="./editing-form.component.ts"></script>
<template>
  <a-form :form="form">
    <a-row>
      <a-col :span="9">
        <a-form-item label="商品名称" v-bind="layout">
          <a-input v-decorator="formGroup.name"></a-input>
        </a-form-item>
        <a-form-item label="商品编码" v-bind="layout">
          <a-input v-decorator="formGroup.code"></a-input>
        </a-form-item>
        <a-form-item label="分享标题" v-bind="layout">
          <a-input v-decorator="formGroup.title"></a-input>
        </a-form-item>
        <a-form-item label="类目" v-bind="layout">
          <a-select v-decorator="formGroup.category">
            <a-select-option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="商品分组" v-bind="layout">
          <a-select v-decorator="formGroup.groupRelList" mode="multiple">
            <a-select-option
              v-for="group in groups"
              :key="group.id"
              :value="group.id"
            >
              {{ group.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="商品卖点" v-bind="layout">
          <a-input v-decorator="formGroup.sellingPoints"></a-input>
        </a-form-item>
        <a-form-item label="商品状态" v-bind="layout">
          <a-radio-group v-decorator="formGroup.status">
            <a-radio :value="1">立即上架</a-radio>
            <a-radio :value="2">暂不上架</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="商品状态" v-bind="layout">
          <a-radio-group v-decorator="formGroup.logisticsType">
            <a-radio :value="0">包邮</a-radio>
            <a-radio :value="1">按物流模板</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="15">
        <a-form-item label="图片" :required="true" style="margin-bottom: 0;">
          <a-upload
            action="api/admin/file"
            accept=".jpg,.png,.gif"
            listType="picture-card"
            :fileList="fileList"
            :headers="{ authorization }"
            multiple
            @change="onChangeFileList(...arguments)"
          >
            <div v-if="fileList.length < 5">
              <a-icon type="plus"></a-icon>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="商品详情" style="margin-bottom: 0;">
          <a-upload
            action="api/admin/file"
            accept=".jpg,.png,.gif"
            listType="picture-card"
            :fileList="detailFileList"
            :headers="{ authorization }"
            multiple
            @change="onChangeDetailFileList(...arguments)"
          >
            <div v-if="detailFileList.length < 10">
              <a-icon type="plus"></a-icon>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item required :colon="false">
          <template #label>
            价格列表
            <app-button-for-spec
              :specs="specs"
              @regenerate="onRegenerate($event)"
            ></app-button-for-spec>
          </template>
          <a-table
            rowKey="id"
            size="small"
            :columns="columns"
            :dataSource="sepPriceList"
            :pagination="false"
          >
            <template #salePriceHeader="...props">
              <app-table-header-cell
                title="零售价"
                @confirm="onConfirmBatchEdit($event, 'salePrice')"
              ></app-table-header-cell>
            </template>
            <template #tradePriceHeader="...props">
              <app-table-header-cell
                title="统批价"
                @confirm="onConfirmBatchEdit($event, 'tradePrice')"
              ></app-table-header-cell>
            </template>
            <template #salesVolumeHeader="...props">
              <app-table-header-cell
                title="销量"
                @confirm="onConfirmBatchEdit($event, 'salesVolume')"
              ></app-table-header-cell>
            </template>
            <template #inventoryNumHeader="...props">
              <app-table-header-cell
                title="库存"
                @confirm="onConfirmBatchEdit($event, 'inventoryNum')"
              ></app-table-header-cell>
            </template>
            <template #weightHeader="...props">
              <app-table-header-cell
                title="重量(kg)"
                @confirm="onConfirmBatchEdit($event, 'weight')"
              ></app-table-header-cell>
            </template>
            <template #salePriceEditableCell="text, record, index">
              <app-table-editable-cell
                :value="+text"
                @confirm="onConfirmEdit(index, 'salePrice', $event)"
              ></app-table-editable-cell>
            </template>
            <template #tradePriceEditableCell="text, record, index">
              <app-table-editable-cell
                :value="+text"
                @confirm="onConfirmEdit(index, 'tradePrice', $event)"
              ></app-table-editable-cell>
            </template>
            <template #salesVolumeEditableCell="text, record, index">
              <app-table-editable-cell
                :value="+text"
                @confirm="onConfirmEdit(index, 'salesVolume', $event)"
              ></app-table-editable-cell> </template
            >·
            <template #inventoryNumEditableCell="text, record, index">
              <app-table-editable-cell
                :value="+text"
                @confirm="onConfirmEdit(index, 'inventoryNum', $event)"
              ></app-table-editable-cell>
            </template>
            <template #weightEditableCell="text, record, index">
              <app-table-editable-cell
                :value="+text"
                @confirm="onConfirmEdit(index, 'weight', $event)"
              ></app-table-editable-cell>

            </template>
          </a-table>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

