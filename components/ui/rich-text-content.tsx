"use client";

import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Mermaid } from "@/components/blocks/mermaid";

type RichTextContentProps = {
  content: any;
  className?: string;
};

export const richTextContentClassName =
  "max-w-[72ch] text-base leading-relaxed [&>p+p]:mt-5 [&>h1]:mt-12 [&>h1]:text-4xl [&>h1]:font-semibold [&>h1]:leading-tight [&>h2]:mt-10 [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:leading-tight [&>h3]:mt-5 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:leading-snug [&>h4]:mt-3 [&>h4]:text-xl [&>h4]:font-semibold [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ol]:mt-4 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-6 [&>blockquote]:mt-6 [&>blockquote]:border-l-2 [&>blockquote]:border-border [&>blockquote]:pl-4 [&>blockquote]:italic [&>hr]:my-10 [&>hr]:border-border [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-teal-700 dark:[&_a:hover]:text-teal-400";

export const RichTextContent = ({ content, className }: RichTextContentProps) => {
  return (
    <div className={className ?? richTextContentClassName}>
      <TinaMarkdown
        content={content}
        components={{
          mermaid: (props: any) => <Mermaid {...props} />,
        }}
      />
    </div>
  );
};
