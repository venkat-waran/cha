import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { View, TouchableOpacity } from 'react-native';
import { colors } from '../../../styles/styleSheet';
import { wp } from '../../../utils/Dimensions';
import Milestones from './Milestones';
import { GetIcon } from '../../../utils/Icons';

const MilestoneCarousel = ({ milestones = [] }) => {
  const carouselRef = useRef(null);
  // const [slides, setSlides] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [activeSlide, setActiveSlide] = useState(0);
  const renderItem = ({ item }) => {
    let amountAchieved = '$0 achieved';
    let icon = 'times|FontAwesome5';
    let color = colors.GREYS.C8;
    if (item.achieved) {
      amountAchieved = `$${item.amount} achieved`;
      icon = 'check|FontAwesome5';
      color = colors.GREEN.C1;
    }
    return (
      <Milestones
        icon={icon}
        title={item.title}
        subTitle={amountAchieved}
        desc={item.description}
        color={color}
      />
    );
  };

  renderItem.propTypes = {
    item: PropTypes.object,
  };

  return (
    <View
      style={{
        marginTop: wp(6.66),
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(5, 201, 118, 0.06)',
      }}
    >
      <View>
        <Carousel
          ref={carouselRef}
          data={milestones}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveSlide(index)}
          sliderWidth={wp(90)}
          itemWidth={wp(90)}
          //   itemHeight={wp(100)}
          layout="default"
          firstItem={0}
        />
        {milestones && milestones.length ? (
          <View
            style={{
              position: 'absolute',
              width: wp(90),
              top: 0,
              bottom: 0,
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* {activeSlide !== 0 && ( */}
              <TouchableOpacity
                style={{ marginLeft: wp(5.33) }}
                onPress={() => {
                  carouselRef.current.snapToPrev();
                }}
              >
                {GetIcon(
                  'chevron-left|FontAwesome5',
                  activeSlide !== 0
                    ? colors.black
                    : colors.textFieldBorderColor,
                  wp(8.53),
                )}
              </TouchableOpacity>
              {/* )} */}
              {/* {activeSlide !== milestones.length - 1 && ( */}
              <TouchableOpacity
                style={{ marginRight: wp(5.33) }}
                onPress={() => {
                  carouselRef.current.snapToNext();
                }}
              >
                {GetIcon(
                  'chevron-right|FontAwesome5',
                  activeSlide !== milestones.length - 1
                    ? colors.black
                    : colors.textFieldBorderColor,
                  wp(8.53),
                )}
              </TouchableOpacity>
              {/* )} */}
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

MilestoneCarousel.propTypes = {
  milestones: PropTypes.array,
};
export default MilestoneCarousel;
