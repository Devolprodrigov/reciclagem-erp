
export interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  costPrice: number;
  sellPrice: number;
  stock: number;
  minStock: number;
  unit: string;
}

export interface CustomerPF {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  status: string;
  createdAt: string;
  responsible: string;
  pixKey?: string;
}

export interface CustomerPJ {
  id: string;
  companyName: string;
  cnpj: string;
  tradeName: string;
  contact: string;
  city: string;
  state: string;
  status: string;
  createdAt: string;
  responsible: string;
  pixKey?: string;
}

export interface FinancialRecord {
  id: number;
  type: 'receita' | 'despesa';
  description: string;
  value: number;
  date: string;
  status: string;
  category: string;
}

export type ActiveTab = 'dashboard' | 'produtos' | 'estoque' | 'pf-clientes' | 'pj-clientes' | 'pedidos' | 'financeiro' | 'notas-fiscais' | 'ai-insights';
