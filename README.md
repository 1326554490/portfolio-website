# Portfolio Website — 刘碧依个人作品集网站

极简风格作品集，后续**随时可以快速迭代**，不需要懂太多代码。

---

## 📂 文件结构

```
portfolio-website/
├─ index.html                启动页（"拙作"印 → 点击淡出进主页）
├─ main.html                 作品集主页
├─ data/
│  └─ projects.js           ← ★ 所有内容数据都在这里
├─ assets/
│  ├─ css/style.css          样式（含字号/色彩/过渡 token）
│  ├─ js/main.js             交互逻辑（渲染卡片 / 滚动色彩注入 / 页面过渡）
│  └─ img/
│     ├─ ai-course/card.svg  项目海报（4 个项目各一张）
│     ├─ lingnan/card.svg
│     ├─ lodue/card.svg
│     └─ pixel/card.svg
└─ projects/
   ├─ _template.html         ← ★ 详情页模板，改它再同步到下面 4 个
   ├─ ai-course-plugin.html  项目详情页（自动从 data/projects.js 读取）
   ├─ lodue-reading.html
   ├─ lingnan-aigc.html
   └─ pixel-persona.html
```

---

## ✏️ **如何修改内容？**

### 1. **改项目信息、加新项目、删项目**
   → 打开 **`data/projects.js`**

   - **加新项目**：复制最后一个项目的 `{}` 块，改 `id / title / subtitle / summary` 等字段
   - **删项目**：删掉对应的 `{}` 块
   - **改简介 / 标签 / 时间 / 颜色**：直接在对应字段里改

   **改完后**：
   - 如果加了新项目，在 `projects/` 文件夹里复制 `_template.html` 并改名为 `<新项目id>.html`
   - 双击 `index.html` 刷新看效果

   > ⚠️ **改详情页"长相"时**：详情页的结构和样式都在 `projects/_template.html` 里。改完模板后，要把它同步覆盖到 4 个详情页（命令行 `cp _template.html lodue-reading.html`，其余三个同理），否则只有模板自己变了。各项目的**文字内容**仍然只从 `data/projects.js` 读取，不用动详情页文件。

### 2. **改个人信息（教育 / 技能 / 联系方式）**
   → 打开 **`data/projects.js`**，找到 `window.PORTFOLIO_PROFILE = { ... }` 部分

   - 改手机 / 邮箱 / 学校 / 技能列表 / 荣誉 → 直接改对应字段
   - 想加新技能组：在 `skills` 数组里加一个新对象

### 3. **改首屏 Hero 区的关键词组**
   → 打开 **`data/projects.js`**，找到 `window.PORTFOLIO_KEYWORDS`

   - 想换词组（如 "AI Product" → "AI Explorer"）：直接改数组里的字符串
   - 想加 / 删词组：往数组里加 / 删元素

### 4. **改样式（颜色 / 字体 / 间距）**
   → 打开 **`assets/css/style.css`**

   - 最上面的 `:root { ... }` 是全局色彩变量
   - 想改主色调、字体、行距 → 改这些变量

---

## 🚀 **怎么预览？**

1. **本地预览**（推荐）
   - 双击 `index.html` 用浏览器打开
   - 或者终端运行：
     ```bash
     cd portfolio-website
     python3 -m http.server 8000
     ```
     然后浏览器打开 `http://localhost:8000`

2. **部署上线**（免费）
   - 方式 1：上传到 **GitHub Pages**
     1. 创建 GitHub 仓库，把整个文件夹 push 上去
     2. 仓库设置 → Pages → 选 main 分支 → 保存
     3. 等几分钟，就有网址了（`<你的用户名>.github.io/<仓库名>`）

   - 方式 2：用 **Vercel / Netlify**
     1. 把文件夹拖到 Vercel 或 Netlify 官网
     2. 一键部署，几秒就上线

---

## 🎨 **项目色彩怎么设置？**

每个项目在 `data/projects.js` 里有三个字段控制视觉：

```js
accent: "#3b6df5",   // 项目主色（用于卡片高光、详情页强调）
bg: "#eef2ff",       // 项目背景色（滚到这个项目时，全页背景会渐变成这个色）
mood: "light"        // "light" 或 "dark"（决定卡片文字颜色）
```

滚动到某个项目卡片时，背景和强调色会**自动**切换成该项目的配色。

---

## 📝 **常见修改示例**

### ① 加一个新项目
1. 打开 `data/projects.js`
2. 在 `window.PORTFOLIO_PROJECTS = [ ... ]` 数组最后加：
   ```js
   ,
   {
     id: "new-project",  // ← 英文短横线命名，不要空格
     title: "新项目名称",
     subtitle: "一句话副标题",
     role: "你的角色 / 工作内容",
     tags: ["标签1", "标签2"],
     year: "2026",
     accent: "#ff6b9d",
     bg: "#fff0f5",
     mood: "light",
     cover: "✦",
     summary: "60–90 字的项目简介...",
     highlights: [
       "亮点 1",
       "亮点 2",
       "亮点 3"
     ],
     demoUrl: "https://your-demo-link.com",  // 留空就不显示按钮
     demoLabel: "进入 Demo"
   }
   ```
3. 在 `projects/` 文件夹里复制 `_template.html`，改名为 `new-project.html`
4. 刷新首页，新项目就出现了

### ② 改技能列表
打开 `data/projects.js`，找到 `skills: [ ... ]` 部分：
```js
{
  group: "AI 产品能力",
  items: [
    "Prompt 基础",
    "AI 产品需求分析",
    "新技能"  // ← 加在这里
  ]
}
```

### ③ 改联系方式
找到 `window.PORTFOLIO_PROFILE` 里的：
```js
phone: "15546169953",
email: "1326554490@qq.com"
```
直接改成你的新手机 / 邮箱。

---

## 💡 **项目特色**

- **极简基底 + 项目色彩注入**：滚到不同项目时，整个页面氛围跟着变
- **数据驱动**：所有内容都在 `data/projects.js` 一个文件里，改起来超快
- **纯静态**：不需要数据库 / 后端，双击 HTML 就能看
- **响应式**：手机 / 平板 / 桌面都适配

---

## 🛠️ **技术栈**

- HTML5 + CSS3（CSS 变量 + Grid + Flexbox）
- 原生 JavaScript（无框架依赖）
- 字体：Inter + Source Han Serif SC（走系统 fallback，可换 CDN）

---

## 📌 **下一步计划**

- [ ] 把启动页"拙作"字形转成 SVG 并做动效（裙摆飘动、山上流水），替换占位 PNG
- [ ] 部署到 GitHub Pages（在 1326554490.github.io 账号下新建专用仓库）
- [ ] 如果想加博客 / 文章列表，可以复制 projects 的结构

**已完成**：4 个项目海报（`assets/img/<id>/card.svg`）· 全站淡入淡出过渡 · 滚动浮现动画 · 顶部进度条 · Hero 区"拙作"印。

---

**有问题？** 直接问 Claude 或搜 CSS/JS 基础教程。祝你迭代顺利！🎉
