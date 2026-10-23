export interface FarmerOrder {
  id: string;
  orderNumber: string;
  orderDate: string;
  title: string;
  titleKn: string;
  titleHi: string;
  category: 'seeds' | 'fertilizer' | 'machinery' | 'service' | 'logistics';
  imageUrl: string;
  priceInr: number;
  quantity: string;
  vendorName: string;
  status: 'ordered' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  statusLabelEn: string;
  statusLabelKn: string;
  statusLabelHi: string;
  expectedDelivery: string;
  deliveryAddress: string;
  trackingSteps: {
    title: string;
    date: string;
    completed: boolean;
  }[];
}

export const MOCK_FARMER_ORDERS: FarmerOrder[] = [
  {
    id: 'ord_101',
    orderNumber: 'OD-KS-2026-98124',
    orderDate: '20 Oct 2026',
    title: 'Certified GI Kalaburagi Red Gram Seeds (BRG-2)',
    titleKn: 'ಪ್ರಮಾಣೀಕೃತ ಕಲಬುರಗಿ ತೊಗರಿ ಬಿತ್ತನೆ ಬೀಜ (BRG-2)',
    titleHi: 'प्रमाणित कलबुर्गी अरहर बीज (BRG-2)',
    category: 'seeds',
    imageUrl: 'https://images.unsplash.com/photo-1599818816942-d6961ea15a97?auto=format&fit=crop&w=600&q=80',
    priceInr: 2850,
    quantity: '2 Bags (25 kg each)',
    vendorName: 'Kaveri Certified Seed Cooperative, Mandya',
    status: 'delivered',
    statusLabelEn: 'Delivered Today',
    statusLabelKn: 'ಇಂದು ವಿತರಿಸಲಾಗಿದೆ',
    statusLabelHi: 'आज वितरित किया गया',
    expectedDelivery: 'Delivered on Oct 22, 2026',
    deliveryAddress: 'Sy. No. 84/2, Somanathahalli Village, Kalaburagi',
    trackingSteps: [
      { title: 'Order Confirmed', date: '20 Oct, 10:30 AM', completed: true },
      { title: 'Dispatched from Hub', date: '21 Oct, 08:00 AM', completed: true },
      { title: 'Out for Delivery', date: '22 Oct, 09:15 AM', completed: true },
      { title: 'Delivered at Farm Gate', date: '22 Oct, 11:30 AM', completed: true },
    ],
  },
  {
    id: 'ord_102',
    orderNumber: 'OD-KS-2026-98255',
    orderDate: '21 Oct 2026',
    title: '45HP Tractor + Rotavator Plowing Service',
    titleKn: '45HP ಟ್ರ್ಯಾಕ್ಟರ್ + ರೋಟವೇಟರ್ ಉಳುಮೆ ಸೇವೆ',
    titleHi: '45HP ट्रैक्टर + रोटावेटर जुताई सेवा',
    category: 'machinery',
    imageUrl: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80',
    priceInr: 2550,
    quantity: '3 Hours Field Session',
    vendorName: 'Kalyana Karnataka Agri Fleet (Driver: Sharanappa)',
    status: 'out_for_delivery',
    statusLabelEn: 'Arriving Today (In 40 Mins)',
    statusLabelKn: 'ಇಂದು ಬರುತ್ತಿದೆ (40 ನಿಮಿಷಗಳಲ್ಲಿ)',
    statusLabelHi: 'आज आ रहा है (40 मिनट में)',
    expectedDelivery: 'Today by 02:30 PM',
    deliveryAddress: 'North Plot, Bettada Hula, Somanathahalli',
    trackingSteps: [
      { title: 'Booking Confirmed', date: '21 Oct, 04:00 PM', completed: true },
      { title: 'Driver Assigned (KA-32-EA-8841)', date: '22 Oct, 07:30 AM', completed: true },
      { title: 'En Route to Farm Plot', date: '22 Oct, 01:15 PM', completed: true },
      { title: 'Service Completion & Inspection', date: 'Expected 04:30 PM', completed: false },
    ],
  },
  {
    id: 'ord_103',
    orderNumber: 'OD-KS-2026-97880',
    orderDate: '19 Oct 2026',
    title: 'Organic Jeevamrutha & Neem Bio-Pesticide Kit',
    titleKn: 'ಸಾವಯವ ಜೀವಾಮೃತ ಮತ್ತು ಬೇವಿನ ಜೈವಿಕ ಕೀಟನಾಶಕ ಕಿಟ್',
    titleHi: 'जैविक जीवामृत एवं नीम कीटनाशक किट',
    category: 'fertilizer',
    imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
    priceInr: 1420,
    quantity: '50 Litres Drum + 5kg Neem Cake',
    vendorName: 'Savayava Bhagya Organic Store, Farhatabad',
    status: 'shipped',
    statusLabelEn: 'Shipped (Arriving Tomorrow)',
    statusLabelKn: 'ರವಾನಿಸಲಾಗಿದೆ (ನಾಳೆ ಬರಲಿದೆ)',
    statusLabelHi: 'भेज दिया गया (कल पहुंचेगा)',
    expectedDelivery: 'Expected by Oct 23, 2026',
    deliveryAddress: 'Farm House, Somanathahalli',
    trackingSteps: [
      { title: 'Order Placed', date: '19 Oct, 02:15 PM', completed: true },
      { title: 'Quality Assayed & Packed', date: '20 Oct, 11:00 AM', completed: true },
      { title: 'In Transit via Rural Express', date: '21 Oct, 05:40 PM', completed: true },
      { title: 'Delivery to Farmhouse', date: 'Expected 23 Oct', completed: false },
    ],
  },
  {
    id: 'ord_104',
    orderNumber: 'OD-KS-2026-96510',
    orderDate: '15 Oct 2026',
    title: 'Drone Agri-Sprayer Session (Foliar Micronutrients)',
    titleKn: 'ಡ್ರೋನ್ ಸಿಂಪರಣಾ ಸೇವೆ (ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶಗಳು)',
    titleHi: 'ड्रोन छिड़काव सेवा (सूक्ष्म पोषक तत्व)',
    category: 'service',
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
    priceInr: 1800,
    quantity: '4 Acres Coverage',
    vendorName: 'Karnataka Drone Mission Pilot Fleet',
    status: 'delivered',
    statusLabelEn: 'Completed on Oct 16',
    statusLabelKn: 'ಅಕ್ಟೋಬರ್ 16 ರಂದು ಮುಕ್ತಾಯವಾಗಿದೆ',
    statusLabelHi: '16 अक्टूबर को संपन्न हुआ',
    expectedDelivery: 'Completed Oct 16, 2026',
    deliveryAddress: 'Survey 84/2, Somanathahalli',
    trackingSteps: [
      { title: 'Flight Scheduled', date: '15 Oct, 09:00 AM', completed: true },
      { title: 'Pilot Dispatched with GPS Waypoints', date: '16 Oct, 06:30 AM', completed: true },
      { title: 'Aerial Spray Completed (4.0 Acres)', date: '16 Oct, 08:45 AM', completed: true },
      { title: 'Digital Flight Log Stamped', date: '16 Oct, 09:00 AM', completed: true },
    ],
  },
];
