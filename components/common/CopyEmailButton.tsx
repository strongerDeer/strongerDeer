'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';
import { EMAIL, EMAIL_COPIED_TOAST } from '@/data/contact';
import { copyText } from '@/lib/copyText';
import { selectElementText } from '@/lib/selectElementText';
import { showToast } from '@/lib/toastStore';

// 복사 결과 문구를 보여 준 뒤 원래 글자로 돌아가기까지의 시간
const FEEDBACK_DURATION_MS = 2000;

type CopyStatus = 'idle' | 'copied' | 'failed';

const LABEL: Record<CopyStatus, string> = {
  idle: '주소 복사',
  copied: '복사됨 ✓',
  failed: '선택됨 · ⌘/Ctrl+C', // 복사가 막혀서 주소를 선택해 둔 상태
};

type CopyEmailButtonProps = {
  // 복사가 막혔을 때 대신 선택해 둘, 화면에 보이는 이메일 요소의 id
  emailElementId: string;
};

export function CopyEmailButton({ emailElementId }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle');

  // 결과 문구는 잠깐만 보여 주고 원래대로
  useEffect(() => {
    if (status === 'idle') return;
    const timer = setTimeout(() => setStatus('idle'), FEEDBACK_DURATION_MS);
    return () => clearTimeout(timer);
  }, [status]);

  async function handleCopy() {
    const isCopied = await copyText(EMAIL);
    if (isCopied) {
      setStatus('copied');
      showToast(EMAIL_COPIED_TOAST);
      return;
    }

    // 오래된 브라우저·권한 거부 등으로 막히면, 주소를 선택해 두고 안내
    const emailElement = document.getElementById(emailElementId);
    if (emailElement) selectElementText(emailElement);
    setStatus('failed');
  }

  return (
    <Button size='sm' onClick={handleCopy}>
      {/* 바뀐 글자를 스크린 리더도 읽도록 */}
      <span aria-live='polite'>{LABEL[status]}</span>
    </Button>
  );
}
