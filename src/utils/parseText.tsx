const parseText = (text: string) => {
  // <strong> 태그와 <span> 태그를 모두 찾도록 정규식 수정
  const parts = text.split(/(<(?:strong|span[^>]*?)>.*?<\/(?:strong|span)>)/);

  // split 결과는 내용이 중복될 수 있어 순서를 포함한 키를 사용한다.
  return parts.map((part, index) => {
    if (part.startsWith("<strong>")) {
      const content = part.replace(/<\/?strong>/g, "");
      return <strong key={`${index}-${part}`}>{content}</strong>;
    }

    if (part.startsWith("<span")) {
      const content = part.replace(/<span[^>]*?>(.*?)<\/span>/, "$1");

      return (
        <span key={`${index}-${part}`} className="text-gray-500 text-sm">
          {content}
        </span>
      );
    }

    return part;
  });
};

export default parseText;
