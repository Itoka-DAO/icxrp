import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    icp: '#E660D9',
    xrp: '#157FFF',
    primary: '#FCFF73',
    second: '#81C784',
  },
});
