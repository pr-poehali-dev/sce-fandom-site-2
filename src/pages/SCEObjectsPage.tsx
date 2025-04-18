import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SCEObject } from '@/lib/types';
import { database } from '@/lib/database';
import SCEObjectCard from '@/components/SCEObjectCard';

const SCEObjectsPage = () => {
  const [objects, setObjects] = useState<SCEObject[]>([]);
  const [filteredObjects, setFilteredObjects] = useState<SCEObject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('все');
  
  useEffect(() => {
    // Загружаем объекты SCE
    const allObjects = database.getSCEObjects();
    setObjects(allObjects);
    setFilteredObjects(allObjects);
  }, []);
  
  useEffect(() => {
    // Применяем фильтры при изменении поискового запроса или класса объекта
    let results = objects;
    
    // Фильтр по поисковому запросу
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(obj => 
        obj.title.toLowerCase().includes(searchLower) ||
        obj.objectNumber.toLowerCase().includes(searchLower) ||
        obj.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Фильтр по классу объекта
    if (classFilter !== 'все') {
      results = results.filter(obj => obj.objectClass === classFilter);
    }
    
    setFilteredObjects(results);
  }, [searchTerm, classFilter, objects]);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Объекты SCE</h1>
          <p className="text-muted-foreground">
            Документация по аномальным объектам, находящимся под контролем SCE Foundation.
          </p>
        </div>
        
        {/* Фильтры */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Поиск по номеру, названию или описанию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Класс объекта" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="все">Все классы</SelectItem>
                <SelectItem value="безопасный">Безопасный</SelectItem>
                <SelectItem value="евклид">Евклид</SelectItem>
                <SelectItem value="кетер">Кетер</SelectItem>
                <SelectItem value="таумиэль">Таумиэль</SelectItem>
                <SelectItem value="нейтрализованный">Нейтрализованный</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Список объектов */}
        {filteredObjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredObjects.map(object => (
              <SCEObjectCard key={object.id} object={object} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-2">Объекты не найдены</p>
            <p className="text-sm">Попробуйте изменить параметры поиска или фильтра</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SCEObjectsPage;
