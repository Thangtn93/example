import {
  FieldError,
  FieldValues,
  FormState,
  useController,
  useFormContext,
} from 'react-hook-form';
import {TextInput as NativeTextInput, StyleSheet} from 'react-native';
import React, {ComponentProps, forwardRef, memo} from 'react';

import {TextInput as DefaultTextInput} from 'react-native-paper';
import TextInput from './TextInput';
import {XSParagraph} from './Typography';

type FormTextInputContainerProps = {
  name: string;
} & Omit<
  ComponentProps<typeof DefaultTextInput>,
  'onChangeText' | 'value' | 'error'
>;

type FormTextInputProps = {
  value: string;
  onChange: (...event: unknown[]) => void;
  error?: FieldError;
  formState: FormState<FieldValues>;
} & FormTextInputContainerProps;

const FormTextInput = memo(
  forwardRef<NativeTextInput, FormTextInputProps>(
    ({error, value, onChange, ...props}: FormTextInputProps, ref) => (
      <>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChange}
          error={!!error}
          {...props}
        />
        {error && (
          <XSParagraph style={styles.errorText}>{error.message}</XSParagraph>
        )}
      </>
    ),
  ),
  (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty &&
    prevProps.error === nextProps.error &&
    prevProps.value === nextProps.value &&
    prevProps.right === nextProps.right,
);

const FormTextInputContainer = memo(
  forwardRef<NativeTextInput, FormTextInputContainerProps>(
    ({name, ...props}: FormTextInputContainerProps, ref) => {
      const {control, formState} = useFormContext();
      const {field, fieldState} = useController({
        control,
        name,
      });
      return (
        <FormTextInput
          {...props}
          ref={ref}
          name={name}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error}
          formState={formState}
        />
      );
    },
  ),
);

const styles = StyleSheet.create({
  errorText: {
    color: '#D62105',
    marginHorizontal: 16,
    marginTop: 5,
  },
});

export default FormTextInputContainer;
