
import React, { useState } from 'react';
import { DollarSign, ArrowUpCircle, ArrowDownCircle, Plus, Calendar, Tag } from 'lucide-react';
import { FinancialRecord } from '../types';

interface Props {
  financials: FinancialRecord[];
  setFinancials: (f: FinancialRecord[]) => void;
  notify: (m: string) => void;
}

const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const FinanceiroView: React.FC<Props> = ({ financials, setFinancials, notify }) => {
  const [showModal, setShowModal] = useState(false);

  const stats = {
    revenue: financials.filter(f => f.type === 'receita').reduce((a, b) => a + b.value, 0),
    expense: financials.filter(f => f.type === 'despesa').reduce((a, b) => a + b.value, 0),
  };

  const handleAddRecord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newRecord: FinancialRecord = {
      id: Date.now(),
      type: fd.get('type') as 'receita' | 'despesa',
      description: fd.get('description') as string,
      value: Number(fd.get('value')),
      category: fd.get('category') as string,
      date: fd.get('date') as string,
      status: 'pago'
    };
    setFinancials([...financials, newRecord]);
    setShowModal(false);
    notify("Lançamento financeiro registrado!");
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Controle Financeiro</h3>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg">
          <Plus size={20}/> Novo Lançamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><ArrowUpCircle size={20}/></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Receitas</span></div>
          <p className="text-3xl font-black text-emerald-600">{formatCurrency(stats.revenue)}</p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-rose-50 text-rose-600 rounded-xl"><ArrowDownCircle size={20}/></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Despesas</span></div>
          <p className="text-3xl font-black text-rose-600">{formatCurrency(stats.expense)}</p>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-200">
          <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-white/20 rounded-xl"><DollarSign size={20}/></div><span className="text-[10px] font-black opacity-60 uppercase tracking-widest">Saldo em Caixa</span></div>
          <p className="text-3xl font-black text-indigo-400">{formatCurrency(stats.revenue - stats.expense)}</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
           <h3 className="font-black text-slate-800 uppercase tracking-tight text-sm">Extrato Geral</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Data</th>
                <th className="px-8 py-5">Descrição / Categoria</th>
                <th className="px-8 py-5 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {financials.slice().reverse().map(f => (
                <tr key={f.id} className="hover:bg-slate-50/50">
                  <td className="px-8 py-5 font-bold text-slate-500 text-sm">{f.date}</td>
                  <td className="px-8 py-5">
                    <p className="font-black text-slate-800 text-sm">{f.description}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.category}</p>
                  </td>
                  <td className={`px-8 py-5 text-right font-black ${f.type === 'receita' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {f.type === 'receita' ? '+' : '-'} {formatCurrency(f.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-800">Novo Lançamento</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 font-bold">X</button>
            </div>
            <form onSubmit={handleAddRecord} className="p-10 space-y-6">
              <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                 <label className="flex-1 cursor-pointer">
                    <input type="radio" name="type" value="receita" defaultChecked className="hidden peer" />
                    <div className="py-3 text-center rounded-xl text-[10px] font-black uppercase tracking-widest peer-checked:bg-white peer-checked:text-emerald-600 transition-all text-slate-400">Receita</div>
                 </label>
                 <label className="flex-1 cursor-pointer">
                    <input type="radio" name="type" value="despesa" className="hidden peer" />
                    <div className="py-3 text-center rounded-xl text-[10px] font-black uppercase tracking-widest peer-checked:bg-white peer-checked:text-rose-600 transition-all text-slate-400">Despesa</div>
                 </label>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Descrição</label>
                <input name="description" required placeholder="Ex: Pagamento Frete" className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Valor (R$)</label>
                  <input name="value" type="number" step="0.01" required className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Data</label>
                  <input name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Categoria</label>
                <select name="category" className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold">
                  <option value="Operacional">Operacional</option>
                  <option value="Suprimentos">Suprimentos</option>
                  <option value="Vendas">Vendas</option>
                  <option value="Impostos">Impostos</option>
                  <option value="Salários">Salários</option>
                </select>
              </div>
              <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">Confirmar Lançamento</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceiroView;
