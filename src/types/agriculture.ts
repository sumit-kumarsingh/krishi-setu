/**
 * Core Data Models & Type Definitions for KrishiSetu Karnataka
 * Farmer-First Agricultural Platform
 */

export type UserRole = 
  | 'farmer'
  | 'user'
  | 'rsk_officer'
  | 'vendor'
  | 'service_provider'
  | 'market_manager'
  | 'buyer_exporter'
  | 'financial_institution'
  | 'platform_admin'
  | 'admin'
  | 'owner';

export type PortalType = 'user' | 'admin' | 'owner';

export interface AuthAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  avatarInitials: string;
  role: 'user' | 'admin' | 'owner';
  subRole?: UserRole;
  authMethod: 'google' | 'password' | 'phone';
  isLoggedIn: boolean;
  token?: string;
  createdAt: string;
  lastLoginAt: string;
  village?: string;
  district?: string;
  permissions: string[];
}

export type LanguageCode = 'kn' | 'en' | 'hi';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  preferredLanguage: LanguageCode;
  avatarInitials: string;
  isVerified: boolean;
  kycTier: 'basic' | 'service_ready' | 'export_certified';
  organization?: string;
  designation?: string;
}

export interface FarmerExtendedProfile extends UserProfile {
  altPhone?: string;
  pincode?: string;
  ownershipTenure?: 'owner' | 'tenant' | 'joint_family';
  totalAreaAcres?: number;
  farmingType?: 'conventional' | 'natural_farming' | 'certified_organic' | 'integrated';
  organicCertificateNumber?: string;
  hasLivestock?: boolean;
  cattleCount?: number;
  cattleBreeds?: string;
  dailyMilkLitres?: number;
  bankName?: string;
  maskedAccountNumber?: string;
  ifscCode?: string;
  kccAccountActive?: boolean;
  pmKisanId?: string;
  voiceAssistantEnabled?: boolean;
  smsAlertsEnabled?: boolean;
  lowBandwidthMode?: boolean;
  updatedAt?: string;
}

export type IrrigationType = 'rainfed' | 'borewell' | 'canal' | 'drip' | 'sprinkler';
export type SoilType = 'red_loamy' | 'black_cotton' | 'laterite' | 'alluvial' | 'sandy_loam';

export interface FarmPlot {
  id: string;
  farmerId: string;
  name: string;
  surveyNumberMasked?: string;
  areaAcre: number;
  soilType: SoilType;
  irrigation: IrrigationType;
  village: string;
  taluk: string;
  district: string;
  currentCropId?: string;
  hasSoilReport: boolean;
  soilReportDate?: string;
}

export type CropSeason = 'Kharif' | 'Rabi' | 'Summer' | 'Annual';

export type CropStage = 
  | 'land_prep'
  | 'sowing'
  | 'vegetative'
  | 'flowering'
  | 'grain_formation'
  | 'harvest_ready'
  | 'harvested'
  | 'sold';

export interface CropPlan {
  id: string;
  plotId: string;
  plotName: string;
  cropName: string;
  cropNameKn: string;
  variety: string;
  season: CropSeason;
  sowingDate: string;
  estimatedHarvestStart: string;
  estimatedHarvestEnd: string;
  stage: CropStage;
  targetYieldRange: {
    minQuintalPerAcre: number;
    maxQuintalPerAcre: number;
    confidencePct: number;
    basis: string;
  };
  budgetEstimatedInr: number;
  actualCostInr: number;
  notes?: string;
}

export interface FarmActivity {
  id: string;
  cropPlanId: string;
  date: string;
  title: string;
  titleKn: string;
  category: 'irrigation' | 'fertilizer' | 'pest_control' | 'weeding' | 'harvest' | 'scouting';
  notes?: string;
  costInr: number;
  completed: boolean;
  audioNoteUrl?: string;
  hasPhoto?: boolean;
}

export interface SoilReport {
  id: string;
  plotId: string;
  testDate: string;
  labName: string;
  isOfficialLab: boolean;
  pH: number; // e.g. 6.8
  nitrogenKgPerHa: number; // e.g. 210 (Low/Medium/High)
  phosphorusKgPerHa: number;
  potassiumKgPerHa: number;
  organicCarbonPct: number;
  micronutrients: {
    zincPpm: number;
    boronPpm: number;
    ironPpm: number;
  };
  recommendations: string[];
  recommendationsKn: string[];
}

export interface WeatherSummary {
  district: string;
  temperatureC: number;
  condition: string;
  humidityPct: number;
  rainfallForecastMm: number;
  windSpeedKmh: number;
  advisoryText: string;
  advisoryTextKn: string;
  source: string;
  updatedAt: string;
  alerts: {
    id: string;
    severity: 'info' | 'warning' | 'critical';
    title: string;
    titleKn: string;
    description: string;
    validUntil: string;
  }[];
}

export interface Advisory {
  id: string;
  cropName: string;
  category: 'pest' | 'disease' | 'weather' | 'nutrient' | 'market';
  title: string;
  titleKn: string;
  summary: string;
  summaryKn: string;
  symptoms?: string[];
  recommendedAction: string;
  recommendedActionKn: string;
  organicAlternative?: string;
  source: string; // e.g. "UAS Bengaluru / RSK Mandya"
  publishedDate: string;
  severity: 'low' | 'moderate' | 'high';
}

