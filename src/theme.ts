import { extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig } from 'chakra-ui-steps';

export const theme = extendTheme({
  components: {
    Steps: {
      ...StepsStyleConfig,
      baseStyle: (props: any) => {
        return {
          ...StepsStyleConfig.baseStyle(props),
          icon: {
            ...StepsStyleConfig.baseStyle(props).icon,
            strokeWidth: '3px',
          },
        };
      },
    },
  },
  colors: {
    icp: '#E660D9',
    xrp: '#157FFF',
    primary: '#FCFF73',
    second: '#81C784',
  },
});
