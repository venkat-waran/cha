import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import Header from '../common/header';
import { Custompadding } from '../../styles/styleSheet';

const MAPS_API_KEY =
  Platform.OS === 'ios'
    ? 'AIzaSyBKcs8zOT7FNJywABbKNCN6aR_U7cupjzw'
    : 'AIzaSyDj1QyOxxRlNWNXs2KxTcOARgFI_jHohhQ';

const Location = (props) => {
  const {
    route: { params },
  } = props;

  const { redirectTo = '' } = params;

  const reverseGeocoder = (lat, long, search) => {
    const searchText = search;
    const latitude = lat;
    const longitude = long;
    const googleBasedUrl = 'https://maps.google.com/maps/api/geocode/json';
    // const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const httpRequest = axios.create({
      baseURL: `${googleBasedUrl}`,
      method: 'get',
    });
    httpRequest({
      params: {
        key: `${MAPS_API_KEY}`,
        latlng: `${+lat},${+long}`,
      },
    })
      .then(({ data }) => {
        let postCode = '';
        let city = '';
        let state = '';

        if (data && data.results && data.results.length) {
          const { address_components } = data.results[0];
          if (address_components && address_components.length) {
            address_components.map((address) => {
              if (address.types && address.types.length) {
                if (address.types[0] === 'postal_code') {
                  postCode = address.long_name;
                }
                if (address.types[0] === 'locality') {
                  city = address.long_name;
                }
                if (address.types[0] === 'administrative_area_level_1') {
                  state = address.long_name;
                }
              }
              const locationInfo = {
                postCode,
                city,
                state,
                searchText,
                latitude,
                longitude,
              };
              props.navigation.navigate(redirectTo, { locationInfo });
              return null;
            });
          }
        }
      })
      .catch((err) => {
        alert(JSON.stringify(err), 'reverse Geocode Error err');
      });
  };
  const handleSearchResultPress = async (response, fetchDetails = null) => {
    const { description } = response;
    if (
      fetchDetails &&
      fetchDetails.geometry &&
      fetchDetails.geometry.location
    ) {
      const { lat, lng } = fetchDetails.geometry.location;
      if (lat && lng) reverseGeocoder(lat, lng, description);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
      <View
        style={[
          Custompadding.paddingLeftRightLarge,
          Custompadding.paddingTopLarge,
        ]}
      >
        <Header
          heading="Mission Location"
          backCallback={() => {
            props.navigation.goBack();
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Enter a location in USA"
          fetchDetails
          onPress={handleSearchResultPress}
          // eslint-disable-next-line no-console
          onFail={(err) => console.log(err, 'err')}
          query={{
            key: MAPS_API_KEY,
            language: 'en',
            components: 'country:us',
            types: '(cities)',
          }}
          enablePoweredByContainer={false}
          // GooglePlacesDetailsQuery={{
          //   fields: ['formatted_address', 'geometry'],
          // }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              // marginLeft: 2,
              // marginRight: 2,
              height: 40,
              color: '#5d5d5d',
              fontSize: 16,
            },
            loader: {
              color: 'red',
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
};

Location.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Location;
