import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';
const guidelineBaseHeight = 812;
export default () => {
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const topInset = insets?.top || 0;
  const bottomInset = insets?.bottom || 0;
  return (height - topInset - bottomInset) / guidelineBaseHeight;
};
