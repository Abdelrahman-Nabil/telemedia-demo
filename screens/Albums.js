import React, { useState, useEffect } from 'react'
import { Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { NETWORK } from '../configs/network'

export default Albums = (props) => {
    const [loading, setLoading] = useState(true)
    const [albums, setAlbums] = useState([])
    const [error, setError] = useState('')
    let id = props.route.params.id

    useEffect(() => {
        NETWORK.GET(`users/${id}/albums`, (data) => {
            setAlbums(data)
            setLoading(false)
        }, (error) => {
            setLoading(false)
            setError(error)
        })
    }, [])

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity = {0.7}
            style = {styles.itemContainer}
            onPress = {() => submit(item.id)}>
            <Text style = {styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
    )
    const emptyState = () => {
        if (loading)
            return (
                <ActivityIndicator color = '#000' size = 'large'/>
            )
        if (error)
            return (
                <Text style = {styles.errorText}>{'Something Went Wrong: ' + error}</Text>
            )
        return (
            <Text style = {styles.emptyStateText}>No Albums</Text>
        )
    }
    const submit = (albumId) => {
        props.navigation.navigate('Photos', {
            id: albumId
        })
    }
    
    return (
        <FlatList
            data={albums}
            ListEmptyComponent = {emptyState}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}

        />
    )
}

const styles = {
    itemContainer: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: 'gray'
    },
    itemText: {
        fontSize: 18
    },
    emptyStateText: {
        fontSize: 18,
        alignSelf: 'center',
        padding: 12,
        textAlign: 'center'
    },
    errorText: {
        fontSize: 18,
        color: '#ff0000',
        alignSelf: 'center',
        padding: 12,
        textAlign: 'center'

    }
}