import React from 'react';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions';
import classes from './AvisoPrivacidad.module.css';
import { connect } from 'react-redux';


const AvisoPrivacidad = props => {
    return (
        <div className={classes.aviso} >
            <div className={classes.header} >
                <span>Aviso de Privacidad</span>
            </div>
            <div className={classes.message} >
                <Card>
                    <span>
                        De conformidad en lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de Particulares, su Reglamento y la normativa relacionada (la “Legislación de Datos Personales”), se emite el presente Aviso de Privacidad en los siguientes términos:
                        1. Identidad, domicilio y servicios del Responsable.
                        Mexico en Casa (“MenC”, el “Responsable” o “Nosotros” indistintamente), es el responsable de la obtención, uso, divulgación y almacenamiento de los datos personales (el “Tratamiento”) de los usuarios (“Usted”, el “Titular” o “Usuario”), mismos que se recaban como resultado de los servicios que MenC presta a través de su página de internet www.mexicoencasa.mx (el “Sitio”).
                        Mexico en Casa es una plataforma virtual que presta servicios de tecnología. En dicha plataforma se exhiben productos y servicios de diversos establecimientos de comercio ajenos a MenC para que sean adquiridos por los consumidores/usuarios (los “Servicios”).
                        2. Datos personales recabados y Tratados por el Responsable.
                        Para las finalidades indicadas en el presente Aviso de Privacidad, el Responsable trata las siguientes categorías de datos personales:
                        El Responsable no recaba datos personales sensibles.
                        3. Finalidades del Tratamiento.
                        Trataremos los datos personales para las siguientes finalidades primarias y necesarias:
                        1. Ordenar, catalogar, clasificar, dividir o separar y almacenar los datos personales dentro de los sistemas y archivos de MenC.
                        2. Creación y administración de la cuenta del Usuario.
                        3. Mantener, desarrollar y controlar la relación comercial entre el Usuario y MenC.
                        4. Proporcionar al Usuario información necesaria, a través de la página de internet sobre los productos de los oferentes, para formalizar la relación de consumo de dichos productos.
                        5. Realizar procesos al interior de MenC, con fines de desarrollo operativo y/o de administración de sistemas.
                        6. Prestar los servicios de MenC y dar seguimiento de acuerdo con las necesidades particulares del Usuario, con el fin de brindar los servicios y productos adecuados para cubrir sus necesidades específicas.
                        7. Llevar un registro histórico de la información, con fines de satisfacción al Usuario desarrollando análisis sobre los intereses y necesidades; brindando de esta manera un mejor servicio.
                        8. Realizar estrategias de mercado mediante el estudio del comportamiento del Usuario frente a las ofertas y con ello mejorar en su contenido, personalizando presentación y servicio.
                        9. Elaboración de prospecciones comerciales y segmentación de mercados.
                        10. Realizar encuestas de satisfacción y ofrecimiento o reconocimiento de beneficios propios de nuestro programa de lealtad y servicio postventa, para calificar el servicio y la atención por medio de los canales dispuestos para ello.
                        11. Adelantar las actividades necesarias para gestionar las solicitudes, quejas y reclamos de los Usuario; y direccionarlos a las áreas responsables de emitir las respuestas correspondientes.
                        12. Presentar reportes ante las autoridades de inspección, vigilancia y control, y tramitar los requerimientos realizados por entidades administrativas o judiciales.
                        13. Usos administrativos, comerciales y de publicidad que se establezcan en los acuerdos suscritos con los clientes Titulares de la información.
                        14. Gestión contable, económica, fiscal y administrativa de clientes.
                        15. Transferencia o transmisión de datos nacional o internacionalmente a proveedores con los que MenC desarrolle actividades en cumplimiento de su objeto social. Asimismo, se podrá hacer transferencia a los aliados estratégicos de la empresa para que ejecuten actividades de marketing, publicidad y promociones asociadas con el objeto social; todo de acuerdo con las disposiciones aplicables.
                        16. Reportes a centrales de riesgo por incumplimiento de las obligaciones financieras derivadas de la relación comercial.
                        17. Solicitar la autorización de cobro ante las entidades definidas y autorizadas para ello.
                        De llegarse a presentar otro tipo de finalidades en el tratamiento de datos personales se solicitará la autorización previa, expresa e informada del Titular.
                        4. Opciones y medios que el Responsable le ofrece para limitar el uso o divulgación de sus datos personales.
                        En todos aquellos casos legalmente procedentes, usted podrá limitar el uso o divulgación de sus datos personales dirigiendo la solicitud correspondiente a nuestro correo, siguiendo el procedimiento a que se refiere el numeral 6 del presente Aviso de Privacidad.
                        5. Transferencia de Datos Personales.
                        Sus datos personales podrán ser transferidos dentro del territorio nacional o hacia el extranjero, conforme a lo siguiente:
                        1. A autoridades, organismos o entidades gubernamentales, en cumplimiento a o en relación con las obligaciones contempladas en la legislación aplicable al Responsable, sus subsidiarias y/o afiliadas, así como en cumplimiento de requerimientos efectuados a las mismas.
                        2. A autoridades, organismos o entidades gubernamentales, cuando la transferencia sea precisa para el reconocimiento, ejercicio o defensa de un derecho del Responsable, sus subsidiarias y/o afiliadas en un proceso judicial.
                        3. A compañías afiliadas o subsidiarias del Responsable, con finalidades de valoración y análisis de perfiles de los usuarios, resguardo centralizado de la información y para fines estadísticos y de registro histórico de usuarios del Responsable, sus subsidiarias y/o afiliadas.
                        4. A terceros derivado de una reestructura corporativa del Representante, incluyendo, la fusión, consolidación, venta, liquidación o transferencia de activos.
                        5. A terceros cuando la transferencia sea necesaria para el mantenimiento o cumplimiento de una relación jurídica entre el responsable y el titular.
                        6. A terceros cuando la transferencia sea necesaria por virtud de un contrato celebrado o por celebrar en interés del titular, por el responsable y un tercero.
                        7. Con base en los demás supuestos establecidos en la Legislación de Datos Personales que no requieren de su consentimiento.
                        Las transferencias antes mencionadas no requieren de su consentimiento conforme a la Legislación de Datos Personales.
                        Le informamos que las remisiones nacionales e internacionales de Datos Personales entre el Responsable y sus encargados no requerirán ser informadas.
                        6. Medios para el ejercicio sus derechos.
                        En todos aquellos casos legalmente procedentes, usted podrá en todo momento y a través del procedimiento establecido en el presente numeral, ejercer los siguientes derechos referentes a sus datos personales: (i) derechos de Acceso, Rectificación, Cancelación y Oposición (“Derechos ARCO”); (ii) revocar el consentimiento otorgado al Responsable para el tratamiento de sus datos personales; (iii) limitar el uso o divulgación de sus datos personales; y (iv) manifestar su negativa para el tratamiento de sus datos personales con respecto a las finalidades secundarias y accesorias antes mencionadas.
                        Para el ejercicio de dichos derechos referentes a sus datos personales deberá presentar ante el Responsable la solicitud correspondiente, mediante un escrito libre debidamente firmado y dirigido a la siguiente dirección de correo electrónico: mexicoencasa@outlook.com, estableciendo como asunto “Ejercicio de derechos sobre datos personales”.
                        La solicitud deberá cumplir con los requisitos establecidos en la Legislación de Datos Personales vigente.
                        Darémos trámite a las solicitudes de los titulares para el ejercicio de sus derechos referentes a datos personales en un plazo no mayor a 20 (veinte) días hábiles contados a partir de su recepción y realizar requerimiento o subsanar conforme a los tiempos de la Legislación de Datos Personales; el Responsable podrá ampliar éste plazo hasta por 20 (veinte) días hábiles más, cuando el caso lo amerite, previa notificación. En caso de que su solicitud resulte procedente, la misma se hará efectiva dentro de los 15 (quince) días hábiles siguientes de la respuesta por parte de nuestro Departamento de Datos Personales.
                        Usted podrá obtener la información o datos personales solicitados a través de copias simples, documentos electrónicos en formatos convencionales, o a través de cualquier otro medio legítimo que garantice y acredite el ejercicio efectivo del derecho solicitado.
                        El Responsable desea mantener actualizados sus datos personales en todo momento. Por lo anterior, solicitamos su cooperación para comunicarnos oportunamente cualquier cambio que debamos tener en cuenta, para incorporarlo a nuestras bases de datos. Usted garantiza y responde, en cualquier caso, de la veracidad, exactitud, vigencia y autenticidad de los datos personales facilitados para su atención personal, o lo de cualquier tercero bajo su custodia o representación legal.
                        7. Medios que permiten recabar datos personales de manera automática.
                        Le informamos que nuestro Sitio hace uso de cookies y otras tecnologías a través de las cuales es posible monitorear automáticamente su comportamiento como Usuario, brindarle nuestros Servicios y otorgarle una experiencia adecuada durante el uso de los mismos, así como ofrecerle nuevos productos y servicios basados en sus preferencias. Los datos personales que se recaban a través de estas tecnologías son: dirección IP, sitios web y secciones de los mismos que usted visita desde el Sitio, antes del Sitio o en páginas relacionadas con el Sitio, características de navegador, características de dispositivos, sistema operativo, preferencias de idiomas, URL a las que se hace referencia, información sobre acciones realizadas en nuestro Sitio, fechas y horas de las visitas al Sitio, secciones o contenido consultadas en los mismos y datos de ubicación y localización del Usuario. Si usted desea obtener información adicional acerca de algunas de las tecnologías mencionadas en esta sección, puede visitar www.allaboutcookies.org.
                        9. Cambios al Aviso de Privacidad.
                        El presente Aviso de Privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales, de nuestras propias necesidades por los productos o servicios que ofrecemos, de nuestras prácticas de privacidad, de cambios en nuestro modelo de negocio, o por otras causas.
                        Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente Aviso de Privacidad, a través del Sitio en la sección correspondiente de Aviso de Privacidad.

                </span>
                </Card>
            </div>
            <div className={classes.buttons} >
                <Button btnType='Success' >
                    CONTINUAR
                </Button>
                <Button btnType='Danger' clicked={() => props.goToNegPago()} >
                    CANCELAR
                </Button>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        goToNegPago: () => dispatch(actions.goToNegPago())
    }
}

export default connect(null, mapDispatchToProps)(AvisoPrivacidad);