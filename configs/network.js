import axios from 'axios'
import { API_ENDPOINT } from './constants'

export const NETWORK = {
    GET: (url, onSuccess = () => {}, onFailure = () => {}) => {
        axios.get(API_ENDPOINT + url)
            .then((response) => {
                onSuccess(response.data)
            })
            .catch((error) => {
                onFailure(error)
            })
    }
}