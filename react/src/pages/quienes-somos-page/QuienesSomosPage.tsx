import styles from "./index.module.scss";

import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { CustomImage } from "../../components/CustomImage/CustomImage";

import mateImage1 from "../../images/mate-image-1.jpg";
import mateImage2 from "../../images/mate-image-2.jpg";
import mateImage3 from "../../images/mate-image-3.jpg";

const QuienesSomosPage: React.FC = () => {
  return (
    <>
      <CustomContainer className={styles.productsDisplay1}>
        <H2Custom alignCenter text="Quienes Somos" />
        <div className={styles.divContainer}>
          <CustomImage
            className={styles.image}
            image={mateImage1}
            alt="primer plano cebando mate"
          />
          <p className={styles.text}>
            En Re-mate.ar, somos más que una tienda de mate, somos apasionados
            por la tradición y el ritual del mate. Nacimos con la misión de
            acercarte los mejores productos para que disfrutes de esta bebida
            tan nuestra, ya sea en la tranquilidad de tu hogar o compartiendo
            con amigos. Creemos que el mate es más que una bebida, es una forma
            de conectar, de compartir historias y de disfrutar pequeños momentos
            que se convierten en grandes recuerdos.
          </p>
        </div>
      </CustomContainer>
      <CustomContainer className={styles.productsDisplay2}>
        <div className={styles.divContainer}>
          <p className={styles.text}>
            Nos enorgullece ofrecer una selección de mates y termos, pensada
            para mateadores de todos los niveles, desde los más experimentados
            hasta quienes recién están comenzando a descubrir esta tradición.
            Cada producto que encontrarás en Re-mate.ar ha sido elegido con
            cuidado y dedicación, buscando siempre ofrecer la mejor calidad y
            precio.
          </p>
          <CustomImage
            className={styles.image}
            image={mateImage2}
            alt="primer plano cebando mate"
          />
        </div>
      </CustomContainer>
      <CustomContainer className={styles.productsDisplay3}>
        <div className={styles.divContainer}>
          <CustomImage
            className={styles.image}
            image={mateImage3}
            alt="primer plano cebando mate"
          />
          <p className={styles.text}>
            Nuestro objetivo es mantener viva esta costumbre y facilitarte todo
            lo que necesitas para disfrutarla. Porque en Re-mate.ar, creemos que
            el mate une.
          </p>
        </div>
      </CustomContainer>
    </>
  );
};

export default QuienesSomosPage;
