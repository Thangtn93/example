import React from 'react';
// import {Text, View} from 'react-native';
import {
  //   StackNavigationOptions,
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import BasicInformation from '../screen/BasicInformation';
import AdditionalInformation from '../screen/AdditionalInformation';
import Purpose from '../screen/Purpose';
import Setting from '../screen/Setting';

import {RouteProp} from '@react-navigation/native';
const StackNavigator = createStackNavigator<RootNavigatorProps>();
const screenOptions = {headerShown: false};
export type RootNavigatorProps = {
  BasicInformation: undefined;
  AdditionalInformation: undefined;
  Purpose: undefined;
  Setting: undefined;
};

export type BasicInformationNavProps = StackNavigationProp<
  RootNavigatorProps,
  'BasicInformation'
>;

export type BasicInformationRouteProps = RouteProp<
  RootNavigatorProps,
  'BasicInformation'
>;

export type AdditionalInformationNavProps = StackNavigationProp<
  RootNavigatorProps,
  'AdditionalInformation'
>;

export type AdditionalInformationRouteProps = RouteProp<
  RootNavigatorProps,
  'AdditionalInformation'
>;

export type PurposeNavProps = StackNavigationProp<
  RootNavigatorProps,
  'Purpose'
>;

export type PurposeRouteProps = RouteProp<RootNavigatorProps, 'Purpose'>;

export type SettingNavProps = StackNavigationProp<
  RootNavigatorProps,
  'Setting'
>;

export type SettingRouteProps = RouteProp<RootNavigatorProps, 'Setting'>;

const RootNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName="BasicInformation">
      <StackNavigator.Screen
        name={'BasicInformation'}
        component={BasicInformation}
      />
      <StackNavigator.Screen
        name={'AdditionalInformation'}
        component={AdditionalInformation}
      />
      <StackNavigator.Screen name={'Purpose'} component={Purpose} />
      <StackNavigator.Screen name={'Setting'} component={Setting} />
      {/* <StackNavigator.Screen name={'Screen1'} component={Screen1} /> */}
    </StackNavigator.Navigator>
  );
};

export default RootNavigator;
