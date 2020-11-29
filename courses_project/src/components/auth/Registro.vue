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
            <b-navbar-brand>Formulario de registro</b-navbar-brand>
          </b-navbar>

          <!--Aquí comienza el formulario de registro-->
          <b-form @submit.prevent="Crear_Usuario">
            <label class="form-text text-muted" for="input1"
              >Nombre de usuario</label
            >
            <b-input-group id="input1">
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
                >El nombre de usuario será necesario para acceder a su
                cuenta.</small
              >
            </p>

            <label class="form-text text-muted" for="input2"
              >Nombre completo</label
            >
            <b-input-group id="input2">
              <b-input-group-prepend is-text>
                <b-icon icon="person"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                type="text"
                v-model="Usuario.Nombre_Completo"
                required
                placeholder="Ingrese su nombre completo"
              ></b-form-input>
            </b-input-group>
            <p>
              <small class="form-text text-muted"
                >Ingresa tu nombre completo, tal y como aparece en tu
                DUI.</small
              >
            </p>

            <label class="form-text text-muted" for="input3"
              >Correo electrónico</label
            >
            <b-input-group id="input3">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                type="email"
                v-model="Usuario.Correo_Electrónico"
                required
                placeholder="Ingrese su correo electrónico"
              ></b-form-input>
            </b-input-group>
            <p>
              <small class="form-text text-muted"
                >Correo electrónico de ejemplo: example@gmail.com</small
              >
            </p>

            <label class="form-text text-muted" for="input4">Contraseña</label>
            <b-input-group id="input4">
              <b-input-group-prepend is-text>
                <b-icon icon="key"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                type="password"
                v-model="Usuario.Contraseña"
                required
                placeholder="Ingrese su contraseña"
                v-on:keyup="ValidandoPassword"
              ></b-form-input>
            </b-input-group>
            <span v-if="Texto.show">
              <small :style="{ color: Texto.Color_Texto }">{{
                Texto.Texto
              }}</small>
            </span>
            <p>
              <small class="form-text text-muted"
                >Procura que tu contraseña supere los 6 carácteres.</small
              >
            </p>
            <div class="AjustarBotones">
              <b-button
                type="submit"
                class="mb-2"
                style="width: 75%"
                variant="outline-primary"
                >Crear usuario</b-button
              >
              <router-link class="mb-2" to="/login"
                ><b-icon
                  variant="danger"
                  font-scale="3"
                  icon="arrow-left-circle-fill"
                  v-b-tooltip.hover.top="'Volver'"
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
  name: "Registro",
  data() {
    return {
      Texto: {
        show: false,
        Color_Texto: "red",
        Texto: "",
      },
      Usuario: {
        Nombre_Completo: "",
        Nombre_Usuario: "",
        Correo_Electrónico: "",
        Contraseña: "",
      },
      Validar_Usuario: {
        Nombre_Completo: "",
        Nombre_Usuario: "",
        Correo_Electrónico: "",
        Contraseña: "",
      },
    };
  },
  methods: {
    ValidandoPassword() {
      if (this.Usuario.Contraseña.length < 6) {
        this.Texto.show = true;
        this.Texto.Color_Texto = "red";
        this.Texto.Texto =
          "Tu contraseña debe contener como mínimo 6 carácteres";
      } else if (this.Usuario.Contraseña.length <= 12) {
        this.Texto.show = true;
        this.Texto.Color_Texto = "#cca300";
        this.Texto.Texto = "Nivel de seguridad aceptable";
      } else {
        this.Texto.show = true;
        this.Texto.Color_Texto = "green";
        this.Texto.Texto = "Nivel de seguridad excelente";
      }
    },
    //Este método captura los datos del usuario y los envía a la base de datos. Se crea la autenticación para el usuario luego de crear la cuenta.
    async Crear_Usuario() {
      try {
        const respuesta = await axios.get(
          "/api/usuario/obtener_usuario/" + this.Usuario.Nombre_Usuario
        );
        if (respuesta.data == null) {
          this.Validar_Usuario.Nombre_Usuario = ".";
        } else {
          this.Validar_Usuario = respuesta.data;
        }

        if (
          this.Usuario.Nombre_Usuario == this.Validar_Usuario.Nombre_Usuario
        ) {
          Swal.fire(
            "Nombre de usuario en uso",
            "El nombre de usuario que has elegido está siendo usado por otro usuario",
            "error"
          );
        } else {
          if (this.Usuario.Contraseña.length < 6) {
            Swal.fire(
              "Nivel de seguridad bajo",
              "Por favor, escribe una contraseña que contenga como mínimo 6 caráteres",
              "warning"
            );
          } else {
            await axios.post("/api/usuario/registro", this.Usuario);
            this.$router.push("/login");
            Swal.fire(
              "¡Registro completado!",
              "Por favor, inicia sesión para disfrutar de todas las funcionalidades de la plataforma.",
              "success"
            );
          }
        }
      } catch (err) {
        let error = err.respuesta;
        if (error.status == 409) {
          Swal.fire("Ha ocurrido un error", error.data.message, "error");
        } else {
          Swal.fire("Ha ocurrido un error", error.data.err.message, "error");
        }
      }
    },
  },
};
</script>

<style scoped>
.jumbotron {
  margin-top: -8px;
  margin-bottom: 0;
}
.form {
  margin-top: 110px;
  margin-bottom: 144px;
}
.AjustarBotones{
  display: flex;
  justify-content: space-between;
}
.custom-shape-divider-top-1606608666 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-top-1606608666 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 142px;
  transform: rotateY(180deg);
}

.custom-shape-divider-top-1606608666 .shape-fill {
  fill: #4a90e2;
}

/** For tablet devices **/
@media (min-width: 768px) and (max-width: 1023px) {
  .custom-shape-divider-top-1606608666 svg {
    width: calc(100% + 1.3px);
    height: 200px;
  }
}

/** For mobile devices **/
@media (max-width: 767px) {
  .custom-shape-divider-top-1606608666 svg {
    width: calc(100% + 1.3px);
    height: 113px;
  }
}
</style>