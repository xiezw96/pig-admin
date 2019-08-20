import { FormControl } from './form-control.interface';

export interface FormGroup {
  [field: string]: FormControl;
}
