export function convertParagraphToSentences(paragraph: string): string[] {
    // Split the paragraph by a new line and filter out any empty lines
    return paragraph.split("\n").map((sentence) => sentence.trim()).filter(Boolean);
  }
  

  