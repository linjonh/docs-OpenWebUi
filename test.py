import glob

src_dir = "../v8.ScriptEngine/docs"
files=glob.glob(f"{src_dir}/**/*md", recursive=True)
print(len(files))