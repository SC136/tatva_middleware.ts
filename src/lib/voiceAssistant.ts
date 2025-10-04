import { VoiceCommand } from '@/types';

export class VoiceAssistant {
  private recognition: any = null;
  private isListening = false;

  constructor() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  isSupported(): boolean {
    return this.recognition !== null;
  }

  async startListening(language: 'en' | 'hi' | 'mr' = 'en'): Promise<string> {
    if (!this.recognition) {
      throw new Error('Speech recognition not supported');
    }

    const langMap = {
      en: 'en-US',
      hi: 'hi-IN',
      mr: 'mr-IN',
    };

    this.recognition.lang = langMap[language];

    return new Promise((resolve, reject) => {
      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.isListening = false;
        resolve(transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        reject(new Error(event.error));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.isListening = true;
      this.recognition.start();
    });
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  parseCommand(transcript: string, language: 'en' | 'hi' | 'mr' = 'en'): VoiceCommand | null {
    const lowerTranscript = transcript.toLowerCase();

    if (language === 'hi') {
      return this.parseHindiCommand(lowerTranscript);
    } else if (language === 'mr') {
      return this.parseMarathiCommand(lowerTranscript);
    }

    return this.parseEnglishCommand(lowerTranscript);
  }

  private parseEnglishCommand(text: string): VoiceCommand | null {
    // Simple pattern first - just "amount rupees item" (most common for quick entry)
    // This catches "50 rupees milk" without needing action verbs
    const simplePattern = /^(?:rupees? |rs\.? |₹)?(\d+)\s*(?:rupees?|rs\.?|₹)?\s+(.+)$/i;
    const simpleMatch = text.match(simplePattern);
    if (simpleMatch) {
      const amount = parseFloat(simpleMatch[1]);
      const description = simpleMatch[2].trim();
      
      // Determine if income or expense based on keywords
      const isIncome = /\b(sold|sale|sales|received|income|earned|got|मिला|बेचा|विकले)\b/i.test(description);
      
      return {
        command: text,
        intent: 'add_transaction',
        parameters: {
          type: isIncome ? 'income' : 'expense',
          amount: amount,
          description: description,
        },
        language: 'en',
      };
    }

    const addIncomePatterns = [
      // "add income of 5000 for sales" / "add income 5000 for sales"
      /add income (?:of )?(?:rupees? |rs\.? |₹)?(\d+)(?: for| from)? (.*)/i,
      // "received 5000 for sales" / "received 5000 rupees for sales"
      /received (?:rupees? |rs\.? |₹)?(\d+)(?: for| from)? (.*)/i,
      // "sale of 5000 for products" / "sales 5000"
      /sale(?:s)? (?:of )?(?:rupees? |rs\.? |₹)?(\d+)(?: for)? (.*)/i,
      // "sold 3 items for 150 rupees" / "sold items for 150"
      /sold (?:.*?)?(?:for )?(?:rupees? |rs\.? |₹)?(\d+)(?: (?:for|from))? ?(.*)/i,
      // "earned 5000 from consulting" / "got 5000 for work"
      /(?:earned|got) (?:rupees? |rs\.? |₹)?(\d+)(?: (?:from|for))? (.*)/i,
      // "income 5000 sales" (simple format)
      /income (?:rupees? |rs\.? |₹)?(\d+) ?(.*)/i,
      // "5000 income from sales" (amount first)
      /(?:rupees? |rs\.? |₹)?(\d+) (?:rupees? )?income(?: from| for)? (.*)/i,
    ];

    const addExpensePatterns = [
      // "add expense of 500 for supplies"
      /add expense (?:of )?(?:rupees? |rs\.? |₹)?(\d+)(?: for)? (.*)/i,
      // "spent 500 on groceries" / "spent 500 rupees on milk"
      /spent (?:rupees? |rs\.? |₹)?(\d+)(?: (?:on|for))? (.*)/i,
      // "paid 500 for rent"
      /paid (?:rupees? |rs\.? |₹)?(\d+)(?: (?:for|to))? (.*)/i,
      // "bought milk for 50 rupees" / "bought 50 rupees milk"
      /bought (?:.*?)?(?:for )?(?:rupees? |rs\.? |₹)?(\d+)(?: rupees?)?(?: for)? ?(.*)/i,
      // "expense 500 utilities" (simple format)
      /expense (?:rupees? |rs\.? |₹)?(\d+) ?(.*)/i,
      // "50 expense for milk" (amount first)
      /(?:rupees? |rs\.? |₹)?(\d+) (?:rupees? )?expense(?: for| on)? (.*)/i,
      // "purchased supplies for 300"
      /purchased (?:.*?)?(?:for )?(?:rupees? |rs\.? |₹)?(\d+)(?: for)? ?(.*)/i,
    ];

    const queryPatterns = [
      /show (today'?s?|this week'?s?|this month'?s?) (sales|revenue|expenses|profit)/i,
      /what is (my|the) (total revenue|total expense|profit)/i,
      /how much did i (earn|spend|make) (today|this week|this month)/i,
    ];

    const stockPatterns = [
      /check stock (?:for |of )?(.*)/i,
      /how many (.*) (?:do i have|in stock)/i,
      /stock level (?:of |for )?(.*)/i,
    ];

    for (const pattern of addIncomePatterns) {
      const match = text.match(pattern);
      if (match) {
        return {
          command: text,
          intent: 'add_transaction',
          parameters: {
            type: 'income',
            amount: parseFloat(match[1]),
            description: match[2].trim(),
          },
          language: 'en',
        };
      }
    }

    for (const pattern of addExpensePatterns) {
      const match = text.match(pattern);
      if (match) {
        return {
          command: text,
          intent: 'add_transaction',
          parameters: {
            type: 'expense',
            amount: parseFloat(match[1]),
            description: match[2].trim(),
          },
          language: 'en',
        };
      }
    }

    for (const pattern of queryPatterns) {
      const match = text.match(pattern);
      if (match) {
        return {
          command: text,
          intent: 'query_data',
          parameters: {
            period: match[1]?.replace(/['s]/g, '') || 'today',
            metric: match[2],
          },
          language: 'en',
        };
      }
    }

    for (const pattern of stockPatterns) {
      const match = text.match(pattern);
      if (match) {
        return {
          command: text,
          intent: 'check_stock',
          parameters: {
            product: match[1]?.trim(),
          },
          language: 'en',
        };
      }
    }

    if (text.includes('show') && (text.includes('dashboard') || text.includes('analytics'))) {
      return {
        command: text,
        intent: 'show_analytics',
        parameters: {},
        language: 'en',
      };
    }

    return null;
  }

  private parseHindiCommand(text: string): VoiceCommand | null {
    // Income patterns in Hindi
    const hindiIncomePatterns = [
      // "50 रुपये आय दूध बेचा" / "50 रुपये मिले बिक्री से"
      /(\d+)\s*(?:रुपये?|रुपया|rupees?)?\s*(?:आय|मिले?|बिक्री|income|sale)\s*(.*)/i,
      // "आय 50 रुपये दूध" / "बिक्री 100 रुपये"
      /(?:आय|बिक्री|मिले?|income|sale)\s*(\d+)\s*(?:रुपये?|रुपया|rupees?)?\s*(.*)/i,
      // "दूध बेचा 50 रुपये में" / "सामान बेचा 500 में"
      /(.*?)\s*(?:बेचा|बेची|sold)\s*(\d+)\s*(?:रुपये?|में)?/i,
    ];

    for (const pattern of hindiIncomePatterns) {
      const match = text.match(pattern);
      if (match) {
        const amount = pattern.toString().includes('बेचा') ? match[2] : match[1];
        const desc = pattern.toString().includes('बेचा') ? match[1] : match[2];
        return {
          command: text,
          intent: 'add_transaction',
          parameters: {
            type: 'income',
            amount: parseFloat(amount),
            description: desc?.trim() || text,
          },
          language: 'hi',
        };
      }
    }

    // Expense patterns in Hindi
    const hindiExpensePatterns = [
      // "50 रुपये खर्च दूध पर" / "50 रुपये दिए किराया"
      /(\d+)\s*(?:रुपये?|रुपया|rupees?)?\s*(?:खर्च|दिये?|दिया|expense|paid)\s*(.*)/i,
      // "खर्च 50 रुपये दूध" / "दिया 100 रुपये"
      /(?:खर्च|दिये?|दिया|expense|paid)\s*(\d+)\s*(?:रुपये?|रुपया|rupees?)?\s*(.*)/i,
      // "दूध खरीदा 50 रुपये में" / "सामान लिया 500 में"
      /(.*?)\s*(?:खरीदा|खरीदी|लिया|bought)\s*(\d+)\s*(?:रुपये?|में)?/i,
    ];

    for (const pattern of hindiExpensePatterns) {
      const match = text.match(pattern);
      if (match) {
        const amount = pattern.toString().includes('खरीदा|लिया') ? match[2] : match[1];
        const desc = pattern.toString().includes('खरीदा|लिया') ? match[1] : match[2];
        return {
          command: text,
          intent: 'add_transaction',
          parameters: {
            type: 'expense',
            amount: parseFloat(amount),
            description: desc?.trim() || text,
          },
          language: 'hi',
        };
      }
    }

    // Simple Hindi pattern - just "amount rupees item"
    const simpleHindiPattern = /^(?:रुपये?|रुपया)?(\d+)\s*(?:रुपये?|रुपया)?\s+(.+)$/i;
    const simpleMatch = text.match(simpleHindiPattern);
    if (simpleMatch) {
      const amount = parseFloat(simpleMatch[1]);
      const description = simpleMatch[2].trim();
      
      // Determine if income or expense based on Hindi keywords
      const isIncome = /\b(बेचा|बेची|मिला|मिले|विकले|sale|sold)\b/i.test(description);
      
      return {
        command: text,
        intent: 'add_transaction',
        parameters: {
          type: isIncome ? 'income' : 'expense',
          amount: amount,
          description: description,
        },
        language: 'hi',
      };
    }

    if (text.includes('दिखाओ') || text.includes('बताओ')) {
      return {
        command: text,
        intent: 'show_analytics',
        parameters: {},
        language: 'hi',
      };
    }

    return null;
  }

  private parseMarathiCommand(text: string): VoiceCommand | null {
    // Income patterns in Marathi
    const marathiIncomePatterns = [
      // "50 रुपये उत्पन्न दूध विकले" / "50 रुपये मिळाले विक्री"
      /(\d+)\s*(?:रुपये?|रुपया|rupees?)?\s*(?:उत्पन्न|मिळाले?|विक्री|income|sale)\s*(.*)/i,
      // "उत्पन्न 50 रुपये दूध" / "विक्री 100 रुपये"
      /(?:उत्पन्न|विक्री|मिळाले?|income|sale)\s*(\d+)\s*(?:रुपये?|रुपया|rupees?)?\s*(.*)/i,
      // "दूध विकले 50 रुपयांना" / "सामान विकले 500 ला"
      /(.*?)\s*(?:विकले?|विकली|sold)\s*(\d+)\s*(?:रुपये?|ला|ना)?/i,
    ];

    for (const pattern of marathiIncomePatterns) {
      const match = text.match(pattern);
      if (match) {
        const amount = pattern.toString().includes('विकले') ? match[2] : match[1];
        const desc = pattern.toString().includes('विकले') ? match[1] : match[2];
        return {
          command: text,
          intent: 'add_transaction',
          parameters: {
            type: 'income',
            amount: parseFloat(amount),
            description: desc?.trim() || text,
          },
          language: 'mr',
        };
      }
    }

    // Expense patterns in Marathi
    const marathiExpensePatterns = [
      // "50 रुपये खर्च दुधावर" / "50 रुपये दिले भाडे"
      /(\d+)\s*(?:रुपये?|रुपया|rupees?)?\s*(?:खर्च|दिले?|expense|paid)\s*(.*)/i,
      // "खर्च 50 रुपये दूध" / "दिले 100 रुपये"
      /(?:खर्च|दिले?|expense|paid)\s*(\d+)\s*(?:रुपये?|रुपया|rupees?)?\s*(.*)/i,
      // "दूध खरेदी केले 50 रुपयांना" / "सामान घेतले 500 ला"
      /(.*?)\s*(?:खरेदी|घेतले?|bought)\s*(\d+)\s*(?:रुपये?|ला|ना)?/i,
    ];

    for (const pattern of marathiExpensePatterns) {
      const match = text.match(pattern);
      if (match) {
        const amount = pattern.toString().includes('खरेदी|घेतले') ? match[2] : match[1];
        const desc = pattern.toString().includes('खरेदी|घेतले') ? match[1] : match[2];
        return {
          command: text,
          intent: 'add_transaction',
          parameters: {
            type: 'expense',
            amount: parseFloat(amount),
            description: desc?.trim() || text,
          },
          language: 'mr',
        };
      }
    }

    // Simple Marathi pattern - just "amount rupees item"
    const simpleMarathiPattern = /^(?:रुपये?|रुपया)?(\d+)\s*(?:रुपये?|रुपया)?\s+(.+)$/i;
    const simpleMatch = text.match(simpleMarathiPattern);
    if (simpleMatch) {
      const amount = parseFloat(simpleMatch[1]);
      const description = simpleMatch[2].trim();
      
      // Determine if income or expense based on Marathi keywords
      const isIncome = /\b(विकले?|विकली|मिळाले?|sale|sold)\b/i.test(description);
      
      return {
        command: text,
          intent: 'add_transaction',
        parameters: {
          type: isIncome ? 'income' : 'expense',
          amount: amount,
          description: description,
        },
        language: 'mr',
      };
    }

    if (text.includes('दाखवा') || text.includes('सांग')) {
      return {
        command: text,
        intent: 'show_analytics',
        parameters: {},
        language: 'mr',
      };
    }

    return null;
  }

  speak(text: string, language: 'en' | 'hi' | 'mr' = 'en') {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const langMap = {
        en: 'en-US',
        hi: 'hi-IN',
        mr: 'mr-IN',
      };
      utterance.lang = langMap[language];
      window.speechSynthesis.speak(utterance);
    }
  }

  // Smart category detection based on keywords
  detectCategory(description: string, type: 'income' | 'expense'): string {
    const lowerDesc = description.toLowerCase();

    if (type === 'income') {
      // Income categories
      if (lowerDesc.match(/\b(sale|sold|product|item|goods|merchandise)\b/i)) {
        return 'Sales Revenue';
      }
      if (lowerDesc.match(/\b(service|consulting|work|project|job)\b/i)) {
        return 'Service Income';
      }
      if (lowerDesc.match(/\b(rent|rental|lease|tenant)\b/i)) {
        return 'Rental Income';
      }
      if (lowerDesc.match(/\b(commission|bonus|incentive)\b/i)) {
        return 'Commission';
      }
      if (lowerDesc.match(/\b(refund|return|cashback)\b/i)) {
        return 'Refunds Received';
      }
      if (lowerDesc.match(/\b(investment|interest|dividend|profit|gain)\b/i)) {
        return 'Investment Returns';
      }
      return 'Other Income';
    } else {
      // Expense categories
      if (lowerDesc.match(/\b(milk|bread|groceries|food|vegetables|fruits|eggs|rice|flour|daal|दूध|दाल|आटा)\b/i)) {
        return 'Inventory Purchase';
      }
      if (lowerDesc.match(/\b(rent|rental|lease|भाडे)\b/i)) {
        return 'Rent';
      }
      if (lowerDesc.match(/\b(electric|electricity|water|gas|bill|utility|बिजली|पानी)\b/i)) {
        return 'Utilities';
      }
      if (lowerDesc.match(/\b(salary|wage|payment|staff|employee|वेतन|तनख्वाह)\b/i)) {
        return 'Office Supplies';
      }
      if (lowerDesc.match(/\b(marketing|advertising|ad|promotion|प्रचार)\b/i)) {
        return 'Marketing';
      }
      if (lowerDesc.match(/\b(transport|petrol|diesel|fuel|vehicle|travel|यात्रा)\b/i)) {
        return 'Transportation';
      }
      if (lowerDesc.match(/\b(insurance|policy|premium|बीमा)\b/i)) {
        return 'Insurance';
      }
      if (lowerDesc.match(/\b(tax|gst|vat|duty|कर)\b/i)) {
        return 'Taxes';
      }
      if (lowerDesc.match(/\b(equipment|machine|tool|device|उपकरण)\b/i)) {
        return 'Equipment';
      }
      if (lowerDesc.match(/\b(maintenance|repair|fix|service|मरम्मत)\b/i)) {
        return 'Maintenance';
      }
      if (lowerDesc.match(/\b(office|supplies|stationery|paper|pen|कार्यालय)\b/i)) {
        return 'Office Supplies';
      }
      return 'Other Expenses';
    }
  }
}

export const voiceAssistant = new VoiceAssistant();
