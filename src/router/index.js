import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/login/login';
import Cadastro from '../components/cadastro/Cadastro';
import listarPublicacoes from '../components/views/explorar/listarPublicacoes';
import detalharPublicacao from '../components/views/explorar/detalharPublicacao';
import Dashboard from '../components/views/Dashboard';
import perfilTatuador from '../components/views/perfilTatuador/perfilTatuador';
import galeria from '../components/views/galeria/galeria';
import paginaAlbum from '../components/views/album/paginaAlbum';
import gerenciaPerfil from '../components/views/perfilTatuador/gerenciaPerfil';
import buscar from '../components/views/buscar/buscar';
import perfilVisitado from '../components/views/perfilVisitado/perfilVisitado';
import landing from '../components/pagina-inicial/paginaInicial';
import tatuadores from '../components/views/tatuadores/tatuadores';

Vue.use(Router);
const routes = [
  {
    path: '',
    name: 'landing',
    component: landing,
    meta: {
      title: 'TattooBook',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: 'TattooBook',
    },
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
    meta: {
      title: 'TattooBook - Cadastro',
    },
  },
  {
    path: '/tatuadores',
    name: 'Tatuadores',
    component: tatuadores,
    meta: {
      title: 'Tatuadores',
    },
  },
  {
    path: '/logout',
    name: 'logout',
  },
  {
    path: '/auth/',
    component: () =>
      import('../components/estruturaView/modeloEstruturaPagina.vue'),
    children: [
      // Recarrega a Página inicial colocando o component dashboard
      {
        path: '/',
        redirect: '/Dashboard',
      },
      {
        path: 'Dashboard',
        name: 'paginaInicial',
        component: Dashboard,
        meta: { title: 'Página Inicial' },
      },
      {
        path: 'tatuadoresAuth',
        name: 'tatuadoresAuth',
        component: tatuadores,
        meta: {
          title: 'Tatuadores',
        },
      },
      {
        path: 'explorar',
        name: 'explorar',
        component: listarPublicacoes,
        meta: { title: 'Explorar' },
      },
      {
        path: 'perfil',
        name: 'perfilTatuador',
        component: perfilTatuador,
        props: true,
        meta: { title: 'Perfil Tatuador' },
      },
      {
        path: 'gerenciaPerfil',
        name: 'gerenciaPerfil',
        component: gerenciaPerfil,
        meta: { title: 'Gerenciamente de Perfil' },
      },
      {
        path: 'galeria',
        name: 'galeria',
        component: galeria,
        meta: { title: 'Galeria' },
      },
      {
        path: 'detalharPublicacao/:publicacaoId',
        name: 'detalharPublicacao',
        component: detalharPublicacao,
        meta: { title: 'Detalhamento Publicacao' },
      },
      //   {
      //     path: "meusAlbuns",
      //     name: "meusAlbuns",
      //     component: "meusAlbuns",
      //     meta: {
      //       title: "Meus Albuns",
      //     },
      //   },
      {
        path: 'paginaAlbum/:idAlbum',
        name: 'paginaAlbum',
        component: paginaAlbum,
        meta: { title: 'Vizualização Album' },
      },
      {
        path: 'buscar',
        name: 'buscar',
        component: buscar,
        meta: { title: 'Buscar' },
      },
      {
        path: 'perfilVisitado/:idUsuarioVisitado',
        name: 'perfilVisitado',
        component: perfilVisitado,
        meta: { title: 'Perfil' },
      },
    ],
  },
];

const router = new Router({ routes, mode: 'hash' });

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  Array.from(
    document.querySelectorAll('[data-vue-router-controlled]'),
  ).map((el) => el.parentNode.removeChild(el));

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));

  next();
});
export default router;
