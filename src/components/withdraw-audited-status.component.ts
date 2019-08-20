import { WithdrawAuditedStatus } from '@/enums';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component<WithdrawAuditedStatusComponent>({
  render(h) {
    return h('app-dict-name', {
      props: {
        code: this.code,
        dict: WithdrawAuditedStatus,
      },
    });
  },
})
export class WithdrawAuditedStatusComponent extends Vue {
  @Prop()
  code: number;
}
