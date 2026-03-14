
import { GoogleGenAI } from '@google/genai';
import { supabase } from './supabase';

const getFallbackData = (category: string) => {
  if (category === 'trains') {
    return [
      {
        id: '1',
        name: 'Benapole Express (795)',
        route: 'Benapole - Dhaka',
        detailedRoute: 'Benapole, Jashore, Khulna, Poradaha, Rajbari, Faridpur, Bhanga, Dhaka',
        departure: '12:25 PM',
        offDay: 'নেই',
        type: 'intercity'
      },
      {
        id: '2',
        name: 'Benapole Express (796)',
        route: 'Dhaka - Benapole',
        detailedRoute: 'Dhaka, Bhanga, Faridpur, Rajbari, Poradaha, Khulna, Jashore, Benapole',
        departure: '11:30 PM',
        offDay: 'নেই',
        type: 'intercity'
      },
      {
        id: '3',
        name: 'Sundarban Express (725)',
        route: 'Khulna - Dhaka',
        detailedRoute: 'Khulna, Jashore, Poradaha, Rajbari, Faridpur, Bhanga, Dhaka',
        departure: '9:45 PM',
        offDay: 'নেই',
        type: 'intercity'
      },
      {
        id: '4',
        name: 'Sundarban Express (726)',
        route: 'Dhaka - Khulna',
        detailedRoute: 'Dhaka, Bhanga, Faridpur, Rajbari, Poradaha, Jashore, Khulna',
        departure: '8:15 AM',
        offDay: 'নেই',
        type: 'intercity'
      },
      {
        id: '5',
        name: 'Madhumati Express (756)',
        route: 'Rajshahi - Dhaka',
        detailedRoute: 'Rajshahi, Ishwardi, Poradaha, Rajbari, Faridpur, Bhanga, Dhaka',
        departure: '6:40 AM',
        offDay: 'নেই',
        type: 'intercity'
      },
      {
        id: '6',
        name: 'Madhumati Express (755)',
        route: 'Dhaka - Rajshahi',
        detailedRoute: 'Dhaka, Bhanga, Faridpur, Rajbari, Poradaha, Ishwardi, Rajshahi',
        departure: '3:00 PM',
        offDay: 'নেই',
        type: 'intercity'
      },
      {
        id: '7',
        name: 'Nakshikantha Express (25)',
        route: 'Khulna - Dhaka',
        detailedRoute: 'Khulna, Jashore, Poradaha, Rajbari, Faridpur, Bhanga, Dhaka',
        departure: '11:00 PM',
        offDay: 'নেই',
        type: 'commuter'
      },
      {
        id: '8',
        name: 'Nakshikantha Express (26)',
        route: 'Dhaka - Khulna',
        detailedRoute: 'Dhaka, Bhanga, Faridpur, Rajbari, Poradaha, Jashore, Khulna',
        departure: '11:20 AM',
        offDay: 'নেই',
        type: 'commuter'
      },
      {
        id: '9',
        name: 'Bhatiapara Express (1)',
        route: 'Bhatiapara - Rajbari',
        detailedRoute: 'Bhatiapara, Sahasrail, Boalmari, Madhukhali, Kalukhali, Rajbari',
        departure: '1:45 PM',
        offDay: 'নেই',
        type: 'commuter'
      },
      {
        id: '10',
        name: 'Bhatiapara Express (2)',
        route: 'Rajbari - Bhatiapara',
        detailedRoute: 'Rajbari, Kalukhali, Madhukhali, Boalmari, Sahasrail, Bhatiapara',
        departure: '10:18 AM',
        offDay: 'নেই',
        type: 'commuter'
      },
      {
        id: '11',
        name: 'Rajbari Express (1)',
        route: 'Rajbari - Bhanga',
        detailedRoute: 'Rajbari, Pachuria, Amirabad, Faridpur, Bakhunda, Pukhuria, Talma, Bhanga',
        departure: '6:00 AM',
        offDay: 'নেই',
        type: 'commuter'
      },
      {
        id: '12',
        name: 'Rajbari Express (2)',
        route: 'Bhanga - Rajbari',
        detailedRoute: 'Bhanga, Talma, Pukhuria, Bakhunda, Faridpur, Amirabad, Pachuria, Rajbari',
        departure: '8:10 AM',
        offDay: 'নেই',
        type: 'commuter'
      },
      {
        id: '13',
        name: 'Rajbari Express (3)',
        route: 'Rajbari - Bhanga',
        detailedRoute: 'Rajbari, Pachuria, Amirabad, Faridpur, Bakhunda, Pukhuria, Talma, Bhanga',
        departure: '5:00 PM',
        offDay: 'নেই',
        type: 'commuter'
      },
      {
        id: '14',
        name: 'Rajbari Shuttle (506)',
        route: 'Goalanda - Poradaha',
        detailedRoute: 'Goalanda, Rajbari, Kalukhali, Pangsha, Khoksa, Kumarkhali, Kushtia, Poradaha',
        departure: '7:30 AM',
        offDay: 'নেই',
        type: 'shuttle'
      },
      {
        id: '15',
        name: 'Rajbari Shuttle (505)',
        route: 'Poradaha - Goalanda',
        detailedRoute: 'Poradaha, Kushtia, Kumarkhali, Khoksa, Pangsha, Kalukhali, Rajbari, Goalanda',
        departure: '11:45 AM',
        offDay: 'নেই',
        type: 'shuttle'
      },
      {
        id: '16',
        name: 'Rajbari Shuttle (508)',
        route: 'Goalanda - Poradaha',
        detailedRoute: 'Goalanda, Rajbari, Kalukhali, Pangsha, Khoksa, Kumarkhali, Kushtia, Poradaha',
        departure: '5:00 PM',
        offDay: 'নেই',
        type: 'shuttle'
      },
      {
        id: '17',
        name: 'Rajbari Shuttle (507)',
        route: 'Poradaha - Goalanda',
        detailedRoute: 'Poradaha, Kushtia, Kumarkhali, Khoksa, Pangsha, Kalukhali, Rajbari, Goalanda',
        departure: '8:00 PM',
        offDay: 'নেই',
        type: 'shuttle'
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
