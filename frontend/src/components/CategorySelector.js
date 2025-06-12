import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CategorySelector = ({ onChange }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    api.get('/api/categories').then(res => setCategories(res.data));
    api.get('/api/subcategories').then(res => setSubCategories(res.data));
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onChange({ categoryId: value, subCategoryId: '' });
  };

  const handleSubCategoryChange = (e) => {
    onChange({ categoryId: selectedCategory, subCategoryId: e.target.value });
  };

  const filteredSubCategories = subCategories.filter(
    (sc) => sc.categoryId === parseInt(selectedCategory)
  );

  return (
    <div className="selector">
      <label>Category:</label>
      <select onChange={handleCategoryChange} required>
        <option value="">Select a category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <label>Subcategory:</label>
      <select onChange={handleSubCategoryChange} required>
        <option value="">Select a subcategory</option>
        {filteredSubCategories.map(sc => (
          <option key={sc.id} value={sc.id}>{sc.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
