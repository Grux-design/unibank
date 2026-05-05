import { Link } from "react-router-dom";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">{title}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2 marker:text-foreground">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function TerminosContent() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Section title="Aviso">
        <p>
          En <strong className="text-foreground">Grupo UniBank</strong> hemos tomado todas las precauciones
          necesarias para que su información sea transmitida con toda seguridad y confianza. Algunas de
          ellas son las siguientes:
        </p>
      </Section>

      <Section title="Encriptación">
        <p>
          Al utilizar <strong className="text-foreground">Banca en Línea</strong> y{" "}
          <strong className="text-foreground">Banca Móvil</strong>, la información se transmite de forma
          encriptada, es decir, que está protegida con un proceso que enmascara la información para que no
          pueda ser comprendida por personas no autorizadas. Contamos con seguridad de encriptación o
          codificación de datos. De esta forma, toda la información que viaje entre su computador y el
          servidor del banco no podrá ser descifrada por terceros.
        </p>
      </Section>

      <Section title="Certificación">
        <p>
          Contamos con <strong className="text-foreground">certificados digitales de seguridad</strong> de
          nuestro sitio en Internet emitido por una compañía certificadora importante, líder en la provisión
          de servicios de seguridad electrónica en Internet. Los certificados digitales son el estándar
          mundial para permitir la autenticación de servidores Web y la encriptación de datos que se
          intercambian con estos.
        </p>
      </Section>

      <Section title="Autenticación">
        <p>
          Cada vez que usted ingrese a Banca en Línea y Banca Móvil, una serie de medidas le permitirán al
          banco identificarle efectivamente como nuestro cliente, además de indicarle a usted que se
          encuentra en el sitio auténtico del banco.
        </p>
        <Bullets
          items={[
            <>
              <strong className="text-foreground">Usuario y password:</strong> Ambos constituyen una clave
              de acceso única que lo autentican como el cliente que es y lo autorizan a ver y manejar su
              información según su perfil.
            </>,
            <>
              <strong className="text-foreground">Imagen:</strong> Usted deberá seleccionar una imagen y una
              frase asociada a su usuario de la Banca en Línea y Banca Móvil, confirmando así que cada vez
              que ingrese se despliegue dicha imagen que usted escogió.
            </>,
            <>
              <strong className="text-foreground">Dispositivo de autenticación dinámica – TOKEN:</strong>{" "}
              Para agregar un nivel de seguridad adicional al realizar transacciones, pagos o transferencia
              de fondos a terceros, se ha implementado la utilización del token, el cual consiste en un
              dispositivo físico que genera claves dinámicas únicas. El token es único y diferente para cada
              cliente, es decir que el token asociado a su usuario no sirve para otro usuario.
            </>,
          ]}
        />
      </Section>

      <Section title="Monitoreo">
        <p>
          Realizamos seguimiento y monitoreo de las transacciones que realizan nuestros clientes a través de
          sus canales electrónicos, con el objetivo de{" "}
          <strong className="text-foreground">detectar fraudes</strong> a sus cuentas.
        </p>
      </Section>

      <Section title="Recomendaciones generales de seguridad">
        <Bullets
          items={[
            <>No comparta nunca su <strong className="text-foreground">USER-ID</strong> o Usuario de acceso al sistema de Banca en Línea y Banca Móvil.</>,
            <>No almacenar su USER-ID o Usuario y contraseña de acceso al sistema de Banca en Línea en los navegadores.</>,
            <>Nunca envíe su clave o información personal por correo electrónico, chat o teléfono. <strong className="text-foreground">UniBank nunca le solicitará sus datos por estos medios.</strong></>,
            <>No comparta nunca su <strong className="text-foreground">PASSWORD</strong> o contraseña.</>,
            <>Cambie su contraseña a menudo.</>,
            <>No se aleje nunca de la computadora si la información relativa a su cuenta se muestra en la pantalla. Termine la sesión y cierre el navegador antes de retirarse de la computadora.</>,
            <>Mantenga su computador actualizado y libre de virus.</>,
            <>Revise sus cuentas y el detalle histórico de transacciones regularmente.</>,
            <>Evite abrir correos electrónicos y/o descargar archivos de dudosa procedencia.</>,
            <>Evite ingresar a la Banca en Línea desde computadoras de uso público.</>,
            <>Notificar inmediatamente al banco ante cualquier anomalía con su servicio de banca en línea.</>,
          ]}
        />
      </Section>

      <Section title="Recomendaciones para el manejo del Token físico">
        <p>
          El token le permite una <strong className="text-foreground">doble autenticación</strong> del
          usuario al realizar una transacción. La clave dinámica que genera no puede ser copiada ni clonada.
          Sin embargo, siga las siguientes recomendaciones para su uso:
        </p>
        <Bullets
          items={[
            <>Evite utilizarlo como llavero con las llaves de su auto o casa, dejarlo en estacionamientos públicos u olvidado.</>,
            <>Evite dejarlo en la oficina o casa sin protección. Guárdelo en un lugar seguro.</>,
            <>Comuníquese con el banco ante cualquier dificultad con su dispositivo token.</>,
          ]}
        />
      </Section>

      <Section title="Cajeros Automáticos">
        <Bullets
          items={[
            <>Asegúrate de utilizar cajeros automáticos iluminados y que estén ubicados en lugares seguros.</>,
            <>No permitas que personas extrañas te brinden ayuda al utilizar tu tarjeta.</>,
            <>No introduzca su PIN si el cajero se encuentra fuera de servicio.</>,
            <>No utilice el cajero automático si siente que su seguridad está en peligro.</>,
            <><strong className="text-foreground">No proporcione su número PIN</strong>, incluso a los empleados del banco.</>,
            <>Introduzca su número PIN solamente cuando la pantalla del cajero lo indique.</>,
            <>Si imprimió su comprobante, tómelo y guárdelo.</>,
            <>Informe a su banco inmediatamente si nota algún objeto extraño u obstrucción en la entrada de la tarjeta o salida del efectivo.</>,
            <>Si pierde su tarjeta, <strong className="text-foreground">notifíquelo a su banco de inmediato</strong>.</>,
          ]}
        />
      </Section>

      <Section title="Transferencias Internacionales">
        <p>
          Para utilizar este servicio, se requiere que el usuario proporcione información personal tal como
          su nombre, dirección, correo electrónico, número de teléfono o de fax.
        </p>
        <p>
          La información personal proporcionada será utilizada{" "}
          <strong className="text-foreground">únicamente para propósitos internos del banco</strong>.
        </p>
        <p>
          UniBank no revelará la información suministrada, salvo que así fuera solicitado por autoridad
          competente.
        </p>
      </Section>

      <Section title="Tarjetas Débito Clave | Mastercard">
        <Bullets
          items={[
            <>No exponga su tarjeta a altas temperaturas (frío o calor).</>,
            <>Nunca doble su tarjeta.</>,
            <>No escriba su número de PIN o contraseña en la banda de papel de la tarjeta; ésta es sólo para su firma, la cual es muy importante para efectos de verificaciones, al tiempo que facilita la recuperación en caso de extravío.</>,
            <>En el caso que su tarjeta Clave no funcione adecuadamente o se le extravíe por algún motivo, usted debe comunicarse con la Institución Financiera que le emitió la misma, para que sea evaluada y, si es necesario, reemplazarla por una nueva.</>,
            <>Si no existe un Punto de Venta remoto, acompaña hasta el final a la persona que hará el cargo a tu tarjeta.</>,
            <><strong className="text-foreground">Nunca pierdas de vista tu tarjeta.</strong></>,
          ]}
        />
      </Section>

      <Section title="Protección de Datos">
        <p>
          Por este medio yo (nosotros) <strong className="text-foreground">DECLARO(AMOS)</strong> que la
          información proporcionada al banco por mí (nosotros) es veraz, correcta, verdadera y por tanto
          válida. Certifico que he(mos) leído y entendido a cabalidad todas las condiciones estipuladas en
          el <strong className="text-foreground">Acuerdo de Servicio</strong> y{" "}
          <strong className="text-foreground">Políticas de Privacidad</strong> del grupo financiero que están
          disponibles al público en la página web del banco, las cuales abarcan las disposiciones de la{" "}
          <strong className="text-foreground">Ley 81 de 2019</strong> sobre protección de datos personales y
          sus reglamentos.{" "}
          <Link
            to="/aviso-de-privacidad"
            className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium"
          >
            Ver Aviso de Privacidad
          </Link>
          .
        </p>
      </Section>
    </div>
  );
}
