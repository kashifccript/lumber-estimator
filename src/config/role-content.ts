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
    title: string;
    description: string;
  }>;
}

export const roleContent: Record<UserRole, RoleContent> = {
  contractor: {
    hero: {
      title: 'Build Better Quotation',
      subtitle:
        'Create your first quotation to unlock powerful insights and analytics for your projects.',
      buttonText: 'Create Your First Quotation'
    },
    features: [
      {
        icon: '/assets/icons/building.svg',
        title: 'Fast Estimates',
        description:
          'Estimators can price project using your material database.'
      },
      {
        icon: '/assets/icons/fast.svg',
        title: 'Consistent Pricing',
        description: 'Estimator use your approved material and pricing.'
      },
      {
        icon: '/assets/icons/checkmark.svg',
        title: 'Better Margins',
        description:
          'Keep track of current market prices and maintain profitability.'
      }
    ],
    cta: {
      title: 'Ready to Get Started',
      description:
        'Join thousands of contractors who are saving time and improving accuracy.',
      buttonText: 'Create Your First Quotation'
    },
    quickTips: [
      {
        title: 'Add Your Own Materials',
        description:
          'Add specific materials and prices that are unique to your business.'
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
    ],
    cta: {
      title: 'Ready to Get Started',
      description:
        'Join thousands of construction professionals who are saving time and improving accuracy with EstimatorPro.',
      buttonText: 'Create Your First Estimate'
    },
    quickTips: [
      {
        title: 'Quick Tip',
        description:
          'Start with a simple project to get familiar with the tools'
      }
    ]
  }
};
