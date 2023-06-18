import {Control, FieldValues, FormState, useFormContext} from 'react-hook-form';
import React, {ComponentProps} from 'react';

import Button from './Button';

type FormButtonContainerProps = {
  loading?: boolean;
  disabled?: boolean;
  uppercase?: boolean;
  onSubmit: () => void;
} & Omit<
  ComponentProps<typeof Button>,
  'onPress' | 'value' | 'error' | 'uppercase'
>;

type FormButtonProps = {
  control: Control<FieldValues>;
  formState: FormState<FieldValues>;
} & FormButtonContainerProps;

const FormButton = ({
  onSubmit,
  loading,
  disabled,
  ...props
}: FormButtonProps) => {
  const {formState} = useFormContext();

  const {isValidating, isSubmitting} = formState;
  const formLoading = loading || isValidating || isSubmitting;
  const formDisabled = disabled || formLoading;

  return (
    <Button
      onPress={onSubmit}
      disabled={formDisabled}
      loading={formLoading}
      {...props}
    />
  );
};

const FormButtonContainer = ({...props}: FormButtonContainerProps) => {
  const {control, formState} = useFormContext();
  return <FormButton {...props} control={control} formState={formState} />;
};

export default FormButtonContainer;
