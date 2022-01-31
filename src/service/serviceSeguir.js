
import {API} from './config'


export default {
    seguir: (idUsuario) => {

        return API.get(`/seguir/${idUsuario}`,         
        {
            headers: {
                'Authorization': 'Token '+localStorage.getItem('token')
            }
        })
    },
}