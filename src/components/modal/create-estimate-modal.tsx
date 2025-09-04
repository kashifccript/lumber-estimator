'use client';
import { Modal } from '@/components/ui/modal';
import { Progress } from '@/components/ui/progress';
import { UploadProgress } from '@/features/estimation-details/types/estimation';
import { FileText, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useEstimationStore } from '@/stores/estimation-store';

interface CreateEstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload?: (file: File) => void;
}

export function CreateEstimateModal({
  isOpen,
  onClose,
  onFileUpload
}: CreateEstimateModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [uploadedSize, setUploadedSize] = useState(0);

  // Get store state to detect when upload completes
  const { isUploading: storeIsUploading, error: storeError } =
    useEstimationStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setUploading(false);
      setUploadProgress(0);
      setFileSize(0);
      setUploadedSize(0);
      setDragActive(false);
    }
  }, [isOpen]);

  // Reset progress when store upload completes (success or failure)
  useEffect(() => {
    if (!storeIsUploading && uploading) {
      // Upload completed in store, reset our progress
      setUploading(false);
      setUploadProgress(0);
      setUploadedSize(0);
      // Keep fileSize for next attempt
    }
  }, [storeIsUploading, uploading]);

  // Simulated progress bar
  useEffect(() => {
    if (uploading && uploadProgress < 90) {
      const timer = setTimeout(() => {
        setUploadProgress((prev) => {
          const increment = Math.random() * 15 + 5; // Random increment between 5-20
          const newProgress = Math.min(prev + increment, 90); // Don't go above 90%

          // Update uploaded size proportionally
          setUploadedSize((newProgress / 100) * fileSize);

          return newProgress;
        });
      }, 200); // Update every 200ms

      return () => clearTimeout(timer);
    }
  }, [uploading, uploadProgress, fileSize]);

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 MB';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

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

  const handleFileUpload = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    // Reset and start progress
    setUploading(true);
    setUploadProgress(0);
    setFileSize(file.size);
    setUploadedSize(0);

    // Call the parent's upload function
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
          // Upload UI - shows when not uploading or after reset
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
                  className='sr-only'
                  accept='.pdf'
                  onChange={handleFileSelect}
                />
                <span className='text-secondary cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3.5 font-semibold transition-colors hover:bg-gray-50'>
                  Browse Files
                </span>
              </label>
            </div>
          </div>
        ) : (
          // Progress UI - shows during upload
          <div className='space-y-6 rounded-xl border p-8 text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
              <FileText className='h-8 w-8 text-blue-600' />
            </div>

            <div className='space-y-2'>
              <h3 className='text-lg font-medium'>Processing your PDF...</h3>
              <p className='text-muted-foreground text-sm'>
                Please wait while we analyze your design file
              </p>
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Progress</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} />
              <div className='text-muted-foreground flex justify-between text-xs'>
                <span>{formatFileSize(uploadedSize)}</span>
                <span>{formatFileSize(fileSize)}</span>
              </div>
            </div>

            <div className='text-muted-foreground text-xs'>
              This may take a few moments depending on your file size
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
