
import React, { useState } from 'react';
import { FileText, Send, CheckCircle2, AlertCircle, Building, Truck } from 'lucide-react';

interface Props {
  notify: (m: string) => void;
}

const NFView: React.FC<Props> = ({ notify }) => {
  const [loading, setLoading] = useState(false);

  const handleTransmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notify("Nota Fiscal Eletrônica transmitida com sucesso!");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
          <FileText size={40} />
        </div>
        <h3 className="text-3xl font-black text-slate-800 mb-4 uppercase tracking-tight">Transmissor NF-e IronCore</h3>
        <p className="text-slate-400 font-medium max-w-md mx-auto mb-12">
          Gere notas fiscais de saída e entrada (compra de sucata) com integração direta à SEFAZ.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <Building size={14}/> Dados do Destinatário
            </h4>
            <div className="space-y-4">
               <input placeholder="CNPJ / CPF do Cliente" className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
               <input placeholder="Natureza da Operação" defaultValue="Venda de Sucata de Metais" className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <Truck size={14}/> Informações de Carga
            </h4>
            <div className="space-y-4">
               <input placeholder="Peso Total Bruto (KG)" type="number" className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
               <input placeholder="Placa do Veículo (Opcional)" className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl mb-12 flex items-start gap-4 text-left">
           <AlertCircle className="text-indigo-600 shrink-0 mt-1" size={20} />
           <p className="text-xs font-bold text-slate-500 leading-relaxed">
             Certifique-se de que o certificado digital A1 está instalado e válido na plataforma IronCore Cloud para que a transmissão ocorra sem interrupções.
           </p>
        </div>

        <button 
          onClick={handleTransmit}
          disabled={loading}
          className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black uppercase text-sm tracking-widest shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {loading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"/>
          ) : (
            <>Transmitir NF-e Agora <Send size={18}/></>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><CheckCircle2 size={20}/></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Última Transmissão</p>
              <p className="text-sm font-black text-slate-800 mt-1">NFe #4458 - SUCESSO</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl"><FileText size={20}/></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Mês Atual</p>
              <p className="text-sm font-black text-slate-800 mt-1">128 Documentos</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Send size={20}/></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Ambiente</p>
              <p className="text-sm font-black text-slate-800 mt-1 uppercase">PRODUÇÃO (Sefaz)</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default NFView;
