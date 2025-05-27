
from concurrent import futures
from concurrent.futures import ProcessPoolExecutor
import os
import subprocess
from pyutils import log

pool = ProcessPoolExecutor(max_workers=os.cpu_count())

task = []


def translate(lang_code, language):
    cmd = f"""lang_code={lang_code}
        language={language}
        llm_translate \
            -src ../docs-OpenWebUi/i18n/en/docusaurus-plugin-content-docs/current \
            -dist ../docs-OpenWebUi/i18n/$lang_code/docusaurus-plugin-content-docs/current \
            -slang en -tlang $lang_code \
            -m chatgpt \
            -f "**/*.md" "**/*.mdx"  \
            -r -force \
            -p 翻译下json的values文案成$language，直接返回翻译后的json，不要输出markdown，要纯json文本格式输出，转义的字符保持原样输出 """
    result = subprocess.call(cmd, shell=True)
    log(f"Translation for {lang_code} ({language}) completed with result: {result}")
    return result, language, lang_code


def main():
    locals = ["zh", "zh-HK", "ja", "ko", "fr", "de", "es", "ru", "pt"]
    languages = ["简体中文", "繁体中文", "日本語", "韩国语","法国语", "德国语", "西班牙语", "俄罗斯语", "葡萄牙语",]
    for i, code in enumerate(locals):
        lang = languages[i]
        print(f"Translating {lang} ({code})")
        task.append(pool.submit(translate, code, lang))
    for f in futures.as_completed(task):
        print(f.result())
    print("all complete")
    pass


if __name__ == '__main__':
    main()
