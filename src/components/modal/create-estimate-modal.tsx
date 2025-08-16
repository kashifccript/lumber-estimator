'use client';
import { useEffect, useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      alert('Please upload a PDF file');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 85) {
          clearInterval(interval);
          return 85;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

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
        {false ? (
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
                  Processing your document...
                </h3>
                <div className='space-y-1'>
                  <div className='h-3 w-full rounded-full bg-gray-300'>
                    <div
                      className='bg-primary h-3 rounded-full transition-all duration-300'
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className='text-secondary text-base font-medium'>
                    Processing document... {Math.round(uploadProgress)}%
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
