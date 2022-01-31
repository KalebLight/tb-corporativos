import { API } from "./config";

export default {
  listarPublicacoes: () => {
    return API.get("/publicacao");
  },
  criarPublicacoes: (nova_publicacao) => {
    return API.post("/publicacao", nova_publicacao, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  },

  editarPublicacao: (publicacaoId, publicacao) => {
    return API.put(`/publicacao/${publicacaoId}`, publicacao, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  },

  listarPublicacoesFeed: () => {
    return API.get("/publicacao/feed", {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  },
  getPublicacoesUsuario: (usuarioId) => {
    return API.get(`/${usuarioId}/publicacoes`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  },
  getTags: () => {
    return API.get("tags");
  },
  getPublicacao: (publicacaoId) => {
    return API.get(`/publicacao/${publicacaoId}`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  },
};
