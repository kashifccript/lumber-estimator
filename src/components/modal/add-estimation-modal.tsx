import { useState } from 'react';
import { X } from 'lucide-react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (item: { name: string; quantity: string }) => void;
}

export function AddItemModal({ isOpen, onClose, onSubmit }: AddItemModalProps) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim() && quantity.trim()) {
      onSubmit?.({ name: itemName.trim(), quantity: quantity.trim() });
      setItemName('');
      setQuantity('');
      onClose();
    }
  };

  const handleCancel = () => {
    setItemName('');
    setQuantity('');
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4 backdrop-blur-sm'>
      <div className='w-full max-w-4xl rounded-xl bg-white'>
        {/* Header */}
        <div className='flex items-start justify-between border-b p-8'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold text-[#1F1F1F]'>
              Add New Item
            </h2>
            <p className='text-lg text-[#1F1F1F]'>
              Add a construction material or services specific to your business
            </p>
          </div>
          <button
            onClick={onClose}
            className='rounded-lg p-2 transition-colors hover:bg-gray-100'
          >
            <X className='h-6 w-6 text-[#1F1F1F]' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6 p-8'>
          <div className='space-y-5'>
            <div className='space-y-3'>
              <label className='block text-lg font-semibold text-[#1F1F1F]'>
                Item Name*
              </label>
              <input
                type='text'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder='e.g., Premium Oak Flooring'
                className='w-full rounded-sm border-0 bg-gray-50 p-4 text-lg text-[#1F1F1F] placeholder-[#1F1F1F]/40 focus:ring-2 focus:ring-[#E2624B] focus:outline-none'
                required
              />
            </div>

            <div className='space-y-3'>
              <label className='block text-lg font-semibold text-[#1F1F1F]'>
                Quantity
              </label>
              <input
                type='text'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder='e.g., 20 sq ft, 30 piece, 120 hour'
                className='w-full rounded-sm border-0 bg-gray-50 p-4 text-lg text-[#1F1F1F] placeholder-[#1F1F1F]/40 focus:ring-2 focus:ring-[#E2624B] focus:outline-none'
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center justify-end gap-3 pt-4'>
            <button
              type='button'
              onClick={handleCancel}
              className='rounded-lg border border-red-500 px-6 py-3 text-red-500 transition-colors hover:bg-red-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-lg bg-[#E2624B] px-6 py-3 text-white transition-colors hover:bg-[#d14d2e]'
            >
              Add Item and Re-Estimate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
