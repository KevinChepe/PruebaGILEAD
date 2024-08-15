<template>
    <div>
        <v-card class="mx-auto" max-width="500">
            <v-card-text>
                <div>¿Qué debo hacer para ser parte?</div>
                <p class="text-h4 text--primary">
                    Bienvenido
                </p>
                <div class="text--primary">
                    Por favor llene todos los campos e informe detalladamente la razon por la cual quiere ser parte de esta
                    institución<br>

                </div>

                <v-text-field v-model="correo" filled color="deep-purple" counter="40" label="Ingresa tu correo"
                    :rules="[v => !!v || 'El campo es requerido']" style="min-height: 96px"></v-text-field>
                <v-text-field v-model="nombre" filled color="deep-purple" counter="40" label="Ingresa tu nombre y apellido"
                    :rules="[v => !!v || 'El campo es requerido']" style="min-height: 96px"></v-text-field>
                <v-text-field v-model="edad" filled color="deep-purple" label="Ingresa tu edad" :counter="3" :rules="Nro"
                    style="min-height: 96px"></v-text-field>
                <v-text-field v-model="ciudadResidencia" filled color="deep-purple" counter="40"
                    label="Ingresa tu ciudad de residencia" :rules="[v => !!v || 'El campo es requerido']"
                    style="min-height: 96px"></v-text-field>
                <v-text-field v-model="DirResidencia" filled color="deep-purple" counter="40"
                    label="Ingresa tu dirección de residencia" :rules="DireccionlRules"
                    style="min-height: 96px"></v-text-field>
                <v-text-field v-model="profesion" filled color="deep-purple" counter="40" label="Ingresa tu profesión"
                    :rules="[v => !!v || 'El campo es requerido']" style="min-height: 96px"></v-text-field>
                <v-text-field v-model="ultimoEmpleo" filled color="deep-purple" counter="40"
                    label="Ingresa tu ultimo empleo" :rules="[v => !!v || 'El campo es requerido']"
                    style="min-height: 96px"></v-text-field>
                <v-select v-model="estadoCivil" filled color="deep-purple" counter="40" label="Ingresa su estado civil"
                    :items="[{ value: 'Soltero', text: 'Soltero' }, { value: 'Unión Libre', text: 'Unión Libre' }, { value: 'Casado', text: 'Casado' }, { value: 'Viudo', text: 'Viudo' }]"
                    :rules="[v => !!v || 'El campo es requerido']" style="min-height: 96px"></v-select>
                <v-text-field v-model="celular" filled color="deep-purple" counter="40" label="Ingresa su número de celular"
                    :rules="Nrocel" style="min-height: 96px"></v-text-field>
                <v-text-field v-model="redSocial" filled color="deep-purple" counter="400"
                    label="Ingresa un enlace a tu red social" :rules="[v => !!v || 'El campo es requerido']"
                    style="min-height: 96px"></v-text-field>
                <v-select v-model="referido" filled color="deep-purple" counter="2" label="¿Viene referido por un Taller?"
                    :items="[{ value: 'Si', text: 'Si' }, { value: 'No', text: 'No' },]"
                    :rules="[v => !!v || 'El campo es requerido']" style="min-height: 96px"></v-select>
                <v-text-field v-if="referido == 'Si'" v-model="nombreTalle" filled color="deep-purple" counter="400"
                    label="Nombre del taller que lo refiere" :rules="[v => !!v || 'El campo es requerido']"
                    style="min-height: 96px"></v-text-field>
                <v-text-field v-if="referido == 'Si'" v-model="codigoTalle" filled color="deep-purple" counter="400"
                    label="Código del taller" :rules="[v => !!v || 'El campo es requerido']"
                    style="min-height: 96px"></v-text-field>
                <v-textarea v-model="razonExplicacion" name="input-7-1" filled
                    label="¿Por qué desea hacer parte de nuestra institución?" auto-grow></v-textarea>
                <v-textarea v-model="medioEntero" name="input-7-1" filled label="¿Por qué medio se enteró?"
                    auto-grow></v-textarea>
                <v-card class="mx-auto" max-width="800">
                    <v-card-text>

                        <div>
                            <button @click="toggleSection">Aquí las política de tratamiento y protección de datos
                                personales</button>
                            <transition name="section-transition">
                                <div v-if="showSection" class="expanding-section">
                                    <p class="text-h4 text--primary">
                                        LA INFECTOCLÍNICOS EN BOGOTÁ - 03 ABRIL 2018
                                    </p>
                                    <div class="text--primary">
                                        <ul>En cumplimiento a lo dispuesto en la Ley Estatutaria 1581 de 2012 y sus
                                            Decretos
                                            Reglamentarios, la
                                            empresa LA GRAN LOGIA DE COLOMBIA., establece la Política General y
                                            Especiales
                                            aplicables
                                            para el
                                            Tratamiento y Protección de Datos Personales en la organización.</ul>
                                        <ul> <br> </ul>
                                        <h2>1. IDENTIFICACIÓN DEL RESPONSABLE</h2>
                                        <p>NOMBRE DE LA EMPRESA: La GRAN LOGIA DE COLOMBIA., sociedad comercial
                                            identificada con
                                            NIT.
                                            860074664-8
                                            No. se constituye como una empresa colombiana, cuyo objeto social. Entidad
                                            sin animo de
                                            lucro inspirado
                                            en los principios fracmasonicos y en los antiguos limites de la fraternidad.
                                        </p>
                                        <p>DIRECCIÓN FÍSICA: Carerra 5 No. 17-79</p>
                                        <p>CORREO DE CONTACTO: tesoreria@granlogiadecolombia.co</p>
                                        <p>TELÉFONO: (1) 571 3423077</p>

                                        <h2>2. OBJETIVO</h2>
                                        <p>La presente Política establece las directrices generales para la protección y
                                            el
                                            tratamiento
                                            de datos
                                            personales al interior de la GRAN LOGIA DE COLOMBIA., permitiendo de esta
                                            manera
                                            fortalecer
                                            el nivel de
                                            confianza entre Responsable y Titulares con relación al tratamiento de su
                                            información;
                                            Informar a los
                                            Titulares de las finalidades y transferencias a que son sometidos sus datos
                                            personales y
                                            los
                                            mecanismos
                                            y formas para el ejercicio de sus derechos.</p>

                                        <h2>3. ALCANCE</h2>
                                        <p>Esta Política de Tratamiento y Protección de Datos Personales será aplicada a
                                            todas las
                                            bases
                                            de datos
                                            y/o archivos que incluyan datos personales que sean objeto de tratamiento
                                            por parte de
                                            la
                                            GRAN LOGIA DE
                                            COLOMBIA., como responsable del tratamiento de datos personales.</p>

                                        <h2>4. DEFINICIONES</h2>
                                        <ul>
                                            <li><strong>Habeas Data:</strong> Derecho que tiene toda persona de conocer,
                                                actualizar
                                                y
                                                rectificar la
                                                información que se haya recogido sobre ella en archivos y bancos de
                                                datos de
                                                naturaleza
                                                pública o
                                                privada.</li>
                                            <li><strong>Dato personal:</strong> Cualquier información vinculada o que
                                                pueda
                                                asociarse a
                                                una o varias
                                                personas naturales determinadas o determinables.</li>
                                            <li><strong>Base de Datos:</strong> Conjunto organizado de datos personales
                                                que sea
                                                objeto
                                                de
                                                tratamiento.</li>
                                            <li><strong>Tratamiento:</strong> Cualquier operación o conjunto de
                                                operaciones sobre
                                                datos
                                                personales,
                                                tales como la recolección, almacenamiento, uso, circulación o supresión.
                                            </li>
                                            <li><strong>Autorización:</strong> Consentimiento previo, expreso e
                                                informado del
                                                Titular
                                                para llevar a
                                                cabo el tratamiento de datos personales.</li>
                                            <li><strong>Aviso de privacidad:</strong> Es el documento físico,
                                                electrónico o en
                                                cualquier
                                                otro
                                                formato conocido o por conocer, que es puesto a disposición del Titular
                                                con el fin
                                                de
                                                informar sobre
                                                el tratamiento de sus datos personales.</li>
                                            <li><strong>Titular:</strong> Persona natural cuyos datos personales sean
                                                objeto de
                                                tratamiento.</li>
                                            <li><strong>Causahabiente:</strong> Persona que por sucesión o transmisión
                                                adquiere los
                                                derechos de otra
                                                persona.</li>
                                            <li><strong>Responsable del Tratamiento:</strong> Persona natural o
                                                jurídica, pública o
                                                privada, que por
                                                sí misma o en asocio con otros, decida sobre la base de datos y/o el
                                                tratamiento de
                                                los
                                                datos.</li>
                                            <li><strong>Encargado del Tratamiento:</strong> Persona natural o jurídica,
                                                pública o
                                                privada, que por
                                                sí misma o en asocio con otros, realice el tratamiento de datos
                                                personales por
                                                cuenta
                                                del
                                                Responsable del tratamiento.</li>
                                        </ul>
                                        <h2>5. PRINCIPIOS RECTORES APLICABLES EN MATERIA DE DATOS PERSONALES</h2>
                                        <p>En materia de protección de datos personales se aplicarán los siguientes
                                            principios
                                            rectores:
                                        </p>
                                        <ol>
                                            <li>Principio de legalidad en materia de Tratamiento de datos: El
                                                tratamiento a que se
                                                refiere la Ley de
                                                Habeas Data es una actividad reglada que debe sujetarse a lo establecido
                                                en ella y
                                                en
                                                las demás
                                                disposiciones que la desarrollen.</li>
                                            <li>Principio de finalidad: El tratamiento debe obedecer a una finalidad
                                                legítima de
                                                acuerdo
                                                con la
                                                Constitución y la ley, la cual debe ser informada al Titular.</li>
                                            <li>Principio de libertad: El tratamiento sólo puede ejercerse con el
                                                consentimiento, previo, expreso e informado del Titular. Los datos
                                                personales no
                                                podrán
                                                ser
                                                obtenidos o d
                                                ivulgados sin previa autorización, o en ausencia de mandato legal o
                                                judicial que
                                                releve
                                                el
                                                consentimiento.</li>
                                            <li>Principio de veracidad o calidad: La información sujeta a tratamiento
                                                debe ser
                                                veraz,
                                                completa,
                                                exacta, actualizada,
                                                comprobable y comprensible. Se prohíbe el tratamiento de datos
                                                parciales,
                                                incompletos,
                                                fraccionados
                                                o que induzcan a error.</li>
                                            <li>Principio de transparencia: En el tratamiento debe garantizarse el
                                                derecho del
                                                Titular a
                                                obtener del
                                                Responsable del tratamiento o
                                                del Encargado del tratamiento, en cualquier momento y sin restricciones,
                                                información
                                                acerca de la
                                                existencia de datos que le conciernan.</li>
                                            <li>Principio de acceso y circulación restringida: El tratamiento se sujeta
                                                a los
                                                límites
                                                que se derivan
                                                de la naturaleza de los datos personales,
                                                de las disposiciones de la ley y la Constitución. En este sentido, el
                                                tratamiento
                                                sólo
                                                podrá hacerse
                                                por personas autorizadas por el Titular y/o
                                                por las personas previstas en la ley.
                                                <br>
                                                Los datos personales, salvo la información pública, no podrán estar
                                                disponibles en
                                                Internet u otros
                                                medios de divulgación o comunicación masiva,
                                                salvo que el acceso sea técnicamente controlable para brindar un
                                                conocimiento
                                                restringido sólo a los
                                                Titulares o terceros autorizados conforme a la ley.
                                            </li>
                                            <li>Principio de seguridad: La información sujeta a tratamiento por el
                                                Responsable del
                                                tratamiento o
                                                Encargado del tratamiento a que se refiere la Ley de Habeas Data, se
                                                deberá manejar
                                                con
                                                las medidas
                                                técnicas,
                                                humanas y administrativas que sean necesarias para otorgar seguridad a
                                                los registros
                                                evitando su
                                                adulteración, pérdida, consulta, uso o acceso no autorizado o
                                                fraudulento.</li>
                                            <li>Principio de confidencialidad: Todas las personas que intervengan en el
                                                tratamiento
                                                de
                                                datos
                                                personales que no tengan la naturaleza de públicos están obligadas a
                                                garantizar la
                                                reserva de la
                                                información,
                                                inclusive después de finalizada su relación con alguna de las labores
                                                que comprende
                                                el
                                                tratamiento,
                                                pudiendo sólo realizar suministro o comunicación de datos personales
                                                cuando ello
                                                corresponda al
                                                desarrollo
                                                de las actividades autorizadas en la ley y en los términos de la misma.
                                            </li>
                                        </ol>

                                        <h2>6. DERECHOS DE LOS TITULARES</h2>
                                        <p>Los Titulares de datos personales gozarán de los siguientes derechos, y de
                                            aquellos que
                                            les
                                            otorgue la
                                            ley:</p>
                                        <ol>
                                            <li>Conocer, actualizar y rectificar sus datos personales frente al
                                                Responsable del
                                                tratamiento o
                                                Encargados del tratamiento.
                                                Este derecho se podrá ejercer, entre otros frente a datos parciales,
                                                inexactos,
                                                incompletos,
                                                fraccionados, que induzcan a error,
                                                o aquellos cuyo tratamiento esté expresamente prohibido o no haya sido
                                                autorizado;
                                            </li>
                                            <li>Solicitar prueba de la autorización otorgada al Responsable del
                                                tratamiento salvo
                                                cuando
                                                expresamente se exceptúe como requisito para el tratamiento,
                                                de conformidad con lo previsto en el artículo 10 de la ley;</li>
                                            <li>Ser informado por el Responsable del tratamiento o el Encargado del
                                                tratamiento,
                                                previa
                                                solicitud,
                                                respecto del uso que les ha dado a sus datos personales;</li>
                                            <li>Presentar ante la Superintendencia de Industria y Comercio quejas por
                                                infracciones a
                                                lo
                                                dispuesto en
                                                la ley y las demás normas que la modifiquen, adicionen o complementen;
                                            </li>
                                            <li>Revocar la autorización y/o solicitar la supresión del dato cuando en el
                                                tratamiento
                                                no
                                                se respeten
                                                los principios, derechos y garantías constitucionales y legales.
                                                La revocatoria y/o supresión procederá cuando la Superintendencia de
                                                Industria y
                                                Comercio haya
                                                determinado que en el tratamiento el Responsable o Encargado han
                                                incurrido en conductas contrarias a la ley y a la Constitución;</li>
                                            <li>Acceder en forma gratuita a sus datos personales que hayan sido objeto
                                                de
                                                tratamiento.
                                            </li>

                                        </ol>

                                        <h2>7. AUTORIZACIÓN DEL TITULAR DE DATOS PERSONALES</h2>
                                        <p>Sin perjuicio de las excepciones previstas en la Ley Estatutaria 1581 de
                                            2012, por regla
                                            general en el
                                            tratamiento de datos de carácter personal la GRAN LOGIA DE COLOMBIA,
                                            recolectará la
                                            autorización previa
                                            e informada del Titular, la cual podrá ser obtenida por cualquier medio que
                                            pueda ser
                                            objeto
                                            de consulta
                                            posterior.</p>

                                        <h3>7.1 Eventos en los cuales no es necesaria la autorización</h3>
                                        <p>La autorización del Titular no será necesaria cuando se trate de:</p>
                                        <ul>
                                            <li>a) Información requerida por una entidad pública o administrativa en
                                                ejercicio de
                                                sus
                                                funciones
                                                legales o por orden judicial;</li>
                                            <li>b) Datos de naturaleza pública;</li>
                                            <li>c) Casos de urgencia médica o sanitaria;</li>
                                            <li>d) Tratamiento de información autorizado por la ley para fines
                                                históricos,
                                                estadísticos
                                                o
                                                científicos;</li>
                                            <li>e) Datos relacionados con el Registro Civil de las Personas.</li>
                                        </ul>

                                        <h2>8. DEBERES DE LA GRAN LOGIA DE COLOMBIA, COMO RESPONSABLE DEL TRATAMIENTO DE
                                            DATOS
                                            PERSONALES</h2>
                                        <p>La GRAN LOGIA DE COLOMBIA, como responsable del tratamiento de datos
                                            personales, cumplirá
                                            los
                                            siguientes
                                            deberes:</p>
                                        <ul>
                                            <li>a) Garantizar al Titular, en todo tiempo, el pleno y efectivo ejercicio
                                                del derecho
                                                de
                                                hábeas data.
                                            </li>
                                            <li>b) Solicitar y conservar, en las condiciones previstas en la ley, copia
                                                de la
                                                respectiva
                                                autorización otorgada por el Titular.</li>
                                            <li>c) Informar debidamente al Titular sobre la finalidad de la recolección
                                                y los
                                                derechos
                                                que le
                                                asisten por virtud de la autorización otorgada.</li>
                                            <li>d) Conservar la información bajo las condiciones de seguridad necesarias
                                                para
                                                impedir su
                                                adulteración, pérdida, consulta, uso o acceso no autorizado o
                                                fraudulento.</li>
                                            <li>e) Garantizar que la información que se suministre al Encargado del
                                                tratamiento sea
                                                veraz, completa,
                                                exacta, actualizada, comprobable y comprensible.</li>
                                            <li>f) Actualizar la información, comunicando de forma oportuna al Encargado
                                                del
                                                tratamiento, todas las
                                                novedades respecto de los datos que previamente le haya suministrado y
                                                adoptar las
                                                demás
                                                medidas
                                                necesarias para que la información suministrada a este se mantenga
                                                actualizada.</li>
                                            <li>g) Rectificar la información cuando sea incorrecta y comunicar lo
                                                pertinente al
                                                Encargado del
                                                tratamiento.</li>
                                            <li>h) Suministrar al Encargado del tratamiento, según el caso, únicamente
                                                datos cuyo
                                                tratamiento esté
                                                previamente autorizado de conformidad con lo previsto en la presente
                                                ley.</li>
                                            <li>i) Exigir al Encargado del tratamiento en todo momento, el respeto a las
                                                condiciones
                                                de
                                                seguridad y
                                                privacidad de la información del Titular.</li>
                                            <li>j) Tramitar las consultas y reclamos formulados en los términos
                                                señalados en la Ley
                                                Estatutaria 1581
                                                de 2012.</li>
                                            <li>k) Adoptar un manual interno de políticas y procedimientos para
                                                garantizar el
                                                adecuado
                                                cumplimiento
                                                de la ley y en especial, para la atención de consultas y reclamos.</li>
                                            <li>l) Informar al Encargado del tratamiento cuando determinada información
                                                se encuentra
                                                en
                                                discusión
                                                por parte del Titular, una vez se haya presentado la reclamación y no
                                                haya
                                                finalizado el
                                                trámite
                                                respectivo.</li>
                                            <li>m) Informar a solicitud del Titular sobre el uso dado a sus datos.</li>
                                            <li>n) Informar a la autoridad de protección de datos cuando se presenten
                                                violaciones a
                                                los
                                                códigos de
                                                seguridad y existan riesgos en la administración de la información de
                                                los Titulares.
                                            </li>
                                            <li>o) Cumplir las instrucciones y requerimientos que imparta la
                                                Superintendencia de
                                                Industria y
                                                Comercio.</li>
                                        </ul>
                                    </div>
                                </div>
                            </transition>
                        </div>


                    </v-card-text>
                </v-card>
                <div>
                    <a class="desabilitar" v-if="selected == null" style="color: red;">Debe aceptar terminos y condiciones
                        para
                        continuar</a>
                    <v-checkbox v-model="selected"
                        label="Acepto las condiciones del servicio y la politica de privacidad de la Gran Logia de Colombia"
                        value="true"></v-checkbox>

                    <v-btn :disabled="selected == null" v-on:click="enviarData()">
                        Continuar
                    </v-btn>
                </div>
            </v-card-text>


        </v-card>
        <div>
        </div>
        <div>
            <template>
                <v-footer dark padless>
                    <v-card class="flex" flat tile>
                        <v-card-title class="teal">
                            <b class="subheading">Get connected with us on social networks!</b>

                            <v-spacer></v-spacer>
                        </v-card-title>

                        <v-card-text class="piedepagina">
                            © {{ new Date().getFullYear() }} — <b text-align="right"> INFECTOCLÍNICOS
                                EN BOGOTÁ. TODOS LOS DERECHOS RESERVADOS. - POWERED BY GJX </b><v-img class="imagenGJX"
                                src="../assets/gjx.png"></v-img>
                        </v-card-text>

                    </v-card>
                </v-footer>
            </template>
        </div>
    </div>
