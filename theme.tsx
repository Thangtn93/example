import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper';

/**
 * https://callstack.github.io/react-native-paper/theming.html
 **/
export const defaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#1C0056',
    accent: '#D0021B',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    placeholder: '#393939',
    backdrop: '#11111150',
    onSurface: '#1C0056',
    text: '#000000',
  },
};
