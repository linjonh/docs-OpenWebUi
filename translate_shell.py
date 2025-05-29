
from concurrent import futures
from concurrent.futures import ProcessPoolExecutor
import os
import subprocess
from pyutils import log

pool = ProcessPoolExecutor(max_workers=os.cpu_count())

task = []


def translate(src_dir,dist_dir,lang_code,language):
    print(f"{lang_code}, {src_dir},{dist_dir},{language} ")
    # return -1,language,lang_code
    cmd = f"""llm_translate \
            -src {src_dir} \
            -dist {dist_dir} \
            -slang en -tlang {lang_code} \
            -m chatgpt \
            -f "**/*.md" "**/*.mdx"  \
            -r -force \
            -p 翻译下json的values文案成{language}，直接返回翻译后的json，不要输出markdown，要纯json文本格式输出"""
    print(f"cmd={cmd}")
    result = subprocess.call(cmd, shell=True)
    log(f"Translation for {lang_code} ({language}) completed with result: {result}")
    return result, language, lang_code


def main():
    locals = ["zh", "zh-HK", "ja", "ko", "fr", "de", "es", "ru", "pt"]
    languages = ["简体中文", "繁体中文", "日本語", "韩国语","法国语", "德国语", "西班牙语", "俄罗斯语", "葡萄牙语",]
    
    # docs translation
    for i, code in enumerate(locals):
        src_dir = "../v8.ScriptEngine/docs"
        dist_dir = f"../v8.ScriptEngine/i18n/{code}/docusaurus-plugin-content-docs/current"
        lang = languages[i]
        print(f"Translating {lang} ({code})")
        task.append(pool.submit(translate,src_dir,dist_dir, code, lang))
    for f in futures.as_completed(task):
        print(f.result())
    
    #blog translation
    task.clear()  # Clear tasks for the next run
    for i, code in enumerate(locals):
        src_dir = "../v8.ScriptEngine/blog"
        dist_dir = f"../v8.ScriptEngine/i18n/{code}/docusaurus-plugin-content-blog/current"
        lang = languages[i]
        print(f"Translating {lang} ({code})")
        task.append(pool.submit(translate,src_dir,dist_dir, code, lang))
    for f in futures.as_completed(task):
        print(f.result())
        
    #feature blog translation
    # task.clear()  # Clear tasks for the next run
    # for i, code in enumerate(locals):
    #     src_dir = "../v8.ScriptEngine/features"
    #     dist_dir = f"../v8.ScriptEngine/i18n/{code}/docusaurus-plugin-content-blog-feature-blog/current"
    #     lang = languages[i]
    #     print(f"Translating {lang} ({code})")
    #     task.append(pool.submit(translate,src_dir,dist_dir, code, lang))
    # for f in futures.as_completed(task):
    #     print(f.result())
        
    print("all complete")
    pass


if __name__ == '__main__':
    main()
