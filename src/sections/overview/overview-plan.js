import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect,useState } from 'react';
import { useMoralis } from 'react-moralis';

export const OverviewPlan = (props) => {
  const { value, sx } = props;
  const [planName,setPlanName]=useState("")
  const [planHours,setPlanHours]=useState("")
  const [planUsers,setplanUsers]=useState("")

  const init=async ()=>{

    let user=await Moralis.User.current()
    if(user){

      let active=await user?.get("planActive")
    
      let planName=await user?.get("planName");    
      let planHours=await user?.get("meetingRoomHours");
      let planUsers=await user?.get("planUsers");
      setplanUsers(planUsers)
  
      setPlanName(planName)
      setPlanHours(planHours)
  
    }
  }
  const {Moralis}=useMoralis()
useEffect(()=>{
  
 
  const interval = setInterval(() => {
    init()
  }, 300);
  return () => clearInterval(interval);

},[])
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Plan Actual: {planName}
            </Typography>
            
             
            <Typography variant="h4">
            Horas restantes en sala de reuniones: {planHours}
            </Typography>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Usuarios Permitidos: {planUsers}
            </Typography>
            {planName==="Emprendedor Express"?<Stack>
            <Typography variant="h7">
            - Acceso al Coworking: Espacio compartido de trabajo de lunes a viernes durante
            horario comercial (7:00 a.m. a 7:00 p.m.).
            </Typography>
            <Typography variant="h7">
            - Conexión a Internet: Acceso a internet de alta velocidad para garantizar una óptima
            productividad.

            </Typography>
            <Typography variant="h7">
            - Horas de Sala de Reuniones: 3 horas al mes en salas de reuniones reservables.
            </Typography>
            <Typography variant="h7">
            - Café Gratis: Disfrute de café gratuito durante sus horas de trabajo.
            </Typography>
            <Typography variant="h7">
            - Comunidad: Pertenencia a la comunidad del club, lo que incluye acceso a eventos
              exclusivos, talleres y posibilidad de networking con otros miembros.
            </Typography>
            <Typography variant="h7">
            - Servicios Básicos: Acceso a áreas comunes, baños, y servicios de impresión y
escaneo, área de lockers y guarda equipaje con costo adicional.

            </Typography>
            </Stack>:null}
            {planName==="Visionario Flexible"?<Stack>
            <Typography variant="h7">
            - Acceso Extendido al Coworking: Espacio compartido de trabajo 12 horas al día, 6
            días a la semana (7:00 a.m. a 7:00 p.m.).

            </Typography>
            <Typography variant="h7">
            - Conexión a Internet: Acceso ininterrumpido a internet de alta velocidad para
garantizar el máximo rendimiento en tus proyectos.

            </Typography>
            <Typography variant="h7">
            - Horas de Sala de Reuniones: 5 horas al mes en salas de reuniones reservables.

            </Typography>
            <Typography variant="h7">
            - Café Gratis: Disfrute de café gratuito para mantenerse energizado durante sus
extensas jornadas laborales.

            </Typography>
            <Typography variant="h7">
            -  Eventos de Networking: Acceso prioritario a eventos de networking y talleres,
brindando oportunidades de conectarse con líderes de la industria y otros
emprendedores.

            </Typography>
            <Typography variant="h7">
            - Servicios Básicos: Uso de áreas comunes, baños, servicios de impresión y escaneo,
y cualquier otro servicio básico que ofrezca tu espacio.

            </Typography>
            <Typography variant="h7">
            -  Comunidad: Ser parte de una comunidad en crecimiento de visionarios y
emprendedores con los que puedes colaborar y aprender.

            </Typography>
            </Stack>:null}
            {planName==="Innovador Dedicado"?<Stack>
            <Typography variant="h7">
            - Oficina Privada: Un espacio exclusivo y privado, diseñado para ofrecer la máxima
concentración y productividad, con capacidad para 2 personas

            </Typography>
            <Typography variant="h7">
            - Horario Extendido: Acceso a tu oficina desde las 7:00 a.m. hasta las 7:00 p.m. durante
6 días a la semana.

            </Typography>
            <Typography variant="h7">
            - Internet de Alta Velocidad: Conexión potente y constante para todas tus operaciones
y comunicaciones digitales.
            </Typography>
            <Typography variant="h7">
            - Acceso a Salas de Reuniones: Disponibilidad de 8 horas al mes en salas de
reuniones modernas y bien equipadas
            </Typography>
            <Typography variant="h7">
            - Eventos Exclusivos: Acceso VIP a eventos de networking, talleres y conferencias,
conectando con la élite empresarial y emprendedora.


            </Typography>
            <Typography variant="h7">
            - Descuentos Premium: Recibe un descuento especial en servicios adicionales, como
renta de equipos especiales, catering para eventos, entre otros.

            </Typography>
            <Typography variant="h7">
            - Servicios Básicos: Disfruta de áreas comunes, baños, servicios de impresión,
escaneo y todo lo que necesitas para tu día a día.


            </Typography>
            <Typography variant="h7">
            - Café Gratuito: No te pierdas ni un minuto de inspiración con café de alta calidad,
disponible en todo momento durante tus horas de trabajo.
            </Typography>
            <Typography variant="h7">
            - Asesoría de Negocio: Acceso a 4 horas de consultorías y asesorías en áreas clave
del negocio, guiándote hacia el éxito y la optimización de tus proyectos.
            </Typography>
            <Typography variant="h7">
            - Comunidad: Conviértete en parte esencial de una comunidad de líderes, donde el
intercambio de ideas y la colaboración están a la orden del día.
            </Typography>
            </Stack>:null}
            {planName==="Líder Elite"?<Stack>
            <Typography variant="h7">
            - Oficina Privada: Un espacio exclusivo y privado, diseñado para ofrecer la máxima
concentración y productividad, con capacidad para 2 personas.


            </Typography>
            <Typography variant="h7">
            - Horario Extendido: Acceso a tu oficina desde las 7:00 a.m. hasta las 7:00 p.m. durante
6 días a la semana.
            </Typography>
            <Typography variant="h7">
            - Internet de Alta Velocidad: Conexión potente y constante para todas tus operaciones
y comunicaciones digitales.
            </Typography>
            <Typography variant="h7">
            - Acceso a Salas de Reuniones: Disponibilidad de 8 horas al mes en salas de
reuniones modernas y bien equipadas
            </Typography>
            <Typography variant="h7">
            - Eventos Exclusivos: Acceso VIP a eventos de networking, talleres y conferencias,
conectando con la élite empresarial y emprendedora.


            </Typography>
            <Typography variant="h7">
            - Descuentos Premium: Recibe un descuento especial en servicios adicionales, como
renta de equipos especiales, catering para eventos, entre otros.

            </Typography>
            <Typography variant="h7">
            - Servicios Básicos: Disfruta de áreas comunes, baños, servicios de impresión,
escaneo y todo lo que necesitas para tu día a día.


            </Typography>
            <Typography variant="h7">
            - Café Gratuito: No te pierdas ni un minuto de inspiración con café de alta calidad,
disponible en todo momento durante tus horas de trabajo.
            </Typography>
            <Typography variant="h7">
            - Asesoría de Negocio: Acceso a 4 horas de consultorías y asesorías en áreas clave
del negocio, guiándote hacia el éxito y la optimización de tus proyectos.
            </Typography>
            <Typography variant="h7">
            - Comunidad: Conviértete en parte esencial de una comunidad de líderes, donde el
intercambio de ideas y la colaboración están a la orden del día.
            </Typography>
            </Stack>:null}

            {planName==="Titán del Éxito"?<Stack>
            <Typography variant="h7">
            - Acceso Total: Entrada libre a todas las instalaciones del club, ofreciendo una
experiencia de trabajo sin restricciones.

            </Typography>
            <Typography variant="h7">
            - Áreas de Trabajo Exclusivas: Espacios diseñados específicamente para garantizar la
privacidad, comodidad y productividad de tu equipo.
            </Typography>
            <Typography variant="h7">
            - Salas de Reuniones Premium: Acceso a las salas más exclusivas y equipadas con
tecnología de punta para juntas, presentaciones y videoconferencias.

            </Typography>
            <Typography variant="h7">
            - Durante 5 horas al mes Eventos de Networking: Participación en los eventos más
selectos, conectando con líderes de industria y otros titanes del negocio.
            </Typography>
            <Typography variant="h7">
            - Asesoría Especializada: 1 Sesiones con expertos en diversas áreas del negocio para
guiar y potenciar el crecimiento de tu empresa.
            </Typography>
            <Typography variant="h7">
            - Mentorías de Élite: Encuentros personalizados con líderes y visionarios reconocidos
en el mundo empresarial.

            </Typography>
            <Typography variant="h7">
            - Internet Ultra-Rápido: Conexión de alta velocidad optimizada para garantizar
operaciones fluidas y comunicación ininterrumpida.
            </Typography>
            <Typography variant="h7">
            - Atención Personalizada: Un equipo dedicado para atender cualquier necesidad o
requerimiento.
            </Typography>
            <Typography variant="h7">
            - Café Gratuito: Mantén a tu equipo motivado y alerta con café de calidad, disponible
en todo momento.

            </Typography>
            <Typography variant="h7">
            - Comunidad de Élite: Forma parte de un selecto grupo de profesionales y empresas
que, como tú, buscan destacar y ser referentes en sus campos.

            </Typography>
            </Stack>:null}

            {planName==="Corporativo Vanguardista"?<Stack>
            <Typography variant="h7">
            - Oficina Privada: Un espacio exclusivo diseñado para albergar a un equipo de 8
personas, asegurando privacidad y comodidad.
            </Typography>
            <Typography variant="h7">
            -  Espacios de Coworking: Acceso a áreas comunes de trabajo, perfectas para la
colaboración y el networking.
            </Typography>
            <Typography variant="h7">
            - Salas de Reuniones: Disponibilidad de 10 horas al mes. Reserva y utiliza nuestras
modernas salas de reuniones para juntas, presentaciones y sesiones de
brainstorming.

            </Typography>
            <Typography variant="h7">
            - Eventos de Networking: Conecta con otras empresas y profesionales en eventos
exclusivos, ampliando tu red y posibilidades de negocio.

            </Typography>
            <Typography variant="h7">
            - Asesoría de Negocio: 2 Sesiones periódicas con expertos en diversas áreas para
garantizar el crecimiento y mejora continua de tu empresa.

            </Typography>
            <Typography variant="h7">
            - Mentorías de Élite: Encuentros personalizados con líderes y visionarios reconocidos
en el mundo empresarial.

            </Typography>
            <Typography variant="h7">
            - Soporte Administrativo: Disponibilidad de un equipo administrativo para apoyarte en
tareas diarias, como recepción de documentos.
            </Typography>
            <Typography variant="h7">
            - Internet de Alta Velocidad: Conexión constante y fiable para garantizar la operatividad
y comunicación de tu equipo.
            </Typography>
            <Typography variant="h7">
            - Café Gratuito: Mantén a tu equipo motivado y alerta con café de calidad, disponible
en todo momento.

            </Typography>
            <Typography variant="h7">
            -  Comunidad: Únete a un ecosistema de empresas y profesionales que buscan innovar
y liderar en sus respectivos campos.

            </Typography>
            </Stack>:null}
            {planName==="Explorador"?<Stack>
            <Typography variant="h7">
            - Acceso Diario: Disfruta de un día completo en nuestras instalaciones, con flexibilidad
para adaptarte a tu agenda.

            </Typography>
            <Typography variant="h7">
            - Espacios de Coworking: Accede a áreas de trabajo compartidas, optimizadas para la
concentración y el networking.

            </Typography>
            <Typography variant="h7">
            - Internet de Alta Velocidad: Conectividad confiable para todas tus actividades, desde
videoconferencias hasta navegación general.


            </Typography>
            <Typography variant="h7">
            - Servicios Básicos: Aprovecha las áreas comunes, baños, servicios de impresión y
escaneo, entre otros.

            </Typography>
            <Typography variant="h7">
            - Café Gratuito: Mantente energizado con café gratuito. Ambiente Profesional: Un
entorno diseñado para profesionales, permitiéndote trabajar en un espacio que
potencia la productividad y creatividad.


            </Typography>
            <Typography variant="h7">
            - Conexión Local: Aunque tu estancia sea breve, forma conexiones y colaboraciones
con otros profesionales y emprendedores presentes.


            </Typography>
            <Typography variant="h7">
            - Ubicación Estratégica: Ubicados en el corazón de [nombre de la ciudad/área],
              facilitando el acceso a puntos clave de la ciudad. Servicios adicionales: Impresiones y
              guardaequipaje.

            </Typography>
            </Stack>:null}
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewPlan.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
