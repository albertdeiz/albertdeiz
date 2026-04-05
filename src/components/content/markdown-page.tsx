import Markdown from "react-markdown";
import type { ReactElement, ComponentProps } from "react";

const components = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="text-3xl font-bold text-primary mt-10 mb-4 leading-tight" {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="text-2xl font-semibold text-primary mt-8 mb-3 leading-snug" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="text-xl font-semibold text-primary mt-6 mb-2" {...props} />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4 className="text-lg font-medium text-primary mt-4 mb-1" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="text-base text-foreground leading-7 mb-4" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="list-disc list-outside pl-6 mb-4 space-y-1 text-foreground" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="list-decimal list-outside pl-6 mb-4 space-y-1 text-foreground" {...props} />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="text-base leading-7" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      className="text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-primary" {...props} />
  ),
  em: (props: ComponentProps<"em">) => (
    <em className="italic text-muted-foreground" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-border pl-4 my-4 text-muted-foreground italic"
      {...props}
    />
  ),
  hr: (props: ComponentProps<"hr">) => (
    <hr className="border-border my-8" {...props} />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      className="bg-muted text-primary font-mono text-sm px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="bg-muted text-foreground font-mono text-sm rounded-lg p-4 overflow-x-auto my-4"
      {...props}
    />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  thead: (props: ComponentProps<"thead">) => (
    <thead className="border-b border-border" {...props} />
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      className="text-left font-semibold text-primary px-4 py-2"
      {...props}
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td
      className="text-foreground px-4 py-2 border-b border-border"
      {...props}
    />
  ),
};

interface MarkdownPageProps {
  content: string;
}

export const MarkdownPage = ({ content }: MarkdownPageProps): ReactElement => {
  return (
    <main className="min-h-screen bg-background py-16 px-8">
      <article className="max-w-3xl mx-auto">
        <Markdown components={components}>{content}</Markdown>
      </article>
    </main>
  );
};
