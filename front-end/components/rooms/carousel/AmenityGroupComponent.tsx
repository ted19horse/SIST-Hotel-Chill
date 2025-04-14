'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/ui/Popover';
import { cn } from '@/lib/utils';
import { AmenityItem as AmenityItemType } from '@/lib/types/room';
import { AlertCircle, Plus } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface AmenityItemProps {
  item: AmenityItemType;
  onError?: () => void;
}

// 아이템 컴포넌트 분리 및 메모이제이션
const AmenityItem = React.memo(function AmenityItem({ item, onError }: AmenityItemProps) {
  const handleError = useCallback(() => {
    onError?.();
  }, [onError]);

  return (
    <div
      className={cn(
        'flex items-center gap-2 p-2 rounded-lg',
        'transition-all duration-200 ease-in-out',
        'hover:bg-primary/5 hover:scale-[1.02]',
        'focus-within:ring-2 focus-within:ring-primary',
        'group cursor-default',
        'will-change-transform will-change-opacity'
      )}
      role="listitem"
    >
      <span
        className={cn(
          'flex items-center justify-center w-5 h-5',
          'text-muted-foreground group-hover:text-primary',
          'transition-colors duration-200'
        )}
        aria-hidden="true"
        onError={handleError}
      >
        {item.icon()}
      </span>
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
        {item.name}
      </span>
    </div>
  );
});

AmenityItem.displayName = 'AmenityItem';

interface AmenityGroupProps {
  group: string;
  items: AmenityItemType[];
}

export function AmenityGroupComponent({ group, items }: AmenityGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout>();
  const animationFrameRef = useRef<number>();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  const handleMouseEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    cancelAnimationFrame(animationFrameRef.current!);

    animationFrameRef.current = requestAnimationFrame(() => {
      setIsAnimating(true);
      setIsOpen(true);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      cancelAnimationFrame(animationFrameRef.current!);

      animationFrameRef.current = requestAnimationFrame(() => {
        setIsOpen(false);
        setTimeout(() => setIsAnimating(false), 200);
      });
    }, 100);
  }, []);

  const handleTouchStart = useCallback(() => {
    cancelAnimationFrame(animationFrameRef.current!);

    animationFrameRef.current = requestAnimationFrame(() => {
      setIsAnimating(true);
      setIsOpen(true);
    });
  }, []);

  const handleTouchEnd = useCallback(() => {
    // 터치 디바이스에서는 팝업이 열린 상태를 유지
  }, []);

  const handleIconError = useCallback(() => {
    setHasError(true);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(animationFrameRef.current!);
    };
  }, [handleKeyDown]);

  const renderedItems = useMemo(() => {
    return items.map((item, index) => (
      <AmenityItem key={`${group}-${index}`} item={item} onError={handleIconError} />
    ));
  }, [items, group, handleIconError]);

  const firstIcon = useMemo(() => {
    try {
      return (
        <span
          className={cn(
            'flex items-center justify-center w-4 h-4',
            'text-primary/70 group-hover:text-primary',
            'transition-colors duration-200',
            'will-change-transform'
          )}
          aria-hidden="true"
        >
          {hasError ? <AlertCircle className="text-destructive" /> : items[0].icon()}
        </span>
      );
    } catch (error) {
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  }, [items, hasError]);

  if (!items.length) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5">
      <Badge
        variant="outline"
        className={cn(
          'flex items-center gap-2 px-3 py-1.5',
          'bg-gradient-to-r from-background to-primary/5',
          'border-primary/20 group',
          'transition-all duration-200 ease-in-out',
          'hover:from-primary/5 hover:to-primary/10',
          'hover:border-primary/30',
          'hover:ring-2 hover:ring-primary',
          'focus:outline-none focus:ring-0',
          'focus-visible:outline-none focus-visible:ring-0',
          'will-change-transform will-change-opacity'
        )}
      >
        {firstIcon}
        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-200">
          {group}
        </span>
      </Badge>
      {items.length > 1 && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-7 w-7 p-0',
                'bg-primary/5 hover:bg-primary/10',
                'transition-all duration-200 ease-in-out',
                'hover:ring-2 hover:ring-primary',
                'focus:outline-none focus:ring-0',
                'focus-visible:outline-none focus-visible:ring-0',
                'will-change-transform'
              )}
              aria-label={`${group} 어메니티 상세 정보 ${isOpen ? '닫기' : '열기'}`}
              aria-expanded={isOpen}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Plus
                className={cn(
                  'h-4 w-4 text-primary/70',
                  'transition-all duration-200',
                  isOpen && 'rotate-45',
                  'will-change-transform'
                )}
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              'w-[400px] p-3',
              'sm:w-[400px] max-w-[calc(100vw-2rem)]',
              'border-primary/20',
              'bg-gradient-to-b from-background to-primary/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              'transition-all duration-200 ease-in-out',
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
              'motion-reduce:transition-none motion-reduce:transform-none',
              'will-change-transform will-change-opacity'
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-label={`${group} 어메니티 목록`}
            sideOffset={8}
            align="start"
          >
            <div className="grid gap-4">
              <div className="space-y-1.5 border-b border-primary/10 pb-3">
                <h4
                  className="text-sm font-medium leading-none text-foreground/90"
                  id={`amenity-group-${group}`}
                >
                  {group}
                </h4>
                <p className="text-xs text-muted-foreground">제공되는 모든 어메니티를 확인하세요</p>
              </div>
              <div
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-2 gap-2',
                  'transition-all duration-300 ease-in-out',
                  isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                  'will-change-transform will-change-opacity'
                )}
                role="list"
                aria-labelledby={`amenity-group-${group}`}
              >
                {renderedItems}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
