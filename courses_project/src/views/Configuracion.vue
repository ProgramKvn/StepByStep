<template>
  <div id="Registro">
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
      <div class="modal-body modal-dialog form">
        <div class="container modal-content">
          <b-navbar class="mb-2" type="dark" variant="primary">
            <b-navbar-brand>Actualizar mi usuario</b-navbar-brand>
          </b-navbar>

          <!--Aquí comienza el formulario de registro-->
          <b-form @submit.prevent="ActualizarUsuario">
            <label class="form-tetx text-muted" for="input2"
              >Editar nombre completo</label
            >
            <b-input-group id="input2">
              <b-input-group-prepend is-text>
                <b-icon icon="person-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                type="text"
                v-model="Usuario.Nombre_Completo"
                required
                placeholder="Ingrese su nombre completo"
              ></b-form-input>
            </b-input-group>
            <p>
              <small class="form-tetx text-muted"
                >Ingresa tu nombre completo, tal y como aparece en tu
                DUI.</small
              >
            </p>

            <label class="form-tetx text-muted" for="input3"
              >Editar el correo electrónico</label
            >
            <b-input-group id="input3">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                type="email"
                v-model="Usuario.Correo_Electrónico"
                required
                placeholder="Ingrese su correo electrónico"
              ></b-form-input>
            </b-input-group>
            <p>
              <small class="form-tetx text-muted"
                >Correo electrónico de ejemplo: example@gmail.com</small
              >
            </p>
            <div class="AjustarBotones">
              <b-button
                type="submit"
                class="mb-2"
                style="width: 75%"
                variant="outline-primary"
                >Actualizar usuario</b-button
              >
              <router-link class="mb-2" to="/"
                ><b-icon
                  variant="warning"
                  font-scale="3"
                  icon="arrow-left-circle-fill"
                  v-b-tooltip.hover.top="'Cancelar actualización'"
                ></b-icon
              ></router-link>
            </div>
          </b-form>
          <!--Aquí termina el formulario de registro-->
        </div>
      </div>
    </b-jumbotron>
  </div>
</template>


<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Configuracion",
  data() {
    return {
      Texto: {
        show: false,
        Color_Texto: "red",
        Texto: "",
      },
      Usuario: [],
    };
  },
  async mounted() {
    const respuesta = await axios.get("/api/usuario/" + this.$route.params.id);
    this.Usuario = respuesta.data;
  },
  methods: {
    async ActualizarUsuario() {
      await axios
        .put("/api/usuario/" + this.Usuario._id, {
          Nombre_Completo: this.Usuario.Nombre_Completo,
          Correo_Electrónico: this.Usuario.Correo_Electrónico,
        })
        .then(
          Swal.fire(
            "Datos actualizados",
            "Tu usuario se ha actualizado con éxito",
            "success"
          )
        );

      this.$router.push("/");
    },
    Cancelar_Actualizacion() {
      Swal.fire(
        "Actualización cancelada",
        "La actualización ha sido cancelada con éxito; ninguno de los datos han sido modificados",
        "warning"
      );
    },
  },
};
</script>

<style scoped>
@import url("../../public/css/fondo.css");
.form {
  margin-top: 110px;
  margin-bottom: 350px;
}
.AjustarBotones{
  display: flex;
  justify-content: space-between;
}
</style>