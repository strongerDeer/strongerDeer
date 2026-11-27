'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/common/Button';
import { CopyEmailButton } from '@/components/common/CopyEmailButton';
import { DemoCard } from '@/components/sections/demoSections/DemoCard';
import { HjFigure } from '@/components/sections/demoSections/HjFigure';
import { TagList } from '@/components/sections/demoSections/TagList';
import { EMAIL } from '@/data/contact';
import { SHOP_TAGS } from '@/data/shop';
import { useHjSequence } from '@/hooks/useHjSequence';
import { copyText } from '@/lib/copyText';

const GUIDE_NOTE = '연타해 보세요. 담는 중에 누른 건 한 번으로 쳐요.';
const LIKED_NOTE = '아앗 감사합니다!';
const ALREADY_IN_CART_NOTE = '이미 담겨 있어요. 메일로 편하게 연락 주세요.';

// 서버에 담기 요청을 보낸 척 기다리는 시간
const FAKE_REQUEST_MS = 900;

type CartStatus = 'idle' | 'pending' | 'added';

const CART_LABEL: Record<CartStatus, string> = {
  idle: '장바구니 담기',
  pending: '담는 중…',
  added: '담김 ✓',
};

function pendingNote(clickCount: number, requestCount: number) {
  return `담는 중… (클릭 ${clickCount}번 · 요청 ${requestCount}번)`;
}

function addedNote(clickCount: number, requestCount: number) {
  return `클릭 ${clickCount}번, 요청은 ${requestCount}번만 나갔어요.`;
}

