const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertInlineMarkdown(text) {
    text = text.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img alt="$1" src="$2">'
  );

  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  );

  text = text.replace(
    /(\*\*|__)(.+?)\1/g,
    "<strong>$2</strong>"
  );

  text = text.replace(
    /(\*|_)(.+?)\1/g,
    "<em>$2</em>"
  );

  return text;
}

function convertMarkdown() {
  let markdown = markdownInput.value;

  const lines = markdown.split(/\r?\n/);

  let html = "";

  lines.forEach((line) => {
    let match = line.match(/^\s*### (.+)$/);

    if (match) {
      html += `<h3>${convertInlineMarkdown(match[1])}</h3>`;
      return;
    }

    match = line.match(/^\s*## (.+)$/);

    if (match) {
      html += `<h2>${convertInlineMarkdown(match[1])}</h2>`;
      return;
    }

    match = line.match(/^\s*# (.+)$/);

    if (match) {
      html += `<h1>${convertInlineMarkdown(match[1])}</h1>`;
      return;
    }

    match = line.match(/^\s*> (.+)$/);

    if (match) {
      html += `<blockquote>${convertInlineMarkdown(match[1])}</blockquote>`;
      return;
    }

    if (line.trim() !== "") {
      html += convertInlineMarkdown(line);
    }
  });

  return html;
}

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();

  htmlOutput.textContent = html;
  preview.innerHTML = html;
});
