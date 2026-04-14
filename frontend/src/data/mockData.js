export const demandSignals = [
  { id: 1, crop: 'Tomato',  region: 'Coimbatore Hub', trend: '↑ Rising 7 days', priority: 'high',   price: 22, change: '+₹4 over 7 days' },
  { id: 2, crop: 'Onion',   region: 'Madurai Belt',   trend: '→ Stable',        priority: 'stable', price: 31, change: '+₹1 over 7 days' },
  { id: 3, crop: 'Brinjal', region: 'Salem Link',     trend: '↑ Rising 7 days', priority: 'high',   price: 16, change: '+₹3 over 7 days' },
  { id: 4, crop: 'Groundnut', region: 'Trichy Cluster', trend: '→ Stable',      priority: 'stable', price: 55, change: '+₹0.5 over 7 days'  },
]

export const initialFarmerCrops = [
  { id: 1, crop: 'Tomato', quantity: 480, district: 'Erode' },
  { id: 2, crop: 'Groundnut', quantity: 320, district: 'Namakkal' },
]

export const initialApplications = [
  { id: 101, crop: 'Tomato',  quantity: 180, district: 'Erode',    region: 'Coimbatore Hub', trend: '↑ Rising 7 days', status: 'Pending',  farmer: 'K. Muthuvel'  },
  { id: 102, crop: 'Onion',   quantity: 260, district: 'Dindigul', region: 'Madurai Belt',   trend: '→ Stable',        status: 'Approved', farmer: 'R. Keerthana' },
  { id: 103, crop: 'Brinjal', quantity: 150, district: 'Salem',    region: 'Salem Link',     trend: '↑ Rising 7 days', status: 'Collected', farmer: 'S. Arumugam' },
]

export const supplyRegions = [
  { name: 'North Arc',      level: 'High',   products: [{ name: 'Tomato',    price: '₹22/kg', trend: 'up'     }, { name: 'Onion',     price: '₹31/kg', trend: 'up'     }] },
  { name: 'Delta East',     level: 'Medium', products: [{ name: 'Potato',    price: '₹18/kg', trend: 'stable' }] },
  { name: 'Central Plains', level: 'Low',    products: [{ name: 'Groundnut', price: '₹55/kg', trend: 'stable' }] },
  { name: 'Western Belt',   level: 'High',   products: [{ name: 'Brinjal',   price: '₹16/kg', trend: 'up'     }, { name: 'Carrot',    price: '₹24/kg', trend: 'up'     }] },
  { name: 'Southern Route', level: 'Medium', products: [{ name: 'Onion',     price: '₹28/kg', trend: 'stable' }] },
  { name: 'Hill Edge',      level: 'Low',    products: [{ name: 'Tomato',    price: '₹20/kg', trend: 'down'   }] },
]

export const scoreCards = [
  { key: 'Timeliness',        abbr: 'TL', value: 86, change: +4,  color: '#3ecf79', history: [72,75,78,80,82,84,86], description: 'On-time deliveries' },
  { key: 'Qty Accuracy',     abbr: 'QA', value: 92, change: +2,  color: '#6da3eb', history: [85,86,88,89,90,91,92], description: 'Orders fulfilled correctly' },
  { key: 'Settlement Speed', abbr: 'SS', value: 78, change: -3,  color: '#f0c040', history: [82,81,80,80,79,78,78], description: 'Avg. days to payment' },
  { key: 'Dispute Rate',     abbr: 'DR', value: 12, change: +2,  color: '#f08080', history: [8,9,9,10,11,12,12],   description: 'Disputes raised', inverse: true },
]

export const farmerSections = ['overview', 'myCrops', 'demandSignals', 'applyToSupply', 'mySubmissions', 'aiAdvisor']
export const intermediarySections = ['overview', 'incomingApplications', 'activeSupplyMap', 'logistics', 'performance']

export const mandiData = [
  {
    name: 'Coimbatore Mandi',
    crop: 'Tomato',
    prices: [18, 20, 22, 21, 24, 26, 28],
  },
  {
    name: 'Erode Mandi',
    crop: 'Tomato',
    prices: [16, 17, 17, 18, 18, 19, 19],
  },
  {
    name: 'Salem Mandi',
    crop: 'Tomato',
    prices: [20, 19, 21, 23, 22, 25, 27],
  },
  {
    name: 'Trichy Mandi',
    crop: 'Groundnut',
    prices: [55, 56, 57, 58, 60, 62, 64],
  },
  {
    name: 'Namakkal Mandi',
    crop: 'Groundnut',
    prices: [52, 53, 54, 54, 55, 55, 56],
  },
  {
    name: 'Madurai Mandi',
    crop: 'Onion',
    prices: [12, 13, 13, 14, 15, 15, 16],
  },
  {
    name: 'Dindigul Mandi',
    crop: 'Onion',
    prices: [11, 12, 12, 12, 13, 13, 14],
  },
  {
    name: 'Salem Mandi',
    crop: 'Brinjal',
    prices: [8, 9, 9, 10, 11, 12, 13],
  },
  {
    name: 'Dharmapuri Mandi',
    crop: 'Brinjal',
    prices: [7, 8, 8, 9, 9, 10, 10],
  },
]
