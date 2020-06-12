/* eslint-disable */
import React, { Component } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text } from 'react-native';
import BannerSection from './BannerSection';
import { colors } from '../../../styles/styleSheet';
import { wp } from '../../../utils/Dimensions';

export class BannerCarousel extends Component {
  constructor(props) {
    super();
    this.props = props;
    this._carousel = {};
    this.init();
  }

  init() {
    this.state = {
      slides: [
        {
          thumbnail: require('../../../assets/images/banner1.png'),
        },
        {
          thumbnail: require('../../../assets/images/banner1.png'),
        },
        {
          thumbnail: require('../../../assets/images/banner1.png'),
        },
        {
          thumbnail: require('../../../assets/images/banner1.png'),
        },
      ],
      activeSlide: 0,
    };
  }

  _renderItem = ({ item, index }) => {
    return <BannerSection></BannerSection>;
  };
  get pagination() {
    const { activeSlide, slides } = this.state;
    return (
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          bottom: 60,
          width: 20,
          height: 20,
          backgroundColor: colors.white,
          borderRadius: 100,
        }}
        dotColor={colors.white}
        inactiveDotColor={colors.white}
        inactiveDotStyle={{
          backgroundColor: colors.white,
          opacity: 0.3,
        }}
      />
    );
  }
  render() {
    return (
      <View>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          lockScrollWhileSnapping
          autoplay
          autoplayDelay={2000}
          autoplayInterval={2000}
          data={this.state.slides}
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          sliderWidth={wp(100)}
          itemWidth={wp(100)}
          //   itemHeight={wp(100)}
          layout="default"
          firstItem={0}
          loop
        />
        {this.pagination}
      </View>
    );
  }
}
