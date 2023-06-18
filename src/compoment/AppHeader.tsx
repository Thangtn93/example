import * as React from 'react';
import {Appbar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

type AppHeader = {
  title: string;
  goBack?: () => void;
  goSetting?: () => void;
};

const AppHeader = ({title, goBack, goSetting}: AppHeader) => {
  return (
    <Appbar.Header>
      {goBack && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default AppHeader;
