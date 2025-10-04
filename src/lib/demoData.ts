import { Transaction, Product } from '@/types';
import { subDays, subHours } from 'date-fns';

const now = new Date();

export const demoTransactions: Transaction[] = [
  // Recent transactions (last 7 days) - Income
  {
    id: 'tx-001',
    type: 'income',
    amount: 15000,
    category: 'Sales',
    description: 'Sale of electronics items',
    item: 'Laptop and accessories',
    date: new Date().toISOString(),
    paymentMethod: 'upi',
    tags: ['electronics', 'high-value'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-002',
    type: 'income',
    amount: 8500,
    category: 'Sales',
    description: 'Clothing items bulk order',
    item: 'T-shirts and jeans',
    date: subDays(now, 1).toISOString(),
    paymentMethod: 'card',
    tags: ['clothing', 'bulk'],
    createdAt: subDays(now, 1).toISOString(),
    updatedAt: subDays(now, 1).toISOString(),
  },
  {
    id: 'tx-003',
    type: 'income',
    amount: 5200,
    category: 'Services',
    description: 'Consulting service fee',
    item: 'Business consultation',
    date: subDays(now, 2).toISOString(),
    paymentMethod: 'bank_transfer',
    tags: ['service', 'professional'],
    createdAt: subDays(now, 2).toISOString(),
    updatedAt: subDays(now, 2).toISOString(),
  },
  {
    id: 'tx-004',
    type: 'income',
    amount: 12000,
    category: 'Sales',
    description: 'Grocery items sale',
    item: 'Mixed grocery products',
    date: subDays(now, 3).toISOString(),
    paymentMethod: 'cash',
    tags: ['groceries'],
    createdAt: subDays(now, 3).toISOString(),
    updatedAt: subDays(now, 3).toISOString(),
  },
  {
    id: 'tx-005',
    type: 'income',
    amount: 6800,
    category: 'Sales',
    description: 'Electronics accessories',
    item: 'Phone cases and chargers',
    date: subDays(now, 4).toISOString(),
    paymentMethod: 'upi',
    tags: ['electronics', 'accessories'],
    createdAt: subDays(now, 4).toISOString(),
    updatedAt: subDays(now, 4).toISOString(),
  },

  // Expenses
  {
    id: 'tx-006',
    type: 'expense',
    amount: 3500,
    category: 'Rent',
    description: 'Monthly shop rent',
    item: 'Rent payment',
    date: subDays(now, 1).toISOString(),
    paymentMethod: 'bank_transfer',
    tags: ['fixed', 'monthly'],
    createdAt: subDays(now, 1).toISOString(),
    updatedAt: subDays(now, 1).toISOString(),
  },
  {
    id: 'tx-007',
    type: 'expense',
    amount: 1200,
    category: 'Utilities',
    description: 'Electricity bill',
    item: 'Power bill',
    date: subDays(now, 2).toISOString(),
    paymentMethod: 'upi',
    tags: ['utilities', 'monthly'],
    createdAt: subDays(now, 2).toISOString(),
    updatedAt: subDays(now, 2).toISOString(),
  },
  {
    id: 'tx-008',
    type: 'expense',
    amount: 8000,
    category: 'Salary',
    description: 'Staff salary payment',
    item: 'Employee wages',
    date: subDays(now, 3).toISOString(),
    paymentMethod: 'bank_transfer',
    tags: ['salary', 'fixed'],
    createdAt: subDays(now, 3).toISOString(),
    updatedAt: subDays(now, 3).toISOString(),
  },
  {
    id: 'tx-009',
    type: 'expense',
    amount: 4500,
    category: 'Supplies',
    description: 'Inventory restocking',
    item: 'Product supplies',
    date: subDays(now, 5).toISOString(),
    paymentMethod: 'card',
    tags: ['inventory', 'supplies'],
    createdAt: subDays(now, 5).toISOString(),
    updatedAt: subDays(now, 5).toISOString(),
  },
  {
    id: 'tx-010',
    type: 'expense',
    amount: 800,
    category: 'Utilities',
    description: 'Internet and phone bill',
    item: 'Communication expenses',
    date: subDays(now, 6).toISOString(),
    paymentMethod: 'upi',
    tags: ['utilities', 'communication'],
    createdAt: subDays(now, 6).toISOString(),
    updatedAt: subDays(now, 6).toISOString(),
  },

  // Older transactions for trend analysis (last month)
  {
    id: 'tx-011',
    type: 'income',
    amount: 18000,
    category: 'Sales',
    description: 'High value electronics sale',
    item: 'Premium headphones and speaker',
    date: subDays(now, 15).toISOString(),
    paymentMethod: 'card',
    tags: ['electronics', 'premium'],
    createdAt: subDays(now, 15).toISOString(),
    updatedAt: subDays(now, 15).toISOString(),
  },
  {
    id: 'tx-012',
    type: 'income',
    amount: 9500,
    category: 'Sales',
    description: 'Clothing summer collection',
    item: 'Summer wear items',
    date: subDays(now, 20).toISOString(),
    paymentMethod: 'upi',
    tags: ['clothing', 'seasonal'],
    createdAt: subDays(now, 20).toISOString(),
    updatedAt: subDays(now, 20).toISOString(),
  },
  {
    id: 'tx-013',
    type: 'expense',
    amount: 3500,
    category: 'Rent',
    description: 'Previous month rent',
    item: 'Rent payment',
    date: subDays(now, 25).toISOString(),
    paymentMethod: 'bank_transfer',
    tags: ['fixed', 'monthly'],
    createdAt: subDays(now, 25).toISOString(),
    updatedAt: subDays(now, 25).toISOString(),
  },
  {
    id: 'tx-014',
    type: 'income',
    amount: 7200,
    category: 'Services',
    description: 'Installation service',
    item: 'Setup and installation',
    date: subDays(now, 28).toISOString(),
    paymentMethod: 'cash',
    tags: ['service'],
    createdAt: subDays(now, 28).toISOString(),
    updatedAt: subDays(now, 28).toISOString(),
  },
  {
    id: 'tx-015',
    type: 'expense',
    amount: 5500,
    category: 'Supplies',
    description: 'Bulk inventory purchase',
    item: 'Stock replenishment',
    date: subDays(now, 30).toISOString(),
    paymentMethod: 'bank_transfer',
    tags: ['inventory', 'bulk'],
    createdAt: subDays(now, 30).toISOString(),
    updatedAt: subDays(now, 30).toISOString(),
  },
];

export const demoProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    sku: 'ELC-HP-001',
    costPrice: 1500,
    sellingPrice: 2500,
    stockQuantity: 15,
    lowStockThreshold: 5,
    description: 'Premium wireless headphones with noise cancellation',
    createdAt: subDays(now, 60).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-002',
    name: 'Cotton T-Shirts (Pack of 3)',
    category: 'Clothing',
    sku: 'CLO-TS-002',
    costPrice: 600,
    sellingPrice: 1200,
    stockQuantity: 45,
    lowStockThreshold: 10,
    description: 'Comfortable cotton t-shirts in various colors',
    createdAt: subDays(now, 45).toISOString(),
    updatedAt: subDays(now, 5).toISOString(),
  },
  {
    id: 'prod-003',
    name: 'Organic Rice 5kg',
    category: 'Groceries',
    sku: 'GRO-RC-003',
    costPrice: 250,
    sellingPrice: 450,
    stockQuantity: 80,
    lowStockThreshold: 20,
    description: 'Premium organic basmati rice',
    createdAt: subDays(now, 30).toISOString(),
    updatedAt: subDays(now, 2).toISOString(),
  },
  {
    id: 'prod-004',
    name: 'USB-C Fast Charger',
    category: 'Electronics',
    sku: 'ELC-CH-004',
    costPrice: 300,
    sellingPrice: 600,
    stockQuantity: 3,
    lowStockThreshold: 8,
    description: '30W fast charging adapter with cable',
    createdAt: subDays(now, 25).toISOString(),
    updatedAt: subDays(now, 1).toISOString(),
  },
  {
    id: 'prod-005',
    name: 'Denim Jeans',
    category: 'Clothing',
    sku: 'CLO-JN-005',
    costPrice: 800,
    sellingPrice: 1800,
    stockQuantity: 22,
    lowStockThreshold: 8,
    description: 'Classic fit denim jeans for men and women',
    createdAt: subDays(now, 50).toISOString(),
    updatedAt: subDays(now, 10).toISOString(),
  },
  {
    id: 'prod-006',
    name: 'Cooking Oil 1L',
    category: 'Groceries',
    sku: 'GRO-OL-006',
    costPrice: 120,
    sellingPrice: 200,
    stockQuantity: 60,
    lowStockThreshold: 15,
    description: 'Pure sunflower cooking oil',
    createdAt: subDays(now, 20).toISOString(),
    updatedAt: subDays(now, 3).toISOString(),
  },
  {
    id: 'prod-007',
    name: 'Smartphone Screen Protector',
    category: 'Electronics',
    sku: 'ELC-SP-007',
    costPrice: 80,
    sellingPrice: 200,
    stockQuantity: 4,
    lowStockThreshold: 10,
    description: 'Tempered glass screen protector',
    createdAt: subDays(now, 15).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-008',
    name: 'Sports Shoes',
    category: 'Clothing',
    sku: 'CLO-SH-008',
    costPrice: 1200,
    sellingPrice: 2500,
    stockQuantity: 18,
    lowStockThreshold: 6,
    description: 'Comfortable running and sports shoes',
    createdAt: subDays(now, 40).toISOString(),
    updatedAt: subDays(now, 8).toISOString(),
  },
  {
    id: 'prod-009',
    name: 'Wheat Flour 10kg',
    category: 'Groceries',
    sku: 'GRO-FL-009',
    costPrice: 350,
    sellingPrice: 550,
    stockQuantity: 35,
    lowStockThreshold: 12,
    description: 'Premium quality wheat flour',
    createdAt: subDays(now, 35).toISOString(),
    updatedAt: subDays(now, 4).toISOString(),
  },
  {
    id: 'prod-010',
    name: 'Wireless Mouse',
    category: 'Electronics',
    sku: 'ELC-MS-010',
    costPrice: 250,
    sellingPrice: 500,
    stockQuantity: 25,
    lowStockThreshold: 8,
    description: 'Ergonomic wireless mouse with USB receiver',
    createdAt: subDays(now, 28).toISOString(),
    updatedAt: subDays(now, 6).toISOString(),
  },
  {
    id: 'prod-011',
    name: 'Leather Wallet',
    category: 'Clothing',
    sku: 'CLO-WL-011',
    costPrice: 400,
    sellingPrice: 900,
    stockQuantity: 2,
    lowStockThreshold: 5,
    description: 'Genuine leather bi-fold wallet',
    createdAt: subDays(now, 55).toISOString(),
    updatedAt: subDays(now, 1).toISOString(),
  },
  {
    id: 'prod-012',
    name: 'Tea Powder 500g',
    category: 'Groceries',
    sku: 'GRO-TP-012',
    costPrice: 150,
    sellingPrice: 280,
    stockQuantity: 55,
    lowStockThreshold: 15,
    description: 'Premium Assam tea powder',
    createdAt: subDays(now, 22).toISOString(),
    updatedAt: subDays(now, 2).toISOString(),
  },
];

