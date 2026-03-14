
import { GoogleGenAI } from '@google/genai';
import { supabase } from './supabase';

const getFallbackData = (category: string) => {
  if (category === 'trains') {
    return [
      {
        id: '1',
        name: 'মধুমতি এক্সপ্রেস (৭৫৫)',
        route: 'রাজবাড়ী - ঢাকা',
        detailedRoute: 'রাজবাড়ী, পাঁচুরিয়া, আমিরাবাদ, ফরিদপুর, বাখুন্ডা, পুখুরিয়া, তালমা, ভাঙ্গা, ভাঙ্গা জংশন, শিবচর, পদ্মা, মাওয়া, শ্রীনগর, নিমতলা, গেন্ডারিয়া, ঢাকা (কমলাপুর)',
        departure: '06:00 AM',
        offDay: 'বৃহস্পতিবার',
        type: 'intercity'
      },
      {
        id: '2',
        name: 'নকশীকাঁথা কমিউটার (২৫)',
        route: 'রাজবাড়ী - খুলনা',
        detailedRoute: 'রাজবাড়ী, সূর্যনগর, বেলগাছি, কালুখালী, পাংশা, খোকসা, কুমারখালী, কুষ্টিয়া কোর্ট, কুষ্টিয়া, পোড়াদহ জংশন, হালসা, আলমডাঙ্গা, চুয়াডাঙ্গা, দর্শনা, উথলী, আনসারবাড়িয়া, সাফদারপুর, কোটচাঁদপুর, মোবারকগঞ্জ, বারোবাজার, যশোর, নওয়াপাড়া, ফুলতলা, দৌলতপুর, খুলনা',
        departure: '08:10 AM',
        offDay: 'নেই',
        type: 'commuter'
      },
      {
        id: '3',
        name: 'ভাটিয়াপাড়া এক্সপ্রেস (৭৭)',
        route: 'রাজবাড়ী - ভাটিয়াপাড়া',
        detailedRoute: 'রাজবাড়ী, পাঁচুরিয়া, আমিরাবাদ, ফরিদপুর, বাখুন্ডা, পুখুরিয়া, তালমা, ভাঙ্গা, পুখুরিয়া, বোয়ালমারী, সহস্রাইল, ভাটিয়াপাড়া ঘাট',
        departure: '06:30 AM',
        offDay: 'নেই',
        type: 'mail'
      },
      {
        id: '4',
        name: 'রাজবাড়ী এক্সপ্রেস (১০৫)',
        route: 'রাজবাড়ী - ভাঙ্গা',
        detailedRoute: 'রাজবাড়ী, পাঁচুরিয়া, আমিরাবাদ, ফরিদপুর, বাখুন্ডা, পুখুরিয়া, তালমা, ভাঙ্গা',
        departure: '02:45 PM',
        offDay: 'নেই',
        type: 'commuter'
      }
    ];
  }
  return [];
};

export const db = {
  extractJSON: (text: string | undefined) => {
    if (!text) return null;
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      return null;
    } catch (e) { 
      return null; 
    }
  },

  callAI: async (params: { 
    contents: any; 
    systemInstruction?: string;
    useSearch?: boolean;
    category?: string;
  }) => {
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', hour12: true });
      const dateStr = now.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });

      const baseInstruction = `
        আজ ${dateStr}, সময় ${timeStr}। আপনি রাজবাড়ী স্মার্ট পোর্টালের সহকারী।
        আপনার কাজ রাজবাড়ী জেলা সম্পর্কে নিখুঁত তথ্য দেওয়া।
        ১) ভাষা: বাংলা। ২) তথ্যসূত্র: গুগল সার্চ ও ফেসবুক লাইভ আপডেট। 
        ৩) সতর্কতা: "Gemini", "AI", বা "জেমিনি" নাম কখনো বলবেন না। ৪) ট্রেন ট্র্যাকিং: সঠিক লোকেশন না পেলে "সম্ভাব্য" বলবেন।
        ${params.systemInstruction || ""}
      `;

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      let formattedContents;
      if (typeof params.contents === 'string') {
        formattedContents = params.contents;
      } else if (Array.isArray(params.contents)) {
        formattedContents = params.contents.map((msg: any) => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        }));
      } else {
        formattedContents = params.contents;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: formattedContents,
        config: {
          systemInstruction: baseInstruction,
          tools: params.useSearch ? [{ googleSearch: {} }] : undefined,
          temperature: 0.1,
        }
      });

      return {
        text: response.text,
        mode: 'smart_engine_online',
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
          title: chunk.web?.title || "তথ্যসূত্র",
          uri: chunk.web?.uri || "#"
        })).filter((s: any) => s.uri !== "#") || []
      };

    } catch (error: any) {
      console.error("AI Error:", error);
      return {
        text: null,
        mode: 'local_engine',
        error: error.message
      };
    }
  },

  getCategory: async (category: string) => {
    try {
      if (!supabase) {
        console.warn('Supabase credentials are not set. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
        return getFallbackData(category);
      }
      const { data, error } = await supabase
        .from(category)
        .select('*');
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        return getFallbackData(category);
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching ${category} from Supabase:`, error);
      return getFallbackData(category);
    }
  }
};
