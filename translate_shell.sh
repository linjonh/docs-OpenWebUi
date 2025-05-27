lang_code=de
language=德国语

llm_translate \
    -src ../docs-OpenWebUi/i18n/en/docusaurus-plugin-content-docs/current \
    -dist ../docs-OpenWebUi/i18n/$lang_code/docusaurus-plugin-content-docs/current \
    -slang en -tlang $lang_code \
    -m chatgpt \
    -f "**/*.md" "**/*.mdx"  \
    -r -force \
    -p 翻译下json的values文案成$language，直接返回翻译后的json，不要输出markdown，要纯json文本格式输出，转义的字符保持原样输出 