import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import FormTextInput from '../compoment/FormTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers/yup';
import FormButton from '../compoment/FormButton';
import {BasicInformationNavProps} from '../navigation/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import IconMenu from '../resources/icons/IconMenu';
import {getItemAsync} from '../ultils/asyncSettingStore';
import AppHeader from '../compoment/AppHeader';
import Button from '../compoment/Button';
type FormData = AccountUpdateUserDto;

const BasicInformation = (): JSX.Element => {
  const navigation = useNavigation<BasicInformationNavProps>();

  const resetScrollToCoords = {x: 0, y: 0};
  const [formDataKey, setFormDataKey] = useState(new Date().getTime());

  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required('Please enter your full name')
      .max(20, 'Max length 20')
      .matches(
        /^((?![\d~`!@#$%^&*()_=+[\]{}\\|:;“<>/?]).){1,255}$/,
        'Only alphabets are allowed for this field',
      ),
    idNumber: yup.string().matches(/^[0-9]{12}$/, 'Must be exactly 12 digits'),
  });
  const methods = useForm<FormData>({
    defaultValues: {
      fullname: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmitBasicInformation = async () => {
    const optionValue = await getItemAsync('settingOption');
    if (optionValue === 'option2') {
      navigation.navigate('Purpose');
    } else {
      navigation.navigate('AdditionalInformation');
    }
  };

  const onGoToSettingPage = () => {
    navigation.navigate('Setting');
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'BasicInformation'} />
      {/* <TouchableOpacity onPress={onGoToSettingPage}>
       <Text>Setting</Text>
      </TouchableOpacity> */}
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
              name="fullname"
              mode="outlined"
              label={'Full name'}
            />
          </View>
          <View style={styles.viewTextInput}>
            <FormTextInput
              style={styles.fieldInputLogin}
              name="idNumber"
              mode="outlined"
              label={'Id Number'}
            />
          </View>
          <FormButton
            mode="primary"
            type="medium"
            onSubmit={onSubmitBasicInformation}>
            {'NEXT STEP'}
          </FormButton>
        </FormProvider>
        <View style={styles.settings}>
          <Button onPress={onGoToSettingPage}>{'Setting Form'}</Button>
        </View>
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
  settings: {
    marginTop: 16,
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

export default BasicInformation;
