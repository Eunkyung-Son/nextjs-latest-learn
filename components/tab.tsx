"use client";

export type Item = {
  text: string;
  slug?: string;
  segment?: string;
};

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export const Tab = ({ path, item }: { path: string; item: Item }) => {
  const segment = useSelectedLayoutSegment();
  const href = item.slug ? path + "/" + item.slug : path;
  const isActive =
    // Example home pages e.g. `/layouts`
    (!item.slug && segment === null) ||
    segment === item.segment ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;

  return <Link href={href}>{item.text}</Link>;
};
