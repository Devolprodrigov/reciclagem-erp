
import React, { useState } from 'react';
import { Plus, User, Edit3, Trash2, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import { CustomerPF } from '../types';

interface Props {
  customers: CustomerPF[];
  setCustomers: (c: CustomerPF[]) => void;
  notify: (m: string) => void;
}

const ClientesPFView: React.FC<Props> = ({ customers, setCustomers, notify }) => {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CustomerPF | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: CustomerPF = {
      id: editing ? editing.id : `PF-${Math.floor(Math.random() * 1000)}`,
      name: fd.get('name') as string,
      cpf: fd.get('cpf') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      city: fd.get('city') as string,
      state: fd.get('state') as string,
      pixKey: fd.get('pixKey') as string,
      status: fd.get('status') as string || 'Ativo',
      createdAt: editing ? editing.createdAt : new Date().toLocaleDateString('pt-BR'),
      responsible: 'Admin'
    };

    if (editing) {
      setCustomers(customers.map(c => c.id === data.id ? data : c));
      notify("Cliente PF atualizado.");
    } else {
      setCustomers([...customers, data]);
      notify("Cliente PF cadastrado!");
    }
    setShowModal(false);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Clientes Pessoa Física</h3>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg">
          <Plus size={20}/> Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-8 py-5">Nome</th>
              <th className="px-8 py-5">CPF / PIX</th>
              <th className="px-8 py-5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 font-black text-slate-800">{c.name}</td>
                <td className="px-8 py-5">
                  <p className="text-xs font-bold text-slate-600">{c.cpf}</p>
                  <p className="text-[10px] font-black text-indigo-500 uppercase">PIX: {c.pixKey || 'Não informado'}</p>
                </td>
                <td className="px-8 py-5 text-right space-x-1">
                  <button onClick={() => { setEditing(c); setShowModal(true); }} className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"><Edit3 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3"><User className="text-indigo-600" /> Cadastro PF</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 font-bold">FECHAR</button>
            </div>
            <form onSubmit={handleSave} className="p-10 grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Nome Completo</label>
                <input name="name" defaultValue={editing?.name} required className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">CPF</label>
                <input name="cpf" defaultValue={editing?.cpf} required className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Chave PIX</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input name="pixKey" defaultValue={editing?.pixKey} placeholder="CPF, E-mail ou Celular" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold" />
                </div>
              </div>
              <div className="col-span-2 flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase text-[10px]">Cancelar</button>
                <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] shadow-xl">Salvar Cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesPFView;
