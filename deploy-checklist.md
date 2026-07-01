# 🚀 GitHub Pages 部署检查清单

## ✅ 文件准备
- [x] 所有 HTML 页面存在且完整
- [x] CSS/JS 文件正常
- [x] 图片资源完整（智启改为星芽）
- [x] 项目数据已更新（projects.js v=deploy2026）
- [x] 临时文件已清理

## ✅ 内容验证
- [x] 6个项目卡片：星芽、Lodue、论文、像素人格、RESPROUT、考研
- [x] 教育背景：哈工大深圳 + 沈阳工大
- [x] 科研学术：基金项目 + 期刊论文
- [x] 技能：AI产品能力 + AI工具 + 设计工具
- [x] 荣誉：NCDA + 米兰设计周 + 绿色建筑

## 📝 部署步骤

### 1. 创建 GitHub 仓库
```bash
# 仓库名建议：portfolio 或 portfolio-website
# 设置为 Public（公开）
```

### 2. 推送代码
```bash
cd C:\Users\L\Desktop\portfolio-website
git init
git add .
git commit -m "Initial commit: Portfolio website"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 3. 配置 GitHub Pages
1. 进入仓库 Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Save

### 4. 访问网站
- 等待 2-3 分钟部署完成
- 访问：https://你的用户名.github.io/仓库名/main.html
- 建议将 main.html 设为首页（或在 index.html 里重定向）

## 🔍 注意事项

1. **PDF 预览**：部署到 HTTPS 后，Edge 的 PDF 阻止问题会自动解决
2. **图片路径**：所有资源使用相对路径，部署后自动正确
3. **联系方式密钥**：密码是 `liuliu66`（在 main.js 第 60 行）
4. **项目顺序**：星芽 → Lodue → 论文 → 像素 → RESPROUT → 考研

## 📊 文件大小检查
