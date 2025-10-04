import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Transaction } from '@/types';

// Helper function for currency formatting
const formatCurrency = (amount: number, currency = '₹'): string => {
  return `${currency}${amount.toLocaleString('en-IN')}`;
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

interface ReportStats {
  totalIncome: number;
  totalExpenses: number;
  profit: number;
  categories: number;
  transactionCount: number;
}

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
  count: number;
}

// Calculate report statistics
export function calculateReportStats(transactions: Transaction[]): ReportStats {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const categories = new Set(transactions.map(t => t.category)).size;
  
  return {
    totalIncome,
    totalExpenses,
    profit: totalIncome - totalExpenses,
    categories,
    transactionCount: transactions.length
  };
}

// Get category breakdown
export function getCategoryBreakdown(
  transactions: Transaction[],
  type: 'income' | 'expense' | 'all' = 'all'
): CategoryData[] {
  const filtered = type === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === type);
  
  const categoryTotals: Record<string, { amount: number; count: number }> = {};
  
  filtered.forEach(t => {
    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = { amount: 0, count: 0 };
    }
    categoryTotals[t.category].amount += t.amount;
    categoryTotals[t.category].count += 1;
  });
  
  const total = Object.values(categoryTotals).reduce((sum, v) => sum + v.amount, 0);
  
  return Object.entries(categoryTotals)
    .map(([category, data]) => ({
      category,
      amount: data.amount,
      percentage: total > 0 ? (data.amount / total) * 100 : 0,
      count: data.count
    }))
    .sort((a, b) => b.amount - a.amount);
}

// Generate PDF Report
export function generatePDFReport(
  reportType: string,
  transactions: Transaction[],
  stats: ReportStats
): void {
  const doc = new jsPDF();
  let yPos = 20;
  
  // Add title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(reportType, 20, yPos);
  yPos += 15;
  
  // Add date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 20, yPos);
  yPos += 15;
  
  // Add summary statistics
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Income: ${formatCurrency(stats.totalIncome)}`, 20, yPos);
  yPos += 7;
  doc.text(`Total Expenses: ${formatCurrency(stats.totalExpenses)}`, 20, yPos);
  yPos += 7;
  doc.text(`Net Profit/Loss: ${formatCurrency(stats.profit)}`, 20, yPos);
  yPos += 7;
  doc.text(`Total Transactions: ${stats.transactionCount}`, 20, yPos);
  yPos += 7;
  doc.text(`Active Categories: ${stats.categories}`, 20, yPos);
  yPos += 15;
  
  // Add category breakdown
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Category Breakdown', 20, yPos);
  yPos += 10;
  
  const categoryData = getCategoryBreakdown(transactions);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  categoryData.slice(0, 10).forEach(cat => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(
      `${cat.category}: ${formatCurrency(cat.amount)} (${cat.percentage.toFixed(1)}%)`,
      20,
      yPos
    );
    yPos += 7;
  });
  
  // Add recent transactions
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  } else {
    yPos += 10;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Recent Transactions', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const recentTransactions = transactions.slice(-20).reverse();
  recentTransactions.forEach(t => {
    if (yPos > 275) {
      doc.addPage();
      yPos = 20;
    }
    const typePrefix = t.type === 'income' ? '+' : '-';
    doc.text(
      `${formatDate(t.date)} | ${t.category} | ${typePrefix}${formatCurrency(t.amount)}`,
      20,
      yPos
    );
    yPos += 6;
  });
  
  // Save the PDF
  doc.save(`${reportType.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
}

// Generate Excel Report
export function generateExcelReport(
  reportType: string,
  transactions: Transaction[],
  stats: ReportStats
): void {
  const wb = XLSX.utils.book_new();
  
  // Summary Sheet
  const summaryData = [
    ['Report Type', reportType],
    ['Generated', new Date().toLocaleDateString('en-IN')],
    [''],
    ['Metric', 'Value'],
    ['Total Income', stats.totalIncome],
    ['Total Expenses', stats.totalExpenses],
    ['Net Profit/Loss', stats.profit],
    ['Total Transactions', stats.transactionCount],
    ['Active Categories', stats.categories]
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
  
  // Transactions Sheet
  const transactionsData = transactions.map(t => ({
    Date: formatDate(t.date),
    Type: t.type.charAt(0).toUpperCase() + t.type.slice(1),
    Category: t.category,
    Amount: t.amount,
    'Payment Method': t.paymentMethod || 'N/A',
    Description: t.description || 'N/A',
    Tags: t.tags?.join(', ') || 'N/A'
  }));
  const transactionsSheet = XLSX.utils.json_to_sheet(transactionsData);
  XLSX.utils.book_append_sheet(wb, transactionsSheet, 'Transactions');
  
  // Category Breakdown Sheet
  const categoryData = getCategoryBreakdown(transactions);
  const categoryBreakdown = categoryData.map(c => ({
    Category: c.category,
    Amount: c.amount,
    'Percentage': c.percentage.toFixed(2) + '%',
    'Transaction Count': c.count
  }));
  const categorySheet = XLSX.utils.json_to_sheet(categoryBreakdown);
  XLSX.utils.book_append_sheet(wb, categorySheet, 'Category Breakdown');
  
  // Income Sheet
  const incomeData = getCategoryBreakdown(transactions, 'income');
  const incomeBreakdown = incomeData.map(c => ({
    Category: c.category,
    Amount: c.amount,
    'Percentage': c.percentage.toFixed(2) + '%',
    'Transaction Count': c.count
  }));
  const incomeSheet = XLSX.utils.json_to_sheet(incomeBreakdown);
  XLSX.utils.book_append_sheet(wb, incomeSheet, 'Income by Category');
  
  // Expense Sheet
  const expenseData = getCategoryBreakdown(transactions, 'expense');
  const expenseBreakdown = expenseData.map(c => ({
    Category: c.category,
    Amount: c.amount,
    'Percentage': c.percentage.toFixed(2) + '%',
    'Transaction Count': c.count
  }));
  const expenseSheet = XLSX.utils.json_to_sheet(expenseBreakdown);
  XLSX.utils.book_append_sheet(wb, expenseSheet, 'Expense by Category');
  
  // Save the Excel file
  XLSX.writeFile(wb, `${reportType.replace(/\s+/g, '_')}_${Date.now()}.xlsx`);
}

// Generate quick reports
export function generateTodaysSummary(transactions: Transaction[]): void {
  const today = new Date().toISOString().split('T')[0];
  const todayTransactions = transactions.filter(t => t.date.startsWith(today));
  const stats = calculateReportStats(todayTransactions);
  
  generatePDFReport("Today's Summary Report", todayTransactions, stats);
}

export function generateWeeklyPL(transactions: Transaction[]): void {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekAgoStr = weekAgo.toISOString().split('T')[0];
  
  const weekTransactions = transactions.filter(t => t.date >= weekAgoStr);
  const stats = calculateReportStats(weekTransactions);
  
  generatePDFReport("Weekly Profit & Loss Report", weekTransactions, stats);
}

export function generateCategoryBreakdownReport(transactions: Transaction[]): void {
  const stats = calculateReportStats(transactions);
  generateExcelReport("Category Breakdown Report", transactions, stats);
}
