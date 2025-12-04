import React, { createContext, useContext, useEffect, useState } from "react";
import yaml from "js-yaml";
import { SiteData, DEFAULT_SITE_DATA } from "@/data/content";

interface SiteDataContextType {
  data: SiteData;
  loading: boolean;
  error: Error | null;
}

const SiteDataContext = createContext<SiteDataContextType>({
  data: DEFAULT_SITE_DATA,
  loading: true,
  error: null,
});

const YAML_PATH = "./assets/home-data.yaml";

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(DEFAULT_SITE_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(YAML_PATH);
        if (!response.ok) {
          throw new Error(`Failed to load config: ${response.statusText}`);
        }
        const text = await response.text();
        const parsedData = yaml.load(text) as SiteData;
        setData(parsedData);
      } catch (err) {
        console.error("Error loading site data:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, loading, error }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
