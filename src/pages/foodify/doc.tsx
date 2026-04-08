import content from "./doc.md?raw";
import { MarkdownPage } from "@/components/content/markdown-page";
import type { ReactElement } from "react";

export const FoodifyDocPage = (): ReactElement => {
  return <MarkdownPage content={content} />;
};
