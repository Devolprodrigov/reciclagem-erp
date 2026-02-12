
import React, { useState } from 'react';
import { ShoppingCart, Package, ArrowRight, User, Plus, Trash2 } from 'lucide-react';
import { Product, FinancialRecord } from '../types';

interface Props {
  products: Product[];
  setProducts: (p: Product[]) => void;
  financials: FinancialRecord[];
  setFinancials: (f: FinancialRecord[]) => void;
  notify: (m: string) => void;
}

const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const OrdersView: React.FC<Props> = ({ products, setProducts, financials, setFinancials, notify }) => {
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [orderType, setOrderType] = useState<'compra' | 'venda'>('venda');

  const addToCart = (p: Product) => {
    const existing = cart.find(i => i.product.id === p.id);
    if (existing) {
      setCart(cart.map(i => i.product.id === p.id ? { ...i, quantity: i.quantity + 10 } : i));
    } else {
      setCart([...cart, { product: p, quantity: 10 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(i => i.product.id !== id));
  };

  const total = cart.reduce((acc, item) => {
    const price = orderType === 'venda' ? item.product.sellPrice : item.product.costPrice;
    return acc + (price * item.quantity);
  }, 0);

  const handleFinish = () => {
    if (cart.length === 0) return;
    
    // Update Stock
    const updatedProducts = products.map(p => {
      const cartItem = cart.find(i => i.product.id === p.id);
      if (cartItem) {
        return {
          ...p,
          stock: orderType === 'venda' ? p.stock - cartItem.quantity : p.stock + cartItem.quantity
        };
      }
      return p;
    });
    setProducts(updatedProducts);

    // Create Financial Record
    const newRecord: FinancialRecord = {
      id: Date.now(),
      type: orderType === 'venda' ? 'receita' : 'despesa',
      description: `${orderType === 'venda' ? 'Saída' : 'Entrada'} de Materiais - Itens: ${cart.length}`,
      value: total,
      date: new Date().toISOString().split('T')[0],
      status: 'pago',
      category: 'Operacional'
    };
    setFinancials([...financials, newRecord]);

    setCart([]);
    notify(`${orderType === 'venda' ? 'Venda' : 'Compra'} finalizada com sucesso!`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Novo Lançamento</h3>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
             <button 
              onClick={() => setOrderType('venda')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${orderType === 'venda' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
             >Venda (Saída)</button>
             <button 
              onClick={() => setOrderType('compra')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${orderType === 'compra' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
             >Compra (Entrada)</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-all flex justify-between items-center">
              <div>
                <p className="font-black text-slate-800">{p.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo: {p.stock} {p.unit}</p>
              </div>
              <button 
                onClick={() => addToCart(p)}
                className="w-10 h-10 rounded-xl bg-slate-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"
              >
                <Plus size={20}/>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col h-[calc(100vh-16rem)] min-h-[500px]">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <ShoppingCart size={20} />
          </div>
          <h4 className="font-black text-slate-800 text-lg uppercase tracking-tight">Carrinho</h4>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 mb-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <Package size={48} className="text-slate-200 mb-4" />
              <p className="text-sm font-bold text-slate-400">Seu carrinho está vazio.<br/>Selecione materiais ao lado.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-black text-slate-700 text-xs uppercase">{item.product.name}</p>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-rose-400 hover:text-rose-600"><Trash2 size={14}/></button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setCart(cart.map(i => i.product.id === item.product.id ? {...i, quantity: Math.max(0, i.quantity - 10)} : i))}
                      className="w-6 h-6 rounded bg-white border border-slate-200 text-slate-500 font-black text-xs"
                    >-</button>
                    <span className="text-sm font-black text-slate-800">{item.quantity} KG</span>
                    <button 
                      onClick={() => setCart(cart.map(i => i.product.id === item.product.id ? {...i, quantity: i.quantity + 10} : i))}
                      className="w-6 h-6 rounded bg-white border border-slate-200 text-slate-500 font-black text-xs"
                    >+</button>
                  </div>
                  <span className="text-sm font-black text-indigo-600">
                    {formatCurrency((orderType === 'venda' ? item.product.sellPrice : item.product.costPrice) * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Estimado</span>
            <span className="text-2xl font-black text-slate-800">{formatCurrency(total)}</span>
          </div>
          <button 
            onClick={handleFinish}
            disabled={cart.length === 0}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Finalizar {orderType === 'venda' ? 'Saída' : 'Entrada'} <ArrowRight size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
