import { Link, useStaticQuery, graphql } from 'gatsby';
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import SocialIcons from '../SocialIcons/SocialIcons';
import Logo from '../Logo/Logo';
import GridMaxWidthContainer from './GridMaxWidthContainer';

// eslint-disable-next-line import/no-default-export
const Footer = ({ lang }) => {
  const data = useStaticQuery(graphql`
    query GET_FOOTERMENU_BY_NAME {
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
          email {
            email
            emailDisplay
          }
          telefono {
            telefono
            telefonoDisplay
          }
          certificazioni {
            imgIso {
              sourceUrl
            }
            imgEspertoCam {
              sourceUrl
            }
          }
        }
      }
    }
  `);

  const [socialMenu, setSocialMenu] = useState(null);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setSocialMenu(data.menus.nodes.find((node) => node.name === 'Social'));
    }
  }, [data.menus.nodes]);

  console.log('socialMenu', socialMenu);

  const footerData = {
    email: {
      email: data.globals.globalsACF.email.email ?? 'info@wauarchitetti.com',
      display:
        data.globals.globalsACF.email.emailDisplay ?? 'info@wauarchitetti.com',
    },
    tel: {
      telefono: data.globals.globalsACF.telefono.telefono ?? '+3901119171909',
      display:
        data.globals.globalsACF.telefono.telefonoDisplay ?? '011 1917 1909',
    },
  };

  return (
    <StyledFooter>
      <GridMaxWidthContainer>
        <div tw="col-span-12 text-center xl:col-span-5 xl:text-left">
          <Link to={lang === 'it' ? '/' : '/en'}>
            <Logo className="max-w-20" color="var(--green)" />
          </Link>
          <div tw="mt-6 text-sm">
            <p tw="inline mr-4 text-sm opacity-80">
              WAU ARCHITETTI SRL Società di Ingegneria
            </p>
            <p tw="opacity-80">P.IVA 12437940013</p>
            <p tw="block">
              <a
                href="https://www.google.com/maps/place/WAU/@45.0702929,7.6850724,17z/data=!3m1!4b1!4m5!3m4!1s0x47886d70758553ef:0x8d4b755f8f78c8db!8m2!3d45.0702929!4d7.6872611"
                className="hover:underline"
              >
                Via Po, 1 - Torino - 10124 Italia
              </a>
            </p>
            <ul>
              <li>
                <a
                  href={`mailto:${footerData.email.email}`}
                  className="hover:underline"
                >
                  {footerData.email.display}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerData.tel.telefono}`}
                  className="hover:underline"
                >
                  {footerData.tel.display}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-list">
          <ul>
            {lang === 'it'
              ? data.menus.nodes
                  .find((node) => node.name === 'Menu ita')
                  .menuItems.nodes.map((item) => (
                    <li key={item.id}>
                      <Link to={item.path.replace('/dev/wau/wp', '')}>
                        {item.label}
                      </Link>
                    </li>
                  ))
              : data.menus.nodes
                  .find((node) => node.name === 'Menu eng')
                  .menuItems.nodes.map((item) => (
                    <li key={item.id}>
                      <Link to={item.path.replace('/dev/wau/wp', '')}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
          </ul>
        </div>
        <div
          className="footer-list"
          tw="col-span-12 md:col-span-4! xl:col-span-2"
        >
          <ul className="flex flex-col gap-2">
            <li>{lang === 'it' ? 'Certificazioni' : 'Certifications'}</li>
            <li className="flex gap-4 justify-center md:justify-start">
              {data.globals.globalsACF.certificazioni?.imgIso && (
                <img
                  className="w-auto h-8"
                  src={data.globals.globalsACF.certificazioni?.imgIso.sourceUrl}
                  alt="ISO"
                />
              )}
              {data.globals.globalsACF.certificazioni?.imgEspertoCam && (
                <img
                  className="w-auto h-8"
                  src={
                    data.globals.globalsACF.certificazioni?.imgEspertoCam
                      .sourceUrl
                  }
                  alt="Esperto Cam"
                />
              )}
            </li>
          </ul>
        </div>
        {/* <div
          className="footer-list"
          tw="col-span-12 md:col-span-4! xl:col-span-2"
        >
          <h5>{lang === 'it' ? 'Seguici' : 'Follow us'}</h5>
          {!!socialMenu && (
            <SocialIcons menu={socialMenu} hasGrid spacing="false" />
          )}
        </div> */}
        <div className="footer-lang-container col-span-12 md:col-span-3 xl:col-span-3 flex justify-center md:justify-end">
          <ul tw="flex flex-col gap-2 text-sm md:text-right w-full md:items-end">
            <li className="w-full">
              <a href="/">ITA</a>
            </li>
            <li className="w-full">
              <a href="/en">ENG</a>
            </li>
          </ul>
        </div>
        <hr tw="col-span-full my-8 opacity-50" />
        <div className="footer-inline-list text-sm col-span-12 text-center xl:text-left xl:col-span-6 flex justify-center xl:justify-start sm:items-center flex-wrap">
          <span className="mr-1.5">
            {lang === 'it' ? 'Seguici su ' : 'Follow us on '}
          </span>
          {socialMenu?.menuItems?.nodes?.map((social, i) => (
            <Fragment key={social.id}>
              <a
                href={social.url}
                rel="noreferrer"
                target="_blank"
                className="!p-0 !m-0 hover:underline"
              >
                {social.label.charAt(0).toUpperCase() + social.label.slice(1)}
              </a>
              {socialMenu?.menuItems?.nodes?.length !== i + 1 && (
                <span className="text-xs px-1">/</span>
              )}
            </Fragment>
          ))}
        </div>
        <div
          tw="col-span-12 text-center mt-6 xl:mt-0 xl:text-right xl:col-span-6 flex items-center justify-center xl:justify-end"
          className="footer-inline-list"
        >
          <p tw="inline mr-4 text-sm opacity-80">
            © Copyright {new Date().getFullYear()}
          </p>
          <Link
            className="text-sm hover:underline opacity-80"
            to={lang === 'it' ? '/privacy-policy' : '/en/privacy-policy'}
          >
            Privacy Policy
          </Link>
        </div>
      </GridMaxWidthContainer>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer(() => [
  css`
    ${tw`relative z-40 w-full flex items-center py-8 px-4`}
    background: var(--white);
    color: var(--black);

    h5 {
      ${tw`opacity-40 text-xs mb-4`}
    }

    a {
      ${tw`opacity-80 hover:opacity-100 visited:text-black text-black`}
    }
    .footer-list {
      ${tw`col-span-12 md:col-span-3 xl:col-span-2! text-center md:text-left my-2`}

      li {
        ${tw`text-sm mb-2`}
      }
    }

    .footer-lang-container {
      ${tw`w-full text-center md:text-left mt-4 md:mt-0`}
    }

    .footer-inline-list {
      li {
        ${tw`opacity-60 hover:opacity-100 text-sm inline-block mr-4`}
      }
    }
  `,
]);

export default Footer;
