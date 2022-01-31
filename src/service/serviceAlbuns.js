import { API } from "./config";

export default {
  listarAlbuns: (idUsuario) => {
    return API.get(`/usuario/${idUsuario}/albuns`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  },
  criarAlbum: (album) => {
    return API.post("/album", album);
  },

  // PEGA OS DADOS DE UM ALBUM ESPECIFICO
  detalharAlbum: (albumId) => {
    return API.get(`/album/${albumId}/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  },

  adicionarPublicacao: (albumId, publicacao_id) => {
    return API.put(`/album/${albumId}/novaPublicacao`, publicacao_id, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  },
};
