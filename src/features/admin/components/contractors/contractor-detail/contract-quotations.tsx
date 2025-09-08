import React from 'react';
import { QuotationListing } from '../../quotation-table/quotation-list';
interface UserDetailsProps {
  status?: string;
  user_id?:string
}

export default function ContractorQuotations({ status,user_id }: UserDetailsProps) {
  return <QuotationListing showButton={false} status={status} user_id={user_id}/>;
}
