import {ms} from 'react-native-size-matters';

export default {
  colors: {
    gray: '#2C2C2C',
    gray2: '#666666',
    gray600: '#202024',
    light: '#EEF1F4',
    dark: '#121212',
    white: '#FFFFFF',
    yellow: '#FFB800',
    orange: '#FF8441',
    red: '#FF6767',
    blue: '#5D9EFF',
    purple: '#A366FF',
    green: '#6BC874',

    cards: {
      ame: '#ED0059',
      nubank: '#530082',
      iti: '#FE3386',
      picpay: '#202024',
      neon: '#0f92ff',
      next: '#00ff5f',
    },
  },
  sizes: {
    5: ms(5),
    9: ms(9),
    12: ms(12),
    14: ms(14),
    15: ms(15),
    16: ms(16),
    18: ms(18),
    20: ms(20),
    22: ms(22),
    24: ms(24),
    36: ms(36),
    100: ms(100),
  },

  fonts: {
    Lexend100: 'Lexend-Thin',
    Lexend200: 'Lexend-ExtraLight',
    Lexend300: 'Lexend-Light',
    Lexend400: 'Lexend-Regular',
    Lexend500: 'Lexend-Medium',
    Lexend600: 'Lexend-SemiBold',
    Lexend700: 'Lexend-Bold',
    Lexend800: 'Lexend-ExtraBold',
    Lexend900: 'Lexend-Black',
  },
} as const;
