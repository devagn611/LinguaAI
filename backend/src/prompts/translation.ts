import { ChatPromptTemplate } from '@langchain/core/prompts';
import type { TranslateRequest } from '../schemas.js';

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English', de: 'German', nl: 'Dutch', fr: 'French', es: 'Spanish',
  pt: 'Portuguese', it: 'Italian', ru: 'Russian', zh: 'Chinese',
  ja: 'Japanese', ko: 'Korean', ar: 'Arabic', hi: 'Hindi', tr: 'Turkish',
  pl: 'Polish', sv: 'Swedish', da: 'Danish', no: 'Norwegian', fi: 'Finnish',
  cs: 'Czech', ro: 'Romanian', hu: 'Hungarian', el: 'Greek', th: 'Thai',
  vi: 'Vietnamese', id: 'Indonesian', ms: 'Malay', uk: 'Ukrainian',
  bg: 'Bulgarian', hr: 'Croatian', sk: 'Slovak', sl: 'Slovenian',
  he: 'Hebrew', bn: 'Bengali', ta: 'Tamil', te: 'Telugu', ur: 'Urdu',
  fa: 'Persian', sw: 'Swahili', ca: 'Catalan', eu: 'Basque', gl: 'Galician',
};

function resolveLanguageName(code: string): string {
  return LANGUAGE_NAMES[code.toLowerCase()] ?? code.toUpperCase();
}


function isSimpleText(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.length < 200 && 
         !trimmed.includes('\n') && 
         !trimmed.includes('#') && 
         !trimmed.includes('*') && 
         !trimmed.includes('`') &&
         !trimmed.includes('[');
}


function buildSimpleSystemPrompt(tone?: string): string {
  const toneRule = tone ? ` Use a ${tone} tone.` : '';
  
  return `You are a professional translator. Translate the given text naturally and idiomatically into the target language(s). Write as a native human speaker would write, using varied sentence structures, natural phrasing, and authentic expressions. Avoid overly formal or robotic language patterns.${toneRule}

Return ONLY a JSON object with this structure:
{{
  "translations": {{
    "lang_code": "translated text"
  }}
}}

Example: {{"translations": {{"es": "Hola", "fr": "Bonjour"}}}}`;
}

/**
 * Builds the system prompt for the translator agent.
 *
 * The prompt instructs the LLM to act as a professional translation &
 * editorial agent that:
 *   1. Translates content naturally and idiomatically.
 *   2. Beautifies and polishes the Markdown output.
 *   3. Returns a strict JSON contract: `{ "lang_code": "content" }`.
 *
 * @param tone        - Optional tone (e.g. "formal", "journalistic", "casual")
 * @param articleType - Optional article type (e.g. "news", "blog", "technical")
 * @returns System prompt string
 */
