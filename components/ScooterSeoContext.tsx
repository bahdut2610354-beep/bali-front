'use client';
import { createContext, useContext } from 'react';

/** Scooter name/description fetched on the server, so the page has a real heading before its data loads. */
export type ScooterSeoInfo = { name: string; description?: string } | null;

const ScooterSeoCtx = createContext<ScooterSeoInfo>(null);

export function ScooterSeoProvider({ value, children }: { value: ScooterSeoInfo; children: React.ReactNode }) {
  return <ScooterSeoCtx.Provider value={value}>{children}</ScooterSeoCtx.Provider>;
}

export function useScooterSeo() {
  return useContext(ScooterSeoCtx);
}
