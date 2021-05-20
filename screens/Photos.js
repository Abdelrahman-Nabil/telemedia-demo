import React, { useState, useEffect } from 'react'
import { Text, FlatList, Image, ActivityIndicator, Dimensions } from 'react-native'
import { NETWORK } from '../configs/network'

let { width, height } = Dimensions.get('window')
export default Photos = (props) => {

    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    let id = props.route.params.id

    useEffect(() => {
        NETWORK.GET(`albums/${id}/photos`, (data) => {
            setPhotos(data)
            setLoading(false)
        }, (error) => {
            setLoading(false)
            setError(error)
        })
    }, [])
    const renderItem = ({ item, index }) => (
        <Image 
            source = {{ uri: item.url }}
            style = {styles.itemImage}
            loadingIndicatorSource = {{ uri: item.thumbnailUrl }}
        />
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
            <Text style = {styles.emptyStateText}>No Photos</Text>
        )
    }
    return (
        <FlatList
            numColumns = {2}
            data={photos}
            ListEmptyComponent = {emptyState}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}

        />
    )
}

const styles = {
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

    },
    itemImage: {
        width: width * 0.5,
        height: width * 0.5
    }
}