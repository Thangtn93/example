import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, View,Alert} from 'react-native';
import FormTextInput from '../compoment/FormTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers/yup';
import FormButton from '../compoment/FormButton';
import {useNavigation} from '@react-navigation/native';
import {AdditionalInformationNavProps} from '../navigation/RootNavigator';
import {getItemAsync} from '../ultils/asyncSettingStore';
import AppHeader from '../compoment/AppHeader';
type FormData = AccountUpdateUserDto;

const AdditionalInformation = (): JSX.Element => {
  const navigation = useNavigation<AdditionalInformationNavProps>();
  const goBack = () => {
    navigation.goBack();
  };
  const resetScrollToCoords = {x: 0, y: 0};
  const [formDataKey, setFormDataKey] = useState(new Date().getTime());

  const schema = yup.object().shape({
    email: yup.string().required().email('Please enter your email').trim(),
    address: yup.string().required().trim(),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{9}$|^[0-9]{10}$/, 'Must be 9 or 10 digits'),
    dob: yup.string().required('Date of birth is required').trim(),
  });
  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      address: '',
      phoneNumber: '',
      dob: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmitAdditionalInformation = methods.handleSubmit(
    async (data): Promise<void> => {
      try {
        const optionValue = await getItemAsync('settingOption');
        if (optionValue === 'option2') {
          // TODO: Show information
          Alert.alert('Notification', 'Submit Form Suggest', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else {
          navigation.navigate('Purpose');
          // navigation.navigate('AdditionalInformation');
        }
      } catch (err) {}
    },
  );

  return (
    <View style={styles.container}>
      <AppHeader title={'AdditionalInformation'} goBack={goBack} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.accountContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={30}
        enableOnAndroid={true}
        resetScrollToCoords={resetScrollToCoords}>
        <FormProvider {...methods} key={formDataKey}>
          <View style={styles.viewTextInput}>
            <FormTextInput
              style={styles.fieldInputLogin}
              name="email"
              mode="outlined"
              label={'Email'}
            />
          </View>
          <View style={styles.viewTextInput}>
            <FormTextInput
              style={styles.fieldInputLogin}
              name="address"
              mode="outlined"
              label={'Address'}
            />
          </View>
          <View style={styles.viewTextInput}>
            <FormTextInput
              style={styles.fieldInputLogin}
              name="phoneNumber"
              mode="outlined"
              label={'Phone Number'}
            />
          </View>
          <View style={styles.viewTextInput}>
            <FormTextInput
              style={styles.fieldInputLogin}
              name="dob"
              mode="outlined"
              label={'Date of birth'}
            />
          </View>
          <FormButton
            mode="primary"
            type="medium"
            onSubmit={onSubmitAdditionalInformation}>
            {'NEXT STEP'}
          </FormButton>
        </FormProvider>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
  },
  accountContainer: {
    paddingHorizontal: 16,
  },
  logo: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 10,
  },
  fieldInputLogin: {
    backgroundColor: '#FFFFFF',
  },
  viewCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: -8,
  },
  textNotification: {
    backgroundColor: '#F7FDFF',
    borderLeftWidth: 2,
    borderLeftColor: '#16688A',
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginBottom: 20,
  },
  linkChangePassword: {
    marginTop: 10,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  viewTextInput: {marginBottom: 10},
  textBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  phoneInput: {backgroundColor: '#FFFFFF'},
  sortBy: {
    width: Dimensions.get('window').width - 34,
  },
  sortByItem: {
    maxWidth: '100%',
  },
  dropDownInput: {
    height: 56,
    justifyContent: 'center',
  },
});

export default AdditionalInformation;
