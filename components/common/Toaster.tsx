'use client';

import { useSyncExternalStore } from 'react';

import { getServerToast, getToast, subscribeToast } from '@/lib/toastStore';

// 토스트를 그리는 자리. layout에 한 번만 둔다
export function Toaster() {
  const toast = useSyncExternalStore(subscribeToast, getToast, getServerToast);

  return (
    // 알림 영역은 처음부터 있어야 스크린 리더가 '새로 들어온 글'을 읽어 준다
    <div
      role='status'
      aria-live='polite'
      className='pointer-events-none fixed inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4'
    >
      {toast && (
        // key가 바뀌면 새 요소로 그려져서, 같은 문구라도 등장 애니메이션이 다시 나온다
        <p
          key={toast.id}
          className='rounded-pill bg-foreground px-4 py-2.5 text-sm font-bold text-background shadow-card transition duration-200 starting:translate-y-2 starting:opacity-0'
        >
          {toast.message}
        </p>
      )}
    </div>
  );
}
