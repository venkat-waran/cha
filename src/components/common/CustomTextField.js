/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Custompadding, colors } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';
import { GetIcon } from '../../utils/Icons';

const CustomTextField = React.forwardRef((props, ref) => {
  const {
    placeholder,
    secureTextEntry,
    onChange,
    onChangeText,
    onBlur,
    onFocus,
    returnKeyType,
    onSubmitEditing,
    value,
    keyboardType,
    editable,
    multiline,
    isSearchInput,
    text,
    labelvalue,
    onPressSearch,
    formatText,
    errorText,
    disabled,
    characterRestriction,
    isNavigateInput,
  } = props;
  if (isNavigateInput) {
    return (
      <View style={{ flexGrow: 1 }}>
        <TextInput
          onFocus={onFocus}
          disabled={disabled}
          editable={editable}
          placeholderTextColor="rgba(0,0,0,0.4)"
          placeholder={placeholder}
          defaultValue={value}
          label={labelvalue}
          selectionColor={colors.black}
          ref={ref}
          style={{
            fontSize: 17,
            backgroundColor: '#ffffff',
            color: colors.black,
            // // textTransform: 'capitalize',
            // lineHeight: 18,
            // alignSelf: 'stretch',
            fontFamily: 'Bariol-Regular',
          }}
        />
      </View>
    );
  }
  if (isSearchInput) {
    return (
      <TouchableOpacity
        onPress={onPressSearch}
        style={[
          Custompadding.paddingLeftRightLarge,
          {
            paddingVertical: Platform.OS === 'android' ? 0 : wp(3.46),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            flexDirection: 'row',
            backgroundColor: colors.background,
            borderRadius: 10,
          },
        ]}
      >
        <View style={{ marginRight: wp(3.46) }}>
          {GetIcon('search|Feather', colors.black, wp(4))}
        </View>
        <View style={{ flexGrow: 1 }}>
          <TextInput
            onFocus={onFocus}
            disabled={disabled}
            editable={editable}
            placeholderTextColor="rgba(0,0,0,0.4)"
            placeholder={text}
            value={value}
            defaultValue={value}
            label={labelvalue}
            selectionColor={colors.black}
            ref={ref}
            style={{
              fontSize: 17,
              color: colors.black,
              // textTransform: 'capitalize',
              lineHeight: 18,
              alignSelf: 'stretch',
              fontFamily: 'Bariol-Regular',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <>
      <TextField
        // value={value}
        defaultValue={value}
        label={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        formatText={formatText}
        ref={ref}
        onChange={onChange}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onFocus={onFocus}
        returnKeyType={returnKeyType}
        editable={editable}
        disabled={disabled}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        underlineColorAndroid="transparent"
        fontSize={17}
        labelFontSize={18}
        placeholderTextColor="rgba(0,0,0,0.4)"
        characterRestriction={characterRestriction}
        style={{
          fontSize: 17,
          color: colors.black,
          // textTransform: 'capitalize',
          lineHeight: 18,
          fontFamily: 'Bariol-Regular',
        }}
        tintColor="rgba(0,0,0,0.4)"
        labelTextStyle={{
          textTransform: 'capitalize',
          fontFamily: 'Bariol-Regular',
        }}
        error={errorText}
      />
      {/* {errorText ? (
        <View style={{ position: 'absolute', bottom: wp('0') }}>
          <Text
            style={[
              typography.regular.h7,
              { color: colors.error, paddingTop: 10 },
            ]}
          >
            {errorText}
          </Text>
        </View>
      ) : null} */}
    </>
  );
});

CustomTextField.propTypes = {
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onPressSearch: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.any,
  keyboardType: PropTypes.string,
  editable: PropTypes.bool,
  multiline: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  isSearchInput: PropTypes.bool,
  isNavigateInput: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  labelvalue: PropTypes.string,
  errorText: PropTypes.string,
  formatText: PropTypes.string,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.string,
  characterRestriction: PropTypes.string,
};
export default CustomTextField;
