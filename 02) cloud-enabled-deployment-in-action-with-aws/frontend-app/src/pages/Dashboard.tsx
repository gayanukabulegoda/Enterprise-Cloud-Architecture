import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { courseService, studentService, mediaService } from '../services/api';

interface DashboardStats {
  courses: number;
  students: number;
  mediaFiles: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({ courses: 0, students: 0, mediaFiles: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [courses, students, mediaFiles] = await Promise.all([
          courseService.getAll(),
          studentService.getAll(),
          mediaService.getAll(),
        ]);

        setStats({
          courses: courses.length,
          students: students.length,
          mediaFiles: mediaFiles.length,
        });
      } catch (err) {
        setError('Failed to load dashboard statistics');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    onClick: () => void;
  }> = ({ title, value, icon, color, onClick }) => (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        height: '100%',
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: color }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total {title.toLowerCase()}
        </Typography>
      </CardContent>
    </Card>
  );

  const handleAboutClick = () => {
    setAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    setAboutModalOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Courses"
            value={stats.courses}
            icon={<SchoolIcon sx={{ color: 'white' }} />}
            color="#1976d2"
            onClick={() => navigate('/courses')}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Students"
            value={stats.students}
            icon={<PeopleIcon sx={{ color: 'white' }} />}
            color="#dc004e"
            onClick={() => navigate('/students')}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Media Files"
            value={stats.mediaFiles}
            icon={<PhotoLibraryIcon sx={{ color: 'white' }} />}
            color="#2e7d32"
            onClick={() => navigate('/media')}
          />
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
              }}
              onClick={() => navigate('/courses')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">Manage Courses</Typography>
                <Typography variant="body2" color="text.secondary">
                  Add, edit, or remove courses
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
              }}
              onClick={() => navigate('/students')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <PeopleIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="h6">Manage Students</Typography>
                <Typography variant="body2" color="text.secondary">
                  Add, edit, or remove students
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
              }}
              onClick={() => navigate('/media')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <PhotoLibraryIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h6">Media Gallery</Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload and manage files
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
              }}
              onClick={handleAboutClick}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <InfoIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h6">About</Typography>
                <Typography variant="body2" color="text.secondary">
                  App information and details
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* About Modal */}
      <Dialog
        open={aboutModalOpen}
        onClose={handleCloseAboutModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar
              src="https://avatars.githubusercontent.com/u/223808920?s=200&v=4"
              alt="App Logo"
              sx={{ width: 80, height: 80, mb: 2 }}
            />
            <Typography variant="h5" component="h2" gutterBottom>
              Cloud-Enabled Deployment
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" paragraph>
              This is a simple example application created to demonstrate cloud-enabled deployment for students enrolled in the Enterprise Cloud Architecture module in HDSE.
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Version:</strong> 1.0.0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Author:</strong> Enterprise Cloud Architecture 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Technology:</strong> Spring Boot, Java, MySQL, MongoDBReact, TypeScript, Material-UI, AWS
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={handleCloseAboutModal} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
