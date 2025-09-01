import axios from 'axios';

// API base URLs
const COURSE_SERVICE_URL = 'http://localhost:8081';
const STUDENT_SERVICE_URL = 'http://localhost:8082';
const MEDIA_SERVICE_URL = 'http://localhost:8083';

// Create axios instances for each service
const courseApi = axios.create({
  baseURL: COURSE_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const studentApi = axios.create({
  baseURL: STUDENT_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const mediaApi = axios.create({
  baseURL: MEDIA_SERVICE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Course API types and functions
export interface Course {
  id: string;
  name: string;
  duration: string;
}

export const courseService = {
  getAll: async (): Promise<Course[]> => {
    const response = await courseApi.get('/courses');
    return response.data._embedded.courses as Course[];
  },
  
  create: async (course: Omit<Course, 'id'>): Promise<Course> => {
    const response = await courseApi.post('/courses', course);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await courseApi.delete(`/courses/${id}`);
  },
};

// Student API types and functions
export interface Student {
  registrationNumber: string;
  fullName: string;
  address: string;
  contact: string;
  email: string;
}

export const studentService = {
  getAll: async (): Promise<Student[]> => {
    const response = await studentApi.get('/students');
    return response.data._embedded.students as Student[];
  },
  
  create: async (student: Student): Promise<Student> => {
    const response = await studentApi.post('/students', student);
    return response.data;
  },
  
  delete: async (registrationNumber: string): Promise<void> => {
    await studentApi.delete(`/students/${registrationNumber}`);
  },
};

// Media API types and functions
export interface MediaFile {
  id: string;
  filename: string;
  url: string;
}

export const mediaService = {
  getAll: async (): Promise<MediaFile[]> => {
    const response = await mediaApi.get('/files');
    return response.data;
  },
  
  upload: async (file: File): Promise<MediaFile> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await mediaApi.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await mediaApi.delete(`/files/${id}`);
  },
  
  getFileUrl: (id: string): string => {
    return `${MEDIA_SERVICE_URL}/files/${id}`;
  },
};

export default {
  courseService,
  studentService,
  mediaService,
};
