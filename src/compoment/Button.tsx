import {Platform, StyleProp, TextStyle, ViewStyle} from 'react-native';
import React, {ComponentProps, ReactNode, useMemo} from 'react';

import {Button as DefaultButton} from 'react-native-paper';

type ButtonType = 'small' | 'medium' | 'big';
type ButtonMode = 'primary' | 'secondary' | 'text';
type ButtonDefaultMode = 'contained' | 'outlined' | 'text';
type ButtonModeMap = {
  [key in ButtonMode]: ButtonDefaultMode;
};

export type ButtonProps = {
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  active?: boolean;
  mode?: ButtonMode;
  uppercase?: boolean;
  children: ReactNode;
} & Omit<
  ComponentProps<typeof DefaultButton>,
  'style' | 'contentStyle' | 'labelStyle' | 'disabled' | 'mode' | 'uppercase'
>;

const getHeight = (type?: ButtonType) => {
  switch (type) {
    case 'small':
      return 32;
    case 'medium':
      return 48;
    case 'big':
      return 56;
    default:
      return 56;
  }
};

const getOpacity = (disabled?: boolean) => (disabled ? 0.5 : 1);

const getBorderRadius = (type?: ButtonType) => {
  switch (type) {
    case 'small':
      return 4;
    case 'medium':
      return 8;
    case 'big':
      return 8;
    default:
      return 8;
  }
};

const getBorderWidth = (mode?: ButtonMode) => {
  switch (mode) {
    case 'text':
      return 0;
    case 'secondary':
      return 1;
    default:
      return 0;
  }
};

const getBorderColor = (mode?: ButtonMode, active?: boolean) => {
  switch (mode) {
    case 'secondary':
      return active ? '#1C0056' : '#D6D6D6';
    default:
      return undefined;
  }
};

const getBackgroundColor = (
  mode?: ButtonMode,
  disabled?: boolean,
  active?: boolean,
) => {
  switch (mode) {
    case 'text':
      return undefined;
    case 'primary':
      return disabled ? 'rgba(28, 0, 86, 0.5)' : '#1C0056';
    case 'secondary':
      return active ? 'rgba(28, 0, 86, 0.1)' : '#FFFFFF';
    default:
      return undefined;
  }
};

const getFontSize = (type?: ButtonType) => {
  switch (type) {
    case 'small':
      return 14;
    case 'medium':
      return 16;
    case 'big':
      return 17;
    default:
      return 17;
  }
};

const getFontColor = (mode?: ButtonMode) => {
  switch (mode) {
    case 'primary':
      return '#FFFFFF';
    default:
      return '#1C0056';
  }
};

const getFontWeight = (type?: ButtonType): StyleProp<TextStyle> => {
  if (Platform.OS === 'ios') {
    return {
      // fontFamily: 'Jost',
      fontWeight: type === 'small' ? '500' : '600',
    };
  } else if (Platform.OS === 'android') {
    return {
      // fontFamily: 'Jost-SemiBold',
    };
  }
};

const getLineHeight = (type?: ButtonType) => {
  switch (type) {
    case 'small':
      return 16;
    case 'medium':
      return 20;
    case 'big':
      return 24;
    default:
      return 24;
  }
};

const buttonModeMap: ButtonModeMap = {
  primary: 'contained',
  secondary: 'outlined',
  text: 'text',
};

const Button = ({
  children,
  active,
  type = 'big',
  style,
  contentStyle,
  labelStyle,
  disabled,
  mode = 'primary',
  uppercase = false,
  ...props
}: ButtonProps) => {
  const customStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        opacity: getOpacity(disabled),
        borderRadius: getBorderRadius(type),
        borderWidth: getBorderWidth(mode),
        borderColor: getBorderColor(mode, active),
      },
      style,
    ],
    [active, disabled, mode, style, type],
  );

  const customContentStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        height: getHeight(type),
        backgroundColor: getBackgroundColor(mode, disabled, active),
        flexDirection: 'row-reverse',
      },
      contentStyle,
    ],
    [active, contentStyle, disabled, mode, type],
  );
  const customLabelStyle = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        fontSize: getFontSize(type),
        color: getFontColor(mode),
        lineHeight: getLineHeight(type),
        letterSpacing: 0,
      },
      getFontWeight(type),
      labelStyle,
    ],
    [labelStyle, mode, type],
  );

  return (
    <DefaultButton
      mode={buttonModeMap[mode]}
      disabled={disabled}
      uppercase={uppercase}
      style={customStyle}
      contentStyle={customContentStyle}
      labelStyle={customLabelStyle}
      {...props}>
      {children}
    </DefaultButton>
  );
};

export default Button;
