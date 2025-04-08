import styles from '@/styles/components/my-account/membership/MembershipBenefits.module.scss';
import { MembershipBenefitsProps } from '@/types/membership';
import React from 'react';

/**
 * 멤버십 혜택을 보여주는 컴포넌트
 * @param {MembershipBenefitsProps} props - 멤버십 혜택 데이터
 * @returns {JSX.Element} 멤버십 혜택 컴포넌트
 */
const MembershipBenefits: React.FC<MembershipBenefitsProps> = ({ benefits }) => {
  return (
    <div className={styles.membershipBenefits}>
      <h2 className={styles.title}>멤버십 혜택</h2>
      <div className={styles.benefitsList}>
        {benefits.map((benefit) => (
          <div key={benefit.id} className={styles.benefitItem}>
            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
            <p className={styles.benefitDescription}>{benefit.description}</p>
            {benefit.conditions && benefit.conditions.length > 0 && (
              <div className={styles.conditions}>
                <h4>이용 조건</h4>
                <ul>
                  {benefit.conditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipBenefits;