export function Shop() {
  const {
    targetRef: hjTargetRef,
    face: hjFace,
    caption: hjCaption,
    restart: restartHj,
  } = useHjSequence<HTMLButtonElement>();
  const [isLiked, setIsLiked] = useState(false);
  // 버튼 아래 한 줄 안내. 좋아요·장바구니가 같은 자리를 함께 쓴다
  const [note, setNote] = useState(GUIDE_NOTE);

  const [cartStatus, setCartStatus] = useState<CartStatus>('idle');
  // 연타 잠금은 ref로 한다. state는 다음 렌더 전까지 값이 안 바뀌어서
  // 같은 순간 여러 번 눌리면 모두 'idle'로 읽고 요청이 여러 번 나간다
  const isPendingRef = useRef(false);
  // 화면에 바로 그리지 않고 문구 만들 때만 읽는 숫자라 ref에 둔다
  const clickCountRef = useRef(0);
  const requestCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 담긴 뒤 이메일 주소가 복사됐는지. 막히면 주소와 복사 버튼을 대신 보여 준다
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  // 담는 중에 섹션이 사라지면 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function addToCart() {
    clickCountRef.current += 1;

    if (cartStatus === 'added') {
      setNote(ALREADY_IN_CART_NOTE);
      return;
    }
    // 담는 중 클릭은 요청을 보내지 않고 횟수만 센다
    if (isPendingRef.current) {
      setNote(pendingNote(clickCountRef.current, requestCountRef.current));
      return;
    }

    isPendingRef.current = true;
    requestCountRef.current += 1;
    setCartStatus('pending');
    setNote(pendingNote(clickCountRef.current, requestCountRef.current));

    // 복사는 클릭한 순간에 시작해야 한다 (0.9초 뒤면 사파리가 거부)
    const copyPromise = copyText(EMAIL);

    timerRef.current = setTimeout(async () => {
      isPendingRef.current = false;
      setIsEmailCopied(await copyPromise);
      setCartStatus('added');
      // ref는 늘 최신 값이라 기다리는 동안 늘어난 클릭 수까지 읽힌다
      setNote(addedNote(clickCountRef.current, requestCountRef.current));
    }, FAKE_REQUEST_MS);
  }

  function toggleLike() {
    const nextIsLiked = !isLiked;
    setIsLiked(nextIsLiked);
    setNote(nextIsLiked ? LIKED_NOTE : GUIDE_NOTE);
  }

  return (
    <DemoCard
      index={2}
      id='shop'
      category='NOVERA Shop · 쇼핑몰'
      title='이 개발자, 장바구니에 담아 보실래요?'
      direction='col'
    >
      <div className='grid grid-cols-[150px_minmax(0,1fr)] items-start gap-x-3.5 gap-y-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-stretch sm:gap-5'>
        {/* 누르면 첫 표정부터 다시 */}
        <button
          ref={hjTargetRef}
          type='button'
          aria-label='그림 처음부터 다시 보기'
          onClick={restartHj}
          className='relative col-start-1 row-span-4 row-start-1 aspect-square cursor-pointer overflow-hidden rounded-2xl bg-background-soft sm:row-span-1'
        >
          <span className='absolute top-3 left-3 z-10 rounded-lg bg-accent px-2 py-0.5 text-xs font-extrabold text-on-accent'>
            NEW
          </span>
          <HjFigure face={hjFace} />
          <span
            aria-hidden='true'
            className='absolute right-2.5 bottom-2.5 rounded-lg bg-white/85 px-2 py-0.5 text-xs font-bold text-[#3a3340]'
          >
            {hjCaption}
          </span>
        </button>

        <div className='contents sm:flex sm:flex-col sm:gap-2.5'>
          <p className='col-start-2 row-start-1 text-[13px] font-bold text-foreground-muted'>
            strongerDeer
          </p>
          <h4 className='col-start-2 row-start-2 text-lg font-bold sm:text-[22px]'>
            강혜진 · 프론트엔드 개발자
          </h4>

          <div className='col-span-2 row-start-5'>
            <TagList tags={SHOP_TAGS} />
          </div>

          <dl className='col-start-2 row-start-3 flex flex-col gap-1 text-sm sm:my-1 sm:text-[15px]'>
            <div className='flex flex-col sm:flex-row sm:gap-3'>
              <dt className='text-foreground-muted sm:w-12 sm:shrink-0'>
                연봉
              </dt>
              <dd className='font-bold'>협의</dd>
            </div>
            <div className='flex flex-col sm:flex-row sm:gap-3'>
              <dt className='text-foreground-muted sm:w-12 sm:shrink-0'>
                구성
              </dt>
              <dd className='font-bold'>디자인 보는 눈 + 개발하는 손</dd>
            </div>
          </dl>

          <div className='col-span-2 row-start-6 flex gap-2 sm:mt-auto'>
            <Button
              className='flex-1 aria-pressed:border-accent aria-pressed:text-accent'
              aria-pressed={isLiked}
              onClick={toggleLike}
            >
              <Heart isFilled={isLiked} />
              좋아요
            </Button>
            <Button
              className='flex-1 aria-busy:cursor-progress'
              variant='solid'
              aria-busy={cartStatus === 'pending'}
              onClick={addToCart}
            >
              {CART_LABEL[cartStatus]}
            </Button>
          </div>
          <p
            aria-live='polite'
            className='col-span-2 row-start-7 min-h-[1.6em] text-[13px] text-foreground-muted'
          >
            {note}
          </p>
          {/* 담긴 뒤 안내. 복사가 막혔으면 주소와 복사 버튼을 보여 준다 */}
          {cartStatus === 'added' &&
            (isEmailCopied ? (
              <p className='col-span-2 row-start-8 text-sm font-bold'>
                주소가 복사됐어요. 메일 주세요 ✉️
              </p>
            ) : (
              <p className='col-span-2 row-start-8 flex flex-wrap items-center gap-2 text-sm'>
                메일 주세요 ✉️
                <span id='shop-email' className='font-bold'>
                  {EMAIL}
                </span>
                <CopyEmailButton emailElementId='shop-email' />
              </p>
            ))}
        </div>
      </div>
    </DemoCard>
  );
}

function Heart({ isFilled }: { isFilled: boolean }) {
  return (
    <svg
      viewBox='0 0 24 24'
      className='size-[1em]'
      fill={isFilled ? 'currentColor' : 'none'}
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
    </svg>
  );
}
