import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: () => import("./views/Inicio.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/header",
    name: "header",
    component: () => import("./components/Header.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/contenidohtml/:id",
    name: "contenidohtml",
    component: () => import("./views/ContenidoHTML.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/components/Test.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('./views/Signin.vue')
  },
  {
    path: '/configuracion/:id',
    name: 'Configuracion',
    component: () => import('./views/Configuracion.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;