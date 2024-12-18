export default function parseText(text: string) {
  // <strong> 태그와 <span> 태그를 모두 찾도록 정규식 수정
  const parts = text.split(/(<(?:strong|span[^>]*?)>.*?<\/(?:strong|span)>)/);

  return parts.map((part, index) => {
    if (part.startsWith("<strong>")) {
      const content = part.replace(/<\/?strong>/g, "");
      return <strong key={index}>{content}</strong>;
    }

    if (part.startsWith("<span")) {
      const content = part.replace(/<span[^>]*?>(.*?)<\/span>/, "$1");

      return (
        <span key={index} className="text-gray-500 text-sm">
          {content}
        </span>
      );
    }

    return part;
  });
}
