import { useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSubmit?: (item: { name: string; quantity: string }) => void;
}

const formSchema = z.object({
  item: z.string().min(2, 'Item name is required'),
  quantity: z.string().min(2, 'Quantity name is required'),
  productCode: z.string().optional()
});

export function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: '',
      quantity: '',
      productCode: ''
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (itemName.trim() && quantity.trim()) {
  //     onSubmit?.({ name: itemName.trim(), quantity: quantity.trim() });
  //     setItemName('');
  //     setQuantity('');
  //     onClose();
  //   }
  // };

  const handleCancel = () => {
    setItemName('');
    setQuantity('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      title='Add New Item'
      description='Add a construction material or services specific to your business'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2.5 overflow-y-auto'
        >
          {/* Item Name */}
          <FormField
            control={form.control}
            name='item'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder='e.g., Premium Oak Flooring' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Quantity*/}
          <FormField
            control={form.control}
            name='quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g., 20 sq ft, 30 piece, 120 hour'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* SKU/Product Code */}
          <FormField
            control={form.control}
            name='productCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU/Product Code (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder='e.g., OAK-PREM-001' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Actions */}
          <div className='mt-6 flex items-center justify-end gap-2'>
            <Button onClick={handleCancel} variant='secondary' size='secondary'>
              Cancel
            </Button>
            <Button type='submit' variant='primary' size='secondary'>
              Add Item and Re-Estimate
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
