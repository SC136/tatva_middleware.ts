import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/database';
import { Transaction } from '@/types';
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  PieChart 
} from 'lucide-react';
import { ProfitLossChart } from "@/components/charts/ProfitLossChart";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { IncomeExpenseChart } from "@/components/charts/IncomeExpenseChart";
import { TrendChart } from "@/components/charts/TrendChart";

// Helper function for currency formatting
const formatCurrency = (amount: number, currency = '₹'): string => {
  return `${currency}${amount.toLocaleString('en-IN')}`;
};

export default function Analytics() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

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
  };

  // Calculate statistics based on transactions
  const reportStats = React.useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const profit = totalIncome - totalExpenses;
    const categories = [...new Set(transactions.map(t => t.category))].length;
    
    return { totalIncome, totalExpenses, profit, categories };
  }, [transactions]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive financial insights with interactive visualizations
          </p>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(reportStats.totalIncome)}</p>
                <p className="text-xs text-white/70">All time income</p>
              </div>
              <DollarSign className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Total Expenses</p>
                <p className="text-2xl font-bold">{formatCurrency(reportStats.totalExpenses)}</p>
                <p className="text-xs text-white/70">All time expenses</p>
              </div>
              <TrendingUp className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Net Profit</p>
                <p className="text-2xl font-bold">{formatCurrency(reportStats.profit)}</p>
                <p className="text-xs text-white/70">Total profit/loss</p>
              </div>
              <BarChart3 className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Categories</p>
                <p className="text-2xl font-bold">{reportStats.categories}</p>
                <p className="text-xs text-white/70">Active categories</p>
              </div>
              <PieChart className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod(period)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Button>
        ))}
      </div>

      {/* Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit & Loss Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Profit & Loss Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfitLossChart period={selectedPeriod} />
          </CardContent>
        </Card>
        
        {/* Category Breakdown */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryChart type="pie" transactionType="income" />
          </CardContent>
        </Card>
      </div>
      
      {/* Income vs Expenses Trend */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Income vs Expenses Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <IncomeExpenseChart type="line" period={selectedPeriod} />
        </CardContent>
      </Card>
      
      {/* Detailed Trend Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Income Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart metric="income" period={selectedPeriod} />
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Expense Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart metric="expenses" period={selectedPeriod} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}