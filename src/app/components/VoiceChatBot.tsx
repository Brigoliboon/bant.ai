import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  Mic,
  MicOff,
  X,
  Volume2,
  VolumeX,
  Languages,
  ThumbsUp,
  ThumbsDown,
  Send,
  Bot,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  language: string;
  audioUrl?: string;
  helpful?: boolean;
}

const supportedLanguages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "tl", name: "Tagalog", flag: "🇵🇭" },
  { code: "ceb", name: "Cebuano", flag: "🇵🇭" },
  { code: "ilo", name: "Ilocano", flag: "🇵🇭" },
  { code: "war", name: "Waray", flag: "🇵🇭" },
  { code: "hil", name: "Hiligaynon", flag: "🇵🇭" },
];

interface VoiceChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceChatBot({ isOpen, onClose }: VoiceChatBotProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Kumusta! Ako ang inyong disaster alert assistant. Maaari ninyong itanong sa akin ang tungkol sa kasalukuyang panganib, evacuation routes, o emergency contacts. Paano ko kayo matutulungan ngayon?",
      timestamp: new Date(),
      language: "tl",
    },
  ]);
  const [transcribedText, setTranscribedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startListening = () => {
    setIsListening(true);
    setTranscribedText("");
    // Mock speech recognition
    setTimeout(() => {
      const mockTranscriptions = {
        "en": [
          "What's the flood risk in my area?",
          "Are there any evacuation orders?",
          "Show me the nearest emergency shelter",
          "What's the current heatwave alert level?",
          "Any misinformation alerts today?",
        ],
        "tl": [
          "Ano ang flood risk sa aming lugar?",
          "May evacuation orders ba?",
          "Saan ang pinakamalapit na emergency shelter?",
          "Ano ang kasalukuyang heatwave alert level?",
          "May misinformation alerts ba ngayon?",
        ],
        "ceb": [
          "Unsa ang flood risk sa among lugar?",
          "Aduna bay evacuation orders?",
          "Asa ang pinakaduol nga emergency shelter?",
          "Unsa ang kasamtangang heatwave alert level?",
          "Aduna bay misinformation alerts karon?",
        ]
      };
      
      const languageTranscriptions = mockTranscriptions[currentLanguage as keyof typeof mockTranscriptions] || mockTranscriptions.en;
      const randomTranscription = languageTranscriptions[Math.floor(Math.random() * languageTranscriptions.length)];
      setTranscribedText(randomTranscription);
      setIsListening(false);
      handleSendMessage(randomTranscription);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handleSendMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
      language: currentLanguage,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    // Mock AI response
    setTimeout(() => {
      const mockResponses = {
        "en": {
          "What's the flood risk in my area?": "Current flood risk in your area is MEDIUM (45%). Heavy rainfall is expected in the next 6 hours. Stay alert and avoid low-lying areas.",
          "Are there any evacuation orders?": "No active evacuation orders in your immediate area. However, residents in Central Valley should be prepared to evacuate if conditions worsen.",
          "Show me the nearest emergency shelter": "The nearest emergency shelter is at Lincoln Community Center, 2.3 miles away. It has capacity for 500 people and medical facilities available.",
          "What's the current heatwave alert level?": "Heat alert level is MODERATE. Temperature is 38°C with extreme UV index. Stay hydrated and avoid outdoor activities during peak hours (10 AM - 4 PM).",
          "Any misinformation alerts today?": "We detected 3 false posts about evacuation orders on social media. Only follow official emergency services for accurate information.",
        },
        "tl": {
          "Ano ang flood risk sa aming lugar?": "Ang kasalukuyang flood risk sa inyong lugar ay MEDIUM (45%). Inaasahan ang malakas na ulan sa susunod na 6 oras. Maging alerto at iwasan ang mababang lugar.",
          "May evacuation orders ba?": "Walang aktibong evacuation orders sa inyong lugar. Gayunpaman, ang mga residente sa Central Valley ay dapat maging handa na lumikas kung lumala ang sitwasyon.",
          "Saan ang pinakamalapit na emergency shelter?": "Ang pinakamalapit na emergency shelter ay sa Lincoln Community Center, 2.3 milya ang layo. May kapasidad para sa 500 katao at may medical facilities.",
          "Ano ang kasalukuyang heatwave alert level?": "Ang heat alert level ay MODERATE. Ang temperatura ay 38°C na may extreme UV index. Uminom ng tubig at iwasan ang outdoor activities sa peak hours (10 AM - 4 PM).",
          "May misinformation alerts ba ngayon?": "Nakita namin ang 3 maling post tungkol sa evacuation orders sa social media. Sundin lamang ang opisyal na emergency services para sa tumpak na impormasyon.",
        },
        "ceb": {
          "Unsa ang flood risk sa among lugar?": "Ang kasamtangang flood risk sa inyong lugar MEDIUM (45%). Gipaabot ang kusog nga ulan sa sunod nga 6 ka oras. Magbantay ug likayi ang ubos nga lugar.",
          "Aduna bay evacuation orders?": "Walay aktibong evacuation orders sa inyong lugar. Apan, ang mga residente sa Central Valley kinahanglan mag-andam nga mobalhin kung magkagrabe ang kahimtang.",
          "Asa ang pinakaduol nga emergency shelter?": "Ang pinakaduol nga emergency shelter sa Lincoln Community Center, 2.3 ka milya ang gilay-on. Adunay kapasidad para sa 500 ka tawo ug adunay medical facilities.",
          "Unsa ang kasamtangang heatwave alert level?": "Ang heat alert level MODERATE. Ang temperatura 38°C nga adunay extreme UV index. Mag-inom ug tubig ug likayi ang outdoor activities sa peak hours (10 AM - 4 PM).",
          "Aduna bay misinformation alerts karon?": "Nakita namo ang 3 ka sayop nga post bahin sa evacuation orders sa social media. Sunda lamang ang opisyal nga emergency services para sa tukma nga impormasyon.",
        }
      };

      const languageResponses = mockResponses[currentLanguage as keyof typeof mockResponses] || mockResponses.en;
      const response = languageResponses[text as keyof typeof languageResponses] || 
        (currentLanguage === "tl" ? "Naiintindihan ko ang inyong alalahanin. Hayaan ninyong ikonekta ko kayo sa emergency services para sa pinakatumpak na impormasyon. Gusto ninyo bang gawin ko iyon?" :
         currentLanguage === "ceb" ? "Nakasabot ko sa inyong kabalaka. Pasagdi ko nga ikonektar kamo sa emergency services para sa pinakatukma nga impormasyon. Gusto ninyo nga buhaton nako?" :
         "I understand your concern. Let me connect you with emergency services for the most accurate information. Would you like me to do that?");

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response,
        timestamp: new Date(),
        language: currentLanguage,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
      setTranscribedText("");
      
      // Mock text-to-speech
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3000);
    }, 2000);
  };

  const handleFeedback = (messageId: string, helpful: boolean) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    );
  };

  const getCurrentLanguageFlag = () => {
    return supportedLanguages.find(lang => lang.code === currentLanguage)?.flag || "🇺🇸";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl h-[80vh] flex flex-col"
        >
          <Card className="sentinelx-glass border-sentinelx-glass-border flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-sentinelx-glass-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 rounded-full bg-sentinelx-alert-yellow/20">
                    <Bot className="h-5 w-5 text-sentinelx-alert-yellow" />
                  </div>
                  {isSpeaking && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full sentinelx-pulse"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-white font-medium">Voice Assistant</h2>
                  <p className="text-sm text-muted-foreground">Disaster information & alerts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-sentinelx-glass-bg border-sentinelx-glass-border">
                  {getCurrentLanguageFlag()} {currentLanguage.toUpperCase()}
                </Badge>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.type === "bot" && (
                      <div className="p-2 rounded-full bg-sentinelx-alert-yellow/20 flex-shrink-0">
                        <Bot className="h-4 w-4 text-sentinelx-alert-yellow" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-sentinelx-alert-yellow/20 text-white"
                          : "bg-sentinelx-glass-bg border border-sentinelx-glass-border text-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-sentinelx-glass-border">
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.type === "bot" && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`p-1 h-6 w-6 ${
                                message.helpful === true ? "text-green-400" : "text-muted-foreground"
                              }`}
                              onClick={() => handleFeedback(message.id, true)}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`p-1 h-6 w-6 ${
                                message.helpful === false ? "text-red-400" : "text-muted-foreground"
                              }`}
                              onClick={() => handleFeedback(message.id, false)}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    {message.type === "user" && (
                      <div className="p-2 rounded-full bg-sentinelx-glass-bg border border-sentinelx-glass-border flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex gap-3 justify-start">
                    <div className="p-2 rounded-full bg-sentinelx-alert-yellow/20 flex-shrink-0">
                      <Bot className="h-4 w-4 text-sentinelx-alert-yellow" />
                    </div>
                    <div className="bg-sentinelx-glass-bg border border-sentinelx-glass-border p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-sentinelx-alert-yellow rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-sentinelx-alert-yellow rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-sentinelx-alert-yellow rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Voice Input */}
            <div className="p-4 border-t border-sentinelx-glass-border">
              {transcribedText && (
                <div className="mb-3 p-3 bg-sentinelx-glass-bg border border-sentinelx-glass-border rounded-lg">
                  <p className="text-sm text-white">{transcribedText}</p>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <Button
                  size="lg"
                  className={`flex-1 h-12 ${
                    isListening
                      ? "bg-sentinelx-crimson-red hover:bg-sentinelx-crimson-red/80"
                      : "bg-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/80"
                  } text-black font-medium`}
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-5 w-5 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5 mr-2" />
                      Start Voice Input
                    </>
                  )}
                </Button>
                
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="p-3 bg-sentinelx-glass-bg border border-sentinelx-glass-border rounded-lg text-white text-sm"
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-sentinelx-glass-bg">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="p-3 bg-sentinelx-glass-bg border-sentinelx-glass-border"
                >
                  {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                Tap and speak your question in any supported language
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
