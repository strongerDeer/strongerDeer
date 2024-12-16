import { STRENGTHS } from "@data/introduce";
import React from "react";

export default function Check() {
  return (
    <div className="strength">
      {STRENGTHS.map(({ icon, title, items }, index) => (
        <div key={index}>
          <h3>
            {React.createElement(icon)}
            {title}
          </h3>

          <ul className="list">
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
