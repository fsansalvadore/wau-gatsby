import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import 'twin.macro';
import Layout from '../../LayoutComponent';
import Heading from '../../elements/Heading/Heading';
import HeadingIntroHalf from '../../elements/Heading/HeadingIntroHalf';
import GridMaxWidthContainer from '../../elements/Atoms/GridMaxWidthContainer';
import ArticlePreviewCard from '../../elements/Articles/ArticlePreviewCard';

const ArticlesPageLayout = ({ data, lang }) => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (data) {
      setPage(data.pages.nodes[0]);
    }
  }, [data, setPage]);

  const sortedArticles = data.articles?.nodes?.sort((a, b) =>
    a.date < b.date ? 1 : -1
  );

  return (
    <Layout>
      <Helmet>
        <title>{lang === 'it' ? 'Notizie' : 'News'} • WAU Architetti</title>
      </Helmet>
      <div className="max-container">
        <Heading>
          <HeadingIntroHalf
            breadcrumb={page && page.pagesACF && page.pagesACF.titoletto}
            heading={page && page.pagesACF && page.pagesACF.title}
            subheading={page && page.pagesACF && page.pagesACF.introduzione}
          />
        </Heading>
        <section tw="w-full flex justify-center">
          <GridMaxWidthContainer>
            <hr className="col-span-12 bg-black" />
            {data && (
              <ul tw="col-span-12 lg:col-span-9 lg:col-start-4 pb-8 md:pb-16">
                {data.articles && data.articles.nodes.length > 0 ? (
                  sortedArticles?.map((article, index) => (
                    <li
                      key={`exp-${article.id}-${article.slug}-${Math.floor(
                        Math.random() * (100 - 999) + 100
                      )}`}
                    >
                      <ArticlePreviewCard
                        article={article}
                        isLast={index === sortedArticles.length - 1}
                      />
                    </li>
                  ))
                ) : (
                  <li>
                    <p className="not-found">
                      {lang === 'it'
                        ? 'Nessun articolo trovato.'
                        : 'No article found.'}
                    </p>
                  </li>
                )}
              </ul>
            )}
          </GridMaxWidthContainer>
        </section>
      </div>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default ArticlesPageLayout;
