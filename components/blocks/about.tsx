'use client';
import React from 'react';

import type { Template } from 'tinacms';
import { PageBlocksAbout } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { Section } from '../layout/section';
import { getSectionId } from '@/lib/utils';

export const About = ({ data }: { data: PageBlocksAbout }) => {
  return (
    <Section
      id={getSectionId(data.sectionId, data.title)}
      title={data.title}
      data-tina-field={tinaField(data, 'title')}
    >
      <div className="max-w-[72ch] text-lg leading-relaxed md:text-xl [&>p+p]:mt-4 md:[&>p+p]:mt-5" data-tina-field={tinaField(data, 'body')}>
        <TinaMarkdown content={data.body} />
      </div>
    </Section>
  );
};

export const aboutBlockSchema: Template = {
  name: 'about',
  label: 'About',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      title: 'About',
      body: {
        type: 'root',
        children: [
          {
            type: 'p',
            children: [
              {
                type: 'text',
                text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
              },
            ],
          },
        ],
      },
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Section ID',
      name: 'sectionId',
      description:
        'Optional stable anchor id for nav links. Falls back to a slug from the title.',
    },
    {
      type: 'rich-text',
      label: 'Body',
      name: 'body',
    },
  ],
};
