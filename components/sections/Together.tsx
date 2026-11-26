import {
  Handshake,
  type LucideIcon,
  MessageCircle,
  Sprout,
} from 'lucide-react';

import { Section } from '@/components/common/Section';

type TeamTrait = {
  icon: LucideIcon;
  text: string;
};

const TEAM_TRAITS: TeamTrait[] = [
  {
    icon: Handshake,
    text: '디자이너·개발자 경계 없이, 아이디어부터 출시 이후까지 같이 만드는 팀',
  },
  {
    icon: MessageCircle,
    text: '의견이 자유롭게 오가고, 말 안 해도 착착 통하는 팀 (맛집 탐방은 덤)',
  },
  { icon: Sprout, text: '새로운 걸 배우는 걸 반기고, 같이 성장하는 팀' },
];

export function Together() {
  return (
    <Section
      id='together'
      label='같이 일하면'
      title='이런 팀이면 신나게 일해요'
    >
      <ul className='m-auto mt-4 flex w-full max-w-3xl flex-col gap-3'>
        {TEAM_TRAITS.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className='rounded-lg bg-background-soft p-4 text-balance break-keep'
          >
            <Icon
              aria-hidden='true'
              className='mr-1.5 inline-block size-[1.15em] align-[-0.2em] text-accent'
            />
            {text}
          </li>
        ))}
      </ul>
    </Section>
  );
}
