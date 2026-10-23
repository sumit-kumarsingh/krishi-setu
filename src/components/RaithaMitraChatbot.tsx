import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  Bot,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS: Record<string, string[]> = {
  kn: [
    'ಕರ್ನಾಟಕ ರೈತ ಸಿರಿ & ಪಿಎಂ-ಕಿಸಾನ್ ಸಬ್ಸಿಡಿ ಹೇಗೆ ಪಡೆಯುವುದು?',
    'ರಾಗಿ ಕುತ್ತಿಗೆ ಬೆಂಕಿ ರೋಗ ನಿಯಂತ್ರಣ ಹೇಗೆ?',
    'ಮಂಡ್ಯ ಮಂಡಿ ಇಂದಿನ ರಾಗಿ ದರ ಎಷ್ಟು?',
    'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ 4% ಸಾಲಕ್ಕೆ ಅರ್ಜಿ ಹೇಗೆ?',
  ],
  en: [
    'How to get Karnataka Raitha Siri & PM-KISAN subsidy?',
    'How to prevent Ragi neck blast in humid weather?',
    'What are today Mandya APMC market rates?',
    'How to apply for KCC 4% subsidized crop loan?',
  ],
  hi: [
    'पीएम-किसान व सरकारी सब्सिडी की स्थिति क्या है?',
    'रागी और धान की फसल में कीट नियंत्रण कैसे करें?',
    'आज के मंडी भाव क्या हैं?',
    'केसीसी 4% ब्याज पर ऋण के लिए कैसे आवेदन करें?',
  ],
};

