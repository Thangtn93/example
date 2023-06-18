import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';

const guidelineBaseWidth = 375;

export default () => {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const leftInset = insets?.left || 0;
  const rightInset = insets?.right || 0;

  return (width - leftInset - rightInset) / guidelineBaseWidth;
};
