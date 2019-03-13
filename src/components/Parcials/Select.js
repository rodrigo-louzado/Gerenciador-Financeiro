import React from 'react';

export const InputField = (value, options, onContaChange) => (
  <div className="form-group">
    <select className="form-control"
      name={name} 
      value={value} 
      required
      onChange={(e) => onContaChange(e.target.value)}
    >
      <option defaultValue></option>
      {options.map((option) => <option key={option.id} value={option.id}>{option.nome}</option>)}
    </select>
  </div>
);