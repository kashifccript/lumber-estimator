'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  forgotPassword,
  verifyOTP
} from '@/features/auth/actions/forgot-password';
import { toast } from 'sonner';

export default function EmailVerification() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((digit) => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };
  const router = useRouter();

  const handleVerify = async () => {
    try {
      const verificationCode = code.join('');
      if (verificationCode.length !== 6) return;

      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);

      console.log('Verification code:', verificationCode);
      const result = await verifyOTP({
        email: email,
        otp: verificationCode
      });
      if (result?.success) {
        toast.success(result.message);
        router.push(`/reset-password?email=${email}`);
      } else {
        toast.error(
          result.message || 'Something went wrong. Please try again.'
        );
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleResendCode = () => {
    console.log('Resending code...');
    // Reset the form
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    handleResent();
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  const handleResent = async () => {
    // startTransition(async () => {
    try {
      // redirect('/email-verification')
      const result = await forgotPassword({
        email: email
      });
      if (result?.success) {
        toast.success(result.message);
        // router.push(`/email-verification?email=${email}`);
      } else {
        toast.error(
          result.message || 'Something went wrong. Please try again.'
        );
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Something went wrong. Please try again.');
    }
    // });
  };

  return (
    <div className='rounded-lg bg-white p-8'>
      <div className='space-y-6'>
        <div className='space-y-6'>
          <div className='flex justify-center gap-3'>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el: any) => (inputRefs.current[index] = el)}
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className='h-[72px] w-[78.62px] rounded-md border-0 bg-[#FFFFFF] text-center text-lg font-medium focus:outline-none'
                aria-label={`Digit ${index + 1}`}
                placeholder='-'
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            disabled={code.join('').length !== 6 || isLoading}
            variant={'default'}

            // className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </Button>

          <button
            onClick={handleResendCode}
            className='flex-start flex w-full text-[18px] text-[#77797E] transition-colors hover:text-gray-800'
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
