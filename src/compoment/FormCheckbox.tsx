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

import {Checkbox} from 'react-native-paper';
import CheckboxText from './CheckboxText';

type FormCheckboxContainerProps = {
  name: string;
  label?: string;
} & Omit<ComponentProps<typeof Checkbox.Android>, 'status' | 'onPress'>;

type FormCheckboxProps = {
  value?: boolean;
  label?: string;
  onChange: (...event: unknown[]) => void;
  formState: FormState<FieldValues>;
} & FormCheckboxContainerProps;

export type FormCheckboxRefProps = {
  onPress: () => void;
};

const FormCheckbox = memo(
  forwardRef<FormCheckboxRefProps, FormCheckboxProps>(
    ({value, label, onChange, ...props}: FormCheckboxProps, ref) => {
      const onPress = () => {
        onChange(!value);
      };

      useImperativeHandle(ref, () => ({onPress}));

      return (
        <CheckboxText
          value={value}
          label={label}
          onPress={onPress}
          {...props}
        />
      );
    },
  ),
  (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty &&
    prevProps.value === nextProps.value,
);

const FormCheckboxContainer = memo(
  forwardRef<FormCheckboxRefProps, FormCheckboxContainerProps>(
    ({name, label, ...props}: FormCheckboxContainerProps, ref) => {
      const {control, formState} = useFormContext();
      const {field} = useController({
        control,
        name,
      });

      return (
        <FormCheckbox
          {...props}
          ref={ref}
          label={label}
          name={name}
          value={field.value}
          onChange={field.onChange}
          formState={formState}
        />
      );
    },
  ),
);

export default FormCheckboxContainer;
