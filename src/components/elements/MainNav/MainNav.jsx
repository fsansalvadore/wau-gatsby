import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import tw, { css } from 'twin.macro';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import { transition, fixedNavbarAnim } from '../../../helpers/framer-defaults';

const Navbar = styled.div(({ isMenuLight }) => [
  css`
    position: fixed;
    z-index: 999;
    height: 80px;
    ${tw`absolute w-full flex items-center justify-between`}
  `,
  isMenuLight &&
    css`
      .menu-icon span,
      .navbar-right a {
        color: var(--white) !important;
      }
    `,
]);

const FixedNavbar = styled(motion.div)(() => [
  css`
    position: fixed;
    z-index: 999;
    height: 80px;
    background: ${({ isOpen }) => (isOpen ? 'transparent' : 'var(--white)')};
    box-shadow: ${({ isOpen }) =>
      isOpen ? 'none' : '1px 0 1px rgba(0, 0, 0, 0.4)'};
    ${tw`fixed w-full flex items-center justify-between`}
  `,
]);

// const WCampLink = motion(Link);

const MenuBtn = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 50px;
  margin-left: 40px;
  height: 50px;
  opacity: 0.8;
  &:hover {
    cursor: pointer !important;
    opacity: 1;
  }
`;

const openBtnVariant = {
  initial: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    display: 'flex',
  },
  hidden: {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  },
};
const closeBtnVariant = {
  initial: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    display: 'flex',
  },
  hidden: {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  },
};

const NavContent = ({ lang, isOpen, toggleMenu, isMenuLight }) => {
  return (
    <nav className="w-full max-w-8xl mx-auto py-0 max-container-px flex items-center justify-between">
      <Link to={lang === 'en' ? '/en/' : '/'}>
        <Logo isMenuLight={isMenuLight} className="max-w-[6rem]" />
      </Link>
      <div tw="flex items-center" className="navbar-right">
        {/* {lang === 'it' && (
          <div tw="opacity-80 hover:opacity-100">
            <WCampLink
              variants={openBtnVariant}
              animate={!isOpen ? 'show' : 'hidden'}
              initial="hidden"
              exit={{ opacity: 0, ...transition }}
              to="/wau-camp"
            >
              WAU Camp
            </WCampLink>
          </div>
        )} */}
        <MenuBtn as="a" onClick={() => toggleMenu(!isOpen)} isOpen={isOpen}>
          <motion.span
            className="menu-icon"
            variants={openBtnVariant}
            animate={!isOpen ? 'show' : 'hidden'}
            initial="hidden"
            exit={{ opacity: 0, ...transition }}
            transition={{ ...transition, duration: 0.4 }}
          >
            <span>Menu</span>
          </motion.span>
          <span tw="opacity-0" aria-hidden="true">
            Menu
          </span>
          {/* <motion.div
            className="close-icon"
            variants={closeBtnVariant}
            animate={isOpen ? 'show' : 'hidden'}
            initial="initial"
            exit={{ opacity: 0, ...transition }}
            transition={{ ...transition, duration: 0.4 }}
          >
            <motion.span />
            <motion.span />
          </motion.div> */}
        </MenuBtn>
      </div>
    </nav>
  );
};

const MainNav = ({ lang, isMenuLight }) => {
  const [isOpen, toggleMenu] = useState(false);
  const [showFixed, setShowFixed] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      if (!isMobileViewport) setIsMobileViewport(window.outerWidth < 768);
      window.addEventListener('resize', () => {
        // your custom logic
        setIsMobileViewport(window.outerWidth < 768);
      });
    }
  }, [isMobileViewport]);

  useEffect(() => {
    if (isOpen) disableBodyScroll(document.body);
    else enableBodyScroll(document.body);
  }, [isOpen]);

  // // Disable scroll when menu is open
  // useEffect(() => {
  //   if (typeof window !== `undefined`) {
  //     if (isOpen) {
  //       document.querySelector("body").style.overflowY = "hidden";
  //     } else {
  //       document.querySelector("body").style.overflowY = "auto";
  //     }
  //   }
  // });

  // Detect scroll direction
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let scrollPos = 0;

      window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (window.scrollY > 80 && st <= scrollPos) {
          setIsScrollUp(false);
          setShowFixed(true);
          // Scrolling down
        } else {
          setIsScrollUp(true);
          setShowFixed(false);
          // Scrolling down
        }
        scrollPos = st <= 0 ? 0 : st;
      });
    }
  }, [setIsScrollUp, setShowFixed]);

  // Close menu with Esc key and clicking outside
  useEffect(() => {
    if (typeof window !== `undefined`) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          toggleMenu(false);
        }
      });
      if (document.querySelector('#dim-overlay')) {
        document.querySelector('#dim-overlay').addEventListener('click', () => {
          toggleMenu(false);
        });
      }
    }
  });

  return (
    <>
      <Navbar
        className={isOpen ? 'pointer-events-none' : ''}
        isMenuLight={isMenuLight}
      >
        <NavContent
          lang={lang}
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          isMenuLight={(isOpen && isMobileViewport) || isMenuLight}
        />
      </Navbar>
      <FixedNavbar
        className={isOpen ? 'pointer-events-none' : ''}
        variants={fixedNavbarAnim}
        initial={{ y: -80 }}
        animate={!isScrollUp && showFixed ? 'show' : 'hidden'}
        transition={transition}
        isOpen={isOpen}
      >
        <NavContent
          lang={lang}
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          isMenuLight={isOpen && isMobileViewport}
        />
      </FixedNavbar>
      <Menu lang={lang} isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default MainNav;
