import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mic, MicOff, TrendingUp, TrendingDown, HelpCircle } from "lucide-react";
import { voiceAssistant } from '@/lib/voiceAssistant';
import { toast } from 'sonner';

interface VoiceTransactionProps {
  onTransactionDetected: (data: {
    type: 'income' | 'expense';
    amount: string;
    item: string;
    category: string;
    description: string;
  }) => void;
  language: 'en' | 'hi' | 'mr';
  onLanguageChange: (lang: 'en' | 'hi' | 'mr') => void;
}

export function VoiceTransaction({ onTransactionDetected, language, onLanguageChange }: VoiceTransactionProps) {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = async () => {
    if (!voiceAssistant.isSupported()) {
      toast.error('Voice input not supported in your browser', {
        description: 'Please use Chrome, Edge, or Safari browser for voice features.'
      });
      return;
    }

    try {
      setIsListening(true);
      toast.info('Listening...', {
        description: 'Speak now! Example: "50 rupees milk" or "sold items for 500"',
        duration: 10000,
      });

      const transcript = await voiceAssistant.startListening(language);
      
      toast.info('Heard: ' + transcript, {
        description: 'Processing your command...',
        duration: 2000,
      });

      const command = voiceAssistant.parseCommand(transcript, language);

      if (command && command.intent === 'add_transaction') {
        const { type, amount, description } = command.parameters;
        
        const detectedCategory = voiceAssistant.detectCategory(description || '', type);
        
        onTransactionDetected({
          type,
          amount: amount?.toString() || '',
          item: description || transcript,
          category: detectedCategory,
          description: description || transcript,
        });
        
        toast.success('Transaction details captured!', {
          description: `${type === 'income' ? 'Income' : 'Expense'}: ₹${amount} - ${description}`,
          duration: 5000,
        });
      } else {
        const examples = {
          en: 'Try: "50 rupees milk" or "sold items for 500" or "paid 200 for rent"',
          hi: 'कोशिश करें: "50 रुपये दूध" या "सामान बेचा 500 में" या "200 रुपये किराया दिया"',
          mr: 'प्रयत्न करा: "50 रुपये दूध" किंवा "सामान विकले 500 ला" किंवा "200 रुपये भाडे दिले"'
        };
        
        toast.warning('Could not understand the command', {
          description: examples[language],
          duration: 7000,
        });
      }
    } catch (error: any) {
      if (error.message.includes('no-speech')) {
        toast.error('No speech detected', {
          description: 'Please speak clearly into your microphone'
        });
      } else if (error.message.includes('not-allowed')) {
        toast.error('Microphone access denied', {
          description: 'Please allow microphone access in your browser settings'
        });
      } else {
        toast.error('Voice input failed', {
          description: error.message || 'Unknown error occurred'
        });
      }
    } finally {
      setIsListening(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value as 'en' | 'hi' | 'mr')}
        className="h-9 px-3 rounded-md border border-input bg-background text-sm"
      >
        <option value="en">EN</option>
        <option value="hi">HI</option>
        <option value="mr">MR</option>
      </select>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Voice Commands Guide</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Income Commands
              </h3>
              <div className="space-y-2 pl-6">
                <div>
                  <p className="font-medium text-sm">English:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>"50 rupees milk"</li>
                    <li>"sold 3 items for 150"</li>
                    <li>"received 5000 for sales"</li>
                    <li>"income 2000 from consulting"</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-sm">Hindi (हिन्दी):</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>"50 रुपये दूध बेचा"</li>
                    <li>"सामान बेचा 500 में"</li>
                    <li>"5000 रुपये मिले बिक्री से"</li>
                    <li>"आय 2000 रुपये"</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-sm">Marathi (मराठी):</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>"50 रुपये दूध विकले"</li>
                    <li>"सामान विकले 500 ला"</li>
                    <li>"5000 रुपये मिळाले विक्री"</li>
                    <li>"उत्पन्न 2000 रुपये"</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                Expense Commands
              </h3>
              <div className="space-y-2 pl-6">
                <div>
                  <p className="font-medium text-sm">English:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>"50 rupees milk"</li>
                    <li>"bought supplies for 300"</li>
                    <li>"paid 5000 for rent"</li>
                    <li>"expense 200 utilities"</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-sm">Hindi (हिन्दी):</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>"50 रुपये दूध खरीदा"</li>
                    <li>"सामान लिया 300 में"</li>
                    <li>"5000 रुपये किराया दिया"</li>
                    <li>"खर्च 200 रुपये बिजली"</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-sm">Marathi (मराठी):</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>"50 रुपये दूध घेतले"</li>
                    <li>"सामान खरेदी केले 300 ला"</li>
                    <li>"5000 रुपये भाडे दिले"</li>
                    <li>"खर्च 200 रुपये वीज"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">💡 Tips:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Categories are auto-detected from your description</li>
                <li>• You can edit all fields before saving</li>
                <li>• Speak clearly and at normal pace</li>
                <li>• Amount and item/description are required</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleVoiceInput}
        disabled={isListening}
        className={isListening ? 'bg-red-50 animate-pulse' : ''}
      >
        {isListening ? <MicOff className="mr-2 h-4 w-4 animate-pulse" /> : <Mic className="mr-2 h-4 w-4" />}
        {isListening ? 'Listening...' : 'Voice'}
      </Button>
    </div>
  );
}
