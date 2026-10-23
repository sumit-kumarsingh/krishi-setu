import React from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface VoiceAssistBarProps {
  onTranscriptReceived?: (text: string) => void;
}

export const VoiceAssistBar: React.FC<VoiceAssistBarProps> = ({ onTranscriptReceived }) => {
  const {
    language,
    isSpeaking,
    isListening,
    voiceTranscript,
    speakText,
    stopSpeaking,
    startVoiceListening,
    stopVoiceListening,
  } = useApp();

  const handleMicToggle = () => {
    if (isListening) {
      stopVoiceListening();
    } else {
      startVoiceListening((transcript) => {
        if (onTranscriptReceived) onTranscriptReceived(transcript);
      });
    }
  };

  const handleReadAloudWelcome = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const speechText =
        language === 'kn'
          ? 'ಕೃಷಿಸೇತು ಕರ್ನಾಟಕ. ಬೆಳೆ ವಿವರ, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ, ಎಪಿಎಂಸಿ ದರಗಳು ಇಲ್ಲಿವೆ. ಮಾತನಾಡಲು ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ.'
          : 'KrishiSetu Karnataka. View your crop timeline, weather advisory, and APMC mandi rates. Tap microphone to speak.';
      speakText(speechText);
    }
  };

  return (
    <div className="bg-[#fff4ea] text-stone-900 px-2.5 py-1.5 rounded-xl border border-stone-200 shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Audio Read-Aloud trigger */}
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            type="button"
            onClick={handleReadAloudWelcome}
            className={`h-7 px-2 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0 cursor-pointer ${
              isSpeaking
                ? 'bg-stone-900 text-white font-extrabold'
                : 'bg-stone-100 text-stone-950 hover:bg-stone-200'
            }`}
            title="Read screen aloud"
            aria-label="Read screen aloud"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3 h-3 shrink-0" />
                <span className="whitespace-nowrap">Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3 h-3 shrink-0 text-stone-700" />
                <span className="whitespace-nowrap">
                  {language === 'kn' ? 'ಧ್ವನಿ ಓದು' : 'Read Aloud'}
                </span>
              </>
            )}
          </button>

          <span className="text-[10px] text-stone-500 hidden sm:inline truncate">
            {isSpeaking
              ? language === 'kn' ? 'ಧ್ವನಿ ಓದುತ್ತಿದೆ...' : 'Speaking...'
              : isListening
              ? language === 'kn' ? 'ಮಾತನಾಡಿ...' : 'Listening...'
              : language === 'kn' ? 'ಕನ್ನಡ ಧ್ವನಿ ಸೌಲಭ್ಯ' : 'Voice Assistant'}
          </span>
        </div>

        {/* Right: Mic Button and Transcript */}
        <div className="flex items-center gap-1.5 shrink-0">
          {voiceTranscript && (
            <div className="bg-stone-100/90 text-stone-950 text-[10px] px-2 py-0.5 rounded max-w-[120px] sm:max-w-xs truncate font-medium">
              "{voiceTranscript}"
            </div>
          )}

          <button
            type="button"
            onClick={handleMicToggle}
            className={`h-7 px-2.5 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0 cursor-pointer ${
              isListening
                ? 'bg-stone-900 text-white ring-2 ring-stone-900'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
            title="Speech-to-text input"
            aria-label="Voice input"
          >
            {isListening ? (
              <>
                <MicOff className="w-3 h-3 shrink-0 text-red-400" />
                <span className="whitespace-nowrap">{language === 'kn' ? 'ನಿಲ್ಲಿಸಿ' : 'Stop'}</span>
              </>
            ) : (
              <>
                <Mic className="w-3 h-3 shrink-0 text-stone-200" />
                <span className="whitespace-nowrap">{language === 'kn' ? 'ಮಾತನಾಡಿ' : 'Speak'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
