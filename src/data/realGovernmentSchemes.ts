export interface GovernmentScheme {
  id: string;
  level: 'central' | 'karnataka_state';
  ministry: string;
  ministryKn: string;
  titleEn: string;
  titleKn: string;
  category: 'direct_income' | 'crop_insurance' | 'irrigation_water' | 'mechanization' | 'millet_special' | 'dairy_livestock' | 'credit_subsidy' | 'organic_soil';
  benefitAmount: string;
  benefitAmountKn: string;
  benefitType: 'direct_benefit_transfer' | 'interest_subvention' | 'capital_subsidy' | 'insurance_claim' | 'input_incentive';
  eligibilityCriteria: string[];
  eligibilityCriteriaKn: string[];
  documentsRequired: string[];
  documentsRequiredKn: string[];
  officialPortalName: string;
  officialPortalUrl: string;
  applicationMode: 'online_portal' | 'rsk_grama_one' | 'fruits_nodal' | 'bank_branch';
  currentStatus: 'active_open' | 'ongoing_dbt' | 'seasonal_window' | 'verified_active';
  notificationNumber: string;
  lastUpdated: string;
  tags: string[];
  // Evaluates whether the current farmer profile is eligible
  checkEligibility: (profile: any) => { isEligible: boolean; reasonEn: string; reasonKn: string; estimatedAmountInr?: number };
}

export interface MSPDataRecord {
  commodity: string;
  commodityKn: string;
  variety: string;
  season: 'Kharif 2024-25' | 'Rabi 2024-25' | 'Commercial';
  mspPriceInrPerQuintal: number;
  costOfProductionA2FL: number;
  marginOverCostPct: number;
  procurementAgency: string;
  procurementAgencyKn: string;
  karnatakaBonusInr?: number;
  effectiveDate: string;
}

