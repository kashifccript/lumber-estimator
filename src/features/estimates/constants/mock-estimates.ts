import { Estimate } from '../types/estimate';

export const mockEstimates: Estimate[] = [
  {
    id: '#BF123973OD',
    projectName: 'Residential Complex',
    material: '45 Items',
    totalCost: '$ 127,344',
    status: { pending: 30, approved: 40, rejected: 15, quotationNeeded: 15 }
  },
  {
    id: '#BF123974OD',
    projectName: 'Commercial Building',
    material: '32 Items',
    totalCost: '$ 89,200',
    status: { pending: 20, approved: 50, rejected: 0, quotationNeeded: 30 }
  },
  {
    id: '#BF123975OD',
    projectName: 'Office Tower',
    material: '67 Items',
    totalCost: '$ 245,100',
    status: { pending: 25, approved: 45, rejected: 0, quotationNeeded: 30 }
  },
  {
    id: '#BF123976OD',
    projectName: 'Shopping Mall',
    material: '89 Items',
    totalCost: '$ 312,500',
    status: { pending: 35, approved: 35, rejected: 0, quotationNeeded: 30 }
  },
  {
    id: '#BF123977OD',
    projectName: 'Hotel Complex',
    material: '54 Items',
    totalCost: '$ 189,750',
    status: { pending: 15, approved: 60, rejected: 5, quotationNeeded: 20 }
  },
  {
    id: '#BF123978OD',
    projectName: 'Hospital Wing',
    material: '73 Items',
    totalCost: '$ 298,400',
    status: { pending: 40, approved: 30, rejected: 10, quotationNeeded: 20 }
  },
  {
    id: '#BF123979OD',
    projectName: 'School Building',
    material: '41 Items',
    totalCost: '$ 156,300',
    status: { pending: 30, approved: 50, rejected: 0, quotationNeeded: 20 }
  }
];
