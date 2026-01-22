
import { GoogleGenAI, Type, Modality } from "@google/genai";

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenAI;

  private constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  async generateLegalAdvice(prompt: string, language: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    // Gemini API requires the first message in contents to be from the 'user'.
    // We filter history to ensure it's a valid alternating sequence starting with 'user'.
    let validHistory = [...history];
    if (validHistory.length > 0 && validHistory[0].role === 'model') {
      validHistory.shift(); 
    }

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...validHistory,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are NyayAI, a highly expert legal assistant for Indian citizens. 
        Focus on providing advice based on the Indian Penal Code (IPC/BNS), Consumer Protection Act, and IT Act.
        Always suggest appropriate government portals or offices (like the nearest Police Station, Cyber Cell, or Lok Adalat).
        Answer in ${language}. Be empathetic, use simple language (no jargon), and step-by-step instructions.
        Avoid hallucinations. If you don't know a specific state scheme, use Google Search grounding.`,
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 4000 } // Reserve budget for complex legal logic
      }
    });

    return {
      text: response.text || "I apologize, but I couldn't process that request.",
      groundingMetadata: response.candidates?.[0]?.groundingMetadata
    };
  }

  async speak(text: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) return;

      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const decode = (base64: string) => {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
      };

      const decodeAudioData = async (
        data: Uint8Array,
        ctx: AudioContext,
        sampleRate: number,
        numChannels: number,
      ): Promise<AudioBuffer> => {
        const dataInt16 = new Int16Array(data.buffer);
        const frameCount = dataInt16.length / numChannels;
        const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

        for (let channel = 0; channel < numChannels; channel++) {
          const channelData = buffer.getChannelData(channel);
          for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
          }
        }
        return buffer;
      };

      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        outputAudioContext,
        24000,
        1
      );

      const source = outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(outputAudioContext.destination);
      source.start();
    } catch (error) {
      console.error("TTS failed:", error);
    }
  }

  async generateComplaintDraft(details: any, language: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Draft a professional legal complaint/letter based on these details: ${JSON.stringify(details)}. 
      Generate both an English version and a ${language} version. 
      The complaint should be ready to submit to the relevant authority.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            englishDraft: { type: Type.STRING },
            localDraft: { type: Type.STRING },
            suggestedAuthority: { type: Type.STRING },
            documentsNeeded: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        },
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });

    return JSON.parse(response.text || "{}");
  }
}
