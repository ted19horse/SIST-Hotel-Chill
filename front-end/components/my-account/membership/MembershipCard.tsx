import { Membership } from '@/lib/types/my-account';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Progress, Tooltip } from 'antd';
import { useTranslation } from 'next-i18next';
import React from 'react';

interface MembershipCardProps {
  membership: Membership;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ membership }) => {
  const { t } = useTranslation('common');

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="membership-card">
      <div className="membership-header">
        <h2>{t(`membership.tiers.${membership.membershipTier}`)}</h2>
        <span className="membership-number">{membership.membershipNumber}</span>
      </div>

      <div className="membership-stats">
        <div className="stat-item">
          <span className="stat-label">{t('membership.points')}</span>
          <span className="stat-value">{formatNumber(membership.points)} P</span>
          {membership.pointExpiryDate && (
            <Tooltip
              title={t('membership.pointsExpiry', { date: formatDate(membership.pointExpiryDate) })}
            >
              <InfoCircleOutlined className="info-icon" />
            </Tooltip>
          )}
        </div>

        <div className="stat-item">
          <span className="stat-label">{t('membership.totalStays')}</span>
          <span className="stat-value">{membership.totalStays}</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">{t('membership.totalSpending')}</span>
          <span className="stat-value">₩{formatNumber(membership.totalSpending)}</span>
        </div>
      </div>

      <div className="tier-progress">
        <div className="progress-header">
          <span>{t('membership.nextTier')}</span>
          <span>{formatNumber(membership.pointsToNextTier)} P</span>
        </div>
        <Progress
          percent={membership.tierProgress}
          showInfo={false}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />
        <div className="progress-footer">
          <span>{t('membership.currentTier')}</span>
          <span>
            {t('membership.nextTierThreshold', {
              points: formatNumber(membership.nextTierThreshold),
            })}
          </span>
        </div>
      </div>

      {membership.pointConversionRate && (
        <div className="conversion-rate">
          <Tooltip title={t('membership.conversionRateInfo')}>
            <span>
              {t('membership.conversionRate', {
                rate: (membership.pointConversionRate * 100).toFixed(1),
              })}
              %
            </span>
          </Tooltip>
        </div>
      )}
    </Card>
  );
};

export default MembershipCard;
