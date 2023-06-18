import React, {ComponentProps, memo, useMemo} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import {RadioButton as DefaultRadioButton} from 'react-native-paper';
import {Paragraph} from './Typography';

type SelectorProps = {
  value: string;
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (value: string) => void;
} & Omit<
  ComponentProps<typeof DefaultRadioButton.Android>,
  'value' | 'onValueChange'
>;

const RadioButton = memo(
  ({value, label, style, onPress, ...props}: SelectorProps) => {
    const onTouchablePress = () => {
      onPress?.(value);
    };

    const customStyle = useMemo<StyleProp<ViewStyle>>(
      () => [styles.itemContainer, style],
      [style],
    );

    return (
      <TouchableOpacity onPress={onTouchablePress} style={customStyle}>
        <DefaultRadioButton.Android
          value={value}
          color="#1C0056"
          uncheckedColor="#000"
          {...props}
        />
        <Paragraph style={styles.tag}>{label}</Paragraph>
      </TouchableOpacity>
    );
  },
);
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tag: {
    alignItems: 'center',
    maxWidth: '75%',
    paddingTop: 4,
    paddingLeft: 4,
  },
});
export default RadioButton;
