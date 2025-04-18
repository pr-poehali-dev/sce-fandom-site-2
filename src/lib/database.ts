import { SCEObject, Post } from './types';

// Имитация базы данных для хранения объектов SCE и постов
class Database {
  private sceObjects: SCEObject[] = [];
  private posts: Post[] = [];
  
  // Методы для SCE объектов
  createSCEObject(data: Omit<SCEObject, 'id' | 'createdAt' | 'updatedAt'>): SCEObject {
    const newObject: SCEObject = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.sceObjects.push(newObject);
    this.saveToLocalStorage();
    return newObject;
  }
  
  getSCEObjects(): SCEObject[] {
    return [...this.sceObjects];
  }
  
  getSCEObjectById(id: string): SCEObject | undefined {
    return this.sceObjects.find(obj => obj.id === id);
  }
  
  getSCEObjectByNumber(objectNumber: string): SCEObject | undefined {
    return this.sceObjects.find(obj => obj.objectNumber === objectNumber);
  }
  
  updateSCEObject(id: string, data: Partial<Omit<SCEObject, 'id' | 'createdAt' | 'createdBy'>>): SCEObject | null {
    const index = this.sceObjects.findIndex(obj => obj.id === id);
    if (index === -1) return null;
    
    this.sceObjects[index] = {
      ...this.sceObjects[index],
      ...data,
      updatedAt: new Date()
    };
    
    this.saveToLocalStorage();
    return this.sceObjects[index];
  }
  
  deleteSCEObject(id: string): boolean {
    const initialLength = this.sceObjects.length;
    this.sceObjects = this.sceObjects.filter(obj => obj.id !== id);
    const deleted = initialLength > this.sceObjects.length;
    
    if (deleted) {
      this.saveToLocalStorage();
    }
    
    return deleted;
  }
  
  // Методы для постов
  createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
    const newPost: Post = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.posts.push(newPost);
    this.saveToLocalStorage();
    return newPost;
  }
  
  getPosts(): Post[] {
    return [...this.posts];
  }
  
  getPostById(id: string): Post | undefined {
    return this.posts.find(post => post.id === id);
  }
  
  updatePost(id: string, data: Partial<Omit<Post, 'id' | 'createdAt' | 'createdBy'>>): Post | null {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) return null;
    
    this.posts[index] = {
      ...this.posts[index],
      ...data,
      updatedAt: new Date()
    };
    
    this.saveToLocalStorage();
    return this.posts[index];
  }
  
  deletePost(id: string): boolean {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(post => post.id !== id);
    const deleted = initialLength > this.posts.length;
    
    if (deleted) {
      this.saveToLocalStorage();
    }
    
    return deleted;
  }
  
  // Сохранение и загрузка данных из localStorage
  private saveToLocalStorage() {
    localStorage.setItem('sceObjects', JSON.stringify(this.sceObjects));
    localStorage.setItem('scePosts', JSON.stringify(this.posts));
  }
  
  loadFromLocalStorage() {
    const savedObjects = localStorage.getItem('sceObjects');
    const savedPosts = localStorage.getItem('scePosts');
    
    if (savedObjects) {
      this.sceObjects = JSON.parse(savedObjects);
    }
    
    if (savedPosts) {
      this.posts = JSON.parse(savedPosts);
    }
  }
}

export const database = new Database();

// Загрузка данных при инициализации
database.loadFromLocalStorage();
