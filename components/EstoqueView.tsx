
import React, { useState } from 'react';
import { Search, Scale, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { Product } from '../types';

interface Props {
  products: Product[];
  setProducts: (p: Product[]) => void;
  notify: (m: string) => void;
}

const EstoqueView: React.FC<Props> = ({ products, setProducts, notify }) => {
  const [q, setQ] = useState('');

  const handleUpdateStock = (id: number, val: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: val } : p));
    notify("Estoque atualizado com sucesso.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Monitor de Estoque</h3>
          <p className="text-xs font-bold text-slate-400">Controle físico e pesagem de materiais</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            onChange={e => setQ(e.target.value)} 
            placeholder="Filtrar por nome ou código..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.code.toLowerCase().includes(q.toLowerCase())).map(p => (
          <div key={p.id} className={`bg-white p-8 rounded-[2.5rem] border ${p.stock <= p.minStock ? 'border-rose-100 bg-rose-50/10' : 'border-slate-100'} shadow-sm flex flex-col items-center group relative overflow-hidden`}>
            {p.stock <= p.minStock && (
              <div className="absolute top-4 right-4 text-rose-500 animate-pulse">
                <AlertCircle size={20} />
              </div>
            )}
            
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${p.stock <= p.minStock ? 'bg-rose-100 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}>
              <Scale size={36} />
            </div>
            
            <div className="text-center mb-6">
              <h4 className="font-black text-slate-800 text-lg leading-tight">{p.name}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{p.code}</p>
            </div>

            <div className="flex flex-col items-center mb-8">
              <p className={`text-4xl font-black ${p.stock <= p.minStock ? 'text-rose-600' : 'text-slate-800'}`}>
                {p.stock}
                <span className="text-sm font-black text-slate-400 ml-1 uppercase">{p.unit}</span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${p.stock <= p.minStock ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
                  Mín: {p.minStock} {p.unit}
                </span>
              </div>
            </div>

            <div className="w-full space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center block">Lançamento Pesagem</label>
               <div className="flex gap-2">
                 <input 
                  type="number" 
                  placeholder="KG"
                  onBlur={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value !== "") handleUpdateStock(p.id, val);
                    e.target.value = "";
                  }}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-center font-black focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                 />
                 <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-50">
                   <ArrowUp size={16}/>
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstoqueView;
