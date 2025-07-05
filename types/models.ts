import mongoose from "mongoose";

// Customer Types
export interface ICustomer {
  _id: mongoose.Types.ObjectId;
  name: string;
  phoneNumber: string;
  password?: string;
  businessName: string;
  businessScale: string;
  address: string;
  email: string;
  website?: string;
  isActive: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
}

// Verification Request Types
export interface IVerificationRequest {
  _id: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  salesUserId: mongoose.Types.ObjectId;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Contract Types
export interface IContract {
  _id: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  contractNumber: string;
  status: 'draft' | 'active' | 'completed' | 'terminated' | 'expired';
  signedDate?: Date;
  expiryDate?: Date;
  totalValue: number;
  terms: string;
  verifier: mongoose.Types.ObjectId;
  contractType: 'standard' | 'premium' | 'enterprise' | 'custom';
}

// Service Types
export interface IService {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  duration: string;
  requirements: string;
  teamType: string;
  isActive: boolean;
}

// Project Types
export interface IProject {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  customerId: mongoose.Types.ObjectId;
  contractId: mongoose.Types.ObjectId;
  projectManagerId: mongoose.Types.ObjectId;
  status: 'planning' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate?: Date;
  expectedEndDate?: Date;
  actualEndDate?: Date;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue';
  paidAmount: number;
  totalPrice: number;
  finalPrice: number;
  discount: number;
  notes: string;
  internalNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Service Request Types
export interface IServiceRequest {
  _id: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  quantity: number;
  agreedPrice: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
  requestedDate: Date;
  scheduledDate?: Date;
  requirements: string;
  notes: string;
  requestedBy: mongoose.Types.ObjectId;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Task Types
export interface ITask {
  _id: mongoose.Types.ObjectId;
  serviceRequestId: mongoose.Types.ObjectId;
  assignedTeamId?: mongoose.Types.ObjectId;
  assignedUserId?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate?: Date;
  dueDate?: Date;
  completedDate?: Date;
  notes: string;
  deliverables: string;
  createdAt: Date;
  updatedAt: Date;
}

// Team Types
export interface ITeam {
  _id: mongoose.Types.ObjectId;
  name: string;
  specialization: string;
  description: string;
  isActive: boolean;
}

// User Types
export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: string;
  teamId?: mongoose.Types.ObjectId;
  permissions: string;
  isActive: boolean;
}

// Union Types for Status Fields
export type CustomerVerificationStatus = 'pending' | 'verified' | 'rejected';
export type VerificationRequestStatus = 'pending' | 'approved' | 'rejected' | 'in-review';
export type ContractStatus = 'draft' | 'active' | 'completed' | 'terminated' | 'expired';
export type ContractType = 'standard' | 'premium' | 'enterprise' | 'custom';
export type BusinessScale = 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
export type ProjectStatus = 'planning' | 'active' | 'paused' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'partial' | 'paid' | 'overdue';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type ServiceRequestStatus = 'pending' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed' | 'cancelled';

// Generic Types for API Responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Create and Update Types (without _id and timestamps)
export type CreateCustomer = Omit<ICustomer, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateCustomer = Partial<CreateCustomer>;

export type CreateVerificationRequest = Omit<IVerificationRequest, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateVerificationRequest = Partial<CreateVerificationRequest>;

export type CreateContract = Omit<IContract, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateContract = Partial<CreateContract>;

export type CreateService = Omit<IService, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateService = Partial<CreateService>;

export type CreateProject = Omit<IProject, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateProject = Partial<CreateProject>;

export type CreateServiceRequest = Omit<IServiceRequest, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateServiceRequest = Partial<CreateServiceRequest>;

export type CreateTask = Omit<ITask, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateTask = Partial<CreateTask>;

export type CreateTeam = Omit<ITeam, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateTeam = Partial<CreateTeam>;

export type CreateUser = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateUser = Partial<CreateUser>;
