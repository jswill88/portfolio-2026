'use client';
import React from 'react';

import type { Template } from 'tinacms';
import { PageBlocksContent } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { RichTextContent } from '../ui/rich-text-content';
import { getSectionId } from '@/lib/utils';

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <Section id={getSectionId(data.sectionId)} data-tina-field={tinaField(data, 'body')}>
      <RichTextContent content={data.body} />
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: 'content',
  label: 'Content',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Section ID',
      name: 'sectionId',
      description: 'Optional stable anchor id for nav links.',
    },
    {
      type: 'rich-text',
      label: 'Body',
      name: 'body',
    },
  ],
};
