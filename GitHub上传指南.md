# 作品集网站上传 GitHub 指南

## 准备工作

### 1. 确认 Git 已安装
打开命令提示符（`Win + R` → 输入 `cmd` → 回车），输入：
```bash
git --version
```
如果显示版本号（如 `git version 2.x.x`），说明已安装。如果提示找不到命令，需要先安装 Git：
- 下载地址：https://git-scm.com/download/win
- 安装时全部默认选项即可

### 2. 配置 Git 用户信息（首次使用需要）
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

---

## 第一步：在 GitHub 创建新仓库

1. **登录 GitHub**：访问 https://github.com 并登录你的账号（用户名 `1326554490`）

2. **创建新仓库**：
   - 点击右上角 `+` → `New repository`
   - **Repository name**：输入 `portfolio`（或其他你喜欢的名字）
   - **Description**（可选）：输入 `刘碧依的作品集网站`
   - **Public**：选择 Public（公开，才能用 GitHub Pages）
   - **不要勾选** "Add a README file" / "Add .gitignore" / "Choose a license"（我们本地已经有了）
   - 点击 **Create repository**

3. **记下仓库地址**：创建完成后，页面会显示类似这样的地址：
   ```
   https://github.com/1326554490/portfolio.git
   ```
   把这个地址记下来，后面要用。

---

## 第二步：本地初始化 Git 并推送

### 1. 打开命令提示符，进入项目文件夹
```bash
cd C:\Users\L\Desktop\portfolio-website
```

### 2. 初始化 Git 仓库
```bash
git init
```
会提示：`Initialized empty Git repository in ...`

### 3. 添加所有文件到暂存区
```bash
git add .
```
这会把除了 `.gitignore` 里排除的文件外，所有文件都加入版本控制。

### 4. 创建第一个提交
```bash
git commit -m "Initial commit: 刘碧依作品集网站"
```

### 5. 关联远程仓库
把下面命令里的 `https://github.com/1326554490/portfolio.git` 替换成你在第一步记下的地址：
```bash
git remote add origin https://github.com/1326554490/portfolio.git
```

### 6. 推送到 GitHub
```bash
git branch -M main
git push -u origin main
```

第一次推送时会弹出登录窗口，用你的 GitHub 账号登录即可。

---

## 第三步：开启 GitHub Pages

1. **进入仓库设置**：
   - 访问你的仓库页面（如 `https://github.com/1326554490/portfolio`）
   - 点击顶部 **Settings**（设置）标签

2. **找到 Pages 设置**：
   - 左侧菜单找到 **Pages**（在 Code and automation 分类下）

3. **配置部署源**：
   - **Source**：选择 `Deploy from a branch`
   - **Branch**：选择 `main`，文件夹选 `/ (root)`
   - 点击 **Save**

4. **等待部署完成**（约 1-2 分钟）：
   - 刷新页面，顶部会显示：
     ```
     Your site is live at https://1326554490.github.io/portfolio/
     ```
   - 点击这个链接，就能看到你的作品集网站了！

---

## 第四步：在线修改文件（如修改项目年份）

### 方法 A：直接在 GitHub 网页修改
1. 访问仓库页面：`https://github.com/1326554490/portfolio`
2. 进入 `data` 文件夹 → 点击 `projects.js`
3. 点击右上角 **铅笔图标**（Edit this file）
4. 找到 `ai-course-plugin` 项目的 `year: '2025'`，改成 `year: '2026'`
5. 滚到页面底部，填写：
   - **Commit message**：`fix: 更新智启项目年份为 2026`
   - 选择 **Commit directly to the `main` branch**
   - 点击 **Commit changes**
6. 等待 1-2 分钟，GitHub Pages 自动重新部署，访问网站即可看到更新

### 方法 B：添加在线演示链接
1. 同样进入 `data/projects.js` 编辑
2. 找到 `ai-course-plugin` 项目的 `demoUrl: ''`
3. 改成 `demoUrl: '你的在线演示地址'`
4. 提交（步骤同上）

---

## 常见问题

### Q: 推送时提示权限错误？
**A:** 确认你已登录 GitHub 账号。Windows 会弹出登录窗口，输入用户名和密码（或使用 Personal Access Token）。

### Q: GitHub Pages 显示 404？
**A:** 检查：
1. 仓库是否是 Public（公开）
2. Pages 设置里分支是否选对（`main` 分支，`/ (root)` 文件夹）
3. 等待 2-3 分钟让部署完成

### Q: 网站样式乱了？
**A:** 打开浏览器开发者工具（F12）→ Console，看是否有 404 错误。可能需要调整 HTML 里的资源路径（如 CSS/JS 的相对路径）。

### Q: 想修改联系方式密钥？
**A:** 在 GitHub 编辑 `assets/js/main.js`，找到 `const correctKey = 'liuliu66'`，改成你想要的密钥。

---

## 后续更新流程

本地修改后推送到 GitHub：
```bash
cd C:\Users\L\Desktop\portfolio-website
git add .
git commit -m "update: 描述你的改动"
git push
```

或者直接在 GitHub 网页上编辑文件（推荐用于小改动）。

---

## 重要提示

1. **首页入口**：GitHub Pages 会自动识别 `index.html` 作为首页，访问 `https://1326554490.github.io/portfolio/` 会显示"拙作"启动页
2. **测试文件已排除**：`test-*.html`、`debug.html` 等测试文件不会被推送到 GitHub
3. **刷新缓存**：修改后如果浏览器还显示旧内容，按 `Ctrl + Shift + R` 硬刷新

---

**完成！** 🎉

你的作品集网站现在已经在线了。之后智启项目的链接和年份都可以直接在 GitHub 网页上改，改完自动部署，不用再被本地缓存困扰。
