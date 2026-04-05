import content from "./conditions.md?raw";
import { MarkdownPage } from "@/components/content/markdown-page";
import type { ReactElement } from "react";

export const RemeetnerConditionsPage = (): ReactElement => {
  return <MarkdownPage content={content} />;
};
