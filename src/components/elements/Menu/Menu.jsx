import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import tw from 'twin.macro';
import { transition } from '../../../helpers/framer-defaults';

import LanguageSelector from '../LanguageSelector';
import SocialIcons from '../SocialIcons/SocialIcons';

const MenuContainer = styled(motion.div)`
  ${tw`fixed w-screen h-screen z-[101]`}
`;
const MenuSlider = styled(motion.div)`
  min-height: 550px;
  z-index: 99;
  background: linear-gradient(
    317.03deg,
    var(--green) -33.22%,
    var(--purple) 78.8%
  );
  will-change: width, transform;
  transition: width 0.3s ease;
  ${tw`absolute w-full overflow-y-scroll h-full right-0 top-0 bottom-0 flex flex-col justify-between px-4 pt-12 pb-20 sm:p-8 md:p-16`}

  * {
    color: var(--white);
  }

  .menu-top {
    ${tw`mt-8`}
    flex: 1;
    display: flex;
    align-items: center;
    max-height: 70vh;

    a {
      ${tw`text-2xl p-[2px 0] sm:p-[5px 0] lg:text-3xl block`}
      line-height: 2rem;
      opacity: 0.3;
      transition:
        opacity 0.15s ease,
        padding 0.2s ease;
      will-change: opacity;

      &:hover {
        opacity: 1;
      }

      &.active-menuLink {
        padding-left: 20px;
        display: flex;
        align-items: center;
        position: relative;
        opacity: 0.9;

        &:before {
          content: '';
          width: 6px;
          height: 6px;
          position: absolute;
          background-color: var(--white);
          left: 0;
          border-radius: 50%;
        }
      }
    }
  }

  .menu-bottom {
    display: flex;
    flex-direction: column;
    ${tw`my-8 bottom-8 lg:bottom-auto lg:relative`}

    .lang-container {
      display: flex;
      align-items: flex-end;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      ${tw`w-[60%]`}
    }

    .menu-top {
      max-height: auto;

      a {
        line-height: 2.4rem;
      }
    }

    .menu-bottom {
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

export const DimOverlay = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  display: none;
`;

const sliderVariants = {
  initial: {
    x: '100%',
  },
  show: {
    x: 0,
  },
  hidden: {
    x: '100%',
  },
};

export const menuContainer = {
  initial: {
    display: 'none',
  },
  hidden: {
    display: 'block',
    delay: 0.4,
    transitionEnd: {
      display: 'none',
    },
  },
  show: {
    display: 'block',
  },
};

export const menuDim = {
  initial: {
    opacity: 0,
    display: 'none',
  },
  hidden: {
    opacity: 0,
    display: 'block',
    transitionEnd: {
      display: 'none',
    },
  },
  show: {
    opacity: 1,
    display: 'block',
  },
};

const Menu = ({ lang, isOpen }) => {
  const data = useStaticQuery(graphql`
    query GET_MENU_BY_NAME {
      menus: allWpMenu {
        nodes {
          count
          name
          menuItems {
            nodes {
              id
              databaseId
              title
              url
              cssClasses
              description
              label
              linkRelationship
              target
              parentId
              path
            }
          }
        }
      }
      globals: wpPage(title: { eq: "Globals" }) {
        title
        globalsACF {
          telefono {
            telefono
            telefonoDisplay
          }
          indirizzo {
            indirizzo
            url
          }
        }
      }
    }
  `);

  const [location, setLocation] = useState('');
  const [socialMenu, setSocialMenu] = useState(null);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setLocation(window.location.href);
    }
  }, [setLocation]);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setSocialMenu(data.menus.nodes.find((node) => node.name === 'Social'));
    }
  }, [data.menus.nodes]);

  const menuData = {
    tel: {
      telefono: data.globals.globalsACF.telefono.telefono ?? '+3901119171909',
      display:
        data.globals.globalsACF.telefono.telefonoDisplay ?? '011 1917 1909',
    },
    indirizzo: {
      url:
        data.globals.globalsACF.indirizzo.url ??
        'https://www.google.com/maps/place/Via+Po,+1,+10124+Torino+TO/data=!4m2!3m1!1s0x47886d7075788f65:0xfbab35a5fc5276c2?sa=X&ved=2ahUKEwjD8czu4onuAhXJ5KQKHc0nCyUQ8gEwAHoECAYQAQ',
      indirizzo:
        data.globals.globalsACF.indirizzo.indirizzo ??
        'Via Po, 1 - 10124 Torino, Italia',
    },
  };

  return (
    <MenuContainer
      variants={menuContainer}
      animate={isOpen ? 'show' : 'hidden'}
      initial="initial"
      exit="hidden"
      transition={{ ...transition, duration: 0.4 }}
    >
      <MenuSlider
        variants={sliderVariants}
        animate={isOpen ? 'show' : 'hidden'}
        initial="initial"
        transition={{ ...transition, duration: 0.4 }}
      >
        <div className="menu-top">
          <ul>
            {lang === 'it'
              ? data.menus.nodes
                  .find((node) => node.name === 'Menu ita')
                  .menuItems.nodes.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.path.replace('/dev/wau/wp', '')}
                        activeClassName="active-menuLink"
                        className={
                          location.includes(item.label.toLowerCase())
                            ? 'active-menuLink'
                            : ''
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))
              : data.menus.nodes
                  .find((node) => node.name === 'Menu eng')
                  .menuItems.nodes.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.path.replace('/dev/wau/wp', '')}
                        activeClassName="active-menuLink"
                        className={
                          location.includes(item.label.toLowerCase())
                            ? 'active-menuLink'
                            : ''
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
          </ul>
        </div>
        <div className="menu-bottom">
          <div className="menu-bottom-info">
            <div className="menu-footer-info">
              <h3>WAU ARCHITETTI</h3>
              <div tw="opacity-70 text-sm mb-8 pt-2">
                <a
                  target="_blank"
                  href={menuData.indirizzo.url}
                  rel="noreferrer"
                >
                  {menuData.indirizzo.indirizzo}
                </a>
                <p>
                  T{' '}
                  <a href={`tel:${menuData.tel.telefono}`}>
                    {menuData.tel.display}
                  </a>
                </p>
              </div>
            </div>
            <div className="social-icons">
              <SocialIcons menu={socialMenu} />
            </div>
          </div>
          <div className="lang-container" tw="mt-4 lg:mt-0">
            <LanguageSelector />
          </div>
        </div>
      </MenuSlider>
      <DimOverlay
        id="dim-overlay"
        variants={menuDim}
        initial="initial"
        animate={isOpen ? 'show' : 'hidden'}
        transition={{ ...transition, duration: 0.4 }}
      />
    </MenuContainer>
  );
};

// eslint-disable-next-line import/no-default-export
export default Menu;
