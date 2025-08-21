'use client';
import { useEffect, useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { uploadPDFForEstimation } from '@/lib/lumber-estimation';
import { toast } from 'sonner';

interface CreateEstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload?: (file: File) => void;
  onUploadSuccess?: (data: any) => void;
}

export function CreateEstimateModal({
  isOpen,
  onClose,
  onFileUpload,
  onUploadSuccess
}: CreateEstimateModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setUploading(false);
      setUploadProgress(0);
      setCurrentFile(null);
      setDragActive(false);
    }
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      // 50MB limit
      toast.error('File size must be less than 50MB');
      return;
    }

    setCurrentFile(file);
    setUploading(true);
    setUploadProgress(0);

    try {
      // Generate project name from filename
      const projectName = file.name.replace(/\.[^/.]+$/, '');

      const response = await uploadPDFForEstimation(
        {
          file,
          project_name: projectName,
          force_fresh: false
        },
        (progress) => {
          setUploadProgress(progress);
        }
      );

      // Simulate processing time after upload completes
      setUploadProgress(85);

      // Simulate final processing
      setTimeout(() => {
        setUploadProgress(100);
        toast.success('PDF analysis completed successfully!');

        // Store data and notify parent
        localStorage.setItem('current_estimation', JSON.stringify(response));
        onUploadSuccess?.(response);

        // Close modal after success
        setTimeout(() => {
          onClose();
        }, 1000);
      }, 2000); // 2 second processing simulation
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
      setUploading(false);
      setUploadProgress(0);
      setCurrentFile(null);
    }

    // Call the original callback for compatibility
    onFileUpload?.(file);
  };

  return (
    <Modal
      title='Create New Estimate'
      description='Upload Your design PDF to begin the estimation process'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='max'>
        {!uploading ? (
          <div
            className={`space-y-2.5 rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5'
                : 'bg-background border-[#FFD6A8]'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className='text-secondary mx-auto h-12 w-12' />
            <h3 className='text-secondary text-2xl font-medium'>
              Drag & drop your Design PDF here
            </h3>
            <p className='text-secondary mb-6'>or browse files</p>

            <div className='space-y-4'>
              <label className='inline-block'>
                <input
                  type='file'
                  accept='.pdf'
                  onChange={handleFileSelect}
                  className='hidden'
                />
                <span className='text-secondary cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3.5 font-semibold transition-colors hover:bg-gray-50'>
                  Browse Files
                </span>
              </label>
              <p className='text-secondary'>Supports PDF files up to 50MB</p>
            </div>
          </div>
        ) : (
          <div className='bg-background rounded-xl border-2 border-dashed border-[#FFD6A8] p-8'>
            <div className='flex items-center gap-4'>
              <FileText className='text-secondary h-10 w-10 flex-shrink-0' />
              <div className='flex-1 space-y-3'>
                <h3 className='text-secondary text-xl font-medium'>
                  {uploadProgress < 85
                    ? 'Uploading document...'
                    : 'Analyzing document...'}
                </h3>
                {currentFile && (
                  <p className='text-sm text-gray-600'>
                    Processing: {currentFile.name} (
                    {(currentFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
                <div className='space-y-1'>
                  <div className='h-3 w-full rounded-full bg-gray-300'>
                    <div
                      className='bg-primary h-3 rounded-full transition-all duration-300'
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className='text-secondary text-base font-medium'>
                    {uploadProgress < 85
                      ? `Uploading... ${uploadProgress}%`
                      : uploadProgress < 100
                        ? 'Analyzing PDF content...'
                        : 'Analysis complete!'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
