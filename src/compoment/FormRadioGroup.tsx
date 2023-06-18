import {
  FieldValues,
  FormState,
  useController,
  useFormContext,
} from 'react-hook-form';
import React, {
  ComponentProps,
  forwardRef,
  memo,
  useImperativeHandle,
} from 'react';

import {RadioButton as DefaultRadioButton} from 'react-native-paper';
import RadioButton from './RadioButton';

type FormRadioGroupContainerProps = {
  name: string;
} & Omit<
  ComponentProps<typeof DefaultRadioButton.Group>,
  'value' | 'onValueChange'
>;

type FormRadioGroupProps = {
  value: string;
  onChange: (...event: unknown[]) => void;
  formState: FormState<FieldValues>;
} & FormRadioGroupContainerProps;

export type FormRadioGroupRefProps = {
  onValueChange: (value: string) => void;
};

const FormRadioGroup = memo(
  forwardRef<FormRadioGroupRefProps, FormRadioGroupProps>(
    ({value, onChange, ...props}: FormRadioGroupProps, ref) => {
      const onValueChange = (newValue: string) => onChange(newValue);

      useImperativeHandle(ref, () => ({
        onValueChange,
      }));

      return (
        <DefaultRadioButton.Group
          onValueChange={onValueChange}
          value={value}
          {...props}
        />
      );
    },
  ),
  (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty &&
    prevProps.value === nextProps.value,
);

const FormRadioGroupContainer = memo(
  forwardRef<FormRadioGroupRefProps, FormRadioGroupContainerProps>(
    ({name, ...props}: FormRadioGroupContainerProps, ref) => {
      const {control, formState} = useFormContext();
      const {field} = useController({
        control,
        name,
      });

      return (
        <FormRadioGroup
          {...props}
          ref={ref}
          name={name}
          value={field.value}
          onChange={field.onChange}
          formState={formState}
        />
      );
    },
  ),
);

export const FormRadioGroupItem = RadioButton;
export default FormRadioGroupContainer;
