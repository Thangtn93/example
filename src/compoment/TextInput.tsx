import {TextInput as NativeTextInput, Platform} from 'react-native';
import React, {ComponentProps, forwardRef, memo, useMemo} from 'react';

import {TextInput as DefaultTextInput} from 'react-native-paper';
import useVScale from '../hooks/useVScale';

type TextInputProps = ComponentProps<typeof DefaultTextInput>;

const TextInput = memo(
  forwardRef<NativeTextInput, TextInputProps>(
    ({...props}: TextInputProps, ref) => {
      const backgroundColor = props.disabled ? '#F1F1F1' : '#FFFFFF';
      const outlineColor = props.value ? '#959595' : '#D6D6D6';
      const placeholderColor = props.value ? '#515151' : '#51515160';
      const vScale = useVScale();

      const theme = useMemo(
        () => ({
          colors: {
            primary: '#1C0056',
            text: '#515151',
            placeholder: placeholderColor,
            disabled: '#959595',
            background: backgroundColor,
          },
        }),
        [placeholderColor, backgroundColor],
      );

      const textStyle = useMemo(
        () => ({
          fontSize: vScale * 15,
        }),
        [vScale],
      );

      return (
        <DefaultTextInput
          ref={ref}
          outlineColor={outlineColor}
          style={textStyle}
          theme={theme}
          selectionColor={Platform.select({
            android: '#0A304025',
            ios: '#0A3040',
          })}
          {...props}
        />
      );
    },
  ),
);

export default TextInput;
