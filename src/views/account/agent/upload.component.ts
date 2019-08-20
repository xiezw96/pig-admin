import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { a2b } from '@/utils';

@Component
export default class UploadComponent extends Vue {
  @Prop()
  title: string;

  @Prop()
  value: string;

  fileList: any[] = this._initFileList();

  onUpload(info: any, type: string) {
    if (info.file.status === 'done') {
      this.$emit('change', info.file.response.data);
    }

    if (info.file.status === 'removed') {
      this.$emit('change');
    }
  }

  private _initFileList() {
    if (!this.value) return [];
    return [
      {
        uid: this.value,
        name: this.value,
        status: 'done',
        url: a2b(this.value),
      },
    ];
  }
}
