// 화면 아래에 잠깐 떴다 사라지는 알림(토스트) 저장소.
// 어느 컴포넌트에서든 showToast('…')만 부르면 되고, 그리는 건 <Toaster />가 한 곳에서 한다

// 이만큼 보여 준 뒤 사라진다
const TOAST_DURATION_MS = 2500;

export type Toast = {
  id: number; // 같은 문구를 연달아 띄워도 '새 토스트'로 알아보게 하는 번호
  message: string;
};

let currentToast: Toast | null = null;
let nextId = 1;
let hideTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeToast(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getToast() {
  return currentToast;
}

// 서버에서는 토스트가 없다
export function getServerToast() {
  return null;
}

// 한 번에 하나만 보여 준다. 떠 있는 중에 또 부르면 새 문구로 바꾸고 시간을 다시 잰다
export function showToast(message: string) {
  currentToast = { id: nextId++, message };
  notify();

  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    currentToast = null;
    notify();
  }, TOAST_DURATION_MS);
}
