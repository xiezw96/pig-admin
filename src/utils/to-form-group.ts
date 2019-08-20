import { FieldDecoratorOptions } from 'ant-design-vue/types/form/form';

import { FormControl, FormGroup } from '@/interfaces';

export function toFormGroup(
  formControls: FormControl[] | { [fieldName: string]: FieldDecoratorOptions },
) {
  if (Array.isArray(formControls)) {
    return formControls.reduce<FormGroup>((formGroup, formControl) => {
      formGroup[formControl[0]] = formControl;
      return formGroup;
    }, {});
  }

  return Object.entries(formControls).reduce(
    (formGroup, [fieldName, options]) => {
      formGroup[fieldName] = [fieldName, options];
      return formGroup;
    },
    {},
  );
}