</template>

<script>
import auth from "@/auth";
import emailjs from 'emailjs-com';
import axios from "axios";
import DatePicker from "../components/DatePicker";
import { mapActions, mapState, mapMutations } from 'vuex';
import store from "../store/index.js";
import Departamentos from "../Data/Departamentos.js";
import Estudios from "../Data/Estudios.js"
import Mcipios from "../Data/Municipios.js";
import EstadoEstudio from "../Data/EstadoEstudio.js";
import swal from 'sweetalert2';
window.Swal = swal;

export default {
    data: () => ({
        correo: '',
        nombre: '',
        edad: '',
        ciudadResidencia: '',
        DirResidencia: '',
        profesion: '',
        ultimoEmpleo: '',
        estadoCivil: '',
        celular: '',
        redSocial: '',
        referido: '',
        nombreTalle: '',
        codigoTalle: '',
        razonExplicacion: '',
        medioEntero: '',
        selected: null,
        showSection: false,
        error: false,
        Nro: [
            v => !!v || 'El número es requerido',
            v => /^[0-9]{2,3}$/.test(v) || 'Número incorrecto'
        ],
        Nrocel: [
            v => !!v || 'El número es requerido',
            v => /^[0-9]{6,}$/.test(v) || 'Número incorrecto'
        ],
        DireccionlRules: [
            v => !!v || 'Campo requerido',
            v => (v && v.length <= 40 && v.length > 2) || 'El campo debe contener entre 3 y 40 caracteres',
            v => /^[a-zA-Z0-9\ #,.áéíóú-]{3,40}$/.test(v) || 'Campo no valido, revise caracteres especiales'
        ],

    }),

    methods: {
        ...mapMutations(['AsignarValorLogin']),
        toggleSection() {
            this.showSection = !this.showSection;
        },
        async enviarData() {
            if (this.selected != " " & this.selected != null & this.razonExplicacion != "" & this.nombre != "" & this.correo != "" & this.edad != "" & parseInt(this.edad) >= 18 & this.ciudadResidencia != "" & this.DirResidencia != "" & this.profesion != "" & this.ultimoEmpleo != "" & this.estadoCivil != "" & this.celular != "" & this.redSocial != "" & this.referido != "" & this.razonExplicacion != "" & this.medioEntero != "") {
                const InfoPostulante = {
                    "Email": this.correo,
                    "NombreApellido": this.nombre,
                    "SerParte": this.razonExplicacion,
                    "Edad": this.edad,
                    "CiudadResidencia": this.ciudadResidencia,
                    "DireccionResidencia": this.DirResidencia,
                    "Profesion": this.profesion,
                    "UltimoEmpleo": this.ultimoEmpleo,
                    "EstadoCivil": this.estadoCivil,
                    "Celular": this.celular,
                    "EnlaceRedSocial": this.redSocial,
                    "Referido": this.referido,
                    "NombreTallerRefiere": this.nombreTalle,
                    "CodigoTaller": this.codigoTalle,
                    "ComoSeEntero": this.medioEntero,
                    "AceptacionPoliticaDatos": this.selected
                }
                store.commit('AsignacionInformacionPostulante', InfoPostulante);
                store.dispatch('PostInfoPostulante');
                this.$router.push("/")
                const codToken = InfoPostulante
                const serviceID = 'service_3x61aur';
                const templateID = 'template_bm2hnrm';
                const IdUser = 'DBiMDy6N8p2zoftdn';
                const mensaje = "Email: " + this.correo +
                    "\nNombreApellido: " + this.nombre +
                    "\nSerParte: " + this.razonExplicacion +
                    "\nEdad: " + this.edad +
                    "\nCiudadResidencia: " + this.ciudadResidencia +
                    "\nDireccionResidencia: " + this.DirResidencia +
                    "\nProfesion: " + this.profesion +
                    "\nUltimoEmpleo: " + this.ultimoEmpleo +
                    "\nEstadoCivil: " + this.estadoCivil +
                    "\nCelular: " + this.celular +
                    "\nEnlaceRedSocial: " + this.redSocial +
                    "\nReferido: " + this.referido +
                    "\nNombreTallerRefiere: " + this.nombreTalle +
                    "\nCodigoTaller: " + this.codigoTalle +
                    "\nComoSeEntero: " + this.medioEntero +
                    "\nAceptacionPoliticaDatos: " + this.selected;

                emailjs.send(serviceID, templateID, {
                    message: mensaje,
                    name: this.nombre,
                    reply_to: "Se registro este nuevo candidato en la pagina de la Gran logia de Colombia",
                    email: "lsalazar@gjx.ai",
                }, IdUser).then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    Swal.fire({
                        icon: 'success',
                        title: 'Correcto',
                        text: 'Enviado correctamente!',
                        confirmButtonColor: '#ff0000a8',
                    })
                }, function (error) {
                    console.log('FAILED...', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo enviar correctamente!',
                        confirmButtonColor: '#ff0000a8',
                    })
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Informacion no pudo ser registrada, llene todos los campos o verifique que son correctos',
                    allowOutsideClick: false,
                    backdrop: false,
                    confirmButtonColor: '#ff0000a8'
                });
            }
        }

    },
    computed: {
        ...mapState(['VarLogin', 'TipoIngreso']),

        userLogged() {
            return auth.getUserLogged();
        },

    }
};


