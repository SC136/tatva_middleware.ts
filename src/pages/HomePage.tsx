import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Wallet, 
  ArrowRight, 
  Globe, 
  BarChart3, 
  Shield, 
  Smartphone,
  CheckCircle,
  Users,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Mic,
      title: "Voice-Enabled Recording",
      titleHindi: "आवाज़ से रिकॉर्डिंग",
      description: "Record transactions by speaking in Hindi, Marathi, or English",
      descriptionHindi: "हिंदी, मराठी या अंग्रेजी में बोलकर लेन-देन रिकॉर्ड करें",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      titleHindi: "स्मार्ट एनालिटिक्स",
      description: "Get instant insights into your business performance",
      descriptionHindi: "अपने व्यापार के प्रदर्शन की तुरंत जानकारी पाएं",
      color: "text-success"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      titleHindi: "बहुभाषी समर्थन",
      description: "Works seamlessly in multiple Indian languages",
      descriptionHindi: "कई भारतीय भाषाओं में निर्बाध रूप से काम करता है",
      color: "text-warning"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      titleHindi: "सुरक्षित और निजी",
      description: "Your business data is encrypted and secure",
      descriptionHindi: "आपका व्यापारिक डेटा एन्क्रिप्टेड और सुरक्षित है",
      color: "text-info"
    }
  ];

  const stats = [
    { number: "3", label: "Languages Supported", labelHindi: "समर्थित भाषाएं" },
    { number: "100%", label: "Free & Open", labelHindi: "मुफ्त और खुला" },
    { number: "Voice", label: "Enabled Recording", labelHindi: "आवाज़ से रिकॉर्डिंग" },
    { number: "Cloud", label: "& Local Storage", labelHindi: "और स्थानीय स्टोरेज" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Tatva Business
              </h1>
              <p className="text-xs text-muted-foreground">Smart Business Manager</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/login')} className="bg-gradient-primary">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              🎉 Now supporting 15+ Indian languages
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Voice-Enabled Business
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Expense Tracking
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Record transactions by voice in Hindi, Marathi, or English. Get instant financial insights for your small business.
            </p>
            <p className="text-lg text-muted-foreground">
              "50 रुपये दूध खरीदी" → Instant expense tracking
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-gradient-primary text-lg px-8 py-6"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground italic">{stat.labelHindi}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features for Small Businesses
            </h2>
            <p className="text-xl text-muted-foreground">
              छोटे व्यापार के लिए शक्तिशाली सुविधाएं
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`shadow-card hover:shadow-lg transition-all cursor-pointer group ${
                  activeFeature === index ? 'ring-2 ring-primary' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`h-16 w-16 rounded-full bg-background flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{feature.titleHindi}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <p className="text-xs text-muted-foreground italic mt-1">{feature.descriptionHindi}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary text-white">
        <div className="container mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Manage Your Business?
          </h2>
          <p className="text-xl opacity-90">
            अपने व्यापार को प्रबंधित करने के लिए तैयार हैं?
          </p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Start tracking your transactions with voice commands in Hindi, Marathi, or English.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-6"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Wallet className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg">Tatva Business</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Voice-enabled business management platform for Indian small businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => navigate('/help')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/learn')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Learn
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">App</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Get Started
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Tatva Business. All rights reserved. Made with ❤️ for Indian businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}