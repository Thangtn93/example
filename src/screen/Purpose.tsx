import React, {useEffect, useState} from 'react';
import {StyleSheet,  View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FormProvider, useForm} from 'react-hook-form';
import PurposeItem from './component/PurposeItem';
import {PurposeNavProps} from '../navigation/RootNavigator';
import AppHeader from '../compoment/AppHeader';
import {getItemAsync} from '../ultils/asyncSettingStore';
import FormButton from '../compoment/FormButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// FormRadioGroup
type FormData = {
  setting: string;
};

const Purpose = (): JSX.Element => {
  const navigation = useNavigation<PurposeNavProps>();
  const resetScrollToCoords = {x: 0, y: 0};
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

  // const onSubmitBasicInformation = async ({data}) => {
  //   console.log('onSubmitBasicInformation', data);
  //   const optionValue = await getItemAsync('settingOption');
  //   if (optionValue === 'option2') {
  //     navigation.navigate('AdditionalInformation');
  //   } else {
  //     // TODO: Show information
  //   }
  // };

  const methods = useForm<FormData>({
    defaultValues: {
      setting: '',
    },
    mode: 'all',
  });

  const onSubmitBasicInformation = methods.handleSubmit(
    async (data): Promise<void> => {
      try {
        console.log('onSubmitBasicInformation', data);
        const optionValue = await getItemAsync('settingOption');
        if (optionValue === 'option2') {
          navigation.navigate('AdditionalInformation');
        } else {
          // TODO: Show information
          Alert.alert('Notification', 'Submit Form Suggest', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      } catch (err) {}
    },
  );

  return (
    <View style={styles.container}>
            <KeyboardAwareScrollView
        contentContainerStyle={styles.accountContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={30}
        enableOnAndroid={true}
        resetScrollToCoords={resetScrollToCoords}>
      <FormProvider {...methods}>
        <AppHeader title={'Purpose'} goBack={goBack} />
        {optionValue && <PurposeItem defaultValue={optionValue} />}
        <FormButton
          mode="primary"
          type="medium"
          onSubmit={onSubmitBasicInformation}>
          {'NEXT STEP'}
        </FormButton>
      </FormProvider>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Purpose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountContainer: {
    paddingHorizontal: 16,
  },
});
