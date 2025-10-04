import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Activity
} from "lucide-react";
import { db } from '@/lib/database';
import { Transaction, Product } from '@/types';
import { format, startOfMonth, startOfWeek, startOfDay, subDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTranslations, type Language } from '@/lib/translations';

export function Dashboard() {
  const { language } = usePreferences();
  const t = useTranslations((language || 'en') as Language);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('month');

  useEffect(() => {
    loadData();
    const unsubscribe = db.subscribe(() => loadData());
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const loadData = () => {
    setTransactions(db.getTransactions());
    setProducts(db.getProducts());
  };

  // Filter transactions by date range
  const getFilteredTransactions = () => {
    const now = new Date();
    let startDate: Date;

    switch (dateRange) {
      case 'today':
        startDate = startOfDay(now);
        break;
      case 'week':
        startDate = startOfWeek(now);
        break;
      case 'month':
        startDate = startOfMonth(now);
        break;
      default:
        startDate = startOfMonth(now);
    }

    return transactions.filter(t => new Date(t.date) >= startDate);
  };

  const filteredTransactions = getFilteredTransactions();

  // Calculate metrics
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;
  const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : '0.0';

  // Get previous period for comparison
  const getPreviousPeriodTransactions = () => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (dateRange) {
      case 'today':
        startDate = startOfDay(subDays(now, 1));
        endDate = startOfDay(now);
        break;
      case 'week':
        startDate = startOfWeek(subDays(now, 7));
        endDate = startOfWeek(now);
        break;
      case 'month':
        startDate = startOfMonth(subDays(now, 30));
        endDate = startOfMonth(now);
        break;
      default:
        startDate = startOfMonth(subDays(now, 30));
        endDate = startOfMonth(now);
    }

    return transactions.filter(t => {
      const date = new Date(t.date);
      return date >= startDate && date < endDate;
    });
  };

  const previousTransactions = getPreviousPeriodTransactions();
  const previousIncome = previousTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const incomeGrowth = previousIncome > 0 
    ? (((totalIncome - previousIncome) / previousIncome) * 100).toFixed(1)
    : totalIncome > 0 ? '100.0' : '0.0';

  // Get recent transactions (last 5)
  const recentTransactions = filteredTransactions.slice(0, 5);

  // Get low stock products
  const lowStockProducts = products.filter(p => p.stockQuantity <= p.lowStockThreshold);

  // Calculate total inventory value
  const inventoryValue = products.reduce((sum, p) => sum + (p.costPrice * p.stockQuantity), 0);

  // Get top categories
  const categoryTotals = filteredTransactions.reduce((acc, t) => {
    if (!acc[t.category]) {
      acc[t.category] = { income: 0, expense: 0, count: 0 };
    }
    if (t.type === 'income') {
      acc[t.category].income += t.amount;
    } else {
      acc[t.category].expense += t.amount;
    }
    acc[t.category].count += 1;
    return acc;
  }, {} as Record<string, { income: number; expense: number; count: number }>);

  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => (b[1].income + b[1].expense) - (a[1].income + a[1].expense))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t('businessDashboard')}</h1>
            <p className="text-muted-foreground">{t('overviewPerformance')}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={dateRange === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('today')}
            >
              {t('today')}
            </Button>
            <Button
              variant={dateRange === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('week')}
            >
              {t('week')}
            </Button>
            <Button
              variant={dateRange === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('month')}
            >
              {t('month')}
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Income */}
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className={`flex items-center text-sm ${Number(incomeGrowth) >= 0 ? 'text-green-100' : 'text-red-100'}`}>
                  {Number(incomeGrowth) >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                  {Math.abs(Number(incomeGrowth))}%
                </div>
              </div>
              <h3 className="text-sm font-medium text-white/80 mb-1">{t('totalIncome')}</h3>
              <p className="text-3xl font-bold">₹{totalIncome.toLocaleString()}</p>
            </CardContent>
          </Card>

          {/* Total Expenses */}
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingDown className="h-6 w-6" />
                </div>
                <div className="text-sm text-white/80">
                  {filteredTransactions.filter(t => t.type === 'expense').length} {t('transactionsCount')}
                </div>
              </div>
              <h3 className="text-sm font-medium text-white/80 mb-1">{t('totalExpenses')}</h3>
              <p className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</p>
            </CardContent>
          </Card>

          {/* Net Profit */}
          <Card className={`bg-gradient-to-br ${netProfit >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} text-white`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div className="text-sm text-white/80">
                  {profitMargin}% {t('margin')}
                </div>
              </div>
              <h3 className="text-sm font-medium text-white/80 mb-1">{t('netProfit')}</h3>
              <p className="text-3xl font-bold">₹{netProfit.toLocaleString()}</p>
            </CardContent>
          </Card>

          {/* Inventory Value */}
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Package className="h-6 w-6" />
                </div>
                <div className="text-sm text-white/80">
                  {products.length} {t('items')}
                </div>
              </div>
              <h3 className="text-sm font-medium text-white/80 mb-1">{t('inventoryValue')}</h3>
              <p className="text-3xl font-bold">₹{inventoryValue.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                {t('recentTransactions')}
              </CardTitle>
              <Link to="/transactions">
                <Button variant="ghost" size="sm">{t('viewAll')}</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentTransactions.length > 0 ? (
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {transaction.type === 'income' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.item}</p>
                          <p className="text-sm text-muted-foreground">{transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{format(new Date(transaction.date), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No transactions yet</p>
                  <Link to="/transactions">
                    <Button variant="link" size="sm" className="mt-2">Add your first transaction</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                {t('topCategories')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {topCategories.length > 0 ? (
                <div className="space-y-4">
                  {topCategories.map(([category, data]) => {
                    const total = data.income + data.expense;
                    const percentage = totalIncome + totalExpenses > 0 
                      ? ((total / (totalIncome + totalExpenses)) * 100).toFixed(0)
                      : '0';
                    
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{category}</span>
                          <span className="text-sm text-muted-foreground">₹{total.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{data.count} transactions</span>
                          <span className="text-xs text-muted-foreground">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No category data</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Low Stock Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Package className="h-5 w-5" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockProducts.length > 0 ? (
                <div className="space-y-3">
                  {lowStockProducts.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-lg">
                      <div>
                        <p className="font-medium text-orange-900 dark:text-orange-100">{product.name}</p>
                        <p className="text-sm text-orange-700 dark:text-orange-300">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-orange-600 dark:text-orange-400">{product.stockQuantity} left</p>
                        <p className="text-xs text-orange-600 dark:text-orange-400">Min: {product.lowStockThreshold}</p>
                      </div>
                    </div>
                  ))}
                  {lowStockProducts.length > 5 && (
                    <Link to="/inventory">
                      <Button variant="link" size="sm" className="w-full">
                        View {lowStockProducts.length - 5} more
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-20 text-green-500" />
                  <p>All products are well stocked! 🎉</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Transactions</p>
                  <p className="text-2xl font-bold">{filteredTransactions.length}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Avg Transaction</p>
                  <p className="text-2xl font-bold">
                    ₹{filteredTransactions.length > 0 
                      ? Math.round((totalIncome + totalExpenses) / filteredTransactions.length).toLocaleString()
                      : '0'}
                  </p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Categories</p>
                  <p className="text-2xl font-bold">{Object.keys(categoryTotals).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}