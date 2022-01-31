import {API} from './config'

export default {

    curtir: (idPublicacao) => {
        return API.get(`/curtida/${idPublicacao}`,         
        {
            headers: {
                'Authorization': 'Token '+localStorage.getItem('token')
            }
        })
    }
}
