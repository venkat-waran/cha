// import React, {Component} from 'react';
import { Dimensions, Platform } from 'react-native';
import { wp } from '../utils/Dimensions';

export const { width, height } = Dimensions.get('window');

export const colors = {
  black: '#000',
  white: '#fff',
  primaryColor: 'rgba(217, 217, 217, 0.4)',
  secondaryColor: '#05C976',
  borderColor: '#EBE2F2',
  secondaryBorderColor: '#f2f2f3',
  textFieldBorderColor: '#D9D9D9',
  background: '#F5F5F5',
  inActivePage: '#F0F0F0',
  iconColor: '#A2AFC5',
  tabText: '#9F9F9F',
  error: '#FC2121',
  secondaryBackgroundColor: '#454444',
  yellow: '#EFE982',
  GREYS: {
    C1: 'rgba(151,151,151,0.3)',
    C2: '#e8eef4',
    C3: '#cfcfcf',
    C4: 'rgba(212,220,231,0.6)',
    C5: '#F0F0F0',
    C6: '#C7C7C7',
    C7: '#EBEBEB',
    C8: '#707070',
    C9: '#8E8B8B',
    C10: '#818181',
  },
  GREEN: {
    C1: '#05C976',
    C2: '#05C574',
    C3: '#12BD74',
    C4: '#8DEDC4',
    C5: '#00C470',
  },
  BLUES: {
    C1: '#1275C2',
    C2: '#31B0FF',
    C3: '#0075FB',
    C4: '#007AFF',
  },
};

export const fonts = {
  bold: Platform.OS === 'android' ? 'Bariol-Bold' : 'Bariol-Bold',
  regular: Platform.OS === 'android' ? 'Bariol-Regular' : 'Bariol-Regular',
  italic:
    Platform.OS === 'android' ? 'Strawberry Blossom ' : 'Strawberry Blossom ',
};

export const fontSizes = {
  h1: { fontSize: width <= 320 ? wp(6.9) : wp(6.9) }, // 26 large
  h2: { fontSize: width <= 320 ? wp(6.4) : wp(6.4) }, // 24
  h3: { fontSize: width <= 320 ? wp(5.87) : wp(5.87) }, // 22
  h4: { fontSize: width <= 320 ? wp(5.33) : wp(5.33) }, // 20
  h5: { fontSize: width <= 320 ? wp(4.8) : wp(4.8) }, // 18
  h6: { fontSize: width <= 320 ? wp(4.26) : wp(4.26) }, // 16 medium
  h7: { fontSize: width <= 320 ? wp(3.73) : wp(3.73) }, // 14 regular
  h8: { fontSize: width <= 320 ? wp(3.4) : wp(3.4) }, // 13 or 12 small
  h9: { fontSize: width <= 320 ? wp(2.8) : wp(2.8) }, // 11 or 10 xsmall
};

