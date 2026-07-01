/**
 * 项目数据 —— 想增删改项目，只改这个文件
 * 字段说明：id/title/subtitle/role/tags/year/accent/bg/mood/cover/cardImage/
 *           summary/intro/highlights/demoUrl/demoLabel/book(可选，翻书阅览器)
 */
window.PORTFOLIO_PROJECTS = [
  {
    id: 'ai-course-plugin',
    title: '星芽 AI 通识课互动插件配置系统',
    subtitle: '把"AI 生成的散装插件"变成可配置、可复用、可统计的产品闭环',
    role: 'AI 教育产品实习 · 产品规划 / 题型规范 / 后台配置 / Vibe Coding 原型',
    tags: ['AI 教育', '产品规划', 'Vibe Coding', '后台配置', '课堂互动'],
    year: '2026',
    accent: '#3b6df5',
    bg: '#eef2ff',
    mood: 'light',
    cover: '◧',
    cardImage: 'assets/img/ai-course/card.svg',
    summary: '针对原有 AI 生成 HTML 插件样式不统一、难复用、缺后台配置的问题，梳理"后台配置 — 学生端展示 — 教师端统计"的产品闭环。',
    intro: '在 AI 通识课的课堂里，老师过去是用 AI 现场生成 HTML 互动小程序。问题是每次生成的样式都不一样、不能复用、数据无法回流。我把这套"散装"插件整理成一套有规范、可配置、可统计的题型系统，让教师端、学生端、数据看板形成闭环。',
    targetUsers: ['AI 通识课的课程内容设计师与教研', '需要在课堂里使用互动插件、又不想每次重写的一线教师', '希望沉淀课堂数据、做学情分析的产品 / 运营', '中学生用户：在学生端体验互动题型'],
    painPoints: [
      'AI 生成的插件样式不统一、视觉跳脱，难以放进同一节课里',
      '缺少后台配置层，题干 / 选项 / 反馈 / 知识点都散落在 HTML 里，难复用',
      '教师无法看到学生端答题数据，做不了课后分析',
      '题型口径不统一，同一类题在不同插件里实现完全不同'
    ],
    features: [
      {
        title: '互动题型规范',
        desc: '单选、多选、判断、拖拽分类、排序、点击探索、Prompt 练习、AI 作品提交统一字段'
      },
      {
        title: '后台配置层',
        desc: '题干 / 选项 / 解析 / 反馈 / 知识点标签 / 计分 / 统计字段全部可配置'
      },
      {
        title: '学生端展示',
        desc: '统一样式的互动 Demo，确保视觉一致，可放进任意课堂节点'
      },
      {
        title: '教师端数据看板',
        desc: '答题分布、知识点掌握、班级对比、个人轨迹，回流给老师'
      },
      {
        title: 'AI 辅助原型',
        desc: 'vibe coding 快速生成可点可用的 HTML/CSS/JS 原型，验证产品逻辑'
      },
      {
        title: '题型闭环验证',
        desc: '从配置 → 展示 → 答题 → 统计 全链路打通'
      }
    ],
    highlights: [
      '把散装的 AI 生成插件，整合为有规范的可复用题型系统',
      '梳理"后台配置 → 学生端展示 → 教师端统计"完整闭环',
      '8 类核心题型规范 + 必填字段口径输出',
      '用 vibe coding 快速验证产品逻辑，缩短评审周期',
      '教师端数据看板支撑课后学情分析'
    ],
    demoUrl: 'https://1326554490.github.io/ai-course-assessment-system/',
    demoLabel: '进入星芽互动插件系统',
    embedDemo: true
  },
  {
    id: 'lodue-reading',
    title: 'Lodue 阅读陪伴网页交互系统',
    subtitle: '为难以持续阅读的人，做一个会陪你读的网页',
    role: '个人项目 · AI 产品策划 / 交互设计 / 网页 Demo 迭代',
    tags: ['阅读陪伴', '交互设计', '动态可视化', 'AI 辅助拆解', '高保真原型'],
    year: '2026',
    accent: '#6b8068',
    bg: '#e8ede4',
    mood: 'light',
    cover: '❋',
    cardImage: 'assets/img/lodue/card.svg',
    summary: 'Lodue 是一款面向慢读、专注阅读与轻量共读的高保真产品原型。把阅读校准、个性化阅读模式、实时阅读辅助、阅读复盘与安静共读空间串成一条完整演示路径，让阅读重新变得安静、可见、可回看。',
    intro: '这个原型模拟一款「阅读陪伴 + 阅读复盘 + 共读空间」产品：用户先选择或粘贴文本，完成阅读状态校准，再进入适合自己的阅读模式；阅读过程中可以使用高亮、阅读尺、便签、难读标记和 Lodue Tempo 节奏辅助；阅读结束后生成复盘，并可将复盘分享为共读空间中的阅读动态。',
    targetUsers: ['阅读时容易走神、跳行或失去节奏的人', '需要低压力、低干扰阅读辅助的学生和深度阅读者', '希望把阅读感受、便签和复盘沉淀下来的人', '想和朋友安静共读、但不想进入高频聊天场景的用户'],
    painPoints: ['阅读状态不稳定，难以判断自己读得太快、太慢还是注意力停留', '普通阅读器只提供展示文本，缺少过程反馈和复盘', '阅读笔记和难点标记容易散落，结束后很难回看', '社交阅读常变成聊天流，打断阅读本身'],
    features: [
      {
        title: '首页内容入口',
        desc: '示例文本选择 + 自定义文本粘贴，无门槛进入阅读流'
      },
      {
        title: '阅读状态校准',
        desc: '按真实用时和字数估算阅读节奏，匹配最合适的阅读模式'
      },
      {
        title: '三档阅读模式',
        desc: '舒缓 / 专注 / 清晰，并提供字体、行距、字距、阅读尺、高亮、主题等微调'
      },
      {
        title: '实时阅读辅助',
        desc: '段落高亮、阅读尺、便签、难读标记、Lodue Tempo Guide 节奏提示'
      },
      {
        title: '阅读复盘',
        desc: '时长、进度、停留、节奏变化、标记和便签统计，让一次阅读可被回看'
      },
      {
        title: '安静共读空间',
        desc: '动态流 + 段落锚点 + 房间氛围主题，避免聊天页式的高频干扰'
      }
    ],
    highlights: [
      '完整高保真原型，覆盖「选材 → 校准 → 阅读 → 复盘 → 共读」全链路',
      '三档阅读模式 + 微调系统，把阅读节奏的判断从测试延伸到过程',
      'Lodue Tempo 把节奏可视化为克制的视觉反馈，不打断阅读',
      '便签、难读标记、路径与节奏历史进入阅读复盘，让阅读可回看',
      '共读空间以动态 + 段落锚点为核心，避免社交化干扰'
    ],
    demoUrl: 'https://1326554490.github.io/lodue-project/',
    demoLabel: '在新窗口打开完整版',
    embedDemo: true
  },
  {
    id: 'lingnan-aigc',
    title: '生成式视觉再现对文化遗产真实性感知的影响研究',
    subtitle: '以岭南建筑文化符号为例',
    role: '研究设计 · 眼动实验',
    tags: ['AIGC', '文化遗产', '真实性感知'],
    year: '2026 – 2028',
    accent: '#b97a3e',
    bg: '#f4ede2',
    mood: 'light',
    cover: '❖',
    cardImage: 'assets/img/lingnan/card.svg',
    summary: 'AI 补全文化遗产图像，游客还会觉得真实吗？以镬耳墙与灰塑为例，通过语义引导缺损、分级补全与透明度标注，结合问卷与眼动探讨真实性感知。',
    intro: 'AIGC 进入数字博物馆与文旅展示，AI 用于图像修复与历史再现。但文化遗产图像承载历史信息与地域符号——AI 过度补全可能造成失真、不透明、信任下降。本研究以岭南镬耳墙与灰塑为对象，构建不同 AI 介入程度的补全图像，引入透明度标注，回答：AI 生成得越完整，游客是否仍觉得真实？',
    targetUsers: [
      '数字博物馆、文旅平台的展陈设计方',
      '研究 AIGC 真实性与可信度的学者',
      '关注 AI 介入传统视觉的文化研究者'
    ],
    painPoints: [
      '游客难以判断真实史料与 AI 生成的边界',
      '过度补全让文化符号关键特征失真',
      'AI 介入不透明，易误认为完全来自历史资料'
    ],
    features: [
      {
        title: '镬耳墙 / 灰塑',
        desc: '整体形态与局部装饰符号，研究建筑轮廓与纹样的 AI 补全'
      },
      {
        title: '语义引导缺损',
        desc: '围绕耳状轮廓、山墙转角、纹样、浮雕边缘等关键特征缺损'
      },
      {
        title: '分级补全 & 标注',
        desc: '低/中/高三档 AI 介入，标注补全区域、说明与文化依据'
      },
      {
        title: '问卷 + 眼动',
        desc: '测量真实性、信任与接受度；AOI 分析补全区/核心区/标注区注视'
      }
    ],
    highlights: [
      '语义引导缺损：围绕文化符号关键特征，非随机破损',
      '主客观验证：问卷感知 + 眼动注视分析',
      '转化为数字博物馆透明化标注设计策略'
    ],
    demoUrl: '',
    demoLabel: ''
  },
  {
    id: 'pixel-persona',
    title: 'Pixel Persona 像素人格 NFT 生成器',
    subtitle: '基于 MBTI 人格类型构建独特的数字身份',
    role: '个人项目 · 产品构思 / 视觉设计 / Vibe Coding',
    tags: ['像素艺术', 'NFT', 'MBTI', '霓虹赛博', '原生 Web'],
    year: '2026',
    accent: '#b38cff',
    bg: '#1a1530',
    mood: 'dark',
    cover: '▣',
    cardImage: 'assets/img/pixel/card.svg',
    summary: '一个像素风 NFT 头像生成器，基于 MBTI 人格类型构建独特的数字身份。通过 8 大单选维度 + 3 大多选维度组合，10 种霓虹赛博色板自由切换，44 种特殊属性独立视觉反馈，让每个人都能在像素世界里找到属于自己的人格符号。',
    intro: '原生 HTML + CSS + JavaScript 单文件实现，零外部依赖，浏览器双击即可运行。从产品构思到视觉系统、从交互动效到 AI 宣言生成器，独立完成全链路。展示扎实的原生 JS 能力 + 像素美学 + 人格设计的跨界尝试。',
    targetUsers: ['想给自己生成一个独特数字头像的 MBTI 玩家', '对像素艺术、NFT、赛博美学有兴趣的创作者', '希望通过简单交互探索"数字身份"的年轻用户', '在社交媒体寻找独特头像、避免雷同的人'],
    painPoints: ['现有头像生成器随机性强，结果与人格无关', 'NFT 生成往往需要钱包/链上操作，门槛高', '纯随机组合缺少美学和叙事，结果常常违和', '缺少能反映"我是谁"的轻量数字身份工具'],
    features: [
      {
        title: '多维属性组合',
        desc: '8 大单选维度（MBTI / 性别 / 气质 / 场景 / 穿搭 / 发型 / 发色 / 表情）+ 3 大多选维度（配饰 / 动效 / 特殊属性）'
      },
      {
        title: '10 种霓虹赛博色板',
        desc: '切换主色风格时整个画面氛围都会同步改变'
      },
      {
        title: '44 种特殊属性',
        desc: '情绪类 / 身份类 / 视觉类 / 稀有类，每种都有独立视觉反馈'
      },
      {
        title: '12 种动效系统',
        desc: '像素聚合、编号扫描、方块雨、故障错位等'
      },
      {
        title: 'AI 智能构思',
        desc: '基于 MBTI 内在亲和度生成和谐的角色组合，比纯随机更符合人格逻辑'
      },
      {
        title: 'AI 宣言生成器',
        desc: '多维语料池组合 + 智能拼接，生成符合人格的第一人称宣言'
      }
    ],
    highlights: [
      '单文件 HTML 实现，约 100KB，浏览器双击即可运行',
      '10 种霓虹色板 + 12 种动效 + 44 种特殊属性的完整视觉系统',
      'AI 智能构思 + AI 宣言生成器，让人格成为生成约束',
      '3 个预设模板：INTP 逻辑漂流者 / ENFJ 霓虹生命家 / INFP 低电量理想主义者',
      '桌面 / 平板 / 手机响应式适配'
    ],
    demoUrl: 'https://1326554490.github.io/pixel-persona/',
    demoLabel: '进入像素人格生成器',
    embedDemo: true
  },
  {
    id: 'resprout-campus-recycle',
    title: 'RESPROUT 校园废纸回收系统',
    subtitle: '从"三不困境"到全员参与的智慧回收服务体系',
    role: '服务体系设计 · 用户研究 / 原型测试 / 伦理审查',
    tags: ['服务设计', '可持续发展', '用户研究', '原型测试', '智慧校园'],
    year: '2026',
    accent: '#2d7a4f',
    bg: '#e8f5e9',
    mood: 'light',
    cover: '♻',
    cardImage: '',
    summary: '针对校园废纸回收"找不到、不愿分、懒得动"的三不困境，设计软硬件结合的智慧回收系统，通过积分+碳排放双激励、智能调度、伦理审查，实现用户体验与管理效率的双重提升。',
    intro: '校园废纸回收长期面临回收点难找、投放不便、缺乏激励、管理粗放的问题。我们通过用户研究定位核心痛点，设计了智能回收箱（壁挂式、AI 识别称重、满溢预警）+ 小程序端（扫码投放、实时反馈、排行榜）+ 后台调度系统的完整服务体系，并通过原型测试验证激励机制有效性，完成伦理审查确保系统的公正性与可持续性。',
    targetUsers: ['校园师生：主要投放者，需要便捷的回收体验与有效激励', '后勤人员：清运执行者，需要智能调度减轻劳动强度', '校园管理者：关注回收效率与环保教育效果', '环保倡导者：希望通过设计推动可持续发展'],
    painPoints: [
      '回收体验差：回收点布局不合理、投放不便、分类指引模糊，"最后一百米"成难题',
      '管理效率低：依赖人工清运、无实时数据、无法动态调整资源配置',
      '激励功能缺失：缺乏物质或精神激励，师生缺乏回收意愿',
      '教育机制弱化：环保教育停留口号、缺乏实践载体，未形成全员参与氛围'
    ],
    features: [
      {
        title: '智能回收箱',
        desc: '壁挂式悬浮体量，轻量化融入校园空间；内嵌斜切投放口；AI 图像识别 + 称重传感器自动分类；微型静音压缩仓；动态屏幕交互；满溢预警 + GPS 定位'
      },
      {
        title: '小程序端',
        desc: '扫码投放；实时反馈；双激励机制（积分 + 碳排放）；排行榜；回收指南；点位导航'
      },
      {
        title: '后台调度系统',
        desc: '满溢率监控；智能调度算法；工单生成；数据看板；劳动伦理保护'
      }
    ],
    highlights: [
      '用户旅程完整闭环：从投放 → 反馈 → 激励 → 调度，打通用户端、管理端、后勤端全流程',
      '原型测试验证激励机制：设置对照实验测试物质激励、转化率、视觉反馈、排行榜四个变量',
      '伦理审查全面覆盖：数据伦理、算法公正、行为伦理、劳动伦理、硬件伦理',
      '绿色低碳设计：硬件采用模块化结构便于维修回收，优先低功耗物联网协议'
    ],
    demoUrl: '../assets/pdf/resprout-report.pdf',
    demoLabel: '查看完整报告（PDF）',
    embedDemo: true
  },
  {
    id: 'kaoyan-portfolio',
    title: '考研作品集 · 印装合订本',
    subtitle: '考研阶段整理的作品集，以书的形式装帧成册',
    role: '考研期 · 设计编排 / 排版 / 装帧 / 印刷成书',
    tags: ['作品集', '装帧设计', '排版', '印装合订'],
    year: '2025',
    accent: '#6f7479',
    bg: '#e6e8e9',
    mood: 'light',
    cover: '❒',
    cardImage: 'assets/img/kaoyan/cover-front.jpg',
    summary: '考研阶段整理出的作品集，按一本书的方式装订成册。点击进入后，可以像翻阅实体书一样一页一页翻看。',
    intro: '这是我在准备研究生考试时整理出的个人作品集，最终装订印刷成一本实体书。封面"个人设计作品集"、封底"拙作 合集"，正文 24 页对开 12 个跨页。从「关于我」起，依次走过竞赛实践、平面、品牌、空间、建筑设计等多个方向的代表作业。下方提供翻书阅览器，按真实装订顺序一页一页翻。',
    highlights: [
      '整本以印刷实体书的形式装订呈现：封面 + 24 页正文 + 封底，共 13 个跨页',
      '起首即「关于我」，从个人信息、考研规划、竞赛实践到个人技能的一页式自我介绍',
      '正文按内容线索递进：平面与品牌、空间与陈设、建筑设计与图纸表达',
      '封面到内页保持统一的克制版式语言，强调留白、字号节奏与图文层级',
      '可点击/键盘翻阅，模拟翻动实体书的阅读节奏'
    ],
    book: {
      coverFront: 'assets/img/kaoyan/cover-front.jpg',
      coverBack: 'assets/img/kaoyan/cover-back.jpg',
      spreads: [
        'assets/img/kaoyan/01.jpg',
        'assets/img/kaoyan/02.jpg',
        'assets/img/kaoyan/03.jpg',
        'assets/img/kaoyan/04.jpg',
        'assets/img/kaoyan/05.jpg',
        'assets/img/kaoyan/06.jpg',
        'assets/img/kaoyan/07.jpg',
        'assets/img/kaoyan/08.jpg',
        'assets/img/kaoyan/09.jpg',
        'assets/img/kaoyan/10.jpg',
        'assets/img/kaoyan/11.jpg',
        'assets/img/kaoyan/12.jpg'
      ]
    },
    demoUrl: '',
    demoLabel: ''
  }
];

