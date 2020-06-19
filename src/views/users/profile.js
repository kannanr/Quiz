import React, { useState, useRef, forwardRef } from 'react';
import { View, NativeModules, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Text, Button, Icon, Avatar } from 'react-native-elements';
import { Modalize } from 'react-native-modalize';
import GetLocation from 'react-native-get-location'
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import moment from "moment";

import TextField from '../../components/text_field';
import PickerComponent from '../../components/picker'
import { useCombinedRefs } from '../../helpers/use-combined-refs';
import { GOOGLE_API_KEY } from 'react-native-dotenv'

var ImagePicker = NativeModules.ImageCropPicker;
const screenWidth = Dimensions.get('window').width;

export default Profile = forwardRef((props, ref ) => {
  const modalizeRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, modalizeRef);

  let profile = {};
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [dob, setDob] = useState(moment(new Date()).format("MM-DD-YYYY"));
  const [gender, setGender] = useState('male');
  const [education, setEducation] = useState(null);
  const [photo, setPhoto] = useState({});
  const [street, setStreet] = useState(null);
  const [locality, setLocality] = useState(null);
  const [town, setTown] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const emailRef = useRef(null);
  const dobRef = useRef(null);
  const educationRef = useRef(null);
  const streetRef = useRef(null);
  const localityRef = useRef(null);
  const townRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const zipcodeRef = useRef(null);

  const educationOptions = [
    "No formal education",
    "Primary education",
    "Secondary education or high school",
    "Vocational qualification",
    "Bachelor's degree",
    "Master's degree",
    "Doctorate or higher"
  ]
  const setNameState = (e) => {
    setName(e.nativeEvent.text);
  }

  const setEmailState = (e) => {
    setEmail(e.nativeEvent.text);
  }
  
  const setProfilePic = (value) => {
    profile.photo = value
    setProfile(profile)
  }
  
  const pickWithCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      cropperCircleOverlay: true
    })
      .then((image) => {
        var imageProps = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        }
        setPhoto(imageProps)
        combinedRef.current.close();
      })
      .catch((e) => alert(e));
  }

  const pickWithGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true
    }).then(image => {
      var imageProps = {
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
      }
      setPhoto(imageProps)
      combinedRef.current.close();
    });
  }
  
  GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(position => {
    const locationData = `${position.latitude},${position.longitude}`
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationData}&sensor=true&key=${GOOGLE_API_KEY}`
    fetch(url)
      .then(response => response.json())
      .then((result) => {
        const { results } = result;
        const address = results[0].address_components;
        setZipcode(address?.find(add => add?.types?.includes('postal_code'))?.long_name);
        setCountry(address?.find(add => add?.types?.includes('country'))?.long_name);
        setState(address?.find(add => add?.types?.includes('administrative_area_level_1'))?.long_name);
        setCity(address?.find(add => add?.types?.includes('administrative_area_level_2'))?.long_name);
        setTown(address?.find(add => add?.types?.includes('locality'))?.long_name);
        setLocality(address?.find(add => add?.types?.includes('sublocality_level_1'))?.long_name);
        setStreet(address?.find(add => add?.types?.includes('route'))?.long_name);
      })
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })

  return (
    <KeyboardAvoidingView enabled  style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'column'}} behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={{ alignItems: 'center', paddingBottom: 20, paddingTop: 20}}>
          <Avatar
            rounded
            size="xlarge"
            imageProps={{ defaultSource: photo }}
            showAccessory
            onAccessoryPress={() => combinedRef.current.open() }
            activeOpacity={0.7}
          />
        </View>
        <TextField label="Name" placeholder="John Applesed" value={name} onChange={setNameState} onSubmitEditing={() => emailRef.current.focus()} />
        <TextField label="Email" placeholder="John.Applesed@email.com" value={email} onChange={setEmailState} curRef={ emailRef } onSubmitEditing={() => dobRef.current.onPressDate()}   />
        <View style={styles.container}>
          <Text style={styles.label}>DoB</Text>
          <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
            <DatePicker
              ref={dobRef}
              date={dob} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="select date"
              format="MM-DD-YYYY"
              minDate="01-01-1920"
              maxDate="01-01-2021"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              useNativeDriver={true}
              customStyles={{
                dateIcon: { display:'none', },
                dateInput: { marginLeft: 20, borderWidth: 0, border: 'none', alignItems: 'flex-start', justifyContent: 'center' }
              }}
              onDateChange={(date) => setDob(date)}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Gender</Text>
          <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="male"             type="font-awesome" raised={true} size={gender === 'male' ? 24 : 18}        onPress={() => { setGender('male') }}         iconStyle={{ ...styles.icon, ...(gender === 'male' ? styles.iconSelected : {}) }}/>
            <Icon name="female"           type="font-awesome" raised={true} size={gender === 'female' ? 24 : 18}      onPress={() => { setGender('female') }}       iconStyle={{ ...styles.icon, ...(gender === 'female' ? styles.iconSelected : {}) }}/>
            <Icon name="transgender-alt"  type="font-awesome" raised={true} size={gender === 'transgender' ? 24 : 18} onPress={() => { setGender('transgender') }}  iconStyle={{ ...styles.icon, ...(gender === 'transgender' ? styles.iconSelected : {}) }}/>
          </View>
        </View>
        <PickerComponent label="Education" placeholder="Your Education" selectedValue={education} availableOptions={educationOptions} onChange={setEducation} curRef={educationRef}/>
        <TextField label="Street" placeholder="Wall Street" value={street} onChange={setStreet} curRef={streetRef} onSubmitEditing={() => localityRef.current.focus()} />
        <TextField label="Locality" placeholder="Manhattan" value={locality} onChange={setLocality} curRef={localityRef} onSubmitEditing={() => townRef.current.focus()} />
        <TextField label="Town" placeholder="New York County" value={town} onChange={setTown} curRef={townRef} onSubmitEditing={() => cityRef.current.focus()} />
        <TextField label="City" placeholder="New York" value={city} onChange={setCity} curRef={cityRef} onSubmitEditing={() => stateRef.current.focus()} />
        <TextField label="State" placeholder="New York" value={state} onChange={setState} curRef={stateRef} onSubmitEditing={() => countryRef.current.focus()} />
        <TextField label="Country" placeholder="United States" value={country} onChange={setCountry} curRef={countryRef} onSubmitEditing={() => zipcodeRef.current.focus()} />
        <TextField label="Zipcode" placeholder="10005" value={zipcode} onChange={setZipcode} />
        <Button
          title="Submit"
          buttonStyle={{ ...styles.button, alignSelf: 'center' }}
          titleStyle={styles.buttonText}
          onPress={() => console.log('SAVE User Profile', profile)}
        />
      </ScrollView>
      </TouchableWithoutFeedback>
      <Modalize ref={combinedRef} adjustToContentHeight={true} useNativeDriver={true}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 200, padding: 50}}>
          <Button title="Camera" onPress={() => pickWithCamera()} />
          <Button title="Gallery" onPress={() => pickWithGallery()} />
        </View>
      </Modalize>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1, 
    borderBottomColor: 'gray',
    fontSize: 14, 
    alignItems: 'flex-start', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    paddingTop: 10,
    paddingBottom: 10,
    height: 60,
  },
  textInput: {
    paddingLeft: 20,
    marginRight: 45,
    fontSize: 14
  },
  label: {
    fontWeight: "700",
    fontSize: 16,
    width: screenWidth * 0.2
  },
  icon: { color: 'tomato', },
  iconSelected: { color: 'green' },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 5,
    height: 40,
    width: 120,
    marginBottom: 100,
  },
  buttonText: {
    fontSize: 13,
    color: '#212529',
  }
});