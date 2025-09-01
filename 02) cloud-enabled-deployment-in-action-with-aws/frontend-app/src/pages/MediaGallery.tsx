import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Alert,
  CircularProgress,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  ZoomIn as ZoomInIcon,
  PhotoLibrary as PhotoLibraryIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { mediaService } from '../services/api';
import type { MediaFile } from '../services/api';

const MediaGallery: React.FC = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const data = await mediaService.getAll();
      setFiles(data);
    } catch (err) {
      setError('Failed to load media files');
      console.error('Error fetching files:', err);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setError(null);

    try {
      const uploadPromises = acceptedFiles.map(file => mediaService.upload(file));
      await Promise.all(uploadPromises);
      await fetchFiles();
    } catch (err) {
      setError('Failed to upload one or more files');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.md', '.json', '.xml', '.csv'],
    },
    multiple: true,
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await mediaService.delete(id);
        await fetchFiles();
      } catch (err) {
        setError('Failed to delete file');
        console.error('Delete error:', err);
      }
    }
  };

  const handlePreview = (file: MediaFile) => {
    setSelectedFile(file);
    setPreviewOpen(true);
  };

  const isImageFile = (filename: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const getFileIcon = (filename: string) => {
    if (isImageFile(filename)) {
      return <PhotoLibraryIcon sx={{ fontSize: 40 }} />;
    }
    return <FileIcon sx={{ fontSize: 40 }} />;
  };

  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (isImageFile(filename)) return 'Image';
    if (extension === 'pdf') return 'PDF';
    if (['txt', 'md', 'json', 'xml', 'csv'].includes(extension || '')) return 'Text';
    return 'File';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          mb: 3,
          borderBottom: '1px solid #e0e0e0',
          pb: 2,
        }}
      >
        Media Gallery
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Upload Area */}
      <Paper
        {...getRootProps()}
        sx={{
          p: 4,
          mb: 3,
          textAlign: 'center',
          cursor: 'pointer',
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          or click to select files
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Supports: Images (JPG, PNG, GIF, BMP, WebP), PDF, Text files
        </Typography>
        {uploading && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Uploading...
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Files Grid */}
      {files.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <PhotoLibraryIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No files uploaded yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start by uploading some files using the area above
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {files.map((file) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                }}
              >
                {isImageFile(file.filename) ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={mediaService.getFileUrl(file.id)}
                    alt={file.filename}
                    sx={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'grey.100',
                    }}
                  >
                    {getFileIcon(file.filename)}
                  </Box>
                )}

                <Box sx={{ p: 2, flexGrow: 1 }}>
                  <Typography variant="body2" noWrap>
                    {file.filename}
                  </Typography>
                  <Chip
                    label={getFileType(file.filename)}
                    size="small"
                    sx={{ mt: 1 }}
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handlePreview(file)}
                    title="Preview"
                  >
                    <ZoomInIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(file.id)}
                    title="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {selectedFile?.filename}
        </DialogTitle>
        <DialogContent>
          {selectedFile && (
            <Box sx={{ textAlign: 'center' }}>
              {isImageFile(selectedFile.filename) ? (
                <img
                  src={mediaService.getFileUrl(selectedFile.id)}
                  alt={selectedFile.filename}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Box sx={{ p: 4 }}>
                  {getFileIcon(selectedFile.filename)}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {selectedFile.filename}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getFileType(selectedFile.filename)} file
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
          {selectedFile && (
            <Button
              color="error"
              onClick={() => {
                handleDelete(selectedFile.id);
                setPreviewOpen(false);
              }}
            >
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MediaGallery;
