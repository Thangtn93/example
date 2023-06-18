import {FlatList, Pressable, StyleProp, View, ViewStyle} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {Menu} from 'react-native-paper';

export type RenderInputProps<T> = {
  value: T;
  error?: boolean;
};

export type RenderItemProps<T> = {
  item: T;
  setValue: (value: T) => void;
  onDismiss: () => void;
};

export type SelectProps<T> = {
  style?: StyleProp<ViewStyle>;
  initialValue?: T;
  error?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  options: Array<T>;
  keyExtractor?: (item: T, index: number) => string;
  onChange?: (value: T) => void;
  renderInput: ({value, error}: RenderInputProps<T>) => JSX.Element;
  renderItem: ({item}: RenderItemProps<T>) => JSX.Element;
};

const Select = <T extends unknown>({
  style,
  initialValue,
  contentContainerStyle,
  options,
  error,
  keyExtractor,
  renderInput,
  renderItem,
  onChange,
}: SelectProps<T>): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<T>(initialValue || options[0]);

  const onChangeRef = useRef(onChange);

  const onDismiss = () => setVisible(false);
  const onDisplay = () => setVisible(true);

  useEffect(() => {
    onChangeRef.current?.(value);
  }, [value]);

  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      style={style}
      anchor={
        <Pressable onPress={onDisplay}>
          <View pointerEvents="none">{renderInput({value, error})}</View>
        </Pressable>
      }>
      <FlatList<T>
        contentContainerStyle={contentContainerStyle}
        data={options}
        keyExtractor={keyExtractor}
        renderItem={({item}) => renderItem({item, setValue, onDismiss})}
      />
    </Menu>
  );
};

Select.Item = Menu.Item;
export default Select;
