import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <div className='flex flex-row justify-end gap-2'>
      <Button variant='reject' size='md'>
        Reject
      </Button>
      <Button variant='approve' size='md'>
        Approve Estimate
      </Button>
    </div>
  );
};
