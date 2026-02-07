import re

files = [
    r"c:\Users\alesm\Desktop\Sito vs\NeopacSRL\it\chi-siamo.html",
    r"c:\Users\alesm\Desktop\Sito vs\NeopacSRL\en\chi-siamo.html",
    r"c:\Users\alesm\Desktop\Sito vs\NeopacSRL\fr\chi-siamo.html"
]

for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to find the form section starting with </div></div></div></main>
        # and ending with </form></div>
        pattern = r'(</div></div></div></main>)\n(<div style="margin-top:36px">.*?</form></div>)(</main>)'
        
        # Replacement wraps the form in <main class="section"><div class="container">
        replacement = r'\1\n<main class="section"><div class="container">\2</div></div>\3'
        
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Modified: {file_path}")
        else:
            print(f"✗ No changes: {file_path}")
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
