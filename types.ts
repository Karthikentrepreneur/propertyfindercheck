
export interface PropertyDetails {
  propertyId: string;
  dldPermitNumber: string;
  title: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  propertyType: string;
  description: string;
  amenities: string[];
  investmentAnalysis: {
    roiEstimate: string;
    marketComparison: string;
    score: number;
  };
  sources: Array<{
    title: string;
    uri: string;
  }>;
}

export interface ScraperState {
  isLoading: boolean;
  error: string | null;
  data: PropertyDetails | null;
}