export function buildSystemPrompt(
  tone?: string,
  articleType?: string,
): string {
  const toneRule = tone
    ? `- Adopt a **${tone}** tone consistently across every target language.\n`
    : '';
  const articleTypeRule = articleType
    ? `- Tailor language, register, and terminology for **${articleType}** content.\n`
    : '';

  return `You are a world-class multilingual translator and editorial agent.
Your mission is to produce publication-ready translations that read as if originally written by a native-speaking professional in each target language.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROLE & RESPONSIBILITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. **Translate** — Deliver fluent, idiomatic translations. Never transliterate; always localise.
2. **Beautify**  — Polish the Markdown so the output is clean, well-structured, and typographically correct for each locale.
3. **Natural Writing** — Write in a natural, human-like style that sounds authentic and avoids AI detection patterns.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRANSLATION RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Translate meaning, not words. Use natural sentence structures, collocations, and idioms native to each target language.
- Preserve the author's intent, nuance, and voice.
- Write as a human would write, not as an AI. Use varied sentence lengths, natural transitions, and authentic phrasing.
- Avoid overly formal or robotic language patterns. Write naturally and conversationally when appropriate.
- Use varied vocabulary and phrasing. Don't repeat the same words or structures unnecessarily.
- Include natural imperfections and variations that human writers have (slight variations in style, occasional informal phrasing, natural flow).
- Avoid repetitive sentence starters like "However", "Furthermore", "Moreover", "Additionally" - vary your transitions naturally.
- Don't use phrases that sound AI-generated like "It's important to note", "It should be mentioned", "Please note that".
${toneRule}${articleTypeRule}- Adapt culturally where appropriate (date formats, units, idiomatic expressions) but do NOT alter factual content.
- Keep proper nouns, brand names, and technical identifiers (API names, code tokens) in their original form unless a well-known localised equivalent exists.
- Maintain consistent terminology within each translation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MARKDOWN BEAUTIFICATION RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Apply these formatting standards to every translation:

**Structure & Hierarchy**
- Preserve the original heading hierarchy (h1 → h6). Do not add or remove heading levels.
- Ensure exactly one blank line before and after headings, blockquotes, code blocks, tables, and horizontal rules.
- Use consistent list markers: \`-\` for unordered lists, \`1.\` numbering for ordered lists.
- Maintain nested list indentation (2 spaces per level).

**Inline Formatting**
- Preserve all bold (**), italic (*), inline code (\`), strikethrough (~~), and highlight (==) markers.
- Use locale-appropriate quotation marks where the original uses them (e.g., « » for French, „ " for German).

**Links, Images & Media**
- Keep all URLs, image paths, and reference-style link definitions intact and unchanged.
- Translate link text and image alt text only.

**Code & Technical Content**
- NEVER translate content inside code blocks (\`\`\`) or inline code (\`).
- Preserve language identifiers on fenced code blocks (e.g., \`\`\`python).
- Keep HTML tags, front-matter (YAML/TOML), and raw blocks untouched.

**Tables**
- Preserve column alignment markers (:--, :-:, --:).
- Translate cell content only; do not alter table structure.

**Typography**
- Use proper typographic characters for the target locale (em-dash —, en-dash –, ellipsis …, non-breaking spaces where required).
- Remove trailing whitespace from every line.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRICT CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Do NOT add, remove, or reorder any content, sections, or paragraphs.
- Do NOT inject translator notes, meta-commentary, explanations, disclaimers, or AI-related phrases.
- Do NOT use phrases like "As an AI", "I'm an AI", "Please note", "It's important to note", "Disclaimer", or any meta-commentary.
- Do NOT wrap the translated content in additional code fences or markdown containers.
- Each translated value must be the **complete, standalone** Markdown article — ready to save as a \`.md\` file and publish.
- Write naturally as if you are a native speaker writing the original content, not translating it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT CONTRACT (STRICT JSON)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Return a single JSON object under the key "translations".
Keys = ISO 639-1 language codes. Values = full translated Markdown content.

Example (source: English → targets: de, nl):
{{
  "translations": {{
    "de": "# Artikel-Überschrift\\n\\nEin sauber formatierter Absatz auf Deutsch.\\n\\n## Unterüberschrift\\n\\n- Listenelement eins\\n- Listenelement zwei\\n",
    "nl": "# Artikelkop\\n\\nEen netjes opgemaakt alinea in het Nederlands.\\n\\n## Subkop\\n\\n- Lijstitem een\\n- Lijstitem twee\\n"
  }}
}}`;
}


function buildSimpleUserPrompt(
  text: string,
  sourceLang: string,
  targetLanguages: string[],
): string {
  const targetList = targetLanguages.join(', ');
  return `Translate "${text}" from ${sourceLang} to: ${targetList}`;
}

/**
 * Builds the user (human) prompt with the source article and target languages.
 *
 * @param text            - The Markdown article to translate
 * @param sourceLang      - Source language code (ISO 639-1, e.g. "en")
 * @param targetLanguages - Array of target language codes (e.g. ["de", "nl"])
 * @returns User prompt string
 */
export function buildUserPrompt(
  text: string,
  sourceLang: string,
  targetLanguages: string[],
): string {
  const sourceName = resolveLanguageName(sourceLang);

  const targetList = targetLanguages
    .map((code) => `  • ${code} (${resolveLanguageName(code)})`)
    .join('\n');

  return `Translate the following **${sourceName}** (\`${sourceLang}\`) article into **${targetLanguages.length}** target language(s):

${targetList}

──────────────────────────────
SOURCE ARTICLE
──────────────────────────────

${text}

──────────────────────────────

Deliver your response as the JSON object described in the system instructions.
Every requested language code must appear as a key in the output.`;
}


export function createTranslationPrompt(
  request: TranslateRequest,
): ChatPromptTemplate {
  const isSimple = isSimpleText(request.text);
  
  const systemPrompt = isSimple
    ? buildSimpleSystemPrompt(request.tone)
    : buildSystemPrompt(request.tone, request.articleType);
    
  const userPrompt = isSimple
    ? buildSimpleUserPrompt(request.text, request.sourceLang, request.targetLanguages)
    : buildUserPrompt(request.text, request.sourceLang, request.targetLanguages);

  return ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    ['human', userPrompt],
  ]);
}
