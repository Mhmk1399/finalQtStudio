'use client';

import React, { useState, useEffect } from 'react';
import DynamicForm from '../DynamicForm';
import { FormConfig } from '@/types/form';

interface ProjectFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSuccess, onError }) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [allContracts, setAllContracts] = useState<any[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch customers
        const customersResponse = await fetch('/api/customers');
        const customersData = await customersResponse.json();
        
        // Fetch all contracts
        const contractsResponse = await fetch('/api/contracts');
        const contractsData = await contractsResponse.json();
        
        // Fetch users/managers
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();
        
        if (customersData.success) {
          setCustomers(customersData.data || []);
        }
        
        if (contractsData.success) {
          setAllContracts(contractsData.data || []);
        }
        
        if (usersData.success) {
          setManagers(usersData.data || []);
        }
        
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Filter contracts when customer changes
  useEffect(() => {
    if (selectedCustomerId) {
      const customerContracts = allContracts.filter(
        contract => contract.customerId === selectedCustomerId
      );
      setFilteredContracts(customerContracts);
    } else {
      setFilteredContracts([]);
    }
  }, [selectedCustomerId, allContracts]);

  // Update form config when data is loaded
  useEffect(() => {
    if (!loading) {
      setFormConfig(createFormConfig());
    }
  }, [loading, customers, filteredContracts, managers, selectedCustomerId]);

  const handleCustomerChange = (customerId: string) => {
    setSelectedCustomerId(customerId);
  };

  const createFormConfig = (): FormConfig => {
    return {
      title: 'ایجاد پروژه جدید',
      description: 'فرم زیر را برای ایجاد پروژه جدید تکمیل کنید',
      endpoint: '/api/projects',
      method: 'POST',
      submitButtonText: 'ایجاد پروژه',
      onSuccess,
      onError,
      fields: [
        {
          name: 'title',
          label: 'عنوان پروژه',
          type: 'text',
          placeholder: 'عنوان پروژه را وارد کنید',
          required: true,
          validation: {
            minLength: 2,
            maxLength: 200,
          },
        },
        {
          name: 'description',
          label: 'توضیحات پروژه',
          type: 'textarea',
          placeholder: 'توضیحات کامل پروژه را وارد کنید',
          required: true,
          validation: {
            minLength: 10,
            maxLength: 1000,
          },
        },
        {
          name: 'customerId',
          label: 'مشتری',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'مشتری را انتخاب کنید' },
            ...customers.map(customer => ({
              value: customer._id,
              label: `${customer.name} - ${customer.businessName}`,
            }))
          ],
          onChange: handleCustomerChange,
        },
        {
          name: 'contractId',
          label: 'قرارداد',
          type: 'select',
          required: true,
          options: selectedCustomerId ? [
            { value: '', label: 'قرارداد را انتخاب کنید' },
            ...filteredContracts.map(contract => ({
              value: contract._id,
              label: contract.title || contract.contractNumber || `قرارداد ${contract._id.slice(-6)}`,
            }))
          ] : [
            { value: '', label: 'ابتدا مشتری را انتخاب کنید' }
          ],
          description: selectedCustomerId ? 'قراردادهای مربوط به مشتری انتخاب شده' : 'ابتدا مشتری را انتخاب کنید',
        },
        {
          name: 'projectManagerId',
          label: 'مدیر پروژه',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'مدیر پروژه را انتخاب کنید' },
            ...managers.map(manager => ({
              value: manager._id,
              label: manager.name || manager.username || manager.email,
            }))
          ],
        },
        {
          name: 'status',
          label: 'وضعیت پروژه',
          type: 'select',
          required: true,
          defaultValue: 'planning',
          options: [
            { value: 'planning', label: 'در حال برنامه‌ریزی' },
            { value: 'active', label: 'فعال' },
            { value: 'paused', label: 'متوقف شده' },
            { value: 'completed', label: 'تکمیل شده' },
            { value: 'cancelled', label: 'لغو شده' },
          ],
        },
        {
          name: 'startDate',
          label: 'تاریخ شروع',
          type: 'date',
          required: false,
          description: 'تاریخ شروع پروژه (اختیاری)',
        },
        {
          name: 'expectedEndDate',
          label: 'تاریخ پایان مورد انتظار',
          type: 'date',
          required: false,
          description: 'تاریخ مورد انتظار برای پایان پروژه',
        },
        {
          name: 'actualEndDate',
          label: 'تاریخ پایان واقعی',
          type: 'date',
          required: false,
          description: 'تاریخ واقعی پایان پروژه',
        },
        {
          name: 'paymentStatus',
          label: 'وضعیت پرداخت',
          type: 'select',
          required: true,
          defaultValue: 'pending',
          options: [
            { value: 'pending', label: 'در انتظار پرداخت' },
            { value: 'partial', label: 'پرداخت جزئی' },
            { value: 'paid', label: 'پرداخت شده' },
            { value: 'overdue', label: 'معوقه' },
          ],
        },
        {
          name: 'totalPrice',
          label: 'قیمت کل (تومان)',
          type: 'number',
          placeholder: 'قیمت کل پروژه را وارد کنید',
          required: true,
          validation: {
            min: 0,
          },
        },
        {
          name: 'finalPrice',
          label: 'قیمت نهایی (تومان)',
          type: 'number',
          placeholder: 'قیمت نهایی پروژه را وارد کنید',
          required: true,
          validation: {
            min: 0,
          },
          description: 'قیمت نهایی پس از اعمال تخفیف',
        },
        {
          name: 'discount',
          label: 'تخفیف (تومان)',
          type: 'number',
          placeholder: 'مقدار تخفیف را وارد کنید',
          required: false,
          defaultValue: 0,
          validation: {
            min: 0,
          },
        },
        {
          name: 'paidAmount',
          label: 'مبلغ پرداخت شده (تومان)',
          type: 'number',
          placeholder: 'مبلغ پرداخت شده را وارد کنید',
          required: false,
          defaultValue: 0,
          validation: {
            min: 0,
          },
        },
        {
          name: 'notes',
          label: 'یادداشت‌های عمومی',
          type: 'textarea',
          placeholder: 'یادداشت‌های مربوط به پروژه (قابل مشاهده برای مشتری)',
          required: false,
          validation: {
            maxLength: 1000,
          },
        },
        {
          name: 'internalNotes',
          label: 'یادداشت‌های داخلی',
          type: 'textarea',
          placeholder: 'یادداشت‌های داخلی (فقط برای تیم)',
          required: false,
          validation: {
            maxLength: 1000,
          },
          description: 'این یادداشت‌ها فقط برای تیم داخلی قابل مشاهده است',
        },
      ],
    };
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری اطلاعات...</p>
        </div>
      </div>
    );
  }

  // Show error if no form config
  if (!formConfig) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md" dir="rtl">
        <div className="text-center">
          <p className="text-red-600">خطا در بارگذاری فرم</p>
        </div>
      </div>
    );
  }

  return <DynamicForm config={formConfig} />;
};

export default ProjectForm;
