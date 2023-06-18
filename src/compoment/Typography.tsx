import {Platform, StyleProp, StyleSheet, TextStyle} from 'react-native';
import React, {ComponentProps, ReactNode, useMemo} from 'react';

import {Text} from 'react-native-paper';

type FontWeight = 'Bold' | 'Semi';

type TextProps = {
  defaultStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
  color?: string;
  bold?: boolean;
  underline?: boolean;
  italicize?: boolean;
  fontType?: FontWeight;
  arsenalFont?: boolean;
} & Omit<ComponentProps<typeof Text>, 'style'>;

const getColor = (color?: string): StyleProp<TextStyle> => {
  return {
    color: color ? color : '#000000',
  };
};

const getStyleArsenalFont = (
  bold?: boolean,
  italicize?: boolean,
): StyleProp<TextStyle> => {
  if (Platform.OS === 'ios') {
    return {
      // // fontFamily: 'Arsenal',
      fontWeight: bold ? 'bold' : 'normal',
      fontStyle: italicize ? 'italic' : 'normal',
    };
  } else if (Platform.OS === 'android') {
    if (bold && italicize) {
      return {
        // // fontFamily: 'Arsenal-BoldItalic',
      };
    } else if (bold) {
      return {
        // // fontFamily: bold ? 'Arsenal-Bold' : 'Arsenal-Regular',
      };
    } else if (italicize) {
      return {
        // // fontFamily: 'Arsenal-Italic',
      };
    } else {
      return {
        // // fontFamily: 'Arsenal-Regular',
      };
    }
  }
};

const getFontWeight = (fontWeight?: FontWeight) => {
  switch (fontWeight) {
    case 'Bold':
      return '700';
    case 'Semi':
      return '600';
    default:
      return 'normal';
  }
};

const getStyleJostFont = (
  bold?: boolean,
  italicize?: boolean,
  fontWeight?: FontWeight,
): StyleProp<TextStyle> => {
  if (Platform.OS === 'ios') {
    return {
      // fontFamily: 'Jost',
      fontStyle: italicize ? 'italic' : 'normal',
      fontWeight: bold ? getFontWeight(fontWeight) : 'normal',
    };
  } else if (Platform.OS === 'android') {
    if (bold && italicize) {
      switch (fontWeight) {
        case 'Bold':
          return {
            // // fontFamily: 'Jost-BoldItalic',
          };
        case 'Semi':
          return {
            // // fontFamily: 'Jost-SemiBoldItalic',
          };
        default:
          return {
            // // fontFamily: 'Jost-BoldItalic',
          };
      }
    } else if (bold) {
      switch (fontWeight) {
        case 'Bold':
          return {
            // fontFamily: 'Jost-Bold',
          };
        case 'Semi':
          return {
            // fontFamily: 'Jost-SemiBold',
          };
        default:
          return {
            // fontFamily: 'Jost-Bold',
          };
      }
    } else if (italicize) {
      return {
        // fontFamily: 'Jost-Italic',
      };
    } else {
      return {
        // fontFamily: 'Jost-Regular',
      };
    }
  }
};

const getUnderline = (underline?: boolean): StyleProp<TextStyle> => {
  return {
    textDecorationLine: underline ? 'underline' : 'none',
  };
};

const BaseText = ({
  defaultStyle,
  style,
  color,
  bold,
  underline,
  italicize,
  fontType,
  arsenalFont,
  ...props
}: TextProps): JSX.Element => {
  const customStyle = useMemo<StyleProp<TextStyle>>(() => {
    return [
      defaultStyle,
      getColor(color),
      getUnderline(underline),
      arsenalFont
        ? getStyleArsenalFont(bold, italicize)
        : getStyleJostFont(bold, italicize, fontType),
      style,
    ];
  }, [
    defaultStyle,
    color,
    bold,
    italicize,
    fontType,
    underline,
    arsenalFont,
    style,
  ]);

  return <Text style={customStyle} {...props} />;
};

export const Headline = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.headline} arsenalFont {...props} />;
};

export const SubHeadline = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.subHeadline} arsenalFont {...props} />;
};

export const Titles = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.titles} arsenalFont {...props} />;
};

export const Form = (props: TextProps): JSX.Element => {
  return <BaseText fontType={'Semi'} defaultStyle={styles.form} {...props} />;
};

export const Paragraph = (props: TextProps): JSX.Element => {
  return (
    <BaseText fontType={'Semi'} defaultStyle={styles.paragraph} {...props} />
  );
};

export const SParagraph = (props: TextProps): JSX.Element => {
  return (
    <BaseText fontType={'Semi'} defaultStyle={styles.sParagraph} {...props} />
  );
};

export const Caption = (props: TextProps): JSX.Element => {
  return (
    <BaseText fontType={'Bold'} defaultStyle={styles.caption} {...props} />
  );
};

export const XSParagraph = (props: TextProps): JSX.Element => {
  return (
    <BaseText fontType={'Bold'} defaultStyle={styles.xSParagraph} {...props} />
  );
};

const styles = StyleSheet.create({
  headline: {
    fontSize: 25,
    lineHeight: 32,
  },
  subHeadline: {
    fontSize: 20,
    lineHeight: 28,
  },
  titles: {
    fontSize: 17,
    lineHeight: 24,
  },
  form: {
    fontSize: 17,
    lineHeight: 24,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 20,
  },
  sParagraph: {
    fontSize: 14,
    lineHeight: 16,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  xSParagraph: {
    fontSize: 10,
    lineHeight: 12,
  },
});