// Helper function to load demo data into database
export function loadDemoData() {
  const confirmed = window.confirm(
    '⚠️ This will add demo data to your database.\n\n' +
    '📊 15 sample transactions\n' +
    '📦 12 sample products\n' +
    '💡 Includes low stock items for testing alerts\n\n' +
    'Continue?'
  );

  if (!confirmed) return false;

  try {
    // Get existing data
    const existingTransactions = JSON.parse(
      localStorage.getItem('smb_transactions') || '[]'
    );
    const existingProducts = JSON.parse(
      localStorage.getItem('smb_products') || '[]'
    );

    // Merge with demo data (avoid duplicates)
    const transactionIds = new Set(existingTransactions.map((t: Transaction) => t.id));
    const productIds = new Set(existingProducts.map((p: Product) => p.id));

    const newTransactions = demoTransactions.filter(t => !transactionIds.has(t.id));
    const newProducts = demoProducts.filter(p => !productIds.has(p.id));

    // Save merged data
    localStorage.setItem(
      'smb_transactions',
      JSON.stringify([...existingTransactions, ...newTransactions])
    );
    localStorage.setItem(
      'smb_products',
      JSON.stringify([...existingProducts, ...newProducts])
    );

    console.log(`✅ Demo data loaded successfully!`);
    console.log(`📊 Added ${newTransactions.length} transactions`);
    console.log(`📦 Added ${newProducts.length} products`);

    // Reload the page to reflect changes
    window.location.reload();
    return true;
  } catch (error) {
    console.error('❌ Error loading demo data:', error);
    return false;
  }
}
