import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NETWORK } from '../configs/network'

export default Welcome = (props) => {
    setTimeout(() => {
        SplashScreen.hide()
    }, 1500) // added a delay just so you can see it 
    const [loading, setLoading] = useState()
    const [id, setId] = useState('')
    const [error, setError] = useState('')
    const submit = () => {
        if(!id){
            setError('Please enter user ID')
            return
        }
        setLoading(true)
        setError('')
        NETWORK.GET(`users/${id}`, (data) => {    
            setLoading(false)
            props.navigation.navigate('Albums', {
                id: data.id
            })
        }, (error) => {
            setError('User does not exist')
            setLoading(false)
        })
    }
    return (
        <View style = {styles.container}>
            <Text style = {styles.inputHeader}>
                Enter ID
            </Text>
            <View style = {styles.inputContainer}>
                <TextInput 
                    autoFocus
                    keyboardType = {'numeric'} 
                    style = {styles.input}
                    onChangeText = {(t) => {setId(t.replace(/\D/g,''));setError('')}}
                    value = {id}
                    onSubmitEditing = {submit} />
                {loading && <ActivityIndicator color = '#000'/>}
            </View>
            <Text style = {styles.error}>
                {error}
            </Text>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    inputHeader: {
        width: '60%',
        fontSize: 18
    },
    inputContainer: {
        width: '60%',
        flexDirection: 'row'
    },
    input: {
        height: 50,
        fontSize: 18,
        borderWidth: 1,
        width: '100%',
        marginRight: 12,
        marginVertical: 12,
        backgroundColor: '#fff'
      },
    error: {
        color: '#FF0000',
        width: '60%'
    }
}