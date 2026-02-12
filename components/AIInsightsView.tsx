
import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, RefreshCw, ChevronRight } from 'lucide-react';
import { FinancialRecord, Product } from '../types';
import { GoogleGenAI } from '@google/genai';

interface Props {
  financials: FinancialRecord[];
  products: Product[];
}

const AIInsightsView: React.FC<Props> = ({ financials, products }) => {
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Como um consultor de inteligência industrial especializado em metais e sucatas, analise estes dados e forneça 3 insights estratégicos curtos e diretos (máximo 2 frases cada) em português:
      Dados Financeiros: ${JSON.stringify(financials.slice(-10))}
      Dados de Estoque: ${JSON.stringify(products.map(p => ({ nome: p.name, qtd: p.stock, min: p.minStock })))}
      Responda em formato de lista com bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setInsight(response.text || "Não foi possível gerar insights no momento.");
    } catch (error) {
      console.error(error);
      setInsight("Erro ao conectar com a IA da IronCore. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-indigo-600 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Sparkles size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <BrainCircuit size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Cérebro IronCore</h2>
          </div>
          <p className="text-indigo-100 font-bold mb-8 leading-relaxed">
            Nossa inteligência artificial analisa seus padrões de estoque e fluxo financeiro para sugerir as melhores decisões de compra e venda.
          </p>
          <button 
            onClick={generateInsights}
            disabled={loading}
            className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-indigo-50 transition-colors"
          >
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {loading ? 'Analisando Dados...' : 'Gerar Novos Insights'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">Análise Estratégica Atual</h3>
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 bg-slate-100 rounded-full animate-pulse w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded-full animate-pulse w-1/2"></div>
              <div className="h-4 bg-slate-100 rounded-full animate-pulse w-2/3"></div>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none">
              <div className="text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                {insight}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white">
            <h4 className="font-black text-xs uppercase tracking-widest opacity-60 mb-4">Sugestão de Preço</h4>
            <p className="text-sm font-bold mb-4">O mercado de Cobre teve alta de 4.2% em LME hoje. Sugerimos ajuste no preço de venda.</p>
            <button className="w-full py-3 bg-white/20 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
              Ver Detalhes <ChevronRight size={14}/>
            </button>
          </div>
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
            <h4 className="font-black text-xs uppercase tracking-widest opacity-60 mb-4">Otimização de Rota</h4>
            <p className="text-sm font-bold mb-4">Agrupar as 3 coletas pendentes em Curitiba pode economizar R$ 450,00 em combustível.</p>
            <button className="w-full py-3 bg-white/20 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
              Ver Mapa <ChevronRight size={14}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsView;