window.PORTFOLIO_KEYWORDS = ['AI Product', 'Designer', 'Researcher', 'Vibe Coder', 'Prompt Crafter', 'Multimodal', 'AIGC', 'Interaction'];

window.PORTFOLIO_PROFILE = {
  position: '设计学硕士，关注 AI 应用产品、AIGC 与多模态交互；具备交互原型、用户研究、AI 辅助需求拆解、Prompt / 工作流基础与 AI 辅助原型开发经验；长期希望向 AI 技术产品方向发展。',
  jobIntent: 'AI 产品经理实习生 / AIGC 产品实习生 / AI 应用产品实习生',
  jobAvail: '可全勤实习',
  email: '1326554490@qq.com',
  wechat: 'baofu6611',
  name: '刘碧依',
  nameEn: 'Liu Biyi',
  education: [
    {
      school: '哈尔滨工业大学（深圳）',
      degree: '设计学 · 硕士',
      time: '2025.09 — 至今'
    },
    {
      school: '沈阳工业大学',
      degree: '建筑学 · 本科',
      time: '2020.10 — 2025.06'
    }
  ],
  research: [
    {
      title: '市自然科学基金项目申报支持',
      desc: '参与内容框架、技术路线与附件材料整理，协助图文排版和申报节点提交。'
    },
    {
      title: '英文期刊论文（共一作者，已通过编辑审稿待发表）',
      desc: '参与文献梳理、论文结构优化、图表表达与英文修改。'
    }
  ],
  skills: [
    {
      group: 'AI 产品能力',
      items: ['Prompt 基础', 'AI 产品需求分析', '用户流程设计', '竞品分析', 'PRD 初稿撰写', '用户研究问卷设计']
    },
    {
      group: 'AI 工具与工作流',
      items: ['ChatGPT', 'Claude', 'Midjourney / 即梦 / 可灵', 'Coze / Dify 了解', 'RAG、API 基础', 'AI 辅助原型开发（vibe coding）']
    },
    {
      group: '设计 & 其他',
      items: ['Figma', 'Photoshop', 'Illustrator', 'Blender', '剪映', '原型设计 / 视觉表达 / 图文排版', 'CET-6']
    }
  ],
  awards: ['NCDA 辽宁省一等奖', '米兰设计周辽宁赛区三等奖', '辽宁省绿色建筑创新设计大赛三等奖']
};
