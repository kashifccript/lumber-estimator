import { SettingsTabs } from '@/features/admin/components/settings';

export const metadata = {
  title: 'Settings'
};

export default function page() {
  return (
    <div className='py-8'>
      <SettingsTabs />
    </div>
  );
}
