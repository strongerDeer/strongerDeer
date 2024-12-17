import { EXPERIENCES } from "@data/experience";
import parseText from "@utils/parseText";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import React, { Fragment } from "react";

export default function Experience() {
  return (
    <div className="wrap" id="experience">
      <section>
        <h2 className="title">
          Experience <span>경험</span>
        </h2>

        <ul className="card sm:grid-cols-2 xl:grid-cols-4">
          {EXPERIENCES.map(({ id, thumb, icon, title, contents, link }) => (
            <li key={id}>
              <Image
                src={`/strongerDeer${thumb}`}
                width="400"
                height="300"
                alt=""
              />
              <div className="content">
                <div>
                  <h3>
                    {React.createElement(icon)}
                    {title}
                  </h3>

                  {contents.map((content, index) => (
                    <Fragment key={index}>
                      <p>{parseText(content.text)}</p>
                      {content.lists && (
                        <ul className="list2">
                          {content.lists.map((list, index) => (
                            <li key={index}>{parseText(list)}</li>
                          ))}
                        </ul>
                      )}
                    </Fragment>
                  ))}
                </div>
                {link && (
                  <a href={link.url} target="_blank" className="go">
                    <ExternalLink />
                    <span>{link.text}</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