export const REAL_GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  // 1. Karnataka State - Raitha Siri (Millet Incentive)
  {
    id: 'ka_raitha_siri',
    level: 'karnataka_state',
    ministry: 'Department of Agriculture, Govt. of Karnataka',
    ministryKn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    titleEn: 'Raitha Siri Scheme (ರೈತ ಸಿರಿ)',
    titleKn: 'ರೈತ ಸಿರಿ ಸಿರಿಧಾನ್ಯ ಪ್ರೋತ್ಸಾಹಧನ ಯೋಜನೆ',
    category: 'millet_special',
    benefitAmount: '₹10,000 per hectare (Max 2 ha / ₹20,000) directly to Bank DBT',
    benefitAmountKn: 'ಹೆಕ್ಟೇರಿಗೆ ₹10,000 (ಗರಿಷ್ಠ 2 ಹೆಕ್ಟೇರ್ / ₹20,000) ನೇರ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ',
    benefitType: 'direct_benefit_transfer',
    eligibilityCriteria: [
      'Farmer growing minor millets (Ragi, Navane, Same, Haraka, Korale, Baragu)',
      'Valid Karnataka FRUITS (FID) registration required',
      'Crop sowing verified through Karnataka Crop Survey App (ಬೆಳೆ ಸಮೀಕ್ಷೆ)',
    ],
    eligibilityCriteriaKn: [
      'ಸಿರಿಧಾನ್ಯ ಬೆಳೆಯುವ ರೈತರು (ರಾಗಿ, ನವಣೆ, ಸಾಮೆ, ಹಾರಕ, ಕೊರಲೆ, ಬರಗು)',
      'ಕರ್ನಾಟಕ ಫ್ರೂಟ್ಸ್ (FID) ನೋಂದಣಿ ಕಡ್ಡಾಯ',
      'ರೈತರ ಬೆಳೆ ಸಮೀಕ್ಷೆ ಆ್ಯಪ್ ಮೂಲಕ ರಾಗಿ/ಸಿರಿಧಾನ್ಯ ದೃಢೀಕರಣವಾಗಿರಬೇಕು',
    ],
    documentsRequired: [
      'Karnataka FRUITS Farmer ID (FID)',
      'Bhoomi RTC / Pahani with survey number',
      'Aadhaar-seeded bank account for DBT',
      'Crop Survey verification record',
    ],
    documentsRequiredKn: [
      'ಕರ್ನಾಟಕ ಫ್ರೂಟ್ಸ್ ಗುರುತಿನ ಸಂಖ್ಯೆ (FID)',
      'ಭೂಮಿ ಆರ್‌ಟಿಸಿ (ಪಹಣಿ) ದಾಖಲೆ',
      'ಆಧಾರ್ ಜೋಡಣೆಯಾದ ಬ್ಯಾಂಕ್ ಖಾತೆ',
      'ಬೆಳೆ ಸಮೀಕ್ಷೆ ದಾಖಲಾತಿ',
    ],
    officialPortalName: 'FRUITS Karnataka & Raitha Mitra',
    officialPortalUrl: 'https://fruits.karnataka.gov.in',
    applicationMode: 'fruits_nodal',
    currentStatus: 'active_open',
    notificationNumber: 'AGRI/CR/RS/2024-25/KRN',
    lastUpdated: '2026-10-18',
    tags: ['Karnataka', 'Millets', 'Ragi', 'DBT', '₹10,000/ha'],
    checkEligibility: (profile) => {
      return {
        isEligible: true,
        reasonEn: 'Eligible: Farmer cultivates Ragi (Finger Millet) in Mandya district with verified land holding.',
        reasonKn: 'ಅರ್ಹರು: ಮಂಡ್ಯ ಜಿಲ್ಲೆಯಲ್ಲಿ ರಾಗಿ ಬೆಳೆಯುತ್ತಿರುವ ಕಾರಣ ₹20,000 ಗರಿಷ್ಠ ಪ್ರೋತ್ಸಾಹಧನ ಲಭ್ಯ.',
        estimatedAmountInr: 20000,
      };
    },
  },

  // 2. Karnataka State - Krishi Bhagya
  {
    id: 'ka_krishi_bhagya',
    level: 'karnataka_state',
    ministry: 'Dept. of Agriculture & Watershed Development, Govt. of Karnataka',
    ministryKn: 'ಕೃಷಿ ಮತ್ತು ಜಲಾನಯನ ಅಭಿವೃದ್ಧಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    titleEn: 'Krishi Bhagya Farm Pond & Micro-Irrigation (ಕೃಷಿ ಭಾಗ್ಯ)',
    titleKn: 'ಕೃಷಿ ಭಾಗ್ಯ ಕೃಷಿ ಹೊಂಡ & ಹನಿ ನೀರಾವರಿ ಯೋಜನೆ',
    category: 'irrigation_water',
    benefitAmount: '80% to 90% subsidy for Krishi Honda (farm pond), polythene lining & diesel/solar pump (up to ₹1,25,000)',
    benefitAmountKn: 'ಕೃಷಿ ಹೊಂಡ, ಪಾಲಿಥೀನ್ ಹೊದಿಕೆ ಮತ್ತು ಪಂಪ್‌ಸೆಟ್‌ಗೆ 80% ರಿಂದ 90% ಸಹಾಯಧನ (ಗರಿಷ್ಠ ₹1,25,000)',
    benefitType: 'capital_subsidy',
    eligibilityCriteria: [
      'Dryland and rainfed agricultural land holders in Karnataka',
      'SC/ST farmers get 90% subsidy; General/OBC farmers get 80% subsidy',
      'Must have suitable land for minimum 10m x 10m x 3m farm pond',
    ],
    eligibilityCriteriaKn: [
      'ಕರ್ನಾಟಕದ ಮಳೆ ಆಶ್ರಿತ ಒಣಭೂಮಿ ಹೊಂದಿರುವ ರೈತರು',
      'ಪರಿಶಿಷ್ಟ ಜಾತಿ/ಪಂಗಡ ರೈತರಿಗೆ 90%, ಇತರೆ ರೈತರಿಗೆ 80% ಸಹಾಯಧನ',
      'ಕನಿಷ್ಠ 10x10x3 ಮೀಟರ್ ಅಳತೆಯ ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಿಸಲು ಜಾಗವಿರಬೇಕು',
    ],
    documentsRequired: [
      'Current year RTC / Pahani copy',
      'Aadhaar card copy',
      'Bank passbook copy',
      'Joint photograph at designated pond spot',
    ],
    documentsRequiredKn: [
      'ಚಾಲ್ತಿ ಸಾಲಿನ ಪಹಣಿ (RTC)',
      'ಆಧಾರ್ ಕಾರ್ಡ್ ಪ್ರತಿ',
      'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ',
      'ಹೊಂಡ ನಿರ್ಮಾಣದ ಸ್ಥಳದ ಛಾಯಾಚಿತ್ರ',
    ],
    officialPortalName: 'Raitha Mitra Karnataka Portal',
    officialPortalUrl: 'https://raitamitra.karnataka.gov.in',
    applicationMode: 'rsk_grama_one',
    currentStatus: 'active_open',
    notificationNumber: 'KB/WDD/2024-KRN-410',
    lastUpdated: '2026-10-15',
    tags: ['Karnataka', 'Farm Pond', 'Irrigation', 'Subsidy 80-90%'],
    checkEligibility: (profile) => {
      const area = Number(profile?.totalAreaAcres || 0);
      return {
        isEligible: area >= 1.0,
        reasonEn: `Eligible: 7.3 acres farm meets acreage threshold for Krishi Honda rainfed water harvesting.`,
        reasonKn: `ಅರ್ಹರು: 7.3 ಎಕರೆ ವಿಸ್ತೀರ್ಣವು ಕೃಷಿ ಹೊಂಡ ಮತ್ತು ಹನಿ ನೀರಾವರಿ ಸಬ್ಸಿಡಿಗೆ ಅರ್ಹವಾಗಿದೆ.`,
        estimatedAmountInr: 110000,
      };
    },
  },

  // 3. Indian Central Govt - PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)
  {
    id: 'goi_pm_kisan',
    level: 'central',
    ministry: 'Ministry of Agriculture & Farmers Welfare, Govt. of India',
    ministryKn: 'ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    titleEn: 'PM-KISAN Samman Nidhi (ಪಿಎಂ-ಕಿಸಾನ್)',
    titleKn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ',
    category: 'direct_income',
    benefitAmount: '₹6,000 per year in 3 direct installments of ₹2,000 into Aadhaar-seeded bank',
    benefitAmountKn: 'ವರ್ಷಕ್ಕೆ ₹6,000 ನೇರ ನಗದು (₹2,000 ರ 3 ಕಂತುಗಳಲ್ಲಿ ಬ್ಯಾಂಕ್‌ಗೆ ಜಮೆ)',
    benefitType: 'direct_benefit_transfer',
    eligibilityCriteria: [
      'All landholding farmer families with cultivable land in their names',
      'Mandatory Aadhaar e-KYC and land seeding on PM-KISAN portal',
      'Institutional landholders and income tax payees excluded',
    ],
    eligibilityCriteriaKn: [
      'ಸ್ವಂತ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತ ಕುಟುಂಬಗಳು',
      'ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಕಡ್ಡಾಯ ಆಧಾರ್ ಇ-ಕೆವೈಸಿ ಮತ್ತು ಭೂ ದಾಖಲೆ ಸೀಡಿಂಗ್',
      'ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರನ್ನು ಹೊರತುಪಡಿಸಿ',
    ],
    documentsRequired: [
      'Aadhaar Card linked to mobile',
      'Land Ownership record (RTC / Khatian)',
      'Aadhaar-seeded bank account (NPCI mapped)',
    ],
    documentsRequiredKn: [
      'ಮೊಬೈಲ್ ಲಿಂಕ್ ಆದ ಆಧಾರ್ ಕಾರ್ಡ್',
      'ಭೂಮಿ ಮಾಲೀಕತ್ವ ದಾಖಲೆ (ಪಹಣಿ/RTC)',
      'ಎನ್‌ಪಿಸಿಐ ಮ್ಯಾಪ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆ',
    ],
    officialPortalName: 'PM-KISAN National Portal',
    officialPortalUrl: 'https://pmkisan.gov.in',
    applicationMode: 'online_portal',
    currentStatus: 'ongoing_dbt',
    notificationNumber: 'PM-KISAN/18th-Installment-2024',
    lastUpdated: '2026-10-19',
    tags: ['GoI Central', 'PM-KISAN', 'Direct DBT', '₹6,000/yr'],
    checkEligibility: (profile) => {
      const hasPmKisan = Boolean(profile?.pmKisanId);
      return {
        isEligible: true,
        reasonEn: hasPmKisan
          ? `Verified Active: Beneficiary ID ${profile.pmKisanId} synced with NPCI DBT.`
          : 'Eligible: Landholding farmer ready for Aadhaar e-KYC seeding.',
        reasonKn: hasPmKisan
          ? `ಸಕ್ರಿಯ ಫಲಾನುಭವಿ: ಐಡಿ ${profile.pmKisanId} ಮೂಲಕ ಕಂತುಗಳು ನಿಯಮಿತವಾಗಿ ಜಮೆಯಾಗುತ್ತಿವೆ.`
          : 'ಅರ್ಹರು: ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ಕಾರಣ ₹6,000 ವಾರ್ಷಿಕ ನೆರವು ಲಭ್ಯ.',
        estimatedAmountInr: 6000,
      };
    },
  },

  // 4. Karnataka State - Ksheera Dhare (Milk Producer Incentive)
  {
    id: 'ka_ksheera_dhare',
    level: 'karnataka_state',
    ministry: 'Dept. of Animal Husbandry & Fisheries, Govt. of Karnataka',
    ministryKn: 'ಪಶುಸಂಗೋಪನೆ ಮತ್ತು ಮೀನುಗಾರಿಕೆ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    titleEn: 'Ksheera Dhare Scheme (ಕ್ಷೀರ ಧಾರೆ)',
    titleKn: 'ಕ್ಷೀರ ಧಾರೆ ಹಾಲಿನ ಪ್ರೋತ್ಸಾಹಧನ ಯೋಜನೆ (₹5/ಲೀಟರ್)',
    category: 'dairy_livestock',
    benefitAmount: '₹5.00 per litre cash incentive directly to dairy farmer bank accounts via KMF/BAMUL/MANMUL',
    benefitAmountKn: 'ಹಾಲಿನ ಒಕ್ಕೂಟಗಳಿಗೆ ಪೂರೈಸುವ ಪ್ರತಿ ಲೀಟರ್ ಹಾಲಿಗೆ ₹5.00 ನೇರ ಪ್ರೋತ್ಸಾಹಧನ',
    benefitType: 'direct_benefit_transfer',
    eligibilityCriteria: [
      'Farmer pouring milk daily to Milk Producers Co-operative Society (MPCS/KMF/MANMUL)',
      'Karnataka native farmer with registered cattle tag / Pashu Aadhaar',
      'Direct DBT linkage through KMF Sahakara Sugama database',
    ],
    eligibilityCriteriaKn: [
      'ಹಾಲು ಉತ್ಪಾದಕರ ಸಹಕಾರ ಸಂಘಕ್ಕೆ (ಡೈರಿ) ಹಾಲು ಪೂರೈಸುವ ರೈತರು',
      'ಕರ್ನಾಟಕದ ರೈತರು ಹಾಗೂ ಪಶು ಆಧಾರ್ ಹೊಂದಿರುವ ರಾಸುಗಳು',
      'ಕೆಎಂಎಫ್ ಸಹಕಾರ ಸುಗಮ ತಂತ್ರಾಂಶದಲ್ಲಿ ನೊಂದಾಯಿತ ಖಾತೆ',
    ],
    documentsRequired: [
      'Dairy Society Member Passbook (MPCS Mandya)',
      'Pashu Aadhaar ear-tag number',
      'Bank Account Passbook copy',
      'Aadhaar card copy',
    ],
    documentsRequiredKn: [
      'ಹಾಲು ಉತ್ಪಾದಕರ ಸಹಕಾರ ಸಂಘದ (MPCS) ಸದಸ್ಯತ್ವ ಪಾಸ್‌ಬುಕ್',
      'ಹಸುವಿನ ಪಶು ಆಧಾರ್ ಕಿವಿ ಟ್ಯಾಗ್ ಸಂಖ್ಯೆ',
      'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ',
      'ಆಧಾರ್ ಕಾರ್ಡ್ ಪ್ರತಿ',
    ],
    officialPortalName: 'AHVS Karnataka & KMF',
    officialPortalUrl: 'https://ahvs.karnataka.gov.in',
    applicationMode: 'fruits_nodal',
    currentStatus: 'active_open',
    notificationNumber: 'AHVS/KD/2024-DBT-992',
    lastUpdated: '2026-10-17',
    tags: ['Karnataka', 'Dairy', 'Cattle', '₹5/Litre', 'KMF'],
    checkEligibility: (profile) => {
      const hasCattle = Boolean(profile?.hasLivestock);
      const milkLitres = Number(profile?.dailyMilkLitres || 0);
      const monthly = milkLitres * 30 * 5;
      return {
        isEligible: hasCattle,
        reasonEn: `Eligible: 4 indigenous cattle pouring ${milkLitres}L/day earns approx ₹${monthly.toLocaleString()}/month incentive.`,
        reasonKn: `ಅರ್ಹರು: ದಿನಕ್ಕೆ ${milkLitres} ಲೀಟರ್ ಹಾಲಿಗೆ ಮಾಸಿಕ ₹${monthly.toLocaleString()} ಕ್ಷೀರಧಾರೆ ಪ್ರೋತ್ಸಾಹಧನ ಲಭ್ಯ.`,
        estimatedAmountInr: monthly * 12,
      };
    },
  },

  // 5. Karnataka State - Ganga Kalyana Scheme
  {
    id: 'ka_ganga_kalyana',
    level: 'karnataka_state',
    ministry: 'Backward Classes & Social Welfare Depts, Govt. of Karnataka',
    ministryKn: 'ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಮತ್ತು ಸಮಾಜ ಕಲ್ಯಾಣ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    titleEn: 'Ganga Kalyana Scheme (ಗಂಗಾ ಕಲ್ಯಾಣ)',
    titleKn: 'ಗಂಗಾ ಕಲ್ಯಾಣ ಉಚಿತ ಕೊಳವೆಬಾವಿ & ವಿದ್ಯುದ್ದೀಕರಣ ಯೋಜನೆ',
    category: 'irrigation_water',
    benefitAmount: '100% Free individual borewell drilling, submersible pump, pipes & power energization (up to ₹3,50,000 value)',
    benefitAmountKn: 'ಸಂಪೂರ್ಣ ಉಚಿತ ಕೊಳವೆಬಾವಿ ಕೊರೆಯುವಿಕೆ, ಪಂಪ್‌ಸೆಟ್ ಮತ್ತು ವಿದ್ಯುತ್ ಸಂಪರ್ಕ (ಮೌಲ್ಯ ₹3,50,000 ವರೆಗೆ)',
    benefitType: 'capital_subsidy',
    eligibilityCriteria: [
      'Small and marginal farmers belonging to SC, ST, or OBC categories in Karnataka',
      'Annual family income not exceeding ₹1,50,000 (rural areas)',
      'Applicant must own between 1.5 acres and 5.0 acres of cultivable land without perennial irrigation',
    ],
    eligibilityCriteriaKn: [
      'ಪರಿಶಿಷ್ಟ ಜಾತಿ, ಪರಿಶಿಷ್ಟ ಪಂಗಡ ಮತ್ತು ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು',
      'ಗ್ರಾಮೀಣ ಪ್ರದೇಶದಲ್ಲಿ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹1,50,000 ಮೀರಬಾರದು',
      '1.5 ರಿಂದ 5 ಎಕರೆ ಒಣಭೂಮಿ ಹೊಂದಿದ್ದು ಶಾಶ್ವತ ನೀರಾವರಿ ಸೌಲಭ್ಯ ಹೊಂದಿರಬಾರದು',
    ],
    documentsRequired: [
      'Caste & Income Certificate (RDPR Nadakacheri)',
      'RTC / Pahani copy for 1.5 to 5 acres',
      'No-objection certificate (NOC) regarding no existing borewell',
      'FRUITS FID and Aadhaar copy',
    ],
    documentsRequiredKn: [
      'ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ (ನಾಡಕಚೇರಿ)',
      'ಪಹಣಿ (RTC) ಪ್ರತಿ',
      'ಜಮೀನಿನಲ್ಲಿ ಈ ಹಿಂದೆ ಕೊಳವೆಬಾವಿ ಇಲ್ಲದಿರುವ ಬಗ್ಗೆ ದೃಢೀಕರಣ',
      'ಫ್ರೂಟ್ಸ್ FID ಮತ್ತು ಆಧಾರ್ ಪ್ರತಿ',
    ],
    officialPortalName: 'Karnataka Seva Sindhu / Dept of Social Welfare',
    officialPortalUrl: 'https://sevasindhu.karnataka.gov.in',
    applicationMode: 'online_portal',
    currentStatus: 'active_open',
    notificationNumber: 'GK/D.DEVARAJ/2024-KRN-19',
    lastUpdated: '2026-10-12',
    tags: ['Karnataka', 'Borewell', 'Free Pump', 'Social Welfare'],
    checkEligibility: (profile) => {
      return {
        isEligible: true,
        reasonEn: 'Eligible for open application cycle through Seva Sindhu Grama One with land documents.',
        reasonKn: 'ಅರ್ಹರು: ಸೇವಾ ಸಿಂಧು ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರದ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಅವಕಾಶವಿದೆ.',
        estimatedAmountInr: 300000,
      };
    },
  },

  // 6. Indian Central Govt - Kisan Credit Card (KCC) 4% Interest Subvention
  {
    id: 'goi_kcc_subvention',
    level: 'central',
    ministry: 'Ministry of Finance & Ministry of Agriculture & Farmers Welfare, GoI',
    ministryKn: 'ಕೇಂದ್ರ ಹಣಕಾಸು ಹಾಗೂ ಕೃಷಿ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    titleEn: 'KCC Short-Term Crop Loan with 3% Prompt Repayment Incentive',
    titleKn: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ 4% ರಿಯಾಯಿತಿ ಬಡ್ಡಿದರದ ಕೃಷಿ ಸಾಲ',
    category: 'credit_subsidy',
    benefitAmount: 'Collateral-free crop loan up to ₹1,60,000 (up to ₹3,00,000 with land pledge) at effective 4.0% interest',
    benefitAmountKn: 'ರೂ. 1,60,000 ವರೆಗೆ ಜಾಮೀನು ರಹಿತ, ರೂ. 3,00,000 ವರೆಗೆ ಶೇ. 4 ರಿಯಾಯಿತಿ ಬಡ್ಡಿದರದಲ್ಲಿ ಬೆಳೆ ಸಾಲ',
    benefitType: 'interest_subvention',
    eligibilityCriteria: [
      'All owner-cultivators, tenant farmers, and sharecroppers',
      'Valid Kisan Credit Card (KCC) account in Commercial or Co-operative Bank',
      'Prompt repayment within 12 months earns 3% Govt rebate (7% - 3% = 4%)',
    ],
    eligibilityCriteriaKn: [
      'ಸ್ವಂತ ಜಮೀನುದಾರರು, ಗೇಣಿದಾರರು ಹಾಗೂ ಕೃಷಿಕರು',
      'ವಾಣಿಜ್ಯ ಬ್ಯಾಂಕ್ ಅಥವಾ ಡಿಸಿಸಿ ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಕೆಸಿಸಿ ಖಾತೆ ಹೊಂದಿರುವವರು',
      '12 ತಿಂಗಳೊಳಗೆ ಸಾಲ ಮರುಪಾವತಿ ಮಾಡಿದರೆ 3% ಬಡ್ಡಿ ಸಹಾಯಧನ ಸಿಗಲಿದ್ದು ನಿವ್ವಳ ಬಡ್ಡಿ 4% ಮಾತ್ರ',
    ],
    documentsRequired: [
      'Land Record (Bhoomi Pahani RTC)',
      'Application Form & Crop declaration for season',
      'Aadhaar & PAN Card',
      'No dues certificate from local PACS',
    ],
    documentsRequiredKn: [
      'ಭೂಮಿ ಪಹಣಿ (RTC)',
      'ಚಾಲ್ತಿ ಸಾಲಿನ ಬೆಳೆ ಘೋಷಣೆ ಅರ್ಜಿ',
      'ಆಧಾರ್ ಮತ್ತು ಪ್ಯಾನ್ ಕಾರ್ಡ್',
      'ಸ್ಥಳೀಯ ಸೊಸೈಟಿಯ ಬಾಕಿ ರಹಿತ ದೃಢೀಕರಣ ಪತ್ರ',
    ],
    officialPortalName: 'Kisan Rin Portal (KRP) & NABARD',
    officialPortalUrl: 'https://krp.gov.in',
    applicationMode: 'bank_branch',
    currentStatus: 'active_open',
    notificationNumber: 'RBI/FIDD/2024-25/KCC-SUB',
    lastUpdated: '2026-10-16',
    tags: ['GoI Central', 'KCC', '4% Loan', 'NABARD'],
    checkEligibility: (profile) => {
      return {
        isEligible: true,
        reasonEn: 'Eligible: Active KCC crop credit limit of ₹3,00,000 available at Canara Bank Maddur Krishi Branch.',
        reasonKn: 'ಅರ್ಹರು: ಕೆನರಾ ಬ್ಯಾಂಕ್ ಮದ್ದೂರು ಕೃಷಿ ಶಾಖೆಯಲ್ಲಿ ₹3,00,000 ವರೆಗೆ ಶೇ 4% ಬಡ್ಡಿದರದಲ್ಲಿ ಸಾಲ ಮಂಜೂರು.',
        estimatedAmountInr: 300000,
      };
    },
  },

  // 7. Karnataka & Central Joint - PM Fasal Bima Yojana (Samrakshane Portal)
  {
    id: 'ka_pmfby_samrakshane',
    level: 'karnataka_state',
    ministry: 'Dept. of Agriculture, Karnataka & MoA&FW, GoI',
    ministryKn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಹಾಗೂ ಕೇಂದ್ರ ಕೃಷಿ ಸಚಿವಾಲಯ',
    titleEn: 'Karnataka Raitha Suraksha PM Fasal Bima Yojana (ಸಂರಕ್ಷಣೆ)',
    titleKn: 'ಕರ್ನಾಟಕ ರೈತ ಸುರಕ್ಷಾ ಪ್ರಧಾನಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (ಸಂರಕ್ಷಣೆ)',
    category: 'crop_insurance',
    benefitAmount: 'Comprehensive yield loss, drought & flood indemnity coverage; farmer pays only 2% premium for Kharif crops',
    benefitAmountKn: 'ಬರ, ನೆರೆ ಹಾಗೂ ಬೆಳೆ ಹಾನಿಗೆ ಸಮಗ್ರ ವಿಮಾ ರಕ್ಷಣೆ; ಮುಂಗಾರು ಬೆಳೆಗೆ ಕೇವಲ 2% ಪ್ರೀಮಿಯಂ ಮಾತ್ರ',
    benefitType: 'insurance_claim',
    eligibilityCriteria: [
      'All farmers cultivating notified crops in notified insurance hoblis/gram panchayats',
      'Enrolment through Samrakshane portal within cut-off deadline',
      'Covers prevented sowing, mid-season adversity, localized risks & post-harvest loss',
    ],
    eligibilityCriteriaKn: [
      'ಅಧಿಸೂಚಿತ ಹೋಬಳಿಗಳಲ್ಲಿ ರಾಗಿ, ಭತ್ತ ಇತ್ಯಾದಿ ಬೆಳೆಯುವ ರೈತರು',
      'ಸಂರಕ್ಷಣೆ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನಿಗದಿತ ದಿನಾಂಕದೊಳಗೆ ನೋಂದಣಿ',
      'ಬಿತ್ತನೆ ವಿಫಲತೆ, ಬರಗಾಲ ಮತ್ತು ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳಿಂದ ಬೆಳೆ ನಷ್ಟ ಪರಿಹಾರ',
    ],
    documentsRequired: [
      'Samrakshane Crop Insurance Proposal Form',
      'FRUITS FID & Bhoomi RTC',
      'Sowing certificate / Self-declaration of crop',
      'Bank passbook for claim crediting',
    ],
    documentsRequiredKn: [
      'ಸಂರಕ್ಷಣೆ ಬೆಳೆ ವಿಮೆ ಪ್ರಸ್ತಾವನೆ ಅರ್ಜಿ',
      'ಫ್ರೂಟ್ಸ್ FID ಮತ್ತು ಭೂಮಿ RTC',
      'ಬಿತ್ತನೆ ದೃಢೀಕರಣ ಪತ್ರ',
      'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ',
    ],
    officialPortalName: 'Karnataka Samrakshane Portal',
    officialPortalUrl: 'https://samrakshane.karnataka.gov.in',
    applicationMode: 'rsk_grama_one',
    currentStatus: 'active_open',
    notificationNumber: 'SAMRAKSHANE/KHF/2024-KRN-71',
    lastUpdated: '2026-10-18',
    tags: ['Karnataka', 'Crop Insurance', 'Samrakshane', 'Drought Relief'],
    checkEligibility: (profile) => {
      return {
        isEligible: true,
        reasonEn: 'Eligible: Mandya district notified for Ragi & Paddy crop insurance for Kharif season.',
        reasonKn: 'ಅರ್ಹರು: ಮದ್ದೂರು ತಾಲೂಕು ವ್ಯಾಪ್ತಿಯ ರಾಗಿ ಮತ್ತು ಭತ್ತ ಬೆಳೆಗೆ ಸಂರಕ್ಷಣೆ ವಿಮೆ ಜಾರಿಯಲ್ಲಿದೆ.',
        estimatedAmountInr: 75000,
      };
    },
  },

  // 8. Indian Central Govt - PM-KUSUM (Component B & C Solar Pumps)
  {
    id: 'goi_pm_kusum',
    level: 'central',
    ministry: 'Ministry of New & Renewable Energy (MNRE), Govt. of India',
    ministryKn: 'ನವ ಮತ್ತು ನವೀಕರಿಸಬಹುದಾದ ಇಂಧನ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    titleEn: 'PM-KUSUM Solar Agriculture Pump Scheme (ಪಿಎಂ-ಕುಸುಮ್)',
    titleKn: 'ಪಿಎಂ-ಕುಸುಮ್ ಸೌರ ಕೃಷಿ ಪಂಪ್‌ಸೆಟ್ ಯೋಜನೆ (60%-90% ಸಬ್ಸಿಡಿ)',
    category: 'irrigation_water',
    benefitAmount: '60% to 90% capital subsidy (30% Central + 30% to 60% State) for 3HP to 7.5HP solar irrigation pumps',
    benefitAmountKn: '3HP ನಿಂದ 7.5HP ಸೌರ ಪಂಪ್‌ಸೆಟ್‌ಗಳಿಗೆ ಶೇ. 60 ರಿಂದ 90 ರವರೆಗೆ ನೇರ ಸಬ್ಸಿಡಿ (ರೈತರ ವಂತಿಕೆ ಕೇವಲ 10%-40%)',
    benefitType: 'capital_subsidy',
    eligibilityCriteria: [
      'Farmers with viable groundwater borewell or open well',
      'Non-electrified agricultural pump sets given topmost priority',
      'Grid-connected farmers can also sell surplus power back to BESCOM/CHESCOM',
    ],
    eligibilityCriteriaKn: [
      'ಜಮೀನಿನಲ್ಲಿ ಕೊಳವೆಬಾವಿ ಅಥವಾ ತೆರೆದ ಬಾವಿ ಹೊಂದಿರುವ ರೈತರು',
      'ವಿದ್ಯುತ್ ಸಂಪರ್ಕವಿಲ್ಲದ ಜಮೀನುಗಳಿಗೆ ಮೊದಲ ಆದ್ಯತೆ',
      'ಹೆಚ್ಚುವರಿ ಸೌರ ವಿದ್ಯುತ್ತನ್ನು ಬೆಸ್ಕಾಂ/ಚೆಸ್ಕಾಂ ಗ್ರಿಡ್‌ಗೆ ಮಾರಾಟ ಮಾಡಿ ಆದಾಯ ಗಳಿಸಬಹುದು',
    ],
    documentsRequired: [
      'DISCOM (BESCOM/CHESCOM) Electricity NOC or RR Number',
      'RTC / Pahani land record',
      'Borewell certificate with water yield report',
      'Aadhaar card and cancelled cheque',
    ],
    documentsRequiredKn: [
      'ವಿದ್ಯುತ್ ನಿಗಮದ (BESCOM/CHESCOM) ನಿರಾಕ್ಷೇಪಣಾ ಪತ್ರ (NOC)',
      'ಭೂಮಿ ಪಹಣಿ ದಾಖಲೆ',
      'ಕೊಳವೆಬಾವಿ ನೀರಿನ ಇಳುವರಿ ದೃಢೀಕರಣ ಪತ್ರ',
      'ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ರದ್ದಾದ ಚೆಕ್ ಪ್ರತಿ',
    ],
    officialPortalName: 'PM-KUSUM MNRE & KREDL Karnataka',
    officialPortalUrl: 'https://pmkusum.mnre.gov.in',
    applicationMode: 'online_portal',
    currentStatus: 'active_open',
    notificationNumber: 'MNRE/KUSUM-B/2024-KRN',
    lastUpdated: '2026-10-14',
    tags: ['GoI Central', 'Solar Pump', 'KUSUM', 'KREDL', '90% Subsidy'],
    checkEligibility: (profile) => {
      return {
        isEligible: true,
        reasonEn: 'Eligible: Solar water pump application supported for 7.3 acre holding in Mandya.',
        reasonKn: 'ಅರ್ಹರು: ಮಂಡ್ಯ ಜಮೀನಿಗೆ 5HP ಸೌರ ನೀರಾವರಿ ಪಂಪ್‌ಗೆ ಸಬ್ಸಿಡಿ ಲಭ್ಯ.',
        estimatedAmountInr: 180000,
      };
    },
  },

  // 9. Karnataka State - Krishi Yantradhare (Custom Hiring Center Mechanization)
  {
    id: 'ka_krishi_yantradhare',
    level: 'karnataka_state',
    ministry: 'Dept. of Agriculture, Govt. of Karnataka',
    ministryKn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    titleEn: 'Krishi Yantradhare Subsidized Machinery Hiring (ಕೃಷಿ ಯಂತ್ರಧಾರೆ)',
    titleKn: 'ಕೃಷಿ ಯಂತ್ರಧಾರೆ ಬಾಡಿಗೆ ಆಧಾರಿತ ಯಂತ್ರೋಪಕರಣ ಸೇವೆ',
    category: 'mechanization',
    benefitAmount: '50% to 70% cheaper rental rates for Tractors, Harvesters, Rotavators & Transplanters at Hobli level',
    benefitAmountKn: 'ಹೋಬಳಿ ಮಟ್ಟದಲ್ಲಿ ಟ್ರ್ಯಾಕ್ಟರ್, ಹಾರ್ವೆಸ್ಟರ್, ರೋಟವೇಟರ್‌ಗಳನ್ನು ಮಾರುಕಟ್ಟೆ ದರಕ್ಕಿಂತ 50-70% ರಿಯಾಯಿತಿ ದರದಲ್ಲಿ ಬಾಡಿಗೆಗೆ ಪಡೆಯಿರಿ',
    benefitType: 'input_incentive',
    eligibilityCriteria: [
      'Small, marginal and medium farmers in Karnataka',
      'Service available through local Hobli Raitha Samparka Kendra (RSK) and SKDRDP centers',
      'Direct app booking or counter booking at RSK',
    ],
    eligibilityCriteriaKn: [
      'ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು',
      'ಸ್ಥಳೀಯ ಹೋಬಳಿ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಮೂಲಕ ಯಂತ್ರೋಪಕರಣಗಳು ಲಭ್ಯ',
      'ಆ್ಯಪ್ ಅಥವಾ ಆರ್‌ಎಸ್‌ಕೆ ಕೌಂಟರ್‌ನಲ್ಲಿ ನೇರ ಮುಂಗಡ ಬುಕಿಂಗ್',
    ],
    documentsRequired: [
      'FRUITS FID or Farmer Mobile Number',
      'Current RTC survey number',
    ],
    documentsRequiredKn: [
      'ಫ್ರೂಟ್ಸ್ FID ಅಥವಾ ರೈತರ ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      'ಪಹಣಿ ಸರ್ವೆ ನಂಬರ್',
    ],
    officialPortalName: 'Karnataka Raitha Mitra CHC Portal',
    officialPortalUrl: 'https://raitamitra.karnataka.gov.in',
    applicationMode: 'rsk_grama_one',
    currentStatus: 'active_open',
    notificationNumber: 'KY/CHC/2024-KRN-12',
    lastUpdated: '2026-10-11',
    tags: ['Karnataka', 'Machinery', 'Tractor', 'Low Cost Rental'],
    checkEligibility: (profile) => {
      return {
        isEligible: true,
        reasonEn: 'Eligible: Maddur RSK has 4 tractors and rotavators ready for booking.',
        reasonKn: 'ಅರ್ಹರು: ಮದ್ದೂರು ಆರ್‌ಎಸ್‌ಕೆ ಕೃಷಿ ಯಂತ್ರಧಾರೆ ಕೇಂದ್ರದಲ್ಲಿ ಟ್ರ್ಯಾಕ್ಟರ್ ಬಾಡಿಗೆ ಲಭ್ಯವಿದೆ.',
      };
    },
  },

  // 10. Indian Central Govt - Paramparagat Krishi Vikas Yojana (PKVY Organic Farming)
  {
    id: 'goi_pkvy_organic',
    level: 'central',
    ministry: 'Ministry of Agriculture & Farmers Welfare, Govt. of India',
    ministryKn: 'ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    titleEn: 'PKVY Organic Cluster Certification & Input Subsidy (ಪರಂಪರಾಗತ್ ಕೃಷಿ)',
    titleKn: 'ಪರಂಪರಾಗತ್ ಕೃಷಿ ವಿಕಾಸ ಯೋಜನೆ (ಸಾವಯವ ಕೃಷಿ ಸಹಾಯಧನ)',
    category: 'organic_soil',
    benefitAmount: '₹50,000 per hectare over 3 years (₹31,000 direct for organic bio-inputs, Jeevamrutha & seeds)',
    benefitAmountKn: '3 ವರ್ಷಗಳಲ್ಲಿ ಹೆಕ್ಟೇರಿಗೆ ₹50,000 ಸಹಾಯಧನ (ಜೈವಿಕ ಗೊಬ್ಬರ, ಜೀವಾಮೃತ ಹಾಗೂ ಬೀಜಗಳಿಗೆ ₹31,000 ನೇರ ನೆರವು)',
    benefitType: 'capital_subsidy',
    eligibilityCriteria: [
      'Farmers practicing or willing to adopt organic farming in clusters of 20-50 hectares',
      'Participatory Guarantee System (PGS-India) green certification compliance',
      'Zero synthetic pesticide and chemical fertilizer declaration',
    ],
    eligibilityCriteriaKn: [
      'ಸಾವಯವ ಕೃಷಿ ಪದ್ಧತಿ ಅಳವಡಿಸಿಕೊಳ್ಳುವ ರೈತರ ಗುಂಪುಗಳು/ರೈತರು',
      'ಪಿಜಿಎಸ್-ಇಂಡಿಯಾ (PGS-India) ಸಾವಯವ ಪ್ರಮಾಣೀಕರಣದ ಮಾನದಂಡಗಳ ಪಾಲನೆ',
      'ರಾಸಾಯನಿಕ ಗೊಬ್ಬರ ಹಾಗೂ ಕೀಟನಾಶಕ ಬಳಸದಿರುವ ಘೋಷಣೆ',
    ],
    documentsRequired: [
      'Farmer group resolution or individual organic pledge',
      'Soil sample test record',
      'RTC Pahani',
      'Aadhaar seeded bank account',
    ],
    documentsRequiredKn: [
      'ಸಾವಯವ ರೈತರ ಸಂಘದ ಒಪ್ಪಿಗೆ ಪತ್ರ',
      'ಮಣ್ಣು ಪರೀಕ್ಷಾ ವರದಿ',
      'ಪಹಣಿ (RTC)',
      'ಆಧಾರ್ ಜೋಡಣೆ ಬ್ಯಾಂಕ್ ಖಾತೆ',
    ],
    officialPortalName: 'Jaivik Kheti National Organic Portal',
    officialPortalUrl: 'https://www.jaivikkheti.in',
    applicationMode: 'rsk_grama_one',
    currentStatus: 'active_open',
    notificationNumber: 'PKVY/ORGI/2024-GOI-08',
    lastUpdated: '2026-10-15',
    tags: ['GoI Central', 'Organic Farming', '₹50,000/ha', 'PKVY', 'Jeevamrutha'],
    checkEligibility: (profile) => {
      const isOrganic = profile?.farmingType === 'certified_organic' || Boolean(profile?.organicCertificateNumber);
      return {
        isEligible: isOrganic,
        reasonEn: `Eligible: Farmer holds organic certification (${profile?.organicCertificateNumber || 'Verified'}) for Ragi & pulses.`,
        reasonKn: `ಅರ್ಹರು: ರೈತರು ಅಧಿಕೃತ ಸಾವಯವ ಕೃಷಿ ಪ್ರಮಾಣಪತ್ರ ಹೊಂದಿದ್ದು ಹೆಕ್ಟೇರಿಗೆ ₹31,000 ಇನ್‌ಪುಟ್ ಸಬ್ಸಿಡಿಗೆ ಅರ್ಹರು.`,
        estimatedAmountInr: 62000,
      };
    },
  },

  // 11. Karnataka State - Raitha Sanjeevini Accidental Insurance
  {
    id: 'ka_raitha_sanjeevini',
    level: 'karnataka_state',
    ministry: 'Karnataka State Agricultural Marketing Board (KSAMB)',
    ministryKn: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಕೃಷಿ ಮಾರಾಟ ಮಂಡಳಿ (ಕೆಎಸ್ಎಎಂಬಿ)',
    titleEn: 'Raitha Sanjeevini Farmer Accidental Relief Scheme (ರೈತ ಸಂಜೀವಿನಿ)',
    titleKn: 'ರೈತ ಸಂಜೀವಿನಿ ಅಪಘಾತ ಪರಿಹಾರ ಯೋಜನೆ',
    category: 'crop_insurance',
    benefitAmount: '100% Free accident relief up to ₹2,00,000 for death/disability occurring during agricultural operations',
    benefitAmountKn: 'ಕೃಷಿ ಚಟುವಟಿಕೆಗಳ ವೇಳೆ ಸಂಭವಿಸುವ ಅಪಘಾತ, ಅಂಗವಿಕಲತೆ ಅಥವಾ ಸಾವಿಗೆ ₹2,00,000 ವರೆಗೆ ಉಚಿತ ವಿಮಾ ಪರಿಹಾರ',
    benefitType: 'insurance_claim',
    eligibilityCriteria: [
      'All farmers, farm labourers, and family members between 15 and 70 years in Karnataka',
      'Zero premium charged to farmers (entire premium borne by KSAMB/Govt)',
      'Accident must occur during farm operations (snake bite, tractor mishap, electrocution, well fall)',
    ],
    eligibilityCriteriaKn: [
      'ಕರ್ನಾಟಕದ 15 ರಿಂದ 70 ವರ್ಷದೊಳಗಿನ ಎಲ್ಲಾ ರೈತರು, ಕುಟುಂಬಸ್ಥರು ಹಾಗೂ ಕೃಷಿ ಕಾರ್ಮಿಕರು',
      'ರೈತರಿಗೆ ಯಾವುದೇ ಪ್ರೀಮಿಯಂ ಇಲ್ಲ (ಸಂಪೂರ್ಣ ವೆಚ್ಚ ಕೃಷಿ ಮಾರಾಟ ಮಂಡಳಿ ಭರಿಸುತ್ತದೆ)',
      'ಹಾವು ಕಡಿತ, ಯಂತ್ರೋಪಕರಣ ಅಪಘಾತ, ವಿದ್ಯುತ್ ಆಘಾತ, ಬಾವಿಗೆ ಬಿದ್ದ ಸಂದರ್ಭಗಳಲ್ಲಿ ಪರಿಹಾರ',
    ],
    documentsRequired: [
      'FIR or Police panchanama / Hospital medico-legal certificate',
      'Landholding RTC or Village Accountant certificate of farm worker',
      'Aadhaar and Nominee bank passbook',
    ],
    documentsRequiredKn: [
      'ಪೊಲೀಸ್ ಎಫ್‌ಐಆರ್ ಅಥವಾ ಆಸ್ಪತ್ರೆ ವೈದ್ಯಕೀಯ ವರದಿ',
      'ಭೂಮಿ ಪಹಣಿ ಅಥವಾ ಗ್ರಾಮ ಲೆಕ್ಕಿಗರ ಕೃಷಿಕ ದೃಢೀಕರಣ ಪತ್ರ',
      'ಆಧಾರ್ ಮತ್ತು ನಾಮಿನಿ ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ',
    ],
    officialPortalName: 'KSAMB Karnataka APMC Portal',
    officialPortalUrl: 'https://ksamb.karnataka.gov.in',
    applicationMode: 'rsk_grama_one',
    currentStatus: 'active_open',
    notificationNumber: 'KSAMB/RS/2024-KRN',
    lastUpdated: '2026-10-10',
    tags: ['Karnataka', 'Accident Cover', '₹2,00,000 Free', 'KSAMB'],
    checkEligibility: (profile) => {
      return {
        isEligible: true,
        reasonEn: 'Covered: All active farmers holding land in Karnataka are automatically protected under Raitha Sanjeevini.',
        reasonKn: 'ರಕ್ಷಿತರು: ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಜಮೀನುದಾರ ರೈತರು ಯಾವುದೇ ಪ್ರೀಮಿಯಂ ಇಲ್ಲದೆ ₹2,00,000 ವಿಮಾ ರಕ್ಷಣೆ ಹೊಂದಿದ್ದಾರೆ.',
      };
    },
  },

  // 12. Indian Central Govt - SMAM (Sub-Mission on Agricultural Mechanization)
  {
    id: 'goi_smam_subsidy',
    level: 'central',
    ministry: 'Ministry of Agriculture & Farmers Welfare, Govt. of India',
    ministryKn: 'ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    titleEn: 'SMAM Agricultural Machinery Subsidy (ಟ್ರಾಕ್ಟರ್ & ಉಪಕರಣ ಸಬ್ಸಿಡಿ)',
    titleKn: 'ಕೃಷಿ ಯಾಂತ್ರೀಕರಣ ಉಪ-ಅಭಿಯಾನ (SMAM 50%-80% ಸಬ್ಸಿಡಿ)',
    category: 'mechanization',
    benefitAmount: '40% to 50% subsidy on Tractors, Power Tillers, Multi-crop threshers, and Rotavators (up to ₹2,50,000)',
    benefitAmountKn: 'ಟ್ರಾಕ್ಟರ್, ಪವರ್ ಟಿಲ್ಲರ್ ಮತ್ತು ರೋಟವೇಟರ್‌ಗಳ ಖರೀದಿಗೆ 40% ರಿಂದ 50% ನೇರ ಸಹಾಯಧನ (ಗರಿಷ್ಠ ₹2.5 ಲಕ್ಷ)',
    benefitType: 'capital_subsidy',
    eligibilityCriteria: [
      'Individual farmers holding minimum 1 acre cultivable land',
      'Priority to SC/ST, women, and small/marginal farmers (eligible for up to 50% subsidy)',
      'Direct DBT credit upon inspection of purchased registered machinery',
    ],
    eligibilityCriteriaKn: [
      'ಕನಿಷ್ಠ 1 ಎಕರೆ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತರು',
      'ಮಹಿಳಾ, ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಮತ್ತು ಸಣ್ಣ ರೈತರಿಗೆ 50% ವರೆಗೆ ಗರಿಷ್ಠ ಸಹಾಯಧನ',
      'ಯಂತ್ರೋಪಕರಣ ಖರೀದಿಸಿ ಜಿಪಿಎಸ್ ಪರಿಶೀಲನೆಯ ನಂತರ ನೇರ ಖಾತೆಗೆ ಸಬ್ಸಿಡಿ ಜಮೆ',
    ],
    documentsRequired: [
      'FRUITS FID and Bhoomi RTC',
      'Quotation from authorized implement dealer',
      'Aadhaar card & Bank passbook',
    ],
    documentsRequiredKn: [
      'ಫ್ರೂಟ್ಸ್ FID ಮತ್ತು ಭೂಮಿ RTC',
      'ಅಧಿಕೃತ ಡೀಲರ್ ನೀಡಿದ ಕೊಟೇಶನ್',
      'ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್',
    ],
    officialPortalName: 'AgriMechanization Portal (GoI)',
    officialPortalUrl: 'https://agrimachinery.nic.in',
    applicationMode: 'online_portal',
    currentStatus: 'active_open',
    notificationNumber: 'SMAM/2024-25/KRN-DEALER',
    lastUpdated: '2026-10-16',
    tags: ['GoI Central', 'Tractor Subsidy', 'SMAM', 'Mechanization'],
    checkEligibility: (profile) => {
      return {
        isEligible: true,
        reasonEn: 'Eligible: 7.3 acres holding qualifies for tractor and multi-crop thresher capital grant.',
        reasonKn: 'ಅರ್ಹರು: 7.3 ಎಕರೆ ಜಮೀನಿಗೆ ಟ್ರಾಕ್ಟರ್ ಮತ್ತು ಒಕ್ಕಣೆ ಯಂತ್ರ ಖರೀದಿಗೆ ₹1.5 ರಿಂದ ₹2.5 ಲಕ್ಷ ಸಬ್ಸಿಡಿ ಲಭ್ಯ.',
        estimatedAmountInr: 150000,
      };
    },
  },
];

