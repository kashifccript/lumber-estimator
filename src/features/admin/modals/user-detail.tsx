'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import { useState } from 'react';

interface UserDetailsProps {
  isOpen: boolean;
  onClose: (setIsPasswordModalOpen: boolean) => void;
}

export default function UserDetails({ isOpen, onClose }: UserDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    setIsLoading(true);

    try {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='h-[auto] max-w-2xl border-none'>
        <DialogHeader>
          <DialogTitle>Contractor Details</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
