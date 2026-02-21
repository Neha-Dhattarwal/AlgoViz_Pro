
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export class GeminiService {
  // Always instantiate fresh to use the injected API_KEY
  private get ai() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async explainAlgorithm(problemTitle: string, code: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Explain the following optimized code for "${problemTitle}". 
        Focus on time complexity (O), space complexity, and the core algorithmic pattern used.
        Format as clear Markdown.
        
        Code:
        ${code}`,
        config: {
          thinkingConfig: { thinkingBudget: 16000 },
          temperature: 0.7,
        },
      });
      return response.text || "I was unable to generate a breakdown for this algorithm.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Technical Error: Could not connect to the AI Reasoning Kernel.";
    }
  }

  async chatAboutProblem(problemTitle: string, history: ChatMessage[], message: string): Promise<string> {
    try {
      const chat = this.ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are an expert algorithm tutor specialized in the Blind 75 and LeetCode. 
          The student is currently working on "${problemTitle}". 
          Be concise, technical, and use monospaced formatting for variables. 
          Focus on teaching the underlying logic rather than just giving the answer.`
        }
      });

      const response = await chat.sendMessage({ message });
      return response.text || "No response generated.";
    } catch (error) {
      console.error("Chat Error:", error);
      return "The AI tutor is currently offline. Please check your connection.";
    }
  }
}

export const geminiService = new GeminiService();
