import React, { useState, useRef, forwardRef } from 'react';
import { AuthContext } from '../context';
import { View, NativeModules, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Icon, Avatar } from 'react-native-elements';
import { Modalize } from 'react-native-modalize';
import TextField from '../../components/text_field';
import PickerComponent from '../../components/picker'
import { useCombinedRefs } from '../../helpers/use-combined-refs';
var ImagePicker = NativeModules.ImageCropPicker;

export default Profile = forwardRef((props, ref ) => {
  const modalizeRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, modalizeRef);

  let profile = {};
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [education, setEducation] = useState(null);
  const [photo, setPhoto] = useState({});
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
  
  // const handleChangeValue = e => {
  //   console.log(e)
  //   profile.name = e.target.value;
  //   setProfile(profile)
  // }

  // const setName = (value) => {
  //   profile.name = value
  //   setProfile(profile)
  //   console.log('NAME: ', profile)
  // }
  // const setEmail = (value) => {
  //   profile.email = value
  //   setProfile(profile)
  //   console.log('MAIL: ', profile)
  // }
  // const setGender = (value) => {
  //   profile.gender = value
  //   setProfile(profile)
  //   console.log('Gender: ', profile)
  // }
  // const setEducation = (value) => {
  //   profile.education = value
  //   setProfile(profile)
  //   console.log('EDU: ', profile)
  // }
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
  // const DismissKeyboard = ({ children }) => (
  //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
  // );

  return (
    // <DismissKeyboard>
    <KeyboardAvoidingView enabled  style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'column'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={{ alignItems: 'center', paddingBottom: 20}}>
          <Avatar
            rounded
            size="xlarge"
            // defaultSource={photo}
            imageProps={{ defaultSource: photo }}
            showAccessory
            onPress={() => console.log("Works!")}
            onAccessoryPress={() => combinedRef.current.open() }
            activeOpacity={0.7}
          />
        </View>
          <TextField label="Name" placeholder="John Applesed" value={name} onChange={setNameState} />
          <TextField label="Email" placeholder="John.Applesed@email.com" value={email} onChange={setEmailState} />
          <View style={styles.container}>
            <Text style={styles.label}>Gender:</Text>
            <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
              <Icon name="gender-male" type="material-community" size={30} onPress={() => { setGender('male') }}  iconStyle={{ ...styles.icon, ...(gender === 'male' ? styles.iconSelected : {}) }}/>
              <Icon name="gender-female" type="material-community" size={36} onPress={() => { setGender('female') }}  iconStyle={{ ...styles.icon, ...(gender === 'female' ? styles.iconSelected : {}) }}/>
              <Icon name="gender-transgender" type="material-community" size={24} onPress={() => { setGender('transgender') }}  iconStyle={{ ...styles.icon, ...(gender === 'transgender' ? styles.iconSelected : {}) }}/>
            </View>
          </View>
          <PickerComponent label="Education" selectedValue={education} availableOptions={educationOptions} k="education" onChange={setEducation} />          
        <Button
          title="Submit"
          buttonStyle={{ ...styles.button, alignSelf: 'center' }}
          titleStyle={styles.buttonText}
          onPress={() => console.log('SAVE User Profile', profile)}
        />
      </View>
      </TouchableWithoutFeedback>
      <Modalize ref={combinedRef} adjustToContentHeight={true}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 200, padding: 50}}>
          <Button title="Camera" onPress={() => pickWithCamera()} />
          <Button title="Gallery" onPress={() => pickWithGallery()} />
        </View>
      </Modalize>
    </KeyboardAvoidingView>
    // </DismissKeyboard>
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
  },
  icon: {
    marginLeft: 20,
    marginRight: 20,
    color: 'lightgray',
    height: 24,
  },
  iconSelected: {
    height: 30,
    color: 'green'
  },
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
  },
  buttonText: {
    fontSize: 13,
    color: '#212529',
  }
});