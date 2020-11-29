<template>
  <header>
    <a href=""><img src="@/assets/logo.png" class="logo" /></a>
    <i class="fas fa-bars" @click="menuToggle"></i>
    <ul class="nav">
      <li><a href="">Inicio</a></li>
      <li><a href="">Cursos</a></li>
      <li><a href="">Blogs</a></li>
      <li><router-link to="/signin">Sign In</router-link></li>
      <li><router-link to="/login">Log in</router-link></li>
      <li><a href="">Contactanos</a></li>
      <b-nav-item-dropdown class="usuario">
        <template #button-content>
          <b-icon variant="dark" icon="person-fill"></b-icon>
          <span class="Color">Mi Usuario</span>
        </template>

        <b-dropdown-text>
          <center>
            <p><b-avatar variant="primary"></b-avatar></p>
            {{ Usuario.Nombre_Usuario }}
          </center>
        </b-dropdown-text>

        <b-dropdown-item @click="Enviar_Datos">
            <b-icon icon="gear-fill"></b-icon> Configuración
        </b-dropdown-item>

        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click="CerrarSesion">
          <b-icon icon="power" variant="danger"></b-icon> Cerrar sesión
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </ul>
  </header>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      Usuario: {},
    };
  },
  methods: {
    menuToggle() {
      const toggleMenu = document.querySelector(".fa-bars");
      const toggleNav = document.querySelector(".nav");
      toggleMenu.classList.toggle("fa-times");
      toggleNav.classList.toggle("active");
    },
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let descifrar = VueJwtDecode.decode(token);
      this.Usuario = descifrar;
    },
    CerrarSesion() {
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    },
    Enviar_Datos(){
      this.$router.push('/configuracion/' + this.Usuario._id);
    }
  },
  created() {
    this.getUserDetails();
  },
};
</script>

<style scoped lang="css" src="../../../public/css/Globales/navbar.css">
.usuario {
  padding: 0;
  margin: 0;
}
</style>