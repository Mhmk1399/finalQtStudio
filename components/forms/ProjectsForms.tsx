'use client';

import React, { useState, useEffect } from 'react';
import DynamicForm from './DynamicForm';
import { FormConfig } from '@/types/form';

interface ProjectFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  initialData?: any;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSuccess, onError, initialData }) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  const [projectManagers, setProjectManagers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setLoading(true);
        
        // Fetch customers
        const customersResponse = await fetch('/api/customers');
        const customersData = await customersResponse.json();
        
        // Fetch contracts (assuming you have this endpoint)
        const contractsResponse = await fetch('/api/contracts');
        const contractsData = await contractsResponse.json();
        
        // Fetch project managers/users (assuming you have this endpoint)
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();
        
        if (customersData.success) {
          setCustomers(customersData.data || []);
        }
        
        if (contractsData.success) {
          setContracts(contractsData.data || []);
        }
        
        if (usersData.success) {
          setProjectManagers(usersData.data || []);
        }
        
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  const handleProjectSuccess = (response: any) => {
    console.log('Project created successfully:', response);
    
    // Call the parent success handler if provided
    if (onSuccess) {
      onSuccess(response);
    } else {
      // Default success behavior
      alert('پروژه با موفقیت ایجاد شد!');
    }
  };

  const handleProjectError = (error: string) => {
    console.error('Project creation error:', error);
    
    // Call the parent error handler if provided
    if (onError) {
      onError(error);
    } else {
      // Default error behavior
      console.error('Project creation failed:', error);
    }
  };

  // Show loading state while fetching dropdown data
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md" dir="rtl">
        <div className="text-center">
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  const projectFormConfig: FormConfig = {
    title: 'ایجاد پروژه جدید',
    description: 'فرم زیر را برای ایجاد پروژه جدید تکمیل کنید',
    endpoint: '/api/projects',
    method: 'POST',
    submitButtonText: 'ایجاد پروژه',
    onSuccess: handleProjectSuccess,
    onError: handleProjectError,
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
        options: customers.map(customer => ({
          value: customer._id,
          label: `${customer.name} - ${customer.businessName}`,
        })),
      },
      {
        name: 'contractId',
        label: 'قرارداد',
        type: 'select',
        required: true,
        options: contracts.map(contract => ({
          value: contract._id,
          label: contract.title || contract.contractNumber || contract._id,
        })),
      },
      {
        name: 'projectManagerId',
        label: 'مدیر پروژه',
        type: 'select',
        required: true,
        options: projectManagers.map(manager => ({
          value: manager._id,
          label: manager.name || manager.username,
        })),
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

  return <DynamicForm config={projectFormConfig} initialData={initialData} />;
};

export default ProjectForm;
