import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import EmptyState from '../common/EmptyState';
import Loader from '../common/Loader';
import { wp } from '../../utils/Dimensions';
import { typography, colors, Custompadding } from '../../styles/styleSheet';
import Header from '../common/header';
import Input from '../common/CustomTextField';
import { useCategoriesHook } from '../../app/shared/hooks';

const SearchMission = (props) => {
  const {
    route: { params },
  } = props;

  const { redirectTo = '', showSearch = true, title } = params;

  const {
    categories: { data: categories, loader },
  } = useCategoriesHook(props);

  const handleSelectCategory = (selected) => {
    props.navigation.navigate(redirectTo, { selectedCategory: selected });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Container style={[Custompadding.paddingLarge]}>
        <Header
          heading={title || 'find a mission'}
          backCallback={() => {
            props.navigation.goBack();
          }}
          // noBack
        />
        <View
          style={{
            marginVertical: wp(4),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {showSearch && (
            <>
              <View style={{ width: wp(75) }}>
                <Input isSearchInput text="Search" />
              </View>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={[
                  Custompadding.paddingBottomSmall,
                  {
                    alignItems: 'flex-end',
                  },
                ]}
              >
                <Text style={[typography.regular.h6, { color: colors.black }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {loader ? (
          <Loader />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <>
              {categories && categories.length ? (
                categories.map((category) => (
                  <TouchableOpacity
                    onPress={() => handleSelectCategory(category)}
                    key={category.id}
                  >
                    <View
                      style={[
                        Custompadding.paddingLeftRightXLarge,
                        Custompadding.paddingTopBottomRegular,
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: colors.GREYS.C7,
                          borderRadius: 18,
                          marginBottom: wp(2),
                        },
                      ]}
                    >
                      <View style={{ height: wp(10.66), width: wp(10) }}></View>
                      <Text
                        style={[
                          typography.bold.h6,
                          Custompadding.paddingLeftXLarge,
                          { textTransform: 'capitalize' },
                        ]}
                      >
                        {category.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <EmptyState message="No categories" />
              )}
            </>
          </ScrollView>
        )}
      </Container>
    </SafeAreaView>
  );
};
SearchMission.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default SearchMission;
const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
