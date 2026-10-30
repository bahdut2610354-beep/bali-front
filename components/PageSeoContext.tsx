'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type Crumb = { name: string; href: string };

/** Breadcrumbs and last-update date of the current page, computed on the server by <PageSeo>. */
export type PageSeoInfo = {
  crumbs: Crumb[];
  /** ISO date of the last content change. */
  updated?: string;
  updatedLabel?: string;
  navLabel?: string;
} | null;

const PageSeoCtx = createContext<PageSeoInfo>(null);

export function PageSeoProvider({ value, children }: { value: PageSeoInfo; children: ReactNode }) {
  return <PageSeoCtx.Provider value={value}>{children}</PageSeoCtx.Provider>;
}

export function usePageSeo() {
  return useContext(PageSeoCtx);
}
