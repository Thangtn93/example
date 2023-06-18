import {FormCheckboxRefProps} from '../../compoment/FormCheckbox';
import FormRadioGroup, {
  FormRadioGroupItem,
  FormRadioGroupRefProps,
} from '../../compoment/FormRadioGroup';
import {Platform, StyleSheet, View} from 'react-native';
import React, {Fragment, RefObject, memo, useRef, useEffect} from 'react';
import {setItemAsync} from '../../ultils/asyncSettingStore';

type SettingItemProps = {
  defaultValue?: string;
  disabled?: boolean;
};

type SelectorProps = {
  name: string;
  title: string;
  disabled?: boolean;
  onPress?: (
    name: string,
    checkboxRef: RefObject<FormCheckboxRefProps | null>,
  ) => void;
};

const FormSelector = ({
  name,
  title,
  disabled,
  onPress,
}: SelectorProps): JSX.Element | null => {
  const checkBoxRef = useRef<FormCheckboxRefProps>(null);

  const onSelectorPress = () => {
    onPress?.(name, checkBoxRef);
  };

  return (
    <FormRadioGroupItem
      disabled={disabled}
      onPress={onSelectorPress}
      value={name}
      label={title}
    />
  );
};

const SettingItem = memo(
  ({defaultValue = 'option1', disabled}: SettingItemProps): JSX.Element => {
    const Wrapper = FormRadioGroup;
    const option = [
      {
        id: '1',
        value: 'option1',
        title: 'Basic Information - Additional Information - Purpose',
      },
      {
        id: '2',
        value: 'option2',
        title: 'Basic Information - Purpose - Additional Information ',
      },
    ];
    const wrapperRef = useRef<FormRadioGroupRefProps>(null);
    useEffect(() => {
      wrapperRef.current?.onValueChange(defaultValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPress = (name: string) => {
      if (!disabled) {
        wrapperRef.current?.onValueChange(name);
        setItemAsync('settingOption', name);
      }
    };

    return (
      <Wrapper name={'option'} ref={wrapperRef}>
        <View style={styles.viewCheckBox}>
          {option.map(item => (
            <Fragment key={item?.id}>
              <FormSelector
                disabled={disabled}
                title={item.title}
                name={item?.value}
                onPress={onPress}
              />
            </Fragment>
          ))}
        </View>
      </Wrapper>
    );
  },
);

const styles = StyleSheet.create({
  viewCheckBox: {
    // flexDirection: 'row',
    // alignItems: "center",
  },
  tag: {
    alignItems: 'center',
    maxWidth: '75%',
  },
  subTag: {
    alignItems: 'center',
    maxWidth: '75%',
    marginLeft: 16,
  },
  titleStyle: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 17,
    lineHeight: 24,
    fontFamily: Platform.select({
      ios: 'Jost',
      android: 'Jost-Regular',
    }),
  },
  listStyle: {
    paddingBottom: 8,
    paddingHorizontal: 0,
  },
});

export default SettingItem;
