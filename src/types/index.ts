export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface StudyPlan {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  imageUrl: string;
  topics: string[];
  userId?: string;
  createdAt: string;
  rating?: number;
}

export interface Review {
  _id: string;
  studyPlanId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: User;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
