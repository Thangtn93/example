import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FormProvider, useForm} from 'react-hook-form';
import SettingItem from './component/SettingItem';
import {SettingNavProps} from '../navigation/RootNavigator';
import AppHeader from '../compoment/AppHeader';
import {getItemAsync} from '../ultils/asyncSettingStore';
// FormRadioGroup
type FormData = {
  setting: string;
};

const Setting = (): JSX.Element => {
  const navigation = useNavigation<SettingNavProps>();
  const [optionValue, setOptionValue] = useState('');
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    // methods.setValue('setting', 'option1');
    (async () => {
      const optionValue = await getItemAsync('settingOption');
      console.log('optionValue', optionValue);
      if (optionValue) {
        methods.setValue('setting', optionValue);
        setOptionValue(optionValue);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const methods = useForm<FormData>({
    defaultValues: {
      setting: '',
    },
    mode: 'all',
  });

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <AppHeader title={'Setting'} goBack={goBack} />
        {optionValue && <SettingItem defaultValue={optionValue} />}
      </FormProvider>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