export const RaithaMitraChatbot: React.FC = () => {
  const {
    language,
    currentUser,
    speakText,
    stopSpeaking,
    startVoiceListening,
    stopVoiceListening,
    isListening,
    isOffline,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      role: 'model',
      text:
        language === 'kn'
          ? `ನಮಸ್ಕಾರ ${currentUser.name}! ನಾನು "ರೈತ ಮಿತ್ರ" (Raitha Mitra AI). ಬೆಳೆ ರೋಗ, ಮಂಡಿ ದರ, ರಸಗೊಬ್ಬರ ಮತ್ತು ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳ ಬಗ್ಗೆ ಕೇಳಿ.`
          : `Hello ${currentUser.name}! I am Raitha Mitra AI. Ask about crop diseases, mandi rates, soil health, or Karnataka government schemes.`,
      timestamp: 'Just now',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      if (isOffline) {
        throw new Error('OFFLINE_MODE');
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
          language,
          userProfile: currentUser,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error`);
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'model',
        text: data.text || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      let fallbackText = '';
      const lower = text.toLowerCase();

      if (lower.includes('blast') || lower.includes('ಬೆಂಕಿ ರೋಗ') || lower.includes('ರಾಗಿ')) {
        fallbackText =
          language === 'kn'
            ? 'ರಾಗಿ ಕುತ್ತಿಗೆ ಬೆಂಕಿ ರೋಗಕ್ಕೆ: 1) ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 0.6 ಗ್ರಾಂ ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ 75 WP ಅಥವಾ 5 ಗ್ರಾಂ ಸ್ಯೂಡೋಮೊನಾಸ್ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ. 2) ಸಾವಯವ: 3% ಪಂಚಗವ್ಯದೊಂದಿಗೆ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ. 3) ಮುಂಜಾನೆ ಮಂಜು ಇರುವಾಗ ಸಾರಜನಕ ಗೊಬ್ಬರ ಹೆಚ್ಚಾಗಿ ನೀಡಬೇಡಿ.'
            : 'For Ragi Neck Blast: 1) Spray Tricyclazole 75 WP @ 0.6g/L or bio-agent Pseudomonas fluorescens @ 5g/L. 2) Organic: 3% Panchagavya with 2ml/L neem oil. 3) Withhold heavy urea during fog.';
      } else if (lower.includes('mandi') || lower.includes('ದರ') || lower.includes('price')) {
        fallbackText =
          language === 'kn'
            ? 'ಇಂದಿನ ಮಂಡ್ಯ ಎಪಿಎಂಸಿ ದರ: ರಾಗಿ (FAQ): ₹3,620/ಕ್ವಿಂಟಾಲ್. ಭತ್ತ (ಸೋನಾ ಮಸೂರಿ): ₹2,610/ಕ್ವಿಂಟಾಲ್. ಟೊಮೇಟೊ: ₹1,550/ಕ್ವಿಂಟಾಲ್ (ಕೋಲಾರ).'
            : 'Today APMC Reference Rates: Ragi (Cleaned FAQ): Modal ₹3,620/Qtl. Paddy Sona Masoori: Modal ₹2,610/Qtl. Tomato: Modal ₹1,550/Qtl.';
      } else if (lower.includes('kcc') || lower.includes('ಸಾಲ') || lower.includes('loan')) {
        fallbackText =
          language === 'kn'
            ? 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC): ಸಕಾಲಿಕ ಮರುಪಾವತಿ ಮಾಡಿದರೆ ಬಡ್ಡಿ 4%. ₹3,00,000 ವರೆಗೆ ಸಂಸ್ಕರಣಾ ಶುಲ್ಕವಿಲ್ಲ. ಬೇಕಾಗುವ ದಾಖಲೆ: ಪಹಣಿ ನಕಲು, ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ವಿವರ.'
            : 'Kisan Credit Card (KCC): Effective interest is 4% p.a. with prompt repayment. Zero processing fee up to ₹3,00,000.';
      } else if (lower.includes('scheme') || lower.includes('ಯೋಜನೆ') || lower.includes('ಸಬ್ಸಿಡಿ') || lower.includes('subsidy') || lower.includes('siri') || lower.includes('kisan')) {
        fallbackText =
          language === 'kn'
            ? 'ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳು: 1) ರೈತ ಸಿರಿ: ರಾಗಿಗೆ ಹೆಕ್ಟೇರಿಗೆ ₹10,000 (ಗರಿಷ್ಠ ₹20,000). 2) ಪಿಎಂ-ಕಿಸಾನ್: ₹6,000/ವರ್ಷ ನೇರ ನಗದು. 3) ಕೃಷಿ ಭಾಗ್ಯ: ಕೃಷಿ ಹೊಂಡಕ್ಕೆ 80-90% ಸಬ್ಸಿಡಿ. 4) ಕ್ಷೀರಧಾರೆ: ಹಾಲಿಗೆ ₹5/ಲೀಟರ್ ಪ್ರೋತ್ಸಾಹಧನ.'
            : 'Verified Schemes: 1) Raitha Siri: ₹10,000/ha for millets via FRUITS FID. 2) PM-KISAN: ₹6,000/yr in 3 installments. 3) Krishi Bhagya: 80-90% subsidy for farm ponds. 4) Ksheera Dhare: ₹5/L milk incentive DBT.';
      } else {
        fallbackText =
          language === 'kn'
            ? 'ಕೃಷಿಸೇತು ಸಲಹೆ: ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಬೆಳೆ ಪರಿಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ. ತುರ್ತು ಮಾಹಿತಿಗೆ ಸಮೀಪದ ಮದ್ದೂರು ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಸಂಪರ್ಕಿಸಿ.'
            : 'KrishiSetu Advisory: For on-ground inspection, consult your local Maddur RSK agronomist.';
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'model',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopVoiceListening();
    } else {
      startVoiceListening((transcript) => {
        if (transcript) {
          setInputMessage(transcript);
          handleSendMessage(transcript);
        }
      });
    }
  };

  const handlePlayMessage = (msgId: string, text: string) => {
    if (speakingMessageId === msgId) {
      stopSpeaking();
      setSpeakingMessageId(null);
    } else {
      setSpeakingMessageId(msgId);
      speakText(text);
    }
  };

  const prompts = QUICK_PROMPTS[language] || QUICK_PROMPTS.en;

  return (
    <>
      {/* Compact Floating Chat Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-15 md:bottom-5 right-3 sm:right-5 z-40 px-3.5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white shadow-md flex items-center gap-2 font-bold text-xs active:scale-95 border border-stone-400"
          aria-label="Open Raitha Mitra AI Chatbot"
        >
          <Bot className="w-4 h-4 text-stone-200" />
          <span className="whitespace-nowrap">
            {language === 'kn' ? 'ರೈತ ಮಿತ್ರ' : 'Raitha Mitra AI'}
          </span>
        </button>
      )}

      {/* Compact Chat Window Dialog */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-88 sm:h-[500px] z-50 bg-white sm:rounded-2xl shadow-xl border border-stone-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-stone-900 text-white px-3.5 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-stone-900 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-stone-200" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs truncate">
                  {language === 'kn' ? 'ರೈತ ಮಿತ್ರ AI' : 'Raitha Mitra AI'}
                </div>
                <div className="text-[10px] text-stone-200 truncate">
                  {language === 'kn' ? 'ಕರ್ನಾಟಕ ಕೃಷಿ & ಮಂಡಿ ಸಲಹೆಗಾರ' : 'Karnataka Agriculture Assistant'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                stopSpeaking();
                setIsOpen(false);
              }}
              className="p-1 text-stone-200 hover:text-white rounded min-h-[32px] min-w-[32px] flex items-center justify-center"
              aria-label="Close Chatbot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2 bg-stone-50 border-b border-stone-200 overflow-x-auto flex gap-1 shrink-0 text-[11px]">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p)}
                className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700 whitespace-nowrap hover:bg-stone-100 hover:border-stone-300 shrink-0 text-[10px]"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs bg-stone-50/40">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-1.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                      <Bot className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl p-2.5 space-y-1 ${
                      isUser
                        ? 'bg-stone-900 text-white rounded-tr-xs'
                        : 'bg-white text-stone-900 border border-stone-200/80 rounded-tl-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap text-[11px]">{msg.text}</p>
                    <div className="flex items-center justify-between gap-2 pt-0.5 text-[9px] opacity-75">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handlePlayMessage(msg.id, msg.text)}
                          className="hover:opacity-100 flex items-center gap-0.5"
                          title="Read aloud"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>{language === 'kn' ? 'ಕೇಳಿ' : 'Listen'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-5 h-5 rounded-full bg-stone-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-1.5 text-stone-500 text-[11px] italic">
                <Bot className="w-3.5 h-3.5 text-stone-700" />
                <span>{language === 'kn' ? 'ಉತ್ತರಿಸುತ್ತಿದೆ...' : 'Thinking...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input & Voice Controls */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2 bg-white border-t border-stone-200 flex items-center gap-1.5"
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-1.5 rounded-lg h-9 w-9 flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-stone-900 text-white font-bold'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
              title="Speak"
            >
              {isListening ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                language === 'kn'
                  ? 'ಕೃಷಿ ಪ್ರಶ್ನೆ ಕೇಳಿ...'
                  : 'Ask question...'
              }
              className="flex-1 px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 h-9"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white h-9 w-9 flex items-center justify-center shrink-0"
              aria-label="Send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
