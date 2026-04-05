import content from "./privacy.md?raw";
import { MarkdownPage } from "@/components/content/markdown-page";
import type { ReactElement } from "react";

export const RemeetnerPrivacyPage = (): ReactElement => {
  return <MarkdownPage content={content} />;
};
