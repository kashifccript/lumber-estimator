import Image from 'next/image';

export function FeaturesSection() {
  const features = [
    {
      icon: '/assets/icons/building.svg',
      title: 'Upload Your Plans',
      description: 'Simply upload your design PDF or blueprints'
    },
    {
      icon: '/assets/icons/fast.svg',
      title: 'Upload Your Plans',
      description: 'Simply upload your design PDF or blueprints'
    },
    {
      icon: '/assets/icons/checkmark.svg',
      title: 'Upload Your Plans',
      description: 'Simply upload your design PDF or blueprints'
    }
  ];

  return (
    <div className='grid grid-cols-1 gap-2.5 md:grid-cols-3'>
      {features.map((feature, index) => (
        <div
          key={index}
          className='flex items-center justify-start gap-3 rounded-lg bg-white p-2.5'
        >
          <div className='bg-primary/10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded'>
            <Image
              src={feature.icon}
              alt={feature.title}
              width={32}
              height={32}
            />
          </div>
          <div className='space-y-2.5'>
            <h3 className='text-secondary text-base font-semibold'>
              {feature.title}
            </h3>
            <p className='text-secondary text-sm font-light'>
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
