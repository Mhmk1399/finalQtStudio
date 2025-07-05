'use client';

import React, { useState, useEffect } from 'react';
import { FormConfig, FormData, FormState, FormField } from '@/types/form';

interface DynamicFormProps {
  config: FormConfig;
  initialData?: FormData;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, initialData = {} }) => {
  const [formState, setFormState] = useState<FormState>({
    data: initialData,
    errors: {},
    loading: false,
    success: false,
  });

  // Initialize form data with default values
  useEffect(() => {
    const initialFormData: FormData = { ...initialData };
    
    config.fields.forEach(field => {
      if (field.defaultValue !== undefined && !initialFormData[field.name]) {
        initialFormData[field.name] = field.defaultValue;
      }
    });

    setFormState(prev => ({ ...prev, data: initialFormData }));
  }, [  ]);

  const validateField = (field: FormField, value: string | number | boolean): string | null => {
    if (field.required && (!value || value === '')) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const { min, max, pattern, minLength, maxLength } = field.validation;
      const stringValue = String(value);

      if (minLength && stringValue.length < minLength) {
        return `${field.label} must be at least ${minLength} characters`;
      }

      if (maxLength && stringValue.length > maxLength) {
        return `${field.label} must not exceed ${maxLength} characters`;
      }

      if (pattern && !new RegExp(pattern).test(stringValue)) {
        return `${field.label} format is invalid`;
      }

      if (field.type === 'number') {
        const numValue = Number(value);
        if (min !== undefined && numValue < min) {
          return `${field.label} must be at least ${min}`;
        }
        if (max !== undefined && numValue > max) {
          return `${field.label} must not exceed ${max}`;
        }
      }
    }

    return null;
  };

  const handleInputChange = (fieldName: string, value: string | number | boolean) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [fieldName]: value },
      errors: { ...prev.errors, [fieldName]: '' },
      success: false,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors: { [key: string]: string } = {};
    config.fields.forEach(field => {
      const error = validateField(field, formState.data[field.name]);
      if (error) {
        errors[field.name] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({ ...prev, errors }));
      return;
    }

    setFormState(prev => ({ ...prev, loading: true, errors: {} }));

    try {
      const response = await fetch(config.endpoint, {
        method: config.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState.data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Form submission failed');
      }

      setFormState(prev => ({ ...prev, loading: false, success: true }));
      
      if (config.onSuccess) {
        config.onSuccess(result);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setFormState(prev => ({ ...prev, loading: false, errors: { submit: errorMessage } }));
      
      if (config.onError) {
        config.onError(errorMessage);
      }
    }
  };

  const renderField = (field: FormField) => {
    const value = formState.data[field.name] || '';
    const error = formState.errors[field.name];
    const fieldId = `field-${field.name}`;

    // Don't render hidden fields
    if (field.type === 'hidden' || field.hidden) {
      return null;
    }

    const baseClassName = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      error ? 'border-red-500' : 'border-gray-300'
    } ${field.readonly ? 'bg-gray-100 cursor-not-allowed' : ''} ${field.className || ''}`;

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className="mb-4" dir='rtl'>
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              id={fieldId}
              value={String(value)}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={baseClassName}
              required={field.required}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {field.description && <p className="text-gray-500 text-sm mt-1">{field.description}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="mb-4" dir='rtl'>
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              id={fieldId}
              value={String(value)}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`${baseClassName} h-24 resize-vertical`}
              required={field.required}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {field.description && <p className="text-gray-500 text-sm mt-1">{field.description}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="mb-4" dir='rtl'>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={fieldId}
                checked={Boolean(value)}
                onChange={(e) => handleInputChange(field.name, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={fieldId} className="ml-2 text-sm text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {field.description && <p className="text-gray-500 text-sm mt-1">{field.description}</p>}
          </div>
        );

      case 'radio':
        return (
          <div key={field.name} className="mb-4" dir='rtl'>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </legend>
              {field.options?.map(option => (
                <div key={option.value} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`${fieldId}-${option.value}`}
                    name={field.name}
                    value={option.value}
                    checked={String(value) === option.value}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={`${fieldId}-${option.value}`} className="ml-2 text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </fieldset>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {field.description && <p className="text-gray-500 text-sm mt-1">{field.description}</p>}
          </div>
        );

      default:
        return (
          <div key={field.name} className="mb-4" dir='rtl'>
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              id={fieldId}
              value={String(value)}
              onChange={(e) => {
                const inputValue = field.type === 'number' ? Number(e.target.value) : e.target.value;
                handleInputChange(field.name, inputValue);
              }}
              placeholder={field.placeholder}
              className={baseClassName}
              required={field.required}
              readOnly={field.readonly}
              min={field.validation?.min}
              max={field.validation?.max}
              minLength={field.validation?.minLength}
              maxLength={field.validation?.maxLength}
              pattern={field.validation?.pattern}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {field.description && <p className="text-gray-500 text-sm mt-1">{field.description}</p>}
          </div>
        );
    }
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md ${config.className || ''}`} dir='rtl'>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h2>
        {config.description && (
          <p className="text-gray-600">{config.description}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {config.fields.map(renderField)}

        {formState.errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">{formState.errors.submit}</p>
          </div>
        )}

        {formState.success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-700">Form submitted successfully!</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={formState.loading}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              formState.loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            } text-white`}
          >
            {formState.loading ? 'Submitting...' : (config.submitButtonText || 'Submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