export interface VendorProduct {
  id: string;
  vendorId: string;
  vendorName: string;
  category: 'seeds' | 'fertilizers' | 'bio_inputs' | 'implements' | 'animal_health' | 'irrigation';
  name: string;
  nameKn: string;
  varietyOrModel?: string;
  priceInr: number;
  unit: string;
  packSize: string;
  inStock: boolean;
  isGovtSubsidized: boolean;
  subsidyPct?: number;
  verificationStatus: 'verified_dealer' | 'registered' | 'pending';
  serviceTaluks: string[];
  safetyInstructions?: string;
}

export interface ServiceListing {
  id: string;
  providerId: string;
  providerName: string;
  category: 'machinery_rental' | 'logistics_transport' | 'cold_storage' | 'warehouse' | 'processing_grading' | 'soil_testing';
  title: string;
  titleKn: string;
  capacityOrSpecs: string;
  rateBasis: string; // e.g. "₹850/hour with operator" or "₹40/bag/month"
  rateInr: number;
  serviceRadiusKm: number;
  hubLocation: string;
  district: string;
  ratingScore: number;
  ratingCount: number;
  verified: boolean;
  availableNow: boolean;
  cancellationPolicy: string;
}

export interface ServiceBooking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  providerName: string;
  farmerId: string;
  farmerName: string;
  plotName: string;
  bookedDate: string;
  targetDate: string;
  status: 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  agreedPriceInr: number;
  notes?: string;
}

export type ProduceGrade = 'Grade A (Export / Premium)' | 'FAQ (Fair Average Quality)' | 'Grade B' | 'Standard Milling';

export interface ProduceLot {
  id: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  cropNameKn: string;
  variety: string;
  grade: ProduceGrade;
  quantityQuintals: number;
  bagCount: number;
  harvestDate: string;
  taluk: string;
  district: string;
  organicCertified: boolean;
  apedaEligible: boolean;
  moisturePct: number;
  listingType: 'apmc_mandi' | 'digital_auction' | 'contract_forward' | 'export_inquiry';
  askingPricePerQuintalInr: number;
  reservePricePerQuintalInr?: number; // for auctions
  auctionEndTime?: string;
  status: 'active' | 'under_offer' | 'contracted' | 'delivered' | 'sold';
  createdAt: string;
}

export interface ProduceOffer {
  id: string;
  produceLotId: string;
  buyerId: string;
  buyerName: string;
  buyerType: 'local_trader' | 'apmc_commission_agent' | 'food_processor' | 'retail_chain' | 'exporter';
  offeredPricePerQuintalInr: number;
  quantityQuintals: number;
  totalAmountInr: number;
  pickupTerms: 'farmgate_pickup' | 'mandi_delivery' | 'warehouse_drop';
  paymentTerms: 'instant_upi_escrow' | '3_days_rtgs' | 'on_weighment_cashless';
  deductionsItemized: {
    label: string;
    amountInr: number;
  }[];
  netPayableToFarmerInr: number;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'declined' | 'countered';
  counterPricePerQuintalInr?: number;
  notes?: string;
}

export interface AuctionBid {
  id: string;
  produceLotId: string;
  bidderName: string;
  bidderType: string;
  bidPricePerQuintalInr: number;
  timestamp: string;
  isLeading: boolean;
}

export interface TransactionTimeline {
  id: string;
  produceLotId: string;
  cropName: string;
  buyerName: string;
  agreedPricePerQuintalInr: number;
  finalWeightQuintals: number;
  grossAmountInr: number;
  netAmountPaidInr: number;
  steps: {
    step: 'deal_confirmed' | 'weighment_grading' | 'dispatch' | 'delivery_acceptance' | 'payment_settled';
    label: string;
    timestamp: string;
    completed: boolean;
    referenceDocNumber?: string;
    notes?: string;
  }[];
  paymentStatus: 'in_escrow' | 'partially_settled' | 'completed' | 'disputed';
  disputeOpen?: boolean;
}

export interface FinanceProduct {
  id: string;
  institutionId: string;
  institutionName: string;
  productType: 'kisan_credit_card' | 'equipment_term_loan' | 'crop_insurance' | 'warehouse_receipt_finance' | 'solar_subsidy';
  title: string;
  titleKn: string;
  interestRateAnnualPct: number;
  subsidizedRatePct?: number; // e.g. 4% under Govt scheme
  maxTenureMonths: number;
  maxAmountInr: number;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  risksAndCaveats: string[];
  processingFeeText: string;
}

export interface FinanceApplication {
  id: string;
  farmerId: string;
  farmerName: string;
  productId: string;
  productTitle: string;
  institutionName: string;
  requestedAmountInr: number;
  appliedDate: string;
  status: 'submitted' | 'consent_granted' | 'doc_verification' | 'field_appraisal' | 'approved' | 'disbursed' | 'rejected';
  consentedDataItems: string[];
  consentRevocable: boolean;
  applicationNumber: string;
  officerRemarks?: string;
}

export interface DataConsentRecord {
  id: string;
  farmerId: string;
  recipientName: string;
  recipientRole: string;
  purpose: string;
  dataCategoriesShared: string[];
  grantedAt: string;
  expiresAt: string;
  isActive: boolean;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  performedBy: string;
  role: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: string;
}
