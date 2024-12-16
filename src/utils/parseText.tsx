export default function parseText(text: string) {
  const parts = text.split(/(<strong>.*?<\/strong>)/);

  return parts.map((part, index) => {
    if (part.startsWith("<strong>")) {
      const content = part.replace(/<\/?strong>/g, "");
      return <strong key={index}>{content}</strong>;
    }
    return part;
  });
}
