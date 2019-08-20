export const menus: any[] = [
  {
    name: 'account',
    title: '账号管理',
    permission: 'sys_account_manage',
    children: [
      {
        name: 'roles',
        title: '内部角色管理',
        permission: 'sys_role',
        component: () => import('@/views/account/role.vue'),
      },
      {
        name: 'users',
        title: '内部账号管理',
        permission: 'sys_account',
        component: () => import('@/views/account/user.vue'),
      },
      {
        name: 'agents',
        title: '代理账号管理',
        permission: 'sys_agent',
        component: () => import('@/views/account/agent/agent.vue'),
      },
    ],
  },
  {
    name: 'goods',
    title: '商品管理',
    permission: 'goods_manage',
    children: [
      {
        name: 'goods',
        title: '商品列表',
        permission: 'goods_list',
        component: () => import('@/views/goods/goods/goods.vue'),
      },
      // {
      //   name: 'logistics',
      //   title: '物流管理',
      //   permission: 'sale_logistics_list',
      //   component: () => import('@/views/goods/logistics.vue'),
      // },
      {
        name: 'purchasing-logistics',
        title: '采购物流',
        permission: 'agent_logistics_list',
        component: () => import('@/views/goods/purchasing-logistics.vue'),
      },
      {
        name: 'devices',
        title: '设备管理',
        permission: 'machine_list',
        component: () => import('@/views/goods/equipment.vue'),
      },
      {
        name: 'device-types',
        title: '设备型号',
        permission: 'machine_spec_list',
        component: () => import('@/views/goods/equipment-type.vue'),
      },
      {
        name: 'categories',
        title: '商品类目',
        permission: 'goods_category_list',
        component: () => import('@/views/goods/category.vue'),
      },
      {
        name: 'groups',
        title: '分组名称',
        permission: 'goods_group_list',
        component: () => import('@/views/goods/group.vue'),
      },
    ],
  },
  {
    name: 'customers',
    title: '用户中心',
    permission: 'user_manage',
    children: [
      {
        name: 'customers',
        title: '用户查询',
        permission: 'user_list',
        component: () => import('@/views/customer/customer.vue'),
      },
    ],
  },
  {
    name: 'report',
    title: '数据查询',
    permission: 'data_manage',
    children: [
      {
        name: 'orders',
        title: '订单详情',
        permission: 'sale_order_list',
        component: () => import('@/views/data/order-data.vue'),
      },
      {
        name: 'agent-data',
        title: '代理商数据',
        // permission: 'agent_order_list',
        component: () => import('@/views/data/agent-data.vue'),
      },
      {
        name: 'agent-purchase',
        title: '代理采购',
        permission: 'agent_order_list',
        component: () => import('@/views/data/agent-purchase-data.vue'),
      },
      {
        name: 'agent-activated',
        title: '代理激活记录',
        permission: 'agent_combo_list',
        component: () => import('@/views/data/agent-activated-data.vue'),
      },
    ],
  },
  {
    name: 'auditing',
    title: '审核管理',
    permission: 'audit_manage',
    children: [
      {
        name: 'development-reward-auditing',
        title: '发展奖励审核',
        permission: 'develop_audit_list',
        component: () =>
          import(
            '@/views/auditing/development-reword-auditing/development-reword-auditing.vue'
          ),
      },
      {
        name: 'agent-auditing',
        title: '代理审核',
        permission: 'agent_audit_list',
        component: () =>
          import('@/views/auditing/agent-auditing/agent-auditing.vue'),
      },
      {
        name: 'settlement-auditing',
        title: '结算审核',
        permission: 'settlement_audit_list',
        component: () =>
          import(
            '@/views/auditing/settlement-auditing/settlement-auditing.vue'
          ),
      },
      {
        name: 'modify-info-auditing',
        title: '信息修改审核',
        permission: 'agent_update_audit_list',
        component: () =>
          import(
            '@/views/auditing/modify-info-auditing/modify-info-auditing.vue'
          ),
      },
      {
        name: 'withdraw-auditing',
        title: '提现审核',
        permission: 'withdrawal_apply_audit_list',
        component: () =>
          import('@/views/auditing/withdraw-auditing/withdraw-auditing.vue'),
      },
      // {
      //   name: 'return-auditing',
      //   title: '退货审核',
      //   permission: 'return_order_audit_list',
      //   component: () =>
      //     import('@/views/auditing/return-auditing/return-auditing.vue'),
      // },
    ],
  },
  {
    name: 'setting',
    title: '设置',
    permission: 'setting_manage',
    children: [
      // {
      //   name: 'levels',
      //   title: '等级管理',
      //   component: LevelComponent,
      // },
      {
        name: 'activing-combos',
        title: '激活套餐',
        permission: 'combo_list',
        component: () => import('@/views/setting/activing-combo.vue'),
      },
      // {
      //   name: 'performance-examine',
      //   title: '绩效考核',
      //   component: PerformanceExamineComponent,
      // },
      {
        name: 'sharing-profit',
        title: '商城分润',
        permission: 'share_profit_setting_form',
        component: () => import('@/views/setting/sharing-profit.vue'),
      },
      {
        name: 'announcement',
        title: '公告管理',
        permission: 'notice_list',
        component: () => import('@/views/setting/announcement.vue'),
      },
      {
        name: 'development-reward',
        title: '发展奖励',
        permission: 'develop_audit_setting_form',
        component: () => import('@/views/setting/development-reward.vue'),
      },
      {
        name: 'logistics-templates',
        title: '物流模板',
        permission: 'logisticstemplate',
        component: () => import('@/views/setting/logistics-template.vue'),
      },
      {
        name: 'commission',
        title: '通道比例',
        permission: 'commission',
        component: () => import('@/views/setting/commission.page.vue'),
      },
    ],
  },
  {
    name: 'coupon',
    title: '代金券管理',
    permission: 'voucher_manage',
    children: [
      {
        name: 'coupon',
        title: '代金券',
        permission: 'voucher_list',
        component: () => import('@/views/coupon/coupon/coupon.vue'),
      },
      {
        name: 'issuance',
        title: '发放记录',
        permission: 'voucher_grant_record_list',
        component: () => import('@/views/coupon/issuance/issuance.vue'),
      },
    ],
  },
];
