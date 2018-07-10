import React, {Component} from 'react';

import {
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { 
Icon, 
} from 'native-base';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import darkEveningStyle from './styles/WeatherViewDarkEveningStyle'
import lightMorningStyle from './styles/WeatherViewLightMorningStyle'
import weatherIcon from "../assets/icons"

export default class WeatherView extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            searchKey: '',
            cityNotFound: false,
            latitude: null,
            longitude: null,
            error:null,
            time: new Date().getHours()
        }
    }

    fetchCityWeather(city) {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=OPEN_WEATHER_API_KEY`
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          if(responseJson.cod == 200){
              this.setState({
                  temperature: responseJson.main.temp-273.15,
                  city: responseJson.name,
                  country: responseJson.sys.country,
                  weatherType: responseJson.weather[0].main,
                  icon: weatherIcon(responseJson.weather[0].icon),
                  isLoading:false,
                  cityNotFound: false
                });
          }
          else{
              this.setState({
                  isLoading:false,
                  cityNotFound: true
              })
          }
      })
      .catch((error) =>{
          console.error(error);
      });
  }

    fetchWeather(latitude,longitude) {
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=OPEN_WEATHER_API_KEY`
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.cod == 200){
                this.setState({
                    temperature: responseJson.main.temp-273.15,
                    city: responseJson.name,
                    country: responseJson.sys.country,
                    weatherType: responseJson.weather[0].main,
                    icon: weatherIcon(responseJson.weather[0].icon),
                    isLoading:false,
                    cityNotFound: false
                  });
            }
            else{
                this.setState({
                    isLoading:false,
                    cityNotFound: true
                  
                })
            }
            
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    
    getCity=(value)=>{
        console.log("val", value);
        this.setState({
            searchKey : value
        });
    }

    getCurrentLocationWeatherUpdate=()=>{
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
              this.fetchWeather(this.state.latitude,this.state.longitude);
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
          );
    }
 
    componentDidMount() {   
        this.getCurrentLocationWeatherUpdate();
    }

    getTextColor() {   
        return (this.state.time>18)?'white':'black';
    }

    render() {     
    const chosenTheme = (this.state.time>18) ? darkEveningStyle:lightMorningStyle;
  
    if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20,justifyContent:'center'}}>
            <ActivityIndicator/>
          </View>
        )
    }
    return (  
      <View style={chosenTheme.mainContaier}>   
      <View style={chosenTheme.containerStyle}>
      
       {(this.state.time > 18) ?
       <StatusBar  barStyle="light-content" />
      :
      <StatusBar  barStyle="dark-content" /> }

      <GooglePlacesAutocomplete
                    placeholder= "Search City"
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    textInputProps={{ onChangeText: (text) => this.getCity(text), onSubmitEditing: () => this.fetchCityWeather(this.state.searchKey)}}
                    renderDescription={(row) => row.description || row.vicinity || row.name || row.formatted_address} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data);
                        console.log(details);
                       this.fetchWeather(details.geometry.location.lat,details.geometry.location.lng);
                    }}
                    getDefaultValue={() => {
                        return '';
                    }}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'GOOGLE_API_KEY',
                        language: 'en', // language of the results
                        types: '(cities)' // default: 'geocode'
                    }}
                    styles={{
                      container: {
                          width:'100%',
                          zIndex: 10,
                          overflow: 'visible',
                          marginTop: getStatusBarHeight(),
                        },
                        textInputContainer: {
                          backgroundColor: 'transparent',
                          borderTopColor: 'transparent',
                          height: 45,
                          borderBottomColor: this.getTextColor(),
                        },
                        textInput: {
                          color: this.getTextColor(),
                          width:'100%',  
                          backgroundColor:'transparent',
                          fontSize: 16,
                          borderRadius: 0,
                          justifyContent:'center',
                          marginLeft:-8,
                        },
                        predefinedPlacesDescription: {
                          color: '#1faadb'
                        },
                        listView: {
                        zIndex:30,
                        backgroundColor:'white',
                        position: 'absolute',
                        marginTop: 40,
                        elevation: 1
                    },
                    separator: {
                        opacity: 0.5
                    }
                      }}
                
                    // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    // currentLocationLabel="Current location"

                    // nearbyPlacesAPI='None' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                    //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        key: 'GOOGLE_API_KEY',
                        language: 'en',
                        types: '(cities)' // default: 'geocode'
                        
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        types: 'food'
                    }}
                
                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    
                    renderLeftButton={() => <Icon active name='search' style = {chosenTheme.searchIcon}/>}
                    // renderRightButton={() => <Icon active name='pin'  onPress = {this.getCurrentLocationWeatherUpdate} style = {chosenTheme.searchIcon}/>}
                    />
                    
                    {
                      (this.state.cityNotFound) ?
                        <Text style={chosenTheme.errorTextDark}>
                            City not found !
                        </Text>
                        :
                        <View>
                        <Text style={chosenTheme.icon}>
                            {this.state.icon}
                          </Text>
                          <Text style={chosenTheme.temparatureTextDark}>
                            {Math.round(this.state.temperature) + "°C"} 
                            </Text>
                          <Text style={chosenTheme.placeTextDark}>
                          {this.state.city}, {this.state.country}
                          </Text>
                          <Text style={chosenTheme.weatherDescTextDark}>
                          So, it's {this.state.weatherType}
                          </Text>
                          </View>
                          } 
        </View> 
        </View>
        );

    }
}