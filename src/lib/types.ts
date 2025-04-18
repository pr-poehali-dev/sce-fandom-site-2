export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'reader';
  createdAt: Date;
}

export interface SCEObject {
  id: string;
  title: string;
  objectNumber: string;
  objectClass: 'безопасный' | 'евклид' | 'кетер' | 'таумиэль' | 'нейтрализованный';
  containmentProcedures: string;
  description: string;
  additionalInfo?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
