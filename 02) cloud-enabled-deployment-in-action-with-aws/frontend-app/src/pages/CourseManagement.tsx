import React, {type FormEvent, useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {Add as AddIcon, Delete as DeleteIcon,} from '@mui/icons-material';
import type {Course} from '../services/api';
import {courseService} from '../services/api';

interface CourseFormData {
    id: string;
    name: string;
    duration: string;
}

const CourseManagement: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState<CourseFormData>({
        id: '',
        name: '',
        duration: '',
    });
    const [formErrors, setFormErrors] = useState<Partial<CourseFormData>>({});

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await courseService.getAll();
            setCourses(data);
        } catch (err) {
            setError('Failed to load courses');
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = () => {
        setFormData({id: '', name: '', duration: ''});
        setFormErrors({});
        setOpenDialog(true);
        // Focus the first input field after dialog opens
        setTimeout(() => {
            const element = document.querySelector('input[name="id"]') as HTMLInputElement;
            if (element) {
                element.focus();
            }
        }, 100);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({id: '', name: '', duration: ''});
        setFormErrors({});
    };

    const validateForm = (): boolean => {
        const errors: Partial<CourseFormData> = {};

        if (!formData.id.trim()) {
            errors.id = 'Course ID is required';
        } else if (!/^[A-Za-z]+$/.test(formData.id)) {
            errors.id = 'Course ID must contain only letters';
        }

        if (!formData.name.trim()) {
            errors.name = 'Course name is required';
        } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
            errors.name = 'Course name must contain only letters and spaces';
        }

        if (!formData.duration.trim()) {
            errors.duration = 'Course duration is required';
        }

        setFormErrors(errors);

        // Focus and select the first error field
        if (Object.keys(errors).length > 0) {
            const firstErrorField = Object.keys(errors)[0];
            setTimeout(() => {
                const element = document.querySelector(`input[name="${firstErrorField}"]`) as HTMLInputElement;
                if (element) {
                    element.focus();
                    element.select();
                }
            }, 100);
        }

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await courseService.create(formData);
            fetchCourses();
        } catch (err) {
            setError('Failed to save course');
            console.error('Error saving course:', err);
        }finally {
            handleCloseDialog();
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await courseService.delete(id);
                fetchCourses();
            } catch (err) {
                setError('Failed to delete course');
                console.error('Error deleting course:', err);
            }
        }
    };

    const handleInputChange = (field: keyof CourseFormData, value: string) => {
        setFormData(prev => ({...prev, [field]: value}));
        if (formErrors[field]) {
            setFormErrors(prev => ({...prev, [field]: undefined}));
        }
    };

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px'}}>
                <CircularProgress size={60}/>
            </Box>
        );
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                    borderBottom: '1px solid #e0e0e0',
                    pb: 2
                }}
            >
                <Typography
                    variant="h4"
                    component="h1">
                    Course Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={handleOpenDialog}
                    sx={{minWidth: 'fit-content'}}
                >
                    Add Course
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{mb: 2}} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {isMobile ? (
                // Mobile view with cards
                <Grid container spacing={2}>
                    {courses.length === 0 && (
                        <Grid item xs={12}>
                            <Typography align="center">No courses available.</Typography>
                        </Grid>
                    )}
                    {courses.map((course) => (
                        <Grid item xs={12} key={course.id}>
                            <Card>
                                <CardContent>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Box sx={{flex: 1}}>
                                            <Typography variant="h6" component="div">
                                                {course.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                ID: {course.id}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Duration: {course.duration}
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(course.id)}
                                            size="small"
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                // Desktop view with table
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Course ID</TableCell>
                                    <TableCell>Course Name</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            No courses available.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {courses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell>{course.id}</TableCell>
                                        <TableCell>{course.name}</TableCell>
                                        <TableCell>{course.duration}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(course.id)}
                                                size="small"
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}

            {/* Add Course Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{pb: 0}}>Add New Course</DialogTitle>
                <DialogContent sx={{pb: 1}}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{pt: 1}}>
                            <TextField
                                fullWidth
                                name="id"
                                label="Course ID"
                                value={formData.id}
                                onChange={(e) => handleInputChange('id', e.target.value)}
                                error={!!formErrors.id}
                                helperText={formErrors.id}
                                margin="normal"
                                placeholder="e.g., HDSE"
                                autoFocus={true}
                            />
                            <TextField
                                fullWidth
                                name="name"
                                label="Course Name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                error={!!formErrors.name}
                                helperText={formErrors.name}
                                margin="normal"
                                placeholder="e.g., Higher Diploma in Software Engineering"
                            />
                            <TextField
                                fullWidth
                                name="duration"
                                label="Duration"
                                value={formData.duration}
                                onChange={(e) => handleInputChange('duration', e.target.value)}
                                error={!!formErrors.duration}
                                helperText={formErrors.duration}
                                margin="normal"
                                placeholder="e.g., 2 Years"
                            />
                            <DialogActions sx={{px: 0}}>
                                <Button onClick={handleCloseDialog}>Cancel</Button>
                                <Button type="submit" variant="contained">
                                    Add Course
                                </Button>
                            </DialogActions>
                        </Box>
                    </form>
                </DialogContent>

            </Dialog>
        </Box>
    );
};

export default CourseManagement;
