<template>
  <a-tooltip placement="top" :mouseLeaveDelay="0">
    <template #title>
      编辑
    </template>
    <a-button
      size="small"
      shape="circle"
      icon="edit"
      @click="$emit('click')"
    >
      <slot></slot>
    </a-button>
  </a-tooltip>
</template>
