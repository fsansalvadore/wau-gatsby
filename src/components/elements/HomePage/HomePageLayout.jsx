import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import 'twin.macro';
import parse from 'html-react-parser';
import WauVideoMp4 from '../../../assets/16_9_WAU_2025.mp4';
// import WauVideoWebM from '../../../assets/Wau-Architetti-cut.webm';
import WauVideoPoster from '../../../assets/Wau-Architetti-cut.gif';
import Layout from '../../LayoutComponent';
import GridMaxWidthContainer from '../Atoms/GridMaxWidthContainer';
import SectionTextBlock from '../Atoms/SectionTextBlock';
import Accordion from '../Atoms/Accordion';
import ProjectPreviewCard from '../../elements/Projects/ProjectPreviewCard/ProjectPreviewCard';
import PageLoader from '../Atoms/PageLoader';
import { StyledIntroContainer } from './HomePageLayout.styled';
import Button from '../Atoms/Button';

const HomePageLayout = ({ lang, data, ...otherProps }) => {
  const videoRef = useRef(null);
  const [acf, setAcf] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(null);
  const [expertises, setExpertises] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.onload = () => {
        setIsLoaded(true);
      };
      setTimeout(() => {
        setIsLoaded(true);
      }, 800);
    }
  }, [setIsLoaded]);

  useEffect(() => {
    if (data && data.expertises) {
      setExpertises(data.expertises.nodes);
    }
    if (data && data.page && data.page.homePageACF) {
      setAcf(data.page.homePageACF);
    }
    if (!!data && !!data.projects) {
      setFilteredProjects(
        data.projects.nodes.sort((a, b) =>
          a.date < b.date
            ? 1
            : a.date === b.date
              ? a.title > b.title
                ? 1
                : -1
              : -1
        )
      );
    }
  }, [setAcf, setExpertises, data]);

  // Force play video
  useEffect(() => {
    if (!videoRef || !videoRef.current) return;

    //open bug since 2017 that you cannot set muted in video element https://github.com/facebook/react/issues/10389
    videoRef.current.defaultMuted = true;
    videoRef.current.muted = true;

    if (!!videoRef && !!videoRef.current) {
      const promise = videoRef.current.play();
      videoRef.current.play();
      if (promise !== undefined) {
        promise
          .catch((error) => {
            // Auto-play was prevented
            // Show a UI element to let the user manually start playback
          })
          .then(() => {
            // Auto-play started
            videoRef.current.play();
          });
      }
    }
  }, [videoRef]);

  return (
    <Layout isMenuLight>
      <Helmet>
        <title>
          {lang === 'it'
            ? `WAU Architetti - Torino - Home Page`
            : `WAU Architects - Turin, Italy - Home Page`}
        </title>
        <link
          rel="canonical"
          href={
            lang === 'it'
              ? `https://www.wauarchitetti.com`
              : `https://www.wauarchitetti.com/en`
          }
        />
        <meta
          name="description"
          content={`${
            lang === 'it'
              ? 'Architettura. Design. Urbanistica. Ingegneria. Un’Architecture Factory che offre soluzioni di progettazione globali.'
              : 'Architecture. Design. City planning. Engineering. An Architecture Factory offering global design solutions.'
          }`}
        />
        <meta
          property="og:site_name"
          content={lang === 'it' ? `WAU Architetti` : `WAU Architects`}
        />
        <meta
          property="og:url"
          content={
            lang === 'it'
              ? `https://www.wauarchitetti.com`
              : `https://www.wauarchitetti.com/en`
          }
        />
        <meta
          property="og:title"
          content={
            lang === 'it'
              ? `WAU Architetti - Torino - Home Page`
              : `WAU Architects - Turin, Italy - Home Page`
          }
        />
        <meta
          property="og:description"
          content={`${
            lang === 'it'
              ? 'Architettura. Design. Urbanistica. Ingegneria. Un’Architecture Factory che offre soluzioni di progettazione globali.'
              : 'Architecture. Design. City planning. Engineering. An Architecture Factory offering global design solutions.'
          }`}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:site"
          content={
            lang === 'it'
              ? `https://www.wauarchitetti.com`
              : `https://www.wauarchitetti.com/en`
          }
        />
        <meta
          name="twitter:title"
          content={
            lang === 'it'
              ? `WAU Architetti - Torino - Home Page`
              : `WAU Architects - Turin, Italy - Home Page`
          }
        />
        <meta
          name="twitter:description"
          content={`${
            lang === 'it'
              ? 'Architettura. Design. Urbanistica. Ingegneria. Un’Architecture Factory che offre soluzioni di progettazione globali.'
              : 'Architecture. Design. City planning. Engineering. An Architecture Factory offering global design solutions.'
          }`}
        />
      </Helmet>
      <div {...otherProps}>
        <PageLoader isLoaded={isLoaded} />
        {!!acf && (
          <>
            <StyledIntroContainer className="">
              {/* {!!acf.tastoIniziale.link && (
                <Link className="main-cta" to={acf.tastoIniziale.link}>
                  {acf.tastoIniziale.testo}
                </Link>
              )} */}
              <div className="main-cta flex flex-col items-center justify-center gap-2 md:gap-4">
                <p>{lang === 'it' ? 'Scopri di più' : 'Learn more'}</p>
                <div id="continue-cta">
                  <svg
                    width="8"
                    height="38"
                    viewBox="0 0 8 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.64644 37.3536C3.84171 37.5488 4.15829 37.5488 4.35355 37.3536L7.53553 34.1716C7.73079 33.9763 7.73079 33.6597 7.53553 33.4645C7.34027 33.2692 7.02369 33.2692 6.82843 33.4645L4 36.2929L1.17157 33.4645C0.976309 33.2692 0.659727 33.2692 0.464465 33.4645C0.269202 33.6597 0.269202 33.9763 0.464465 34.1716L3.64644 37.3536ZM3.5 -2.18557e-08L3.5 37L4.5 37L4.5 2.18557e-08L3.5 -2.18557e-08Z"
                      fill="var(--white)"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="intro-text"
                tw="w-screen h-screen flex flex-col md:flex-row items-center justify-center"
              >
                <div className="video-container absolute inset-0 w-full h-full">
                  <video
                    className="video"
                    width="1920"
                    height="1080"
                    muted={true}
                    controls={false}
                    poster={WauVideoPoster}
                    loop
                    ref={videoRef}
                    autoPlay
                    playsInline
                  >
                    <source src={WauVideoMp4} type="video/mp4" />
                    {/* <source src={WauVideoWebM} type="video/webm" /> */}
                    Your browser does not support the video tag.
                  </video>
                </div>
                {!!acf?.h1?.length && (
                  <h1 className="absolute max-container-px sm:px-0 flex flex-col md:flex-row items-center justify-center lg:justify-start text-3xl md:text-4xl text-center max-w-lg text-white">
                    {parse(acf.h1)}
                  </h1>
                )}
              </div>
            </StyledIntroContainer>
            <section
              id={lang === 'it' ? 'progetti' : 'projects'}
              className="max-container w-full py-16 flex flex-col gap-8 md:gap-16 items-center"
            >
              <ul className="w-full proj_content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-y-8 m-0">
                {!!filteredProjects && filteredProjects.length > 0 ? (
                  filteredProjects.slice(0, 9).map((proj) => (
                    <li key={`${proj.id}-${proj.slug}`} tw="p-px">
                      <ProjectPreviewCard
                        link={`/${lang === 'it' ? '' : 'en/'}${lang === 'it' ? 'progetti' : 'projects'}/${proj.slug}`}
                        title={proj.title}
                        featuredImage={proj.featuredImage}
                        imgSrc={
                          proj.featuredImage ? proj.featuredImage.node.link : ''
                        }
                        imgAlt={
                          proj.featuredImage
                            ? proj.featuredImage.node.altText
                            : ''
                        }
                        projectdate={
                          proj.ProjectAFC.projectdate
                            ? proj.ProjectAFC.projectdate
                            : null
                        }
                        location={
                          proj.ProjectAFC.location && proj.ProjectAFC.location
                        }
                      />
                    </li>
                  ))
                ) : (
                  <li className="pseudo content">
                    <span className="divider" />
                    <Link to="/progetti" className="block__link no_link">
                      <div className="proj_item-left prog_list-item">
                        <p className="not-found">Nessun progetto trovato</p>
                      </div>
                    </Link>
                  </li>
                )}
              </ul>
              <Button
                as={Link}
                to={lang === 'it' ? '/progetti' : '/en/projects'}
              >
                {lang === 'it'
                  ? 'Scopri tutti i progetti'
                  : 'Explore all projects'}
              </Button>
            </section>
            <section
              id="expertise"
              className="max-container w-full py-16 flex justify-center"
            >
              <GridMaxWidthContainer>
                {acf.sezioneExpertise && (
                  <SectionTextBlock
                    label={acf.sezioneExpertise.titoletto}
                    title={
                      acf.sezioneExpertise.titolo
                        ? acf.sezioneExpertise.titolo
                        : ''
                    }
                    link={acf.sezioneExpertise.tasto.link}
                    cta={acf.sezioneExpertise.tasto.testo}
                    tw="col-span-full mb-10 md:col-span-6"
                  />
                )}
                {expertises && (
                  <Accordion
                    list={expertises}
                    tw="col-span-12 md:col-span-6 md:col-start-7"
                  />
                )}
              </GridMaxWidthContainer>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default HomePageLayout;
