import { Link, useStaticQuery, graphql } from 'gatsby';
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
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
          indirizzo {
            indirizzo
            url
          }
          certificazioni {
            imgIso {
              sourceUrl
            }
            imgEspertoCam {
              sourceUrl
            }
          }
          societa
          societaEsteso
          partitaIva
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
    indirizzo: {
      indirizzo:
        data.globals.globalsACF.indirizzo.indirizzo ??
        'Via Po, 1 - Torino - 10124 Italia',
      url:
        data.globals.globalsACF.indirizzo.url ??
        'https://www.google.com/maps/place/WAU/@45.0702929,7.6850724,17z/data=!3m1!4b1!4m5!3m4!1s0x47886d70758553ef:0x8d4b755f8f78c8db!8m2!3d45.0702929!4d7.6872611',
    },
    partitaIva: data.globals.globalsACF.partitaIva ?? '12437940013',
    societa:
      data.globals.globalsACF.societaEsteso ??
      'WAU ARCHITETTI SRL Società di Ingegneria',
  };

  return (
    <StyledFooter className="max-container">
      <GridMaxWidthContainer className="py-8 border-t border-t-black">
        <div tw="col-span-12 lg:col-span-5 py-2">
          <Link to={lang === 'it' ? '/' : '/en'}>
            <Logo className="max-w-20 h-10" color="var(--green)" />
          </Link>
          <div tw="mt-6 text-sm">
            <p tw="inline mr-4 text-sm opacity-80">{footerData.societa}</p>
            <p tw="opacity-80">P.IVA {footerData.partitaIva}</p>
            <p tw="block">
              <a
                href="https://www.google.com/maps/place/WAU/@45.0702929,7.6850724,17z/data=!3m1!4b1!4m5!3m4!1s0x47886d70758553ef:0x8d4b755f8f78c8db!8m2!3d45.0702929!4d7.6872611"
                className="hover:!opacity-50 transition-opacity"
              >
                {footerData.indirizzo.indirizzo}
              </a>
            </p>
            <ul>
              <li>
                <a
                  href={`mailto:${footerData.email.email}`}
                  className="hover:!opacity-50 transition-opacity"
                >
                  {footerData.email.display}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerData.tel.telefono}`}
                  className="hover:!opacity-50 transition-opacity"
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
                      <Link
                        className="hover:!opacity-50 transition-opacity"
                        to={item.path.replace('/dev/wau/wp', '')}
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
                        className="hover:!opacity-50 transition-opacity"
                        to={item.path.replace('/dev/wau/wp', '')}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
          </ul>
        </div>
        <div
          className="footer-list"
          tw="col-span-12 md:col-span-4! lg:col-span-2"
        >
          <ul className="flex flex-col gap-2">
            <li>{lang === 'it' ? 'Certificazioni' : 'Certifications'}</li>
            <li className="flex gap-8 justify-start">
              {data.globals.globalsACF.certificazioni?.imgIso && (
                <img
                  className="w-auto h-12"
                  src={data.globals.globalsACF.certificazioni?.imgIso.sourceUrl}
                  alt="ISO"
                />
              )}
              {data.globals.globalsACF.certificazioni?.imgEspertoCam && (
                <img
                  className="w-auto h-12"
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
        <div className="footer-lang-container col-span-12 md:col-span-3 lg:col-span-3 flex justify-start md:justify-end">
          <ul tw="flex gap-2 text-sm md:text-right w-full md:justify-end">
            <li className="">
              <a className="hover:!opacity-50 transition-opacity" href="/">
                ITA
              </a>
            </li>
            <span>|</span>
            <li className="">
              <a className="hover:!opacity-50 transition-opacity" href="/en">
                ENG
              </a>
            </li>
          </ul>
        </div>
        <hr tw="col-span-full my-8 opacity-50" />
        <div className="footer-inline-list text-sm col-span-12 text-left lg:col-span-6 flex justify-start sm:items-center flex-wrap">
          <span className="mr-1.5">
            {lang === 'it' ? 'Seguici su ' : 'Follow us on '}
          </span>
          {socialMenu?.menuItems?.nodes?.map((social, i) => (
            <Fragment key={social.id}>
              <a
                href={social.url}
                rel="noreferrer"
                target="_blank"
                className="!p-0 !m-0 hover:!opacity-50 transition-opacity"
              >
                {getSocialLabel(social)}
              </a>
              {socialMenu?.menuItems?.nodes?.length !== i + 1 && (
                <span className="text-xs px-1">/</span>
              )}
            </Fragment>
          ))}
        </div>
        <div
          tw="col-span-12 mt-6 lg:mt-0 lg:text-right lg:col-span-6 flex items-center justify-start lg:justify-end"
          className="footer-inline-list"
        >
          <p tw="inline mr-4 text-sm opacity-80">
            © Copyright {new Date().getFullYear()}
          </p>
          <Link
            className="text-sm hover:!opacity-50 transition-opacity opacity-80"
            to={lang === 'it' ? '/privacy-policy' : '/en/privacy-policy'}
          >
            Privacy Policy
          </Link>
        </div>
      </GridMaxWidthContainer>
    </StyledFooter>
  );
};

export function getSocialLabel(social) {
  let label = social.label.charAt(0).toUpperCase() + social.label.slice(1);

  if (label === 'Linkedin') {
    label = 'LinkedIn';
  }

  return label;
}

const StyledFooter = styled.footer(() => [
  css`
    ${tw`relative z-40 w-full flex items-center`}
    background: var(--white);
    color: var(--black);

    h5 {
      ${tw`opacity-40 text-xs mb-4`}
    }

    a {
      ${tw`opacity-80 hover:opacity-100 visited:text-black text-black`}
    }
    .footer-list {
      ${tw`col-span-12 md:col-span-3 lg:col-span-2! my-2`}

      li {
        ${tw`text-sm mb-2`}
      }
    }

    .footer-lang-container {
      ${tw`w-full mt-4 md:my-2`}
    }

    .footer-inline-list {
      li {
        ${tw`opacity-60 hover:opacity-100 text-sm inline-block mr-4`}
      }
    }
  `,
]);

export default Footer;
