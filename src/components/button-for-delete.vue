<template>
  <a-popconfirm
    title="确定删除？"
    okText="是"
    okType="danger"
    cancelText="否"
    @confirm="$emit('click')"
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
        ghost
      ></a-button>
    </a-tooltip>
  </a-popconfirm>
</template>
