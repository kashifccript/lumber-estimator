// src/config/role-content.ts
export type UserRole = 'contractor' | 'estimator';

export interface RoleContent {
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
  quickTips: Array<{
    description: string;
  }>;
}

export const roleContent: Record<UserRole, RoleContent> = {
  contractor: {
    hero: {
      title: 'Build Better Quotation',
      subtitle:
        'Create your first quotation to unlock powerful insights and analytics for your projects.',
      buttonText: 'Create Your First Quotation'
    },
    features: [
      {
        icon: '/assets/icons/fast.svg',
        title: 'Fast Estimates',
        description:
          'Estimators can price project using your material database.'
      },
      {
        icon: '/assets/icons/checkmark.svg',
        title: 'Consistent Pricing',
        description: 'Estimator use your approved material and pricing.'
      },
      {
        icon: '/assets/icons/building.svg',
        title: 'Better Margins',
        description:
          'Keep track of current market prices and maintain profitability.'
      }
    ],
    cta: {
      title: 'Add Your Own Materials',
      description:
        'Add specific materials and prices that are unique to your business.',
      buttonText: 'Create Your First Quotation'
    },
    quickTips: [
      {
        description:
          'Start with your most commonly used materials. You can always add more later!'
      }
    ]
  },
  estimator: {
    hero: {
      title: 'Build Better Estimates',
      subtitle:
        'Create your first estimate to unlock powerful insights and analytics for your projects.',
      buttonText: 'Create Your First Estimate'
    },
    features: [
      {
        icon: '/assets/icons/upload.svg',
        title: 'Upload Your Plans',
        description: 'Simply upload your design PDF or blueprints'
      },
      {
        icon: '/assets/icons/review.svg',
        title: 'Upload Your Plans',
        description: 'Simply upload your design PDF or blueprints'
      },
      {
        icon: '/assets/icons/analyze.svg',
        title: 'Upload Your Plans',
        description: 'Simply upload your design PDF or blueprints'
      }
    ],
    cta: {
      title: 'Ready to Get Started',
      description:
        'Join thousands of construction professionals who are saving time and improving accuracy with EstimatorPro.',
      buttonText: 'Create Your First Estimate'
    },
    quickTips: [
      {
        description:
          'Upload high-resolution PDF plans for the most accurate results.'
      },
      {
        description:
          'Review the generated material list and adjust quantities if needed.'
      },
      {
        description:
          'Set up contractor profiles to track performance across projects.'
      }
    ]
  }
};
