function parseAiResponse(raw) {
  const lines = raw.split("\n").filter(line => line.trim() !== "");
  const parsed = [];

  lines.forEach((line) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      parsed.push({ type: "heading", content: line.replace(/\*\*/g, "") });
    } else if (/^\d+\./.test(line.trim())) {
      parsed.push({ type: "list", content: line.trim() });
    } else if (line.startsWith("- ")) {
      parsed.push({ type: "list", content: line.substring(2) });
    } else {
      parsed.push({ type: "paragraph", content: line.trim() });
    }
  });

  return parsed;
}

export default parseAiResponse