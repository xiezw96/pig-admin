import { Component, Prop, Vue } from 'vue-property-decorator';

import { AuditedStatus } from '@/enums';

@Component<AuditedStatusComponent>({
  render(h) {
    return h('app-dict-name', {
      props: {
        code: this.code,
        dict: AuditedStatus,
      },
    });
  },
})
export class AuditedStatusComponent extends Vue {
  @Prop()
  code: string;
}
