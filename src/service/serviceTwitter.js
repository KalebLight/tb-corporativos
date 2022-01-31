import {API} from './config'


export default {

    postarTweet:(publicacaoId) =>{
        API.get(`publicacao/tweet/${publicacaoId}`,         {
          headers: {
              'Authorization': 'Token '+localStorage.getItem('token')
          }
      })
    }
}