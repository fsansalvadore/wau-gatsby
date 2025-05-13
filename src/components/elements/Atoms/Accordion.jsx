import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import { Collapse } from 'antd';
import { Link } from 'gatsby';
import Button from './Button';

const { Panel } = Collapse;

// eslint-disable-next-line import/no-default-export
const Accordion = ({ list = [], ...otherProps }) => {
  const [lang, setLang] = useState('it');

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const location = window.location.href;
      if (
        location.includes('00/en') ||
        location.includes('app/en') ||
        location.includes('com/en')
      ) {
        setLang('en');
      }
    }
  }, [lang]);

  return (
    <StyledAccordion {...otherProps}>
      {list && list.length > 0 && (
        <Collapse accordion>
          {list.map((item, index) => (
            <Panel
              header={item.title}
              key={index}
              // showArrow={false}
              tw="!border-0 !border-t !rounded-none last:!border-b !border-black !py-2 !text-xl md:!text-2xl !cursor-pointer !opacity-90 hover:!opacity-100"
            >
              <div className="!pb-4 pt-2 !text-base">
                <p className="mb-4">{item.expertiseACF.anteprima}</p>
                <Button
                  as={Link}
                  to={
                    lang === 'it'
                      ? `/expertise/${item.slug}`
                      : `/en/expertise/${item.slug}`
                  }
                >
                  {lang === 'it' ? 'Approfondisci' : 'Explore'}
                </Button>
              </div>
            </Panel>
          ))}
        </Collapse>
      )}
    </StyledAccordion>
  );
};

const StyledAccordion = styled.div(() => [
  css`
    ${tw`!border-none`}
    * {
      outline: none !important;
      box-shadow: none !important;
    }

    .ant-collapse {
      font-family: 'Montserrat', Helvetica, sans-serif;
      ${tw`border-none bg-transparent text-black`}
    }
    .ant-collapse-content {
      ${tw`!bg-transparent text-black !border-none`}
    }

    .ant-collapse-header {
      position: relative !important;
      ${tw`!p-0 flex-row-reverse !items-center !text-black`}
    }
    .ant-collapse-header-text {
      ${tw`text-black`}
    }

    .ant-collapse-content-box {
      ${tw`!p-0 !border-none`}
    }

    // Antd accordion css
    .ant-motion-collapse-legacy {
      overflow: hidden;
    }
    .ant-motion-collapse-legacy-active {
      -webkit-transition:
        height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
        opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
      transition:
        height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
        opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    }
    .ant-motion-collapse {
      overflow: hidden;
      -webkit-transition:
        height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
        opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
      transition:
        height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
        opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    }
    .ant-alert.ant-alert-motion-leave {
      overflow: hidden;
      opacity: 1;
      -webkit-transition:
        max-height 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        padding-top 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        padding-bottom 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        margin-bottom 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      transition:
        max-height 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        padding-top 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        padding-bottom 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        margin-bottom 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
    .ant-alert.ant-alert-motion-leave-active {
      max-height: 0;
      margin-bottom: 0 !important;
      padding-top: 0;
      padding-bottom: 0;
      opacity: 0;
    }
    .ant-select-arrow .anticon {
      vertical-align: top;
      -webkit-transition: -webkit-transform 0.3s;
      transition: -webkit-transform 0.3s;
      transition: transform 0.3s;
      transition:
        transform 0.3s,
        -webkit-transform 0.3s;
    }
    .ant-collapse-content-hidden {
      display: none;
    }
  `,
]);

export default Accordion;
