import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { db } from '@/lib/database';
import { IntegrationConfig } from '@/types';
import { FileSpreadsheet, MessageSquare, ShoppingBag, Database as DatabaseIcon, Download, Settings, CircleCheck as CheckCircle2, Circle as XCircle, Zap, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const integrationTemplates = [
  {
    id: 'excel',
    name: 'Microsoft Excel',
    type: 'excel' as const,
    description: 'Export your data to Excel spreadsheets',
    icon: FileSpreadsheet,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    features: ['One-click export', 'Formatted sheets', 'Charts included'],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    type: 'whatsapp' as const,
    description: 'Send reports and alerts via WhatsApp',
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    features: ['Daily reports', 'Alert notifications', 'Quick updates'],
  },
  {
    id: 'shopify',
    name: 'Shopify',
    type: 'shopify' as const,
    description: 'Sync products and orders with Shopify',
    icon: ShoppingBag,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    features: ['Product sync', 'Order import', 'Inventory updates'],
  },
  {
    id: 'tally',
    name: 'Tally ERP',
    type: 'tally' as const,
    description: 'Connect with Tally for accounting',
    icon: DatabaseIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    features: ['Accounting sync', 'Invoice export', 'Financial reports'],
  },
  {
    id: 'zoho',
    name: 'Zoho Books',
    type: 'zoho' as const,
    description: 'Integrate with Zoho accounting suite',
    icon: DatabaseIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    features: ['Book sync', 'Expense tracking', 'Tax management'],
  },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<typeof integrationTemplates[0] | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [config, setConfig] = useState({
    apiKey: '',
    webhookUrl: '',
    autoSync: false,
  });

  useEffect(() => {
    loadIntegrations();
    const unsubscribe = db.subscribe(() => loadIntegrations());
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const loadIntegrations = () => {
    setIntegrations(db.getIntegrations());
  };

  const getIntegrationStatus = (type: string) => {
    return integrations.find(i => i.type === type);
  };

  const handleToggleIntegration = (template: typeof integrationTemplates[0]) => {
    const existing = getIntegrationStatus(template.type);

    if (existing) {
      db.updateIntegration(existing.id, { ...existing, enabled: !existing.enabled });
      toast.success(`${template.name} ${!existing.enabled ? 'enabled' : 'disabled'}`);
    } else {
      setSelectedIntegration(template);
      setIsConfigDialogOpen(true);
    }
  };

  const handleSaveConfig = () => {
    if (!selectedIntegration) return;

    const integrationConfig: Partial<IntegrationConfig> = {
      id: selectedIntegration.id,
      name: selectedIntegration.name,
      type: selectedIntegration.type,
      enabled: true,
      apiKey: config.apiKey,
      webhookUrl: config.webhookUrl,
      settings: {
        autoSync: config.autoSync,
      },
    };

    db.updateIntegration(selectedIntegration.id, integrationConfig as IntegrationConfig);
    toast.success(`${selectedIntegration.name} configured successfully`);
    setIsConfigDialogOpen(false);
    setConfig({ apiKey: '', webhookUrl: '', autoSync: false });
    setSelectedIntegration(null);
  };

  const generateAnalysisReport = () => {
    const transactions = db.getTransactions();
    const products = db.getProducts();
    
    // Calculate statistics
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalIncome - totalExpenses;
    const lowStockProducts = products.filter(p => p.stockQuantity <= p.lowStockThreshold);
    
    // Format report
    const report = `📊 *Business Analysis Report*
━━━━━━━━━━━━━━━━━━━━

💰 *Financial Summary*
• Total Income: ₹${totalIncome.toLocaleString('en-IN')}
• Total Expenses: ₹${totalExpenses.toLocaleString('en-IN')}
• Net Profit: ₹${netProfit.toLocaleString('en-IN')}
• Profit Margin: ${totalIncome > 0 ? ((netProfit/totalIncome) * 100).toFixed(1) : 0}%

📦 *Inventory Status*
• Total Products: ${products.length}
• Low Stock Items: ${lowStockProducts.length}
${lowStockProducts.length > 0 ? '• Alert: ' + lowStockProducts.slice(0, 3).map(p => p.name).join(', ') : ''}

📈 *Transaction Overview*
• Total Transactions: ${transactions.length}
• Recent Activity: ${transactions.slice(-5).length} recent transactions

━━━━━━━━━━━━━━━━━━━━
Generated on: ${new Date().toLocaleDateString('en-IN')}

Powered by Tatva Business Manager`;
    
    return report;
  };

  const handleWhatsAppShare = () => {
    if (!whatsappNumber.trim()) {
      toast.error('Please enter a WhatsApp number');
      return;
    }
    
    // Clean the phone number (remove spaces, dashes, etc)
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    
    if (cleanNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    // Generate the report
    const report = generateAnalysisReport();
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(report);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    toast.success('Opening WhatsApp...');
    setIsWhatsAppDialogOpen(false);
    setWhatsappNumber('');
  };

  const handleExcelExport = () => {
    const transactions = db.getTransactions();
    const products = db.getProducts();

    const csvData = [
      ['Transaction Report'],
      ['Date', 'Type', 'Category', 'Description', 'Amount'],
      ...transactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.type,
        t.category,
        t.description,
        t.amount.toString(),
      ]),
      [],
      ['Product Inventory'],
      ['Name', 'Category', 'SKU', 'Stock', 'Cost Price', 'Selling Price'],
      ...products.map(p => [
        p.name,
        p.category,
        p.sku,
        p.stockQuantity.toString(),
        p.costPrice.toString(),
        p.sellingPrice.toString(),
      ]),
    ];

    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `business_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Excel export completed');
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground/80 mt-1">Connect your favorite tools and automate workflows</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">
                {integrations.filter(i => i.enabled).length}
              </p>
              <CheckCircle2 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{integrationTemplates.length}</p>
              <Zap className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-violet-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Auto-Sync Enabled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">
                {integrations.filter(i => i.enabled && i.settings?.autoSync).length}
              </p>
              <Settings className="w-8 h-8 text-violet-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrationTemplates.map(template => {
              const status = getIntegrationStatus(template.type);
              const Icon = template.icon;

              return (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${template.bgColor}`}>
                          <Icon className={`w-6 h-6 ${template.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription className="mt-1">{template.description}</CardDescription>
                        </div>
                      </div>
                      {status?.enabled && (
                        <Badge className="bg-emerald-500">Connected</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Features:</p>
                      <ul className="space-y-1">
                        {template.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      {template.type === 'excel' ? (
                        <Button onClick={handleExcelExport} className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Export to Excel
                        </Button>
                      ) : template.type === 'whatsapp' ? (
                        <Button
                          onClick={() => setIsWhatsAppDialogOpen(true)}
                          className="flex-1"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Share Report
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleToggleIntegration(template)}
                          className="flex-1"
                          variant={status?.enabled ? 'outline' : 'default'}
                        >
                          {status?.enabled ? 'Disconnect' : 'Connect'}
                        </Button>
                      )}
                      {status?.enabled && template.type !== 'whatsapp' && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedIntegration(template);
                            setConfig({
                              apiKey: status.apiKey || '',
                              webhookUrl: status.webhookUrl || '',
                              autoSync: status.settings?.autoSync || false,
                            });
                            setIsConfigDialogOpen(true);
                          }}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {integrations.filter(i => i.enabled).length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <XCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Active Integrations</h3>
                <p className="text-slate-600 mb-4">Connect your first integration to get started</p>
                <Button onClick={() => document.querySelector('[value="available"]')?.dispatchEvent(new Event('click'))}>
                  Browse Integrations
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {integrations.filter(i => i.enabled).map(integration => {
                const template = integrationTemplates.find(t => t.type === integration.type);
                if (!template) return null;
                const Icon = template.icon;

                return (
                  <Card key={integration.id}>
                    <CardContent className="py-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${template.bgColor}`}>
                            <Icon className={`w-6 h-6 ${template.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{integration.name}</h3>
                            <p className="text-sm text-slate-600">{template.description}</p>
                            {integration.settings?.autoSync && (
                              <Badge variant="outline" className="mt-2">
                                Auto-Sync Enabled
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-emerald-500">Active</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleIntegration(template)}
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                placeholder="Enter your API key"
              />
              <p className="text-xs text-slate-500">
                Get your API key from {selectedIntegration?.name} dashboard
              </p>
            </div>

            {selectedIntegration?.type !== 'excel' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
                  <Input
                    id="webhookUrl"
                    value={config.webhookUrl}
                    onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                    placeholder="https://your-webhook-url.com"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSync">Auto-Sync</Label>
                    <p className="text-xs text-slate-500">Automatically sync data changes</p>
                  </div>
                  <Switch
                    id="autoSync"
                    checked={config.autoSync}
                    onCheckedChange={(checked) => setConfig({ ...config, autoSync: checked })}
                  />
                </div>
              </>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsConfigDialogOpen(false);
                  setSelectedIntegration(null);
                  setConfig({ apiKey: '', webhookUrl: '', autoSync: false });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveConfig} className="flex-1">
                Save & Connect
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* WhatsApp Share Dialog */}
      <Dialog open={isWhatsAppDialogOpen} onOpenChange={setIsWhatsAppDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              Share Analysis Report via WhatsApp
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="e.g., +919876543210 or 9876543210"
              />
              <p className="text-xs text-muted-foreground">
                Enter the phone number with country code (e.g., +91 for India)
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium mb-2">Report Preview:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Financial Summary (Income, Expenses, Profit)</li>
                <li>• Inventory Status</li>
                <li>• Transaction Overview</li>
                <li>• Low Stock Alerts</li>
              </ul>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsWhatsAppDialogOpen(false);
                  setWhatsappNumber('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleWhatsAppShare} 
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Share on WhatsApp
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
