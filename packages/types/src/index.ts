export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  category?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ContactFormData {
  email: string;
  name: string;
  company?: string;
  phone?: string;
  message: string;
}
