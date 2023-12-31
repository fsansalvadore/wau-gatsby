import React, { useRef, useState, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import styled from 'styled-components';
import { gsap, Power1 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'twin.macro';
import WauGradient from '../../../assets/wau-sphere-texture-sp1.svg';
import GridMaxWidthContainer from '../../../components/elements/Atoms/GridMaxWidthContainer';
import ContactsTextBlock from '../../../components/elements/Atoms/ContactsTextBlock';

const { TextureLoader } = THREE;

const AnimatedCanvas = animated(Canvas);
const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

const StyledContactsCtaCanvas = styled(AnimatedCanvas)`
  z-index: 0;
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  width: 100%;

  @media (min-width: 768px) {
    width: 45% !important;
  }
`;
const Sphere = ({ ctaSectionRef, position }) => {
  const contactsCtaSphereRef = useRef(null);
  const meshRef = useRef(null);
  const [hovered, setHover] = useState(false);
  const materialMap = useLoader(TextureLoader, WauGradient);

  useEffect(() => {
    if (!ctaSectionRef || !ctaSectionRef.current) return;
    if (
      contactsCtaSphereRef.current &&
      typeof window !== `undefined` &&
      typeof document !== `undefined`
    ) {
      gsap.registerPlugin(ScrollTrigger);

      const sphereTL = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: 'top 85%',
          end: 'top 15%',
        },
      });

      ScrollTrigger.defaults({
        immediateRender: false,
        ease: Power1.inOut,
      });

      sphereTL.from(
        contactsCtaSphereRef.current.position,
        {
          duration: 2,
          y: 10,
        },
        ctaSectionRef.current
      );
    }
  }, [ctaSectionRef, contactsCtaSphereRef]);

  const introSpring = useSpring({
    scale: [1, 1, 1],
    speed: 10,
    factor: 20,
    rotation: [0, 0, 0],
    config: {
      mass: 1,
      friction: 40,
      velocity: 0,
    },
  });

  return (
    <animated.mesh
      castShadow
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      position={position}
      ref={contactsCtaSphereRef}
    >
      {/* geomtery */}
      <sphereGeometry args={[1, 150, 150]} />
      {/* meterial */}
      {/* https://github.com/pmndrs/drei#shaders */}
      <AnimatedMeshDistortMaterial
        // drei arguments for MeshWobbleMaterial
        ref={meshRef}
        factor={introSpring.factor}
        map={materialMap}
        // speed={introSpring.speed}
        speed={hovered ? 2 : 2}
      />
    </animated.mesh>
  );
};

const ContentCtaCanvas = ({ ctaSectionRef, ...otherProps }) => {
  const contactsCtaCanvasRef = useRef();

  return (
    <StyledContactsCtaCanvas
      id="canvas-contacts-cta"
      // enable shadows
      shadows
      camera={{ position: [0, 0, 10], fov: 50 }}
      ref={contactsCtaCanvasRef}
      {...otherProps}
    >
      {/* lighting can be defined globally */}
      {/* directionalLight can cast shadows */}
      <directionalLight
        // to cast shadow
        castShadow
        position={[0, 10, 0]}
        intensity={1}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>
      {/* poinLight can be positioned as sources of light */}
      <pointLight position={[-10, 0, 20]} intensity={1} />
      <pointLight position={[0, -10, 20]} intensity={1} />
      {/* ambient light doesn't cast shadows */}
      <ambientLight intensity={10} color="#00ACA9" />

      {/* Suspence from React to wait for texture loading */}
      <Suspense fallback={null}>
        <Sphere
          position={[0, 1, 0]}
          url={WauGradient}
          ctaSectionRef={ctaSectionRef}
        />
      </Suspense>

      {/* plane that receives casted shadow */}
      <group>
        <animated.mesh
          // enable receiving shadows
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
        >
          <planeGeometry args={[1000, 1000]} />

          <shadowMaterial opacity={0.05} />
        </animated.mesh>
      </group>
    </StyledContactsCtaCanvas>
  );
};

// eslint-disable-next-line import/no-default-export
const ContactsCtaSection = ({ className, lang, data, ...props }) => {
  const ctaSectionRef = useRef(null);
  const [ctaData, setCtaData] = useState(null);

  useEffect(() => {
    if (!!data) {
      setCtaData(
        data.pages.nodes.find(
          (node) => node.language.code.toLowerCase() === lang
        )?.homePageACF.sezioneContatti
      );
    }
  }, [data, lang]);

  return (
    <section
      tw="relative w-full py-32 lg:py-64 flex justify-center"
      className={`lightGradientBg ${className}`}
      ref={ctaSectionRef}
      {...props}
    >
      <ContentCtaCanvas
        className="canvas"
        ctaSectionRef={ctaSectionRef}
        tw="absolute w-1/4 left-0 top-0 h-full"
      />
      <GridMaxWidthContainer>
        {!!ctaData && (
          <ContactsTextBlock
            title={ctaData.titolo}
            content={ctaData.paragrafo}
            link={ctaData.tasto.link}
            cta={ctaData.tasto.testo}
            tw="col-span-full md:col-span-8 md:col-start-7 lg:col-span-7 lg:col-start-5"
          />
        )}
      </GridMaxWidthContainer>
    </section>
  );
};

export default ContactsCtaSection;
