import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/parallax";
import styled from "styled-components";
import cuteMusic from './cuteMusic.mp3';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  flex-direction: column; // Ajouté pour empiler le texte et le carrousel
  cursor: pointer; // Ajouté pour indiquer que l'utilisateur peut cliquer pour activer la musique
`;

const ImageWrapper = styled.div`
  width: 300px; // Largeur fixe
  height: 500px; // Hauteur fixe
  overflow: hidden; // Cache les parties de l'image qui dépassent
  border-radius: 20px;
  transform-style: preserve-3d;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // Remplit le conteneur sans déformer l'image
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 105, 180, 0.4); // Ombre appliquée à l'image
`;

const Heading = styled.h1`
  position: absolute;
  top: 20px; // Ajuste la position verticale
  left: 50%;
  transform: translateX(-50%); // Centrer horizontalement
  font-size: 2rem;
  color: #ff4081; // Couleur rose pour l'effet de Saint-Valentin
  font-family: "Arial", sans-serif;
  text-align: center;
  margin: 0;
  z-index: 1; // S'assurer que le texte est au-dessus du carrousel
`;

const ImageCarousel = () => {
  const [audio, setAudio] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const images = [
    "/images/photo1.JPG",
    "/images/photo2.JPG",
    "/images/photo3.JPG",
    "/images/photo4.JPG",
    "/images/photo5.JPG",
    "/images/photo6.JPG",
    "/images/photo7.JPG",
    "/images/photo8.JPG",
    "/images/photo9.JPG",
    "/images/photo10.JPG",
    "/images/photo11.JPG",
    "/images/photo12.JPG",
    "/images/photo13.JPG",
    "/images/photo14.JPG",
  ];

  // Fonction qui joue la musique lorsque l'utilisateur clique n'importe où sur la page
  const handlePageClick = () => {
    if (!audioPlaying) {
      const music = new Audio(cuteMusic);
      music.loop = true;
      music.play();
      setAudio(music);
      setAudioPlaying(true);
    }
  };

  useEffect(() => {
    // Cleanup function pour arrêter la musique si le composant est démonté
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  return (
    <Container onClick={handlePageClick}>
      {/* Ajout du texte en haut de la page */}
      <Heading>Happy Valentine&apos;s Day! 💖</Heading>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false, // Désactive les ombres de Swiper
        }}
        parallax={true}
        mousewheel={true}
        modules={[EffectCoverflow, Mousewheel, Parallax]}
        className="mySwiper"
        style={{ height: "500px" }} // Ajuste la hauteur du carrousel
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <ImageWrapper>
              <Image
                src={img}
                alt={`Photo ${i + 1}`}
                data-swiper-parallax="20%"
              />
            </ImageWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default ImageCarousel;
