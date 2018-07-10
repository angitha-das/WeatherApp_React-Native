import { StyleSheet,Dimensions } from 'react-native';

const dimen = Dimensions.get('window');

export default StyleSheet.create({
    mainContaier:{
        flex:1,
        backgroundColor:'black',
    },
    containerStyle:{
       
    },
    icon: {
        fontFamily: 'WeatherIcons-Regular',
        alignSelf:'center',
        fontSize: 130,
        padding: 0,
        marginTop:dimen.height/8,
        color:'white'
    },
    placeTextDark:{
        color:'white',
        justifyContent:'center',
        marginTop:dimen.height/80,
        alignSelf:'center'
    },
    errorTextDark:{
        alignItems:'center',
        color:'white',
        justifyContent:'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:dimen.height/2,
        alignSelf:'center',
    },
    temparatureTextDark:{
        color:'white',
        justifyContent:'center',
        alignItems:'baseline',
        alignSelf:'center',
        fontSize: 80,
        fontWeight: 'bold',
        marginTop:dimen.height/16
    },
    weatherDescTextDark:{
        color:'white',
        justifyContent:'center',
        alignItems:'baseline',
        alignSelf:'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:dimen.height/16
    },
    searchIcon:{
        color: 'white',
        alignSelf:'center',
        marginLeft:8,
        marginRight:8,
        zIndex: 10,
    }
    
})