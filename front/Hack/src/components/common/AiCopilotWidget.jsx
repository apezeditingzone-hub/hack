import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  ShieldAlert, 
  Zap,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { useRiskSafeguard } from '../../context/RiskSafeguardContext';

const PRESET_QUESTIONS = [
  "What is my current portfolio risk score?",
  "How should I allocate ₹50 Cr with minimum risk?",
  "What happens during a market flash crash?",
  "Explain 99% VaR and liquidity buffer"
];

export default function AiCopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { 
    totalAUM, 
    currentRiskScore, 
    currentLiquidity, 
    riskStatus, 
    executeFlightToSafety, 
    limits 
  } = useRiskSafeguard();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello! I am your AI Treasury Copilot. I am actively monitoring your ₹${(totalAUM / 10000000).toFixed(2)} Cr portfolio. Current Risk Score is ${currentRiskScore}/100 (${riskStatus.toUpperCase()}) with ${currentLiquidity}% liquid reserves. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const generateAiResponse = (userQuery) => {
    const lower = userQuery.toLowerCase();

    if (lower.includes('risk') || lower.includes('score')) {
      return {
        text: `Your current Composite Risk Score is **${currentRiskScore}/100**. Threshold policy is set at ${limits.criticalRiskScoreThreshold}. Your 1-Day 99% VaR is projected at ${(currentRiskScore * 0.055).toFixed(2)}% of AUM. Current portfolio status is **${riskStatus.toUpperCase()}**.`,
        action: currentRiskScore > limits.warningRiskScoreThreshold ? 'derisk' : null
      };
    }

    if (lower.includes('allocate') || lower.includes('50 cr') || lower.includes('invest') || lower.includes('capital')) {
      return {
        text: `For institutional ₹50 Cr capital preservation with optimal yield (12.5% target):\n• **38% (₹19 Cr)** in RBI 91-Day Sovereign T-Bills (6.74% yield)\n• **25% (₹12.5 Cr)** in CRISIL AAA Liquid Funds\n• **20% (₹10 Cr)** in GoI 10-Yr G-Sec Bonds\n• **17% (₹8.5 Cr)** in NIFTY 50 Bluechip Equities.`,
        action: 'view_portfolio'
      };
    }

    if (lower.includes('crash') || lower.includes('shock') || lower.includes('stress')) {
      return {
        text: `In a -24% NSE Flash Crash scenario:\n1. High-beta alpha drops by ~35%.\n2. Liquid reserves drain by 12%.\n3. **Automated Safeguard:** AI Sentinel triggers 'Flight to Safety', immediately sweeping 85% of capital into RBI T-Bills to guarantee 0% principal loss.`,
        action: 'simulate_shock'
      };
    }

    if (lower.includes('var') || lower.includes('liquidity')) {
      return {
        text: `**99% Value at Risk (VaR):** Upper bound of potential 1-day loss under normal conditions (currently ${(currentRiskScore * 0.055).toFixed(2)}%).\n**Liquidity Buffer Floor:** You currently have **${currentLiquidity}%** instant T+0 liquid funds against a policy floor of **${limits.minLiquidityPercent}%**.`,
        action: null
      };
    }

    return {
      text: `Based on current Indian market telemetry (NIFTY 50 @ 25,235, RBI 10Y Yield @ 6.86%):\nYour treasury allocation is operating within optimal Sharpe bounds (2.84). Would you like to optimize asset weights or run a stress test?`,
      action: null
    };
  };

  const handleSendMessage = (textToSend = inputMessage) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiResponse(textToSend);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.text,
        action: response.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999 }}>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '9999px',
            padding: '12px 20px',
            fontSize: '0.88rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 30px rgba(15, 23, 42, 0.35)',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #FF5B37 0%, #F59E0B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={13} color="#FFFFFF" />
          </div>
          <span>AI Copilot</span>
          <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '2px 7px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 800 }}>LIVE</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          style={{
            width: '380px',
            maxHeight: '560px',
            height: '80vh',
            background: '#FFFFFF',
            borderRadius: '22px',
            boxShadow: '0 20px 60px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'inherit',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              color: '#FFFFFF',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg, #FF5B37 0%, #F59E0B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={16} color="#FFFFFF" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>FinOpt AI Copilot</span>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Autonomous Treasury Intelligence</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#FFFFFF',
                width: 28,
                height: 28,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '90%',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    background: msg.sender === 'user' ? '#0F172A' : '#FFFFFF',
                    color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    fontSize: '0.82rem',
                    lineHeight: '1.4',
                    border: msg.sender === 'ai' ? '1px solid #E2E8F0' : 'none',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {msg.text}

                  {/* Action Button inside message if any */}
                  {msg.action === 'derisk' && (
                    <button
                      onClick={() => executeFlightToSafety('AI Copilot Direct Trigger')}
                      style={{
                        marginTop: '8px',
                        background: '#10B981',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Zap size={12} />
                      <span>Execute Flight to Safety Now</span>
                    </button>
                  )}
                </div>
                <span style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '2px', padding: '0 4px' }}>
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FFFFFF', padding: '8px 12px', borderRadius: '12px', width: 'fit-content', border: '1px solid #E2E8F0' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#94A3B8', animation: 'pulse 1s infinite' }} />
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#94A3B8', animation: 'pulse 1s infinite 0.2s' }} />
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#94A3B8', animation: 'pulse 1s infinite 0.4s' }} />
                <span style={{ fontSize: '0.72rem', color: '#64748B', marginLeft: '4px' }}>AI analyzing portfolio...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div style={{ padding: '8px 12px', background: '#FFFFFF', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '6px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: '#475569',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              padding: '10px 14px',
              background: '#FFFFFF',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <input
              type="text"
              placeholder="Ask AI Copilot anything about your capital..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.82rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              style={{
                background: '#FF5B37',
                color: '#FFFFFF',
                border: 'none',
                width: 34,
                height: 34,
                borderRadius: '8px',
                cursor: inputMessage.trim() ? 'pointer' : 'default',
                opacity: inputMessage.trim() ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
