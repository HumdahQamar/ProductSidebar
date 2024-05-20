import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ScreenWrapper = styled.View`
  height: ${hp('100')}px;
  padding-bottom: 20px;
`;
