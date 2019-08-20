<template>
  <app-dict-name :code="code" :dict="dict"></app-dict-name>
</template>

<script lang="ts">
import Vue from 'vue';

import { CouponIssuanceType } from '@/enums';

export default Vue.extend({
  name: 'app-coupon-issuance-type',
  props: ['code'],
  computed: {
    dict() {
      return CouponIssuanceType;
    },
  },
});
</script>