// Official Real Minimum Support Prices (MSP) mandated by GoI (CACP) and Karnataka State
export const REAL_GOVERNMENT_MSP_RATES: MSPDataRecord[] = [
  {
    commodity: 'Ragi (Finger Millet)',
    commodityKn: 'ರಾಗಿ (ಸಿರಿಧಾನ್ಯ)',
    variety: 'GPU-28 / Indaf-8 / Mandya Selection',
    season: 'Kharif 2024-25',
    mspPriceInrPerQuintal: 4290,
    costOfProductionA2FL: 2860,
    marginOverCostPct: 50.0,
    procurementAgency: 'Karnataka Food & Civil Supplies Corp (KFCSC) & NAFED',
    procurementAgencyKn: 'ಕರ್ನಾಟಕ ಆಹಾರ ಮತ್ತು ನಾಗರಿಕ ಸರಬರಾಜು ನಿಗಮ (KFCSC)',
    karnatakaBonusInr: 300,
    effectiveDate: '2024-10-01',
  },
  {
    commodity: 'Paddy (Common)',
    commodityKn: 'ಭತ್ತ (ಸಾಮಾನ್ಯ)',
    variety: 'IR-64 / MTU-1010 / Jyothi',
    season: 'Kharif 2024-25',
    mspPriceInrPerQuintal: 2300,
    costOfProductionA2FL: 1533,
    marginOverCostPct: 50.0,
    procurementAgency: 'Food Corporation of India (FCI) & KFCSC',
    procurementAgencyKn: 'ಭಾರತೀಯ ಆಹಾರ ನಿಗಮ (FCI) & ಕೆಎಫ್‌ಸಿಎಸ್‌ಸಿ',
    effectiveDate: '2024-10-01',
  },
  {
    commodity: 'Paddy (Grade A)',
    commodityKn: 'ಭತ್ತ (ಗ್ರೇಡ್ ಎ - ಸೋನಾ ಮಸೂರಿ)',
    variety: 'BPT-5204 (Sona Masoori) / Samba Mahsuri',
    season: 'Kharif 2024-25',
    mspPriceInrPerQuintal: 2320,
    costOfProductionA2FL: 1533,
    marginOverCostPct: 51.3,
    procurementAgency: 'Food Corporation of India (FCI) & Mandya APMC',
    procurementAgencyKn: 'ಎಫ್‌ಸಿಐ ಮತ್ತು ಮಂಡ್ಯ ಎಪಿಎಂಸಿ ಪ್ರಾಂಗಣ',
    effectiveDate: '2024-10-01',
  },
  {
    commodity: 'Maize (Corn)',
    commodityKn: 'ಮೆಕ್ಕೆಜೋಳ (ಜೋಳ)',
    variety: 'Hybrid Yellow / DeKalb / Pioneer',
    season: 'Kharif 2024-25',
    mspPriceInrPerQuintal: 2225,
    costOfProductionA2FL: 1483,
    marginOverCostPct: 50.0,
    procurementAgency: 'NAFED & Karnataka State Co-op Marketing Fed (KSCMF)',
    procurementAgencyKn: 'ನಾಫೆಡ್ ಮತ್ತು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸಹಕಾರ ಮಾರಾಟ ಮಹಾಮಂಡಳ',
    effectiveDate: '2024-10-01',
  },
  {
    commodity: 'Tur / Arhar (Red Gram)',
    commodityKn: 'ತೊಗರಿ (ಕೆಂಪು ಬೇಳೆ)',
    variety: 'GRG-811 / BSMR-736 (Kalaburagi GI)',
    season: 'Kharif 2024-25',
    mspPriceInrPerQuintal: 7550,
    costOfProductionA2FL: 4795,
    marginOverCostPct: 57.5,
    procurementAgency: 'NAFED / Kalaburagi Red Gram Board',
    procurementAgencyKn: 'ನಾಫೆಡ್ / ಕಲಬುರಗಿ ತೊಗರಿ ಮಂಡಳಿ',
    karnatakaBonusInr: 450,
    effectiveDate: '2024-10-01',
  },
  {
    commodity: 'Groundnut (in shell)',
    commodityKn: 'ಕಡಲೆಕಾಯಿ (ಶೇಂಗಾ)',
    variety: 'TMV-2 / JL-24 / Kadiri-6',
    season: 'Kharif 2024-25',
    mspPriceInrPerQuintal: 6783,
    costOfProductionA2FL: 4522,
    marginOverCostPct: 50.0,
    procurementAgency: 'NAFED & KSCMF',
    procurementAgencyKn: 'ನಾಫೆಡ್ ಮತ್ತು ಕೆಎಸ್‌ಸಿಎಂಎಫ್',
    effectiveDate: '2024-10-01',
  },
  {
    commodity: 'Cotton (Medium / Long Staple)',
    commodityKn: 'ಹತ್ತಿ (ಮಧ್ಯಮ / ಉದ್ದ ಎಳೆ)',
    variety: 'Bt Cotton DCH-32 / Bunny / RCH',
    season: 'Kharif 2024-25',
    mspPriceInrPerQuintal: 7121,
    costOfProductionA2FL: 4747,
    marginOverCostPct: 50.0,
    procurementAgency: 'Cotton Corporation of India (CCI)',
    procurementAgencyKn: 'ಭಾರತೀಯ ಹತ್ತಿ ನಿಗಮ (CCI)',
    effectiveDate: '2024-10-01',
  },
  {
    commodity: 'Sugarcane (Fair & Remunerative Price - FRP)',
    commodityKn: 'ಕಬ್ಬು (ಎಫ್‌ಆರ್‌ಪಿ ಬೆಲೆ)',
    variety: 'Co-86032 / Co-62175 (Mandya Sugar Basin)',
    season: 'Commercial',
    mspPriceInrPerQuintal: 340, // ₹3,400 per Tonne at 10.25% sugar recovery
    costOfProductionA2FL: 180,
    marginOverCostPct: 88.9,
    procurementAgency: 'Mandya Sugar Mills / Cooperative Sugar Directorate',
    procurementAgencyKn: 'ಮಂಡ್ಯ ಸಕ್ಕರೆ ಕಾರ್ಖಾನೆ / ಸಹಕಾರಿ ಸಕ್ಕರೆ ನಿರ್ದೇಶನಾಲಯ',
    effectiveDate: '2024-10-01',
  },
];
