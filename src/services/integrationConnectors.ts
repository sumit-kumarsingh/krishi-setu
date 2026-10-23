/**
 * External Integration Connectors & Provenance Specification
 * 
 * Strict architectural boundary: Every connector explicitly declares its
 * operational status (Simulated, Staged, or Production), permissions required,
 * rate limits, cost, data provenance, and fallback behavior.
 */

export interface ExternalIntegrationSpec {
  id: string;
  systemName: string;
  providerAgency: string;
  status: 'simulated_mock' | 'staged_sandbox' | 'live_production';
  accessObtained: boolean;
  dataFields: string[];
  permissionsRequired: string[];
  updateFrequency: string;
  rateLimit: string;
  costStructure: string;
  termsOfUseUrl: string;
  fallbackBehavior: string;
  lastSimulatedSync: string;
}

export const REGISTERED_INTEGRATIONS: Record<string, ExternalIntegrationSpec> = {
  ksndmc_weather: {
    id: 'ksndmc_weather',
    systemName: 'Karnataka Agromet Telemetry (KSNDMC / IMD)',
    providerAgency: 'Karnataka State Natural Disaster Monitoring Centre & IMD Pune',
    status: 'simulated_mock',
    accessObtained: false,
    dataFields: ['Rainfall (mm)', 'Temperature Min/Max', 'Relative Humidity', 'District Thunderstorm Warning', 'Block-level Agromet Bulletin'],
    permissionsRequired: ['GPS Coordinates or Taluk Code', 'No biometric or identity data'],
    updateFrequency: 'Twice daily (08:30 IST & 17:30 IST)',
    rateLimit: '120 req/min per API key',
    costStructure: 'Free public utility for agricultural advisory under Open Data Karnataka policy',
    termsOfUseUrl: 'https://ksndmc.karnataka.gov.in/terms',
    fallbackBehavior: 'Serve cached 3-day regional climatological average with prominent "Estimated data" warning badge',
    lastSimulatedSync: '2026-10-20T08:30:00+05:30',
  },
  soil_health_card: {
    id: 'soil_health_card',
    systemName: 'National Soil Health Card Portal (Karnataka Node)',
    providerAgency: 'Department of Agriculture, Govt of Karnataka & ICAR',
    status: 'simulated_mock',
    accessObtained: false,
    dataFields: ['pH', 'EC (Electrical Conductivity)', 'Organic Carbon %', 'Available N-P-K (kg/ha)', 'Micronutrients Zn/B/Fe/Cu'],
    permissionsRequired: ['Farmer explicit consent', 'Survey Number or Sample Barcode ID'],
    updateFrequency: 'On diagnostic completion (every 2–3 crop cycles)',
    rateLimit: '60 req/min per authorized KVK node',
    costStructure: 'Central Govt sponsored (Free for farmers via RSK sample collection)',
    termsOfUseUrl: 'https://soilhealth.dac.gov.in',
    fallbackBehavior: 'Allow manual photo upload of physical paper card with farmer confirmation and regional soil classification defaults',
    lastSimulatedSync: '2026-08-14T14:15:00+05:30',
  },
  enam_agmarknet: {
    id: 'enam_agmarknet',
    systemName: 'e-NAM / Agmarknet Mandi Realtime Price Feed',
    providerAgency: 'Directorate of Marketing & Inspection (DMI) & Karnataka State Agricultural Marketing Board (KSAMB)',
    status: 'simulated_mock',
    accessObtained: false,
    dataFields: ['Mandi Name', 'Commodity', 'Variety', 'Grade', 'Min Price', 'Max Price', 'Modal Price', 'Daily Arrival Volume (Qtl)'],
    permissionsRequired: ['Public market data access (No authentication required)'],
    updateFrequency: 'Hourly between 09:00 and 17:00 IST',
    rateLimit: '500 req/hour',
    costStructure: 'Open Government Data (OGD) Platform India',
    termsOfUseUrl: 'https://agmarknet.gov.in',
    fallbackBehavior: 'Display last authenticated closing price from previous trade session with explicit timestamp and "Unverified indicative" tag',
    lastSimulatedSync: '2026-10-20T10:00:00+05:30',
  },
  kcc_agristack: {
    id: 'kcc_agristack',
    systemName: 'India Digital Agriculture Stack (Kisan Credit Card / PM-KISAN)',
    providerAgency: 'Ministry of Agriculture & Farmers Welfare / NABARD / RBI Innovation Hub',
    status: 'simulated_mock',
    accessObtained: false,
    dataFields: ['Acreage Verification', 'Active Crop Sown Declaration', 'Aadhaar e-KYC (Farmer consented)', 'Bank Account Verification via PFMS'],
    permissionsRequired: ['Explicit digital consent with time-bounded revocable token', 'Strict purpose limitation'],
    updateFrequency: 'On demand per loan application workflow',
    rateLimit: 'Enterprise SLA backed (RBI Innovation Hub)',
    costStructure: 'Zero charge to small/marginal farmers; absorbing by participating banks',
    termsOfUseUrl: 'https://agristack.gov.in',
    fallbackBehavior: 'Self-attested document upload (Pahani/RTC copy, passbook front page) with physical verification at bank branch',
    lastSimulatedSync: '2026-09-10T11:45:00+05:30',
  },
  apeda_export_trace: {
    id: 'apeda_export_trace',
    systemName: 'APEDA HortiNet / Millet-Net Export Traceability',
    providerAgency: 'Agricultural and Processed Food Products Export Development Authority (APEDA), Ministry of Commerce',
    status: 'simulated_mock',
    accessObtained: false,
    dataFields: ['Phytosanitary Certificate Number', 'Pesticide MRL Residue Test Report', 'Organic NPOP Certificate', 'Consignment Export Seal ID'],
    permissionsRequired: ['APEDA Exporter Registration Number (RCMC)', 'Consignment Lot Inspection Pass'],
    updateFrequency: 'Per export container dispatch',
    rateLimit: '30 req/min',
    costStructure: 'Statutory inspection fee per container batch',
    termsOfUseUrl: 'https://apeda.gov.in',
    fallbackBehavior: 'Provide pre-shipment documentation checklist and upload placeholder for licensed testing laboratories',
    lastSimulatedSync: '2026-10-19T16:20:00+05:30',
  },
};
