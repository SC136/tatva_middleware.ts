import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  ExternalLink, 
  Star, 
  Clock, 
  TrendingUp,
  PiggyBank,
  Calculator,
  Target,
  Award,
  CheckCircle
} from "lucide-react";
import { usePreferences } from "@/contexts/PreferencesContext";

export default function Learn() {
  const { language } = usePreferences();
  
  const handleStartCourse = (videoUrl: string) => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  const courses = [
    {
      id: 1,
      title: "Small Business Financial Management",
      titleHindi: "छोटे व्यापार की वित्तीय प्रबंधन",
      description: "Master the basics of managing finances for your small business",
      descriptionHindi: "अपने छोटे व्यापार के लिए वित्त प्रबंधन की मूल बातें सीखें",
      level: "Beginner",
      duration: "45 mins",
      lessons: 8,
      rating: 4.8,
      language: "Hindi + English",
      category: "Finance Basics",
      color: "bg-success/10 text-success border-success/20",
      videoUrl: "https://youtu.be/MLIG1VVB8vE?si=R7sqGyekzBEVJjcg"
    },
    {
      id: 2,
      title: "Profit & Loss Understanding",
      titleHindi: "लाभ-हानि की समझ",
      description: "Learn how to calculate and improve your business profitability",
      descriptionHindi: "अपने व्यापार की लाभप्रदता की गणना और सुधार करना सीखें",
      level: "Intermediate", 
      duration: "30 mins",
      lessons: 5,
      rating: 4.9,
      language: "Marathi + Hindi",
      category: "Analytics",
      color: "bg-primary/10 text-primary border-primary/20",
      videoUrl: "https://youtu.be/hrSUq4wcd0g?si=9tng_-nQDfUj5it1"
    },
    {
      id: 3,
      title: "GST & Tax Planning",
      titleHindi: "जीएसटी और कर नियोजन",
      description: "Navigate GST requirements and optimize your tax planning",
      descriptionHindi: "जीएसटी आवश्यकताओं को समझें और अपनी कर योजना को अनुकूलित करें",
      level: "Advanced",
      duration: "60 mins", 
      lessons: 12,
      rating: 4.7,
      language: "English + Hindi",
      category: "Legal & Tax",
      color: "bg-warning/10 text-warning border-warning/20",
      videoUrl: "https://youtu.be/tIJLoqdwev0?si=i4O9O83p3idSGkTJ"
    },
    {
      id: 4,
      title: "Digital Payment Solutions",
      titleHindi: "डिजिटल भुगतान समाधान",
      description: "Understand and implement digital payment systems",
      descriptionHindi: "डिजिटल भुगतान प्रणालियों को समझें और लागू करें",
      level: "Beginner",
      duration: "25 mins",
      lessons: 4,
      rating: 4.6,
      language: "Hindi",
      category: "Technology",
      color: "bg-info/10 text-info border-info/20",
      videoUrl: "https://youtu.be/EXNP78eK6uA?si=rhSwQRciKQcTacnn"
    }
  ];

  const tips = [
    {
      category: "Daily Management",
      categoryHindi: "दैनिक प्रबंधन",
      tips: [
        {
          title: "Record Every Transaction",
          titleHindi: "हर लेन-देन दर्ज करें",
          content: "Use voice commands to quickly record all income and expenses. This ensures accuracy and saves time.",
          contentHindi: "सभी आय और व्यय को तुरंत रिकॉर्ड करने के लिए वॉयस कमांड का उपयोग करें।"
        },
        {
          title: "Check Daily Summary",
          titleHindi: "दैनिक सारांश देखें", 
          content: "Review your daily profit/loss before closing. Identify patterns and opportunities.",
          contentHindi: "दुकान बंद करने से पहले दैनिक लाभ-हानि की समीक्षा करें।"
        }
      ]
    },
    {
      category: "Growth Strategy",
      categoryHindi: "विकास रणनीति",
      tips: [
        {
          title: "Track Peak Hours",
          titleHindi: "व्यस्त समय को ट्रैक करें",
          content: "Use analytics to identify your busiest sales hours and optimize inventory accordingly.",
          contentHindi: "अपने सबसे व्यस्त बिक्री घंटों की पहचान करें और उसी अनुसार इन्वेंट्री को अनुकूलित करें।"
        },
        {
          title: "Focus on High-Margin Items",
          titleHindi: "उच्च मार्जिन वाली वस्तुओं पर ध्यान दें",
          content: "Promote products that give you better profit margins while maintaining customer satisfaction.",
          contentHindi: "ग्राहकों की संतुष्टि बनाए रखते हुए बेहतर लाभ मार्जिन देने वाले उत्पादों को बढ़ावा दें।"
        }
      ]
    }
  ];

  const achievements = [
    { name: "First Week Complete", icon: CheckCircle, earned: true },
    { name: "Voice Expert", icon: Award, earned: true },
    { name: "Analytics Pro", icon: TrendingUp, earned: false },
    { name: "Profit Master", icon: Target, earned: false }
  ];

  const getTranslation = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        title: "Learning Center",
        subtitle: "Improve your business skills with our courses and tips",
        myProgress: "My Progress",
        browseAll: "Browse All",
        achievements: "Your Achievements",
        trackProgress: "Track your learning progress",
        courses: "Courses",
        dailyTips: "Daily Tips",
        videoTutorials: "Video Tutorials",
        resources: "Resources",
        startCourse: "Start Course",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        lessons: "lessons",
        mins: "mins"
      },
      hi: {
        title: "शिक्षा केंद्र",
        subtitle: "अपने व्यवसाय कौशल को हमारे पाठ्यक्रम और सुझावों से सुधारें",
        myProgress: "मेरी प्रगति",
        browseAll: "सभी देखें",
        achievements: "आपकी उपलब्धियां",
        trackProgress: "अपनी सीखने की प्रगति ट्रैक करें",
        courses: "पाठ्यक्रम",
        dailyTips: "दैनिक सुझाव",
        videoTutorials: "वीडियो ट्यूटोरियल",
        resources: "संसाधन",
        startCourse: "पाठ्यक्रम शुरू करें",
        beginner: "शुरुआती",
        intermediate: "मध्यवर्ती",
        advanced: "उन्नत",
        lessons: "पाठ",
        mins: "मिनट"
      },
      mr: {
        title: "शिक्षण केंद्र",
        subtitle: "आमच्या अभ्यासक्रम आणि सुचनांसह तुमचे व्यवसाय कौशल्य सुधारा",
        myProgress: "माझी प्रगती",
        browseAll: "सर्व पहा",
        achievements: "तुमची उपलब्धी",
        trackProgress: "तुमची शिकण्याची प्रगती ट्रॅक करा",
        courses: "अभ्यासक्रम",
        dailyTips: "दैनिक सूचना",
        videoTutorials: "व्हिडिओ ट्यूटोरियल",
        resources: "संसाधने",
        startCourse: "अभ्यासक्रम सुरू करा",
        beginner: "नवशिक्या",
        intermediate: "मध्यम",
        advanced: "प्रगत",
        lessons: "धडे",
        mins: "मिनिटे"
      }
    };
    return translations[language || 'en']?.[key] || translations['en'][key];
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{getTranslation('title')}</h1>
          <p className="text-muted-foreground">
            {getTranslation('subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Star className="mr-2 h-4 w-4" />
            {getTranslation('myProgress')}
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <BookOpen className="mr-2 h-4 w-4" />
            {getTranslation('browseAll')}
          </Button>
        </div>
      </div>

      {/* Achievement Badges */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-warning" />
            {getTranslation('achievements')}
          </CardTitle>
          <CardDescription>{getTranslation('trackProgress')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg text-center border-2 transition-all ${
                  achievement.earned 
                    ? 'bg-success/10 border-success/20 text-success' 
                    : 'bg-muted/50 border-muted text-muted-foreground'
                }`}
              >
                <achievement.icon className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">{achievement.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">{getTranslation('courses')}</TabsTrigger>
          <TabsTrigger value="tips">{getTranslation('dailyTips')}</TabsTrigger>
          <TabsTrigger value="resources">{getTranslation('resources')}</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className={`shadow-card border-2 ${course.color}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">
                        {language === 'en' ? course.title : course.titleHindi}
                      </CardTitle>
                      <CardDescription>
                        {language === 'en' ? course.description : course.descriptionHindi}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {course.level === 'Beginner' && getTranslation('beginner')}
                      {course.level === 'Intermediate' && getTranslation('intermediate')}
                      {course.level === 'Advanced' && getTranslation('advanced')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration.replace('mins', getTranslation('mins'))}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.lessons} {getTranslation('lessons')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        {course.rating}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className="mr-2">{course.language}</Badge>
                        <Badge variant="outline">{course.category}</Badge>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-success"
                        onClick={() => handleStartCourse(course.videoUrl)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {getTranslation('startCourse')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          {tips.map((tipCategory, index) => (
            <Card key={index} className="shadow-card">
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? tipCategory.category : tipCategory.categoryHindi}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tipCategory.tips.map((tip, tipIndex) => (
                  <div key={tipIndex} className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      {language === 'en' ? tip.title : tip.titleHindi}
                    </h4>
                    <p className="text-sm">
                      {language === 'en' ? tip.content : tip.contentHindi}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Business Calculators
                </CardTitle>
                <CardDescription>Financial tools to help your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <PiggyBank className="mr-2 h-4 w-4" />
                  Profit Margin Calculator
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Break-even Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  ROI Calculator
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  External Resources
                </CardTitle>
                <CardDescription>Helpful links and references</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  Government Schemes for SMEs
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  GST Registration Guide  
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Digital India Resources
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Study Plan */}
      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <CardTitle>💡 Your Weekly Study Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">This Week's Focus</h4>
              <p className="text-sm text-muted-foreground">
                Complete "Small Business Financial Management" course and practice voice commands daily.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Next Week's Goal</h4>
              <p className="text-sm text-muted-foreground">
                Master profit calculation methods and start GST planning course.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}