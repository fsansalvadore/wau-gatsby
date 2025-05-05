import React from 'react';
import tw, { css } from 'twin.macro';
import { Helmet } from 'react-helmet';
import parse from 'html-react-parser';
import styled from 'styled-components';
import Layout from '../../LayoutComponent';
import Heading from '../../elements/Heading/Heading';
import SocialIcons from '../SocialIcons/SocialIcons';
import ContactForm from './Form/ContactForm';

const StyledContactsPageLayout = styled.div(() => [
  css`
    .map-info-card {
      background: var(--white);
      color: var(--black);

      h3 {
        ${tw`mb-6 text-lg`}
      }
      > div {
        ${tw`mb-4`}
      }
    }
  `,
]);

const ContactsPageLayout = ({ data, socials, lang }) => {
  return (
    <Layout hasNoContactsCta>
      <Helmet>
        <title>
          {data.title ? `${data.title}` : 'Contacts'} · WAU Architetti
        </title>
      </Helmet>
      <StyledContactsPageLayout className="max-container">
        <Heading tw="md:flex">
          <div tw="w-full md:w-2/3 mb-8 flex flex-col justify-between">
            <div tw="mb-16">
              {data.pagesACF.titoletto && (
                <p className="breadcrumbs mono">{data.pagesACF.titoletto}</p>
              )}
              {data.pagesACF.title && (
                <h1 tw="w-full md:w-3/4">{data.pagesACF.title}</h1>
              )}
              {data.pagesACF.introduzione && (
                <p tw="w-full md:w-3/4">{data.pagesACF.introduzione}</p>
              )}
            </div>
            <div>{<SocialIcons menu={socials} isDark />}</div>
          </div>
          <div tw="w-full md:w-1/3 mb-4 md:mb-8">
            {data.contactsACF &&
              data.contactsACF.emails &&
              Object.entries(data.contactsACF.emails).map((item) => (
                <div
                  className="contacts-email"
                  tw="mb-4 md:mb-8 lg:mb-12"
                  key={`email-${Math.floor(
                    Math.random() * (100 - 999) + 100
                  )}00`}
                >
                  <p tw="text-sm opacity-60">{item[1]['etichetta']}</p>
                  <a tw="text-lg mt-2" href={`mailto:${item[1]['email']}`}>
                    {item[1]['email']}
                  </a>
                </div>
              ))}
          </div>
        </Heading>
        <section
          id="map"
          tw="relative h-[600px] w-full flex items-center justify-center overflow-hidden"
        >
          <iframe
            src={
              data.contactsACF?.map?.embedurl ??
              'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.7642671039725!2d7.684680812116458!3d45.070292870949636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d70758553ef%3A0x8d4b755f8f78c8db!2sWau%20Architetti!5e0!3m2!1sen!2ses!4v1746477585067!5m2!1sen!2ses'
            }
            tw="absolute w-full h-full border-0 z-0"
            allowFullScreen=""
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="WAU Architetti location"
          />
        </section>
        <section id="contact-form" tw="py-8 py-16 md:py-16 lg:py-40 lg:flex">
          {data.contactsACF.form && (
            <div tw="w-full lg:w-1/2 mb-8">
              {data.contactsACF.form.titolo && (
                <h2 tw="w-full xl:w-3/5 text-3xl md:text-4xl mb-4 md:mb-8">
                  {data.contactsACF.form.titolo}
                </h2>
              )}
              {data.contactsACF.form.sottotitolo && (
                <p tw="w-full lg:w-3/4">
                  {parse(data.contactsACF.form.sottotitolo)}
                </p>
              )}
            </div>
          )}
          <div tw="w-full lg:w-1/2 xl:w-1/3">
            <ContactForm lang={lang} />
            <form
              name="contatti"
              method="POST"
              type="hidden"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              tw="invisible h-0 absolute left-[9999px]"
            >
              <input type="hidden" name="form-name" value="contatti" />
              <input type="email" name="email" required />
              <input type="text" name="nome" required />
              <textarea name="messaggio" required />
              <button
                type="submit"
                tw="w-full text-center flex justify-center opacity-80 hover:opacity-100 cursor-pointer"
              >
                Invia
              </button>
            </form>
          </div>
        </section>
      </StyledContactsPageLayout>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default ContactsPageLayout;
