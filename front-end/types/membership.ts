export interface MembershipBenefit {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'point' | 'service' | 'other';
  conditions?: string[];
}

export interface MembershipBenefitsProps {
  benefits: MembershipBenefit[];
}
