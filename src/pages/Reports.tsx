import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  PieChart, 
  BarChart3, 
  TrendingUp,
  Calendar,
  DollarSign,
  Clock
} from "lucide-react";
import { db } from '@/lib/database';
import { Transaction } from '@/types';
import { 
  generatePDFReport, 
  generateExcelReport, 
  calculateReportStats,
  generateTodaysSummary,
  generateWeeklyPL,
  generateCategoryBreakdownReport
} from '@/lib/reportGenerator';
import { useToast } from '@/hooks/use-toast';

// Helper function for currency formatting
const formatCurrency = (amount: number, currency = '₹'): string => {
  return `${currency}${amount.toLocaleString('en-IN')}`;
};

export default function Reports() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
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

  // Handle report downloads
  const handleDownloadPDF = (reportTitle: string) => {
    try {
      const stats = calculateReportStats(transactions);
      generatePDFReport(reportTitle, transactions, stats);
      toast({
        title: "Report Downloaded",
        description: `${reportTitle} has been downloaded as PDF.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF report.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadExcel = (reportTitle: string) => {
    try {
      const stats = calculateReportStats(transactions);
      generateExcelReport(reportTitle, transactions, stats);
      toast({
        title: "Report Downloaded",
        description: `${reportTitle} has been downloaded as Excel.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate Excel report.",
        variant: "destructive",
      });
    }
  };

  // Quick report handlers
  const handleQuickReport = (reportType: string) => {
    try {
      switch (reportType) {
        case "Today's Summary":
          generateTodaysSummary(transactions);
          break;
        case "Weekly P&L":
          generateWeeklyPL(transactions);
          break;
        case "Category Breakdown":
          generateCategoryBreakdownReport(transactions);
          break;
        default:
          toast({
            title: "Coming Soon",
            description: `${reportType} report generation will be available soon.`,
          });
          return;
      }
      toast({
        title: "Report Generated",
        description: `${reportType} report has been generated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate report.",
        variant: "destructive",
      });
    }
  };

  // Generate sample report data based on actual transactions
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

  const reports = [
    {
      id: 1,
      title: "Monthly P&L Statement",
      description: "Comprehensive profit and loss analysis for January 2024",
      type: "Financial",
      status: "Ready",
      date: "2024-01-31",
      size: "2.4 MB",
      format: "PDF",
      color: "bg-success/10 text-success border-success/20"
    },
    {
      id: 2, 
      title: "Category Performance Report",
      description: "Detailed breakdown of revenue by business category",
      type: "Analytics",
      status: "Ready",
      date: "2024-01-30",
      size: "1.8 MB", 
      format: "Excel",
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      id: 3,
      title: "Voice Transaction Analysis",
      description: "Analysis of voice-recorded transactions and accuracy metrics",
      type: "Voice Data",
      status: "Processing",
      date: "2024-01-29",
      size: "3.1 MB",
      format: "PDF",
      color: "bg-warning/10 text-warning border-warning/20"
    },
    {
      id: 4,
      title: "Tax Preparation Summary",
      description: "GST and income tax ready financial summary",
      type: "Tax",
      status: "Ready",
      date: "2024-01-28",
      size: "1.2 MB",
      format: "PDF", 
      color: "bg-info/10 text-info border-info/20"
    },
    {
      id: 5,
      title: "Customer Insights Report",
      description: "Peak hours, popular items, and customer behavior patterns",
      type: "Business Intelligence",
      status: "Ready", 
      date: "2024-01-27",
      size: "2.7 MB",
      format: "PDF",
      color: "bg-secondary/10 text-secondary border-secondary/20"
    },
    {
      id: 6,
      title: "Inventory Turnover Analysis",
      description: "Stock movement and inventory optimization recommendations",
      type: "Operations",
      status: "Scheduled",
      date: "2024-02-01",
      size: "N/A",
      format: "Excel",
      color: "bg-muted text-muted-foreground border-muted"
    }
  ];

  const quickReports = [
    { name: "Today's Summary", icon: Calendar, description: "Quick overview of today's transactions" },
    { name: "Weekly P&L", icon: TrendingUp, description: "7-day profit and loss summary" },
    { name: "Category Breakdown", icon: PieChart, description: "Current month category analysis" },
    { name: "Voice Accuracy", icon: BarChart3, description: "Voice recognition accuracy report" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready": return "bg-success text-success-foreground";
      case "Processing": return "bg-warning text-warning-foreground";
      case "Scheduled": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Reports
          </h1>
          <p className="text-muted-foreground">
            Generate comprehensive business reports and download them
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


          {/* Quick Reports */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickReports.map((report, index) => (
                <Card key={index} className="shadow-card hover:shadow-lg transition-all group">
                  <CardContent className="p-4 text-center">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <report.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-3 w-full"
                      onClick={() => handleQuickReport(report.name)}
                    >
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Generated Reports */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Generated Reports</h2>
              <Badge variant="secondary">{reports.length} reports</Badge>
            </div>
        
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} className={`shadow-card border-2 ${report.color}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{report.title}</h3>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {report.format}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{report.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                      <span>{report.size}</span>
                      <span className="font-medium text-foreground">{report.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownloadPDF(report.title)}
                      disabled={report.status !== "Ready"}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-primary to-primary/80"
                      onClick={() => handleDownloadExcel(report.title)}
                      disabled={report.status !== "Ready"}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
            </div>
          </div>

          {/* Report Insights */}
          <Card className="shadow-card bg-gradient-to-br from-background via-background to-muted/20">
            <CardHeader>
              <CardTitle>📊 Report Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 text-green-600">Strong Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    Your reports show {reportStats.profit >= 0 ? 'positive' : 'negative'} net profit of {formatCurrency(Math.abs(reportStats.profit))}.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-blue-600">Data Coverage</h4>
                  <p className="text-sm text-muted-foreground">
                    Reports generated from {transactions.length} transactions across {reportStats.categories} categories.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
    </div>
  );
}