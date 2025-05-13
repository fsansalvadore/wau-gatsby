import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../LayoutComponent';
import Heading from '../../elements/Heading/Heading';
import HeadingIntroHalf from '../../elements/Heading/HeadingIntroHalf';
import TeamMemberCard from '../../elements/Team/TeamMemberCard';
import GridMaxWidthContainer from '../../elements/Atoms/GridMaxWidthContainer';
import { MemberModal } from './MemberModal';

const TeamPageLayout = ({ data, lang }) => {
  const [founders, setFounders] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeMember, setActiveMember] = useState(null);
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (data) {
      setPage(data.pages.nodes[0]);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.team_members) {
      setFounders(
        data.team_members.nodes
          .filter((member) => !!member.teamMemberAFC.founder)
          .sort((a, b) =>
            a.date < b.date
              ? 1
              : a.date === b.date
                ? a.title > b.title
                  ? 1
                  : -1
                : -1
          )
      );
      setTeamMembers(
        data.team_members.nodes
          .filter((member) => !member.teamMemberAFC.founder)
          .sort((a, b) =>
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
  }, [data]);

  return (
    <Layout>
      <Helmet>
        <title>WAU Architetti • Team</title>
      </Helmet>
      <div className="bg-white">
        <MemberModal
          activeMember={activeMember}
          isOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
        <Heading className="max-container">
          <HeadingIntroHalf
            breadcrumb={page && page.pagesACF && page.pagesACF.titoletto}
            heading={page && page.pagesACF && page.pagesACF.title}
            subheading={page && page.pagesACF && page.pagesACF.introduzione}
          />
        </Heading>
        <section className="max-container">
          <GridMaxWidthContainer className="my-4 lg:mb-16 lg:mt-0">
            <hr className="col-span-12 mb-8 lg:mb-16" />
            <h2 className="col-span-12 text-3xl md:text-5xl">
              {lang === 'it' ? 'Soci' : 'Founders'}
            </h2>
            <ul className="team_content col-span-12 grid grid-cols-2 lg:grid-cols-4 mt-8 lg:mt-16">
              {founders && founders.length > 0 ? (
                founders.map((member) => (
                  <li
                    key={`team-${Math.floor(
                      Math.random() * (100 - 999) + 100
                    )}`}
                    className="p-px"
                  >
                    <TeamMemberCard
                      title={member.title}
                      featuredImage={member.featuredImage}
                      date={member.date}
                      afc={member.teamMemberAFC}
                      setModalIsOpen={setModalIsOpen}
                      setActiveMember={setActiveMember}
                      member={member}
                      lang={lang}
                    />
                  </li>
                ))
              ) : (
                <li className="">
                  <span className="divider" />
                  <div className="">
                    <p className="not-found">Nessun founder trovato</p>
                  </div>
                </li>
              )}
            </ul>
          </GridMaxWidthContainer>
        </section>
        <section className="max-container">
          <GridMaxWidthContainer className="my-4 lg:my-8">
            <hr className="col-span-12 mb-8 lg:mb-16" />
            <h2 className="col-span-12 text-3xl md:text-5xl">
              {lang === 'it' ? 'Team operativo' : 'Operations Team'}
            </h2>
            <ul className="team_content col-span-12 grid grid-cols-2 lg:grid-cols-4 mt-8 lg:mt-16">
              {teamMembers && teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <li
                    key={`team-${Math.floor(
                      Math.random() * (100 - 999) + 100
                    )}`}
                    className="p-px"
                  >
                    <TeamMemberCard
                      title={member.title}
                      featuredImage={member.featuredImage}
                      date={member.date}
                      afc={member.teamMemberAFC}
                      setModalIsOpen={setModalIsOpen}
                      setActiveMember={setActiveMember}
                      member={member}
                      lang={lang}
                    />
                  </li>
                ))
              ) : (
                <li className="">
                  <span className="divider" />
                  <div className="">
                    <p className="not-found">
                      Nessun componente del team trovato
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </GridMaxWidthContainer>
        </section>
      </div>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default TeamPageLayout;
