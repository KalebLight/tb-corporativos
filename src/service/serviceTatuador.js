import {API} from './config'

export default {
    tatuadores: () => {
        return API.get(`/tatuador`)
    },

    associar: (tatuador, estudio) => {
        return API.post(`tatuador/associar-tatuador/${tatuador}`, estudio)
    },

    removerAssociacao: (tatuador) => {
        return API.delete(`tatuador/associar-tatuador/${tatuador}`)
    },

    tatuadoresEstudio: (estudio) => {
        return API.get(`/estudio-tatuadores/${estudio}`)
    },
}
