<template>
  <div id="Iniciar_Sesion">
    <div class="custom-shape-divider-top-1606608666">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
    <b-jumbotron bg-variant="dark" fluid>
      <div class="modal-body modal-dialog">
        <div class="container col-sm-12">
          <div class="modal-content container col-md-12 form">
            <b-navbar class="mb-2" type="dark" variant="primary">
              <b-navbar-brand>Inicio de sesión</b-navbar-brand>
            </b-navbar>
            <b-form @submit.prevent="Iniciar_Sesion">
              <label class="form-text text-muted" for="input1"
                >Nombre de usuario</label
              >
              <b-input-group id="input1" class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="person-circle"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="text"
                  v-model="Usuario.Nombre_Usuario"
                  required
                  placeholder="Ingrese su nombre de usuario"
                ></b-form-input>
              </b-input-group>
              <p>
                <small class="form-text text-muted"
                  >Nombre de usuario con el cual te registraste, ejemplo:
                  Usuario10</small
                >
              </p>

              <label class="form-text text-muted" for="input2"
                >Contraseña</label
              >
              <b-input-group id="input2" class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="key"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="password"
                  v-model="Usuario.Contraseña"
                  required
                  placeholder="Ingrese su contraseña"
                ></b-form-input>
              </b-input-group>
              <p>
                <small class="form-text text-muted"
                  >Contraseña con la cual te registraste</small
                >
              </p>

              <small class="form-text text-muted mb-2"
                >¿Aún no tiene un usuario?
                <router-link to="/signin">Regístrate aquí</router-link>
              </small>
              <b-button type="subtmit" class="mb-2" variant="outline-primary"
                >Iniciar sesión</b-button
              >
            </b-form>
          </div>
        </div>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Iniciar_Sesion",
  data() {
    return {
      Usuario: {
        Nombre_Usuario: "",
        Contraseña: "",
      },
    };
  },
  methods: {
    async Iniciar_Sesion() {
      try {
        let respuesta = await axios.post(
          "/api/usuario/iniciar_sesion",
          this.Usuario
        );
        let token = respuesta.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          Swal.fire(
            "Sesión iniciada",
            "Bienvenido; ahora puedes acceder a cualquiera de nuestros cursos",
            "success"
          );
          this.$router.push("/");
        }
      } catch (err) {
        Swal.fire(
          "No se ha podido realizar una conexión",
          err.respuesta,
          "error"
        );
      }
    },
  },
};
</script>

<style scoped>
@import url("../../../public/css/fondo.css");
.jumbotron {
  margin-top: -8px;
  margin-bottom: 0;
}
.form {
  margin-top: 110px;
  margin-bottom: 270px;
}
.AjustarBotones {
  display: flex;
  justify-content: space-between;
}
button {
  width: 100%;
}
</style>