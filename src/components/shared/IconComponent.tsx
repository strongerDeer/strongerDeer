"use client";

import { DEV_ICON_MAP, DevIconName } from "@data/skill";

export default function IconComponent({ icon }: { icon: DevIconName }) {
  const IconComponent = DEV_ICON_MAP[icon].icon;
  const iconStyle = DEV_ICON_MAP[icon];

  return <IconComponent color={iconStyle.color} size={iconStyle.size || 16} />;
}
