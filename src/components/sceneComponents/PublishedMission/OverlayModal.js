import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { GetIcon } from '../../../utils/Icons';
import { wp } from '../../../utils/Dimensions';
import { colors, Custompadding, typography } from '../../../styles/styleSheet';

const OverlayModal = ({
  onCopyURL,
  url,
  missionDetail,
  onShareMission,
  isCopied,
}) => (
  <View
    style={{
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '95%',
    }}
  >
    <View>
      <Text
        style={[
          typography.regular.h1,
          {
            color: colors.white,
            textTransform: 'capitalize',
            lineHeight: wp(9),
          },
        ]}
      >
        congratulations
      </Text>
      <Text
        style={[
          typography.bold.h4,
          Custompadding.paddingBottomRegular,
          {
            color: colors.white,
            textTransform: 'capitalize',
            lineHeight: wp(9),
          },
        ]}
      >
        your mission is live!
      </Text>
      <Text
        style={[
          typography.bold.h4,
          {
            color: colors.white,
            textTransform: 'capitalize',
            lineHeight: wp(9),
            //   marginBottom: wp(30),
          },
        ]}
      >
        spread the word and find your first contributors
      </Text>
    </View>
    <View>
      <Text
        style={[
          typography.bold.h2,
          {
            color: colors.white,
            textTransform: 'uppercase',
            lineHeight: wp(6),
          },
        ]}
      >
        {missionDetail.title}
      </Text>
      {/* <Text
        style={[
          typography.bold.h4,
          Custompadding.paddingBottomRegular,
          { color: colors.white },
        ]}
      >
        @spca
      </Text> */}
      <View
        style={[
          Custompadding.paddingTopBottomXLarge,
          Custompadding.paddingLeftLarge,
          {
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignSelf: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: 36,
            width: wp(78),
            marginBottom: wp(4),
          },
        ]}
      >
        {GetIcon('link|FontAwesome5', colors.white, wp(4))}
        <Text
          style={[
            typography.bold.h5,
            { color: colors.white, marginLeft: wp(2) },
          ]}
        >
          {url}
        </Text>
      </View>
      <View
        style={[
          Custompadding.paddingSmall,
          {
            alignSelf: 'center',
            borderWidth: 3,
            borderColor: colors.white,
            borderRadius: 36,
            marginBottom: wp(4),
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            onCopyURL(url);
          }}
        >
          <Text style={[typography.bold.h5, { color: colors.white }]}>
            {isCopied ? 'copied mission URL' : 'copy mission URL'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View>
      <TouchableOpacity onPress={() => onShareMission(url)}>
        <Text
          style={[
            typography.bold.h4,
            {
              color: colors.white,
              textAlign: 'center',
              textTransform: 'capitalize',
              marginBottom: wp(7.2),
            },
          ]}
        >
          share mission
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
OverlayModal.propTypes = {
  onCopyURL: PropTypes.func,
  onShareMission: PropTypes.func,
  missionDetail: PropTypes.object,
  url: PropTypes.string,
  isCopied: PropTypes.bool,
};
export default OverlayModal;
