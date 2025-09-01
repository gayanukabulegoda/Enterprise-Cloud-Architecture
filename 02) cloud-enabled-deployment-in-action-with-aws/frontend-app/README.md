# ECA Management System - Frontend

A modern, responsive React TypeScript frontend application for managing courses, students, and media files. Built with Material-UI and Vite.

## Features

### 🎓 Course Management
- Add, edit, and delete courses
- Form validation with proper error handling
- Responsive design for mobile and desktop
- Real-time data synchronization

### 👥 Student Management
- Complete CRUD operations for students
- Advanced form validation (email, phone, registration number formats)
- Mobile-responsive card and table views
- Search and filter capabilities

### 📁 Media Gallery
- Drag and drop file upload
- Support for images, PDFs, and text files
- Thumbnail grid layout with preview functionality
- File type detection and categorization
- Bulk upload support

### 🎨 Modern UI/UX
- Material-UI design system
- Responsive navigation with mobile drawer
- Interactive dashboard with statistics
- Smooth animations and transitions
- Professional color scheme and typography

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Production-grade component library
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing
- **React Dropzone** - Drag and drop file uploads

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend services running on:
  - Course Service: `http://localhost:8081`
  - Student Service: `http://localhost:8082`
  - Media Service: `http://localhost:8083`

## Installation

1. **Clone the repository**
   ```bash
   cd frontend-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.tsx   # Main navigation component
├── pages/              # Page components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── CourseManagement.tsx
│   ├── StudentManagement.tsx
│   └── MediaGallery.tsx
├── services/           # API services
│   └── api.ts         # Axios configuration and API calls
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## API Integration

The application integrates with three microservices:

### Course Service (`http://localhost:8081`)
- `GET /courses` - Get all courses
- `POST /courses` - Create new course
- `PUT /courses/{id}` - Update course
- `DELETE /courses/{id}` - Delete course

### Student Service (`http://localhost:8082`)
- `GET /students` - Get all students
- `POST /students` - Create new student
- `PUT /students/{registrationNumber}` - Update student
- `DELETE /students/{registrationNumber}` - Delete student

### Media Service (`http://localhost:8083`)
- `GET /files` - Get all files
- `POST /files` - Upload file
- `DELETE /files/{id}` - Delete file
- `GET /files/{id}` - Download file

## Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+) - Full navigation, tables, and grid layouts
- **Tablet** (768px - 1199px) - Adaptive layouts with side navigation
- **Mobile** (< 768px) - Card-based layouts, drawer navigation

## Form Validation

### Course Validation
- Course ID: Letters only, required
- Course Name: Letters and spaces only, required
- Duration: Required

### Student Validation
- Registration Number: Format SXXX, required
- Full Name: Letters and spaces only, required
- Contact: Format XXX-XXXXXXX, required
- Email: Valid email format, required
- Address: Minimum 3 characters, required

## File Upload Features

- **Supported Formats**: JPG, PNG, GIF, BMP, WebP, PDF, TXT, MD, JSON, XML, CSV
- **Drag & Drop**: Intuitive file upload interface
- **Multiple Files**: Bulk upload support
- **Progress Indication**: Visual feedback during upload
- **File Preview**: Image preview and file type detection
- **Error Handling**: Comprehensive error messages

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React hooks best practices
- Use Material-UI components consistently
- Implement proper error handling
- Write responsive, mobile-first CSS

### Component Structure
- Functional components with hooks
- Proper prop typing with TypeScript
- Separation of concerns (UI, logic, API)
- Reusable components where possible

### State Management
- Use React hooks for local state
- Implement proper loading states
- Handle API errors gracefully
- Optimize re-renders with useCallback/useMemo

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Create a `.env` file for production configuration:
```env
VITE_COURSE_SERVICE_URL=http://your-course-service-url
VITE_STUDENT_SERVICE_URL=http://your-student-service-url
VITE_MEDIA_SERVICE_URL=http://your-media-service-url
```

### Static Hosting
The built application can be deployed to any static hosting service:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

## Contributing

1. Follow the existing code style
2. Add proper TypeScript types
3. Test on multiple screen sizes
4. Ensure all features work with the backend services
5. Update documentation as needed

## License

This project is part of the ECA Management System.
