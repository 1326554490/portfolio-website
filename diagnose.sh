#!/bin/bash
echo "════════════════════════════════════════════════"
echo "   Portfolio Website 系统诊断"
echo "════════════════════════════════════════════════"
echo ""

# 1. 文件存在性检查
echo "【1】文件存在性检查"
echo "────────────────────────────────────────────────"
files=("main.html" "index.html" "assets/css/style.css" "assets/js/main.js" "data/projects.js")
for f in "${files[@]}"; do
  if [ -f "$f" ]; then
    size=$(ls -lh "$f" | awk '{print $5}')
    lines=$(wc -l < "$f")
    echo "✓ $f - $size, $lines 行"
  else
    echo "✗ $f - 文件不存在！"
  fi
done
echo ""

# 2. 文件编码检查
echo "【2】文件编码检查"
echo "────────────────────────────────────────────────"
for f in main.html assets/css/style.css assets/js/main.js data/projects.js; do
  encoding=$(file -b --mime-encoding "$f")
  echo "$f: $encoding"
done
echo ""

# 3. HTML 结构检查
echo "【3】HTML 结构检查 (main.html)"
echo "────────────────────────────────────────────────"
html_checks=(
  "<!DOCTYPE html"
  "<html"
  "</html>"
  "<head>"
  "</head>"
  "<body>"
  "</body>"
  'class="hero"'
  'id="about"'
  'id="projects"'
  'id="education"'
  'id="skills"'
  'id="contact"'
  'id="contactLock"'
  'id="contactContent"'
  '<script src="data/projects.js'
  '<script src="assets/js/main.js'
)

for check in "${html_checks[@]}"; do
  if grep -q "$check" main.html; then
    echo "✓ $check"
  else
    echo "✗ $check - 缺失！"
  fi
done
echo ""

# 4. JavaScript 语法检查
echo "【4】JavaScript 语法检查"
echo "────────────────────────────────────────────────"
for js in assets/js/main.js data/projects.js; do
  if node --check "$js" 2>/dev/null; then
    echo "✓ $js - 语法正确"
  else
    echo "✗ $js - 语法错误！"
    node --check "$js" 2>&1 | head -5
  fi
done
echo ""

# 5. 数据完整性检查
echo "【5】数据完整性检查 (projects.js)"
echo "────────────────────────────────────────────────"
node << 'ENDJS'
try {
  global.window = {};
  require('./data/projects.js');
  
  const projects = window.PORTFOLIO_PROJECTS;
  const profile = window.PORTFOLIO_PROFILE;
  const keywords = window.PORTFOLIO_KEYWORDS;
  
  console.log('✓ PORTFOLIO_PROJECTS:', projects ? projects.length + ' 项目' : '未定义');
  console.log('✓ PORTFOLIO_PROFILE:', profile ? '存在' : '未定义');
  console.log('  - name:', profile?.name);
  console.log('  - wechat:', profile?.wechat);
  console.log('  - email:', profile?.email);
  console.log('✓ PORTFOLIO_KEYWORDS:', keywords ? keywords.length + ' 关键词' : '未定义');
} catch(e) {
  console.error('✗ 数据加载错误:', e.message);
}
ENDJS
echo ""

# 6. CSS 文件检查
echo "【6】CSS 文件检查"
echo "────────────────────────────────────────────────"
css_checks=(
  ".hero"
  ".section"
  ".contact"
  ".contact-lock"
  ".lock-input"
  ".lock-btn"
)

for check in "${css_checks[@]}"; do
  if grep -q "$check" assets/css/style.css; then
    echo "✓ $check 样式存在"
  else
    echo "✗ $check 样式缺失！"
  fi
done
echo ""

# 7. 版本号一致性检查
echo "【7】版本号检查 (main.html)"
echo "────────────────────────────────────────────────"
grep -o 'src="[^"]*\.js[^"]*"' main.html
echo ""

# 8. 文件末尾检查
echo "【8】文件末尾完整性检查"
echo "────────────────────────────────────────────────"
echo "main.html 最后 3 行:"
tail -3 main.html
echo ""
echo "main.js 最后 3 行:"
tail -3 assets/js/main.js
echo ""
echo "projects.js 最后 3 行:"
tail -3 data/projects.js
echo ""

echo "════════════════════════════════════════════════"
echo "   诊断完成"
echo "════════════════════════════════════════════════"