</script>
    
<style  scoped>
/* lang="scss" */
.expanding-section {
    /* Agrega estilos para la sección expandida */
    color: red;
    transition: height 0.5s ease-in-out;
    /* Puedes ajustar la duración y el tipo de transición según tus preferencias */
    overflow: hidden;
}

.section-transition-enter,
.section-transition-leave-to {
    /* Agrega estilos para la transición de entrada y salida */
    height: 0;
}

.imagenGJX {
    width: 4%;
}

.piedepagina {
    color: #1e1e1e !important;
    caret-color: #fff !important;
}

b {
    font-weight: NORMAL;
    font-size: 10px;
}

.letraText {
    font-family: 'Arial Narrow', sans-serif;
    margin-left: 200px;
    margin-right: 200px;
    font-size: 18px;
    text-align: justify;

}

.v-carousel .v-window-item {
    padding: 12px;
}

.texto-justificado {
    text-align: justify;
}

.mx-auto {
    width: 100%;
    max-width: 800px;
    margin-right: 0px;
    margin-left: 0px;
}

.mx-auto-img {
    height: 300px;
    width: 650px;
    align-items: center;
}

.theme--dark.v-card {
    background-color: #eee;
}

.v-application .white--text {
    color: #000000 !important;
    caret-color: #00000000 !important;
}