export const typography = {
  italic: {
    h1: {
      fontFamily: fonts.italic,
      ...fontSizes.h1,
      color: colors.black,
    },
    h2: {
      fontFamily: fonts.italic,
      ...fontSizes.h2,
      color: colors.black,
    },
    h3: {
      fontFamily: fonts.italic,
      ...fontSizes.h3,
      color: colors.black,
    },
    h4: {
      fontFamily: fonts.italic,
      ...fontSizes.h4,
      color: colors.black,
    },
    h5: {
      fontFamily: fonts.italic,
      ...fontSizes.h5,
      color: colors.black,
    },
    h6: {
      fontFamily: fonts.italic,
      ...fontSizes.h6,
      color: colors.black,
    },
    h7: {
      fontFamily: fonts.italic,
      ...fontSizes.h7,
      color: colors.black,
    },
    h8: {
      fontFamily: fonts.italic,
      ...fontSizes.h8,
      color: colors.black,
    },
    h9: {
      fontFamily: fonts.italic,
      ...fontSizes.h9,
      color: colors.black,
    },
  },
  regular: {
    h1: {
      fontFamily: fonts.regular,
      ...fontSizes.h1,
      color: colors.black,
    },
    h2: {
      fontFamily: fonts.regular,
      ...fontSizes.h2,
      color: colors.black,
    },
    h3: {
      fontFamily: fonts.regular,
      ...fontSizes.h3,
      color: colors.black,
    },
    h4: {
      fontFamily: fonts.regular,
      ...fontSizes.h4,
      color: colors.black,
    },
    h5: {
      fontFamily: fonts.regular,
      ...fontSizes.h5,
      color: colors.black,
    },
    h6: {
      fontFamily: fonts.regular,
      ...fontSizes.h6,
      color: colors.black,
    },
    h7: {
      fontFamily: fonts.regular,
      ...fontSizes.h7,
      color: colors.black,
    },
    h8: {
      fontFamily: fonts.regular,
      ...fontSizes.h8,
      color: colors.black,
    },
    h9: {
      fontFamily: fonts.regular,
      ...fontSizes.h9,
      color: colors.black,
    },
  },
  bold: {
    h1: {
      fontFamily: fonts.bold,
      ...fontSizes.h1,
      color: colors.black,
    },
    h2: {
      fontFamily: fonts.bold,
      ...fontSizes.h2,
      color: colors.black,
    },
    h3: {
      fontFamily: fonts.bold,
      ...fontSizes.h3,
      color: colors.black,
    },
    h4: {
      fontFamily: fonts.bold,
      ...fontSizes.h4,
      color: colors.black,
    },
    h5: {
      fontFamily: fonts.bold,
      ...fontSizes.h5,
      color: colors.black,
    },
    h6: {
      fontFamily: fonts.bold,
      ...fontSizes.h6,
      color: colors.black,
    },
    h7: {
      fontFamily: fonts.bold,
      ...fontSizes.h7,
      color: colors.black,
    },
    h8: {
      fontFamily: fonts.bold,
      ...fontSizes.h8,
      color: colors.black,
    },
    h9: {
      fontFamily: fonts.bold,
      ...fontSizes.h9,
      color: colors.black,
    },
  },
};

export const Custompadding = {
  // 25
  paddingXLarge: { padding: wp('6.66') },
  paddingTopBottomXLarge: {
    paddingTop: wp('6.66'),
    paddingBottom: wp('6.66'),
  },
  paddingLeftRightXLarge: {
    paddingLeft: wp('6.66'),
    paddingRight: wp('6.66'),
  },
  paddingTopXLarge: {
    paddingTop: wp('6.66'),
  },
  paddingBottomXLarge: {
    paddingBottom: wp('6.66'),
  },
  paddingLeftXLarge: {
    paddingLeft: wp('6.66'),
  },
  paddingRightXLarge: {
    paddingRight: wp('6.66'),
  },
  // 20
  paddingLarge: { padding: wp('5.33') },
  paddingTopBottomLarge: {
    paddingTop: wp('5.33'),
    paddingBottom: wp('5.33'),
  },
  paddingLeftRightLarge: {
    paddingLeft: wp('5.33'),
    paddingRight: wp('5.33'),
  },
  paddingBottomLarge: {
    paddingBottom: wp('5.33'),
  },
  paddingRightLarge: {
    paddingRight: wp('5.33'),
  },
  paddingLeftLarge: {
    paddingLeft: wp('5.33'),
  },
  paddingTopLarge: {
    paddingTop: wp('5.33'),
  },
  // 15
  paddingRegular: { padding: wp('4') },
  paddingLeftRightRegular: {
    paddingLeft: wp('4'),
    paddingRight: wp('4'),
  },
  paddingTopBottomRegular: {
    paddingTop: wp('4'),
    paddingBottom: wp('4'),
  },
  paddingTopRegular: {
    paddingTop: wp('4'),
  },
  paddingBottomRegular: {
    paddingBottom: wp('4'),
  },
  paddingLeftRegular: {
    paddingLeft: wp('4'),
  },
  paddingRightRegular: {
    paddingRight: wp('4'),
  },
  // 10
  paddingSmall: { padding: wp('2.64') },
  paddingLeftRightSmall: {
    paddingLeft: wp('2.64'),
    paddingRight: wp('2.64'),
  },
  paddingTopBottomSmall: {
    paddingTop: wp('2.64'),
    paddingBottom: wp('2.64'),
  },
  paddingTopSmall: {
    paddingTop: wp('2.64'),
  },
  paddingBottomSmall: {
    paddingBottom: wp('2.64'),
  },
  paddingLeftSmall: {
    paddingLeft: wp('2.64'),
  },
  paddingRightSmall: {
    paddingRight: wp('2.64'),
  },
};
