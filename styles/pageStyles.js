import {StyleSheet} from "react-native";
export default StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    buttonImage: {
        opacity:0.7,
        flex:1,
        width: 110,
        height: 110,
        resizeMode:'cover',
        alignItems:'baseline',
    },
    viewStyle: {
        alignItems:'baseline',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttonContainer:{
        backgroundColor: 'rgba(150,0,150,0.0)',
        paddingVertical: 15,
        marginBottom:10,
        width:110,
        height:110,
        alignItems:'center',
    },
    textContainer:{
        backgroundColor: 'rgba(0,255,0,0.7)',
        paddingVertical:5,
        marginBottom:2,
        width:150,
        height:30,
        alignItems:'center',
    },

    buttonStyle:{
        color: '#0f0',
        textAlign: 'center',
        fontWeight: '700'
    },
    friendsView: {
        alignItems:'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    bottomView:{
        opacity:0.7,
        flex:1,
        width: 50,
        height: 50,
        resizeMode:'cover',
        alignItems:'baseline',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0

    },container: {
        padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#000'
    },
    registerContainer:{
        backgroundColor: '#49E20E',
        paddingVertical: 15,
        marginBottom:10
    },
    register:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
    }
});