.subheading {
    color: #FFE697
}

.v-application .teal {
    background-color: #142547 !important;
    border-color: #142547 !important;
}

.login {
    padding: 1rem;
}

.title {
    text-align: center;
}

.mx-auto {
    margin-top: 50px;
}

.form {
    height: 50vh;
    margin: 0rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30vw;
    min-width: 520px;
    max-width: 20%;
    background: #292611;
    border-radius: 5px;
    padding: 30px;
    box-shadow: 0 4px 10px 4px rgba(10, 1, 1, 0.3);
}

@media (min-width: 300px) and (max-width: 700px) {
    .form {
        min-width: 43vh;
        max-width: 36vh;
    }
}

.form-label {
    margin-top: 1rem;
    color: white;
    margin-bottom: 0.5rem;
    /*   &:first-of-type {
        margin-top: 0rem;
      } */
}

.form-input {
    padding: 10px 15px;
    background: #90A4AE;
    background-image: none;
    border: 1px solid white;
    color: white;
    /*   &:focus {
        outline: 0;
        border-color: #1ab188;
      } */
}

.form-submit {
    background: #ffe697;
    border: none;
    color: rgb(12, 2, 2);
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    font-size: 1.3em;
    transition: background 0.2s;
    /*   &:hover {
        background: #0b9185;
      } */
}

.error {
    margin: 1rem 0 0;
    color: #110f10;

}

.msg {
    margin-top: 3rem;
    text-align: center;
}
</style>