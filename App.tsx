
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, DollarSign, FileText, 
  Scale, User, Briefcase, Sparkles, CheckCircle2, Menu, X
} from 'lucide-react';
import { Product, CustomerPF, CustomerPJ, FinancialRecord, ActiveTab } from './types';
import DashboardView from './components/DashboardView';
import ProdutosView from './components/ProdutosView';
import EstoqueView from './components/EstoqueView';
import ClientesPFView from './components/ClientesPFView';
import ClientesPJView from './components/ClientesPJView';
import OrdersView from './components/OrdersView';
import FinanceiroView from './components/FinanceiroView';
import NFView from './components/NFView';
import AIInsightsView from './components/AIInsightsView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [notification, setNotification] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Helper to load data from localStorage
  const loadData = (key: string, defaultValue: any) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  // Global State with initialization from localStorage
  const [products, setProducts] = useState<Product[]>(() => loadData('ironcore_products', [
    { id: 1, code: 'MAT001', name: 'Alumínio em Bloco', category: 'Metais', costPrice: 15.50, sellPrice: 28.00, stock: 450, minStock: 100, unit: 'KG' },
    { id: 2, code: 'MAT002', name: 'Cobre Puro', category: 'Metais', costPrice: 42.00, sellPrice: 65.00, stock: 40, minStock: 50, unit: 'KG' },
  ]));

  const [customersPF, setCustomersPF] = useState<CustomerPF[]>(() => loadData('ironcore_pf', [
    { id: "PF-001", name: 'João da Silva', cpf: '123.456.789-00', email: 'joao@email.com', phone: '(11) 99999-9999', city: 'São Paulo', state: 'SP', status: 'Ativo', createdAt: '01/10/2023', responsible: 'Admin', pixKey: '12345678900' }
  ]));

  const [customersPJ, setCustomersPJ] = useState<CustomerPJ[]>(() => loadData('ironcore_pj', [
    { id: "PJ-001", companyName: 'Metalúrgica Avançada LTDA', cnpj: '12.345.678/0001-90', tradeName: 'Avançada Metais', contact: 'Roberto', city: 'Curitiba', state: 'PR', status: 'Ativo', createdAt: '05/10/2023', responsible: 'Admin', pixKey: 'financeiro@avancada.com.br' }
  ]));

  const [financials, setFinancials] = useState<FinancialRecord[]>(() => loadData('ironcore_financials', [
    { id: 1, type: 'receita', description: 'Venda Alumínio (Carga 04)', value: 12600, date: '2023-11-20', status: 'pago', category: 'Vendas' },
  ]));

  // Auto-save to localStorage whenever state changes
  useEffect(() => { localStorage.setItem('ironcore_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('ironcore_pf', JSON.stringify(customersPF)); }, [customersPF]);
  useEffect(() => { localStorage.setItem('ironcore_pj', JSON.stringify(customersPJ)); }, [customersPJ]);
  useEffect(() => { localStorage.setItem('ironcore_financials', JSON.stringify(financials)); }, [financials]);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20}/>, color: 'hover:bg-indigo-50 hover:text-indigo-600' },
    { id: 'produtos', label: 'Catálogo', icon: <Package size={20}/>, color: 'hover:bg-blue-50 hover:text-blue-600' },
    { id: 'estoque', label: 'Estoque', icon: <Scale size={20}/>, color: 'hover:bg-amber-50 hover:text-amber-600' },
    { id: 'pf-clientes', label: 'Clientes PF', icon: <User size={20}/>, color: 'hover:bg-emerald-50 hover:text-emerald-600' },
    { id: 'pj-clientes', label: 'Empresas PJ', icon: <Briefcase size={20}/>, color: 'hover:bg-cyan-50 hover:text-cyan-600' },
    { id: 'pedidos', label: 'Novo Pedido', icon: <ShoppingCart size={20}/>, color: 'hover:bg-rose-50 hover:text-rose-600' },
    { id: 'financeiro', label: 'Financeiro', icon: <DollarSign size={20}/>, color: 'hover:bg-green-50 hover:text-green-600' },
    { id: 'notas-fiscais', label: 'Notas Fiscais', icon: <FileText size={20}/>, color: 'hover:bg-violet-50 hover:text-violet-600' },
    { id: 'ai-insights', label: 'IA Insights', icon: <Sparkles size={20}/>, color: 'hover:bg-purple-50 hover:text-purple-600' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView financials={financials} products={products} />;
      case 'produtos': return <ProdutosView products={products} setProducts={setProducts} notify={notify} />;
      case 'estoque': return <EstoqueView products={products} setProducts={setProducts} notify={notify} />;
      case 'pf-clientes': return <ClientesPFView customers={customersPF} setCustomers={setCustomersPF} notify={notify} />;
      case 'pj-clientes': return <ClientesPJView customers={customersPJ} setCustomers={setCustomersPJ} notify={notify} />;
      case 'pedidos': return <OrdersView products={products} setProducts={setProducts} financials={financials} setFinancials={setFinancials} notify={notify} />;
      case 'financeiro': return <FinanceiroView financials={financials} setFinancials={setFinancials} notify={notify} />;
      case 'notas-fiscais': return <NFView notify={notify} />;
      case 'ai-insights': return <AIInsightsView financials={financials} products={products} />;
      default: return <DashboardView financials={financials} products={products} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-xl">
        {sidebarOpen ? <X size={24}/> : <Menu size={24}/>}
      </button>

      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl">I</div>
              <div>
                <h1 className="font-black text-slate-800 tracking-tight leading-none text-lg">IRONCORE</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Industrial ERP</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id as ActiveTab); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg' : `text-slate-500 ${item.color}`}`}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {notification && (
          <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right-10">
            <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400 w-5 h-5" />
              <span className="font-bold text-sm">{notification}</span>
            </div>
          </div>
        )}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-black text-slate-800 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default App;
