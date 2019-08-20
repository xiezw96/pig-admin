import { Component, Vue } from 'vue-property-decorator';

@Component
export class Deletable extends Vue {
  service: { remove: (id: number) => void };

  refresh: () => void;

  async onDelete(id: number) {
    await this.service.remove(id);
    this.refresh();
  }
}
