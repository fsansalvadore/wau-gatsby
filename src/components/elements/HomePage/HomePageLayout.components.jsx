import React, { useRef, useState, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { gsap, Power1 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WauGradient from '../../../assets/wau-sphere-texture-sp1.svg';
import {
  StyledIntroCanvas,
  StyledVisionSectionCanvas,
} from './HomePageLayout.styled';

const { TextureLoader } = THREE;

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

const Sphere = ({ indexRef, position }) => {
  const sphereRef = useRef(null);
  const meshRef = useRef(null);
  const [hovered, setHover] = useState(false);
  const materialMap = useLoader(TextureLoader, WauGradient);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    if (
      !!sphereRef &&
      !!sphereRef.current &&
      typeof window !== `undefined` &&
      typeof document !== `undefined`
    ) {
      gsap.registerPlugin(ScrollTrigger);

      const sphereTL = gsap.timeline({
        scrollTrigger: {
          trigger: indexRef.current,
          start: '200px 10%',
          end: 'center 20%',
          scrub: 1,
          onUpdate: ({ progress }) =>
            progress === 1 ? setIntroFinished(true) : setIntroFinished(false),
        },
      });
      ScrollTrigger.defaults({
        immediateRender: false,
        ease: Power1.inOut,
      });

      sphereTL
        .to(
          sphereRef.current.position,
          {
            duration: 1,
            z: 8,
          },
          indexRef.current
        )
        .to(
          sphereRef.current.scale,
          {
            duration: 1,
            x: 2.3,
            y: 2,
            z: 1,
          },
          indexRef.current
        );
    }
  }, [indexRef, sphereRef]);

  useEffect(() => {
    if (introFinished) {
      document.querySelector('#continue-cta').classList.add('hide');
    } else {
      document.querySelector('#continue-cta').classList.remove('hide');
    }
  }, [introFinished]);

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
      ref={sphereRef}
    >
      {/* geomtery */}
      <sphereGeometry attach="geometry" args={[1, 400, 400]} />
      {/* meterial */}
      {/* https://github.com/pmndrs/drei#shaders */}
      <AnimatedMeshDistortMaterial
        attach="material"
        ref={meshRef}
        factor={introSpring.factor}
        map={materialMap}
        speed={hovered ? 2 : 2}
      />
    </animated.mesh>
  );
};

export const IntroCanvas = ({ indexRef }) => {
  return (
    <StyledIntroCanvas
      id="canvas-root"
      // enable shadows
      shadows
      camera={{ position: [0, 0, 10], fov: 50 }}
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
      <directionalLight position={[-10, 0, 20]} intensity={1} />
      <directionalLight position={[0, 10, 20]} intensity={1} />
      <ambientLight intensity={4} color="#fff" />

      {/* Suspence from React to wait for texture loading */}
      <Suspense fallback={null}>
        <Sphere position={[0, 0, 0]} url={WauGradient} indexRef={indexRef} />
      </Suspense>

      {/* plane that receives casted shadow */}
      <mesh
        // enable receiving shadows
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
      >
        <planeGeometry args={[1000, 1000]} />
        <shadowMaterial opacity={0.05} />
      </mesh>
    </StyledIntroCanvas>
  );
};

// Sphere in "vision" section
export const VisionSphere = ({ visionSectionRef, position }) => {
  const visionSphereRef = useRef(null);
  const meshRef = useRef(null);
  const [hovered, setHover] = useState(false);
  const materialMap = useLoader(TextureLoader, WauGradient);

  useEffect(() => {
    if (
      visionSphereRef.current &&
      typeof window !== `undefined` &&
      typeof document !== `undefined`
    ) {
      gsap.registerPlugin(ScrollTrigger);

      const sphereTL = gsap.timeline({
        scrollTrigger: {
          trigger: visionSectionRef.current,
          start: 'top 40%',
          end: 'bottom 10%',
          scrub: 1.4,
        },
      });

      ScrollTrigger.defaults({
        immediateRender: false,
        ease: Power1.inOut,
      });

      sphereTL.fromTo(
        visionSphereRef.current.position,
        { y: 8 },
        { y: -8, duration: 1 },
        visionSectionRef.current
      );
    }
  }, [visionSectionRef, visionSphereRef]);

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
      scale={[1.5, 1.5, 1.5]}
      position={position}
      ref={visionSphereRef}
      // rotation={introSpring.rotation}
    >
      {/* geomtery */}
      <sphereGeometry attach="geometry" args={[1, 100, 100]} />
      {/* meterial */}
      {/* https://github.com/pmndrs/drei#shaders */}
      <AnimatedMeshDistortMaterial
        // attach="material"
        // drei arguments for MeshWobbleMaterial
        ref={meshRef}
        factor={introSpring.factor}
        map={materialMap}
        speed={hovered ? 2 : 2}
      />
    </animated.mesh>
  );
};

export const VisionSectionCanvas = ({ visionSectionRef, ...otherProps }) => {
  const visionCanvasRef = useRef();

  return (
    <Suspense fallback={null}>
      <StyledVisionSectionCanvas
        id="canvas-root"
        // enable shadows
        camera={{ position: [0, 0, 10], fov: 50 }}
        ref={visionCanvasRef}
        {...otherProps}
      >
        {/* lighting can be defined globally */}
        {/* directionalLight can cast shadows */}
        <directionalLight
          // to cast shadow
          castShadow
          position={[0, 10, 0]}
          intensity={1}
          // shadow-mapSize-width={1024}
          // shadow-mapSize-height={1024}
          // shadow-camera-far={100}
          // shadow-camera-left={-10}
          // shadow-camera-top={20}
          // shadow-camera-right={20}
          // shadow-camera-bottom={-10}
        />
        {/* poinLight can be positioned as sources of light */}
        <pointLight position={[-10, 0, 20]} intensity={1} />
        <pointLight position={[0, -10, 20]} intensity={1} />
        {/* <pointLight position={[0, 0, 2]} intensity={10} color='#00ACA9' /> */}
        {/* ambient light doesn't cast shadows */}
        <ambientLight intensity={9} color="#00ACA9" />

        {/* Suspence from React to wait for texture loading */}
        <Suspense fallback={null}>
          <VisionSphere
            position={[0, 0, 0]}
            url={WauGradient}
            visionSectionRef={visionSectionRef}
          />
        </Suspense>
      </StyledVisionSectionCanvas>
    </Suspense>
  );
};

export const ScrollProgressToggleOut = () => {
  if (typeof window !== `undefined` && typeof document !== `undefined`) {
    if (document.querySelector('.main-cta')) {
      document.querySelector('.main-cta').classList.add('off');
    }
    if (document.querySelector('#continue-cta')) {
      document.querySelector('#continue-cta').classList.add('white');
    }
  }
};

export const ScrollProgressToggleIn = () => {
  if (typeof window !== `undefined` && typeof document !== `undefined`) {
    if (document.querySelector('.main-cta')) {
      document.querySelector('.main-cta').classList.remove('off');
    }
    if (document.querySelector('#continue-cta')) {
      document.querySelector('#continue-cta').classList.remove('white');
    }
  }
};
