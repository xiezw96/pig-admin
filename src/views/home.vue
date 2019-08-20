<script lang="ts" src="./home.component.ts"></script>
<template>
  <a-layout class="outer-container">
    <a-layout-header class="header mdc-elevation--z4">
      <div class="left">
        <div class="logo"></div>
      </div>
      <div class="auto-expand"></div>
      <div class="right">
        <a-dropdown :trigger="['click']">
          <div class="header-avatar">
            <a-avatar
              class="header-avatar-icon"
              size="large"
              icon="user"
            ></a-avatar>
            {{ name }}
          </div>
          <a-menu slot="overlay">
            <!-- <a-menu-item><a-icon type="user" />个人中心</a-menu-item> -->
            <a-menu-item @click="onLogout()">
              <a-icon type="logout" />退出
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="256"
        theme="light"
        class="left-sider mdc-elevation--z2"
      >
        <a-menu
          class="left-menu"
          mode="inline"
          :openKeys="openKeys"
          :selectedKeys="selectedKeys"
          @select="onSelectMenu($event)"
          @openChange="onOpenChange($event)"
        >
          <a-sub-menu v-for="menu in menus" :key="menu.name">
            <template #title>
              <span>{{ menu.title }}</span>
            </template>
            <a-menu-item
              v-for="subMenu in menu.children"
              :key="`${menu.name}/${subMenu.name}`"
            >
              {{ subMenu.title }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<style lang="less" src="./home.less"></style>
