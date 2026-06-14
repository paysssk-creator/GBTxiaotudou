# 🥔 GBT小土豆全能开发者 — 智能出租平台

> **一键远程操控桌面 · 17个AI能力工具集 · 24/7自动化运维**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🚀 项目概述

`gbtxiaotudou.com` 是GBT小土豆全能开发者的官方出租平台网站。提供：

- **🖥️ 远程一键操控面板** — 屏幕/语音/蓝牙/键鼠/进程管理
- **🧠 17个MCP能力工具集** — 开发/安全/运维/AI全覆盖
- **💎 三档租赁方案** — 基础版(¥99) / 专业版(¥299) / 企业版(¥999)

## 📁 项目结构

```
gbtxiaotudou/
├── index.html      # 响应式首页 (暗色主题)
├── style.css       # 完整样式系统 (毛玻璃 + 渐变)
├── app.js          # 交互引擎 (操控API + 动态渲染)
├── vercel.json     # Vercel部署配置
└── README.md       # 本文件
```

## 🎨 设计特色

- **暗色主题** — 深空黑背景 + 靛蓝紫渐变
- **毛玻璃效果** — backdrop-filter 卡片
- **响应式布局** — 手机/平板/桌面全适配
- **终端风格** — 模拟命令行界面展示
- **微动画** — 滚动渐显、按钮动效、指示灯闪烁

## 🛠️ 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | HTML5 + CSS3 + Vanilla JS |
| 部署 | Vercel (静态托管) |
| 安全头 | CSP / X-Frame / HSTS |
| 设计 | CSS Custom Properties + Glassmorphism |

## 🚢 部署

### Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
cd C:\Users\ADMIN\projects\gbtxiaotudou
vercel --prod
```

### 或通过 GitHub

1. Fork 仓库到 `paysssk-creator/gbtxiaotudou`
2. 在 Vercel 导入 GitHub 仓库
3. 自动检测 `vercel.json` 配置
4. 一键部署

## 🖥️ 远程操控API

`app.js` 内置完整桌面控制模拟API：

| 命令 | 描述 | 调用 |
|------|------|------|
| `screen` | 实时屏幕截图 | `sendControl('screen')` |
| `speak` | TTS语音播报 | `sendControl('speak', {text:'你好'})` |
| `listen` | 语音识别 | `sendControl('listen')` |
| `bt` | 蓝牙设备扫描 | `sendControl('bt')` |
| `move` | 鼠标移动 | `sendControl('move', {x:500,y:300})` |
| `click` | 鼠标点击 | `sendControl('click', {x:500,y:300})` |
| `type` | 键盘输入 | `sendControl('type', {text:'Hello'})` |
| `hotkey` | 快捷键 | `sendControl('hotkey', {keys:'ctrl+c'})` |
| `proc` | 进程列表 | `sendControl('proc')` |
| `sys` | 系统信息 | `sendControl('sys')` |

## 🧠 MCP能力服务器

| # | 能力 | 类别 |
|---|------|------|
| 1 | 智能调度器 | 运维 |
| 2 | 自进化引擎 | 开发 |
| 3 | 代码扫描器 | 安全 |
| 4 | 项目审计 | 安全 |
| 5 | 记忆库 | 开发 |
| 6 | 云端LLM | AI |
| 7 | 一键修复 | 开发 |
| 8 | 漏洞赏金 | 安全 |
| 9 | 桌面控制 | 运维 |
| 10 | MCP路由 | 运维 |
| 11 | 深度分析 | AI |
| 12 | 全局记忆 | 开发 |
| 13 | 镜像部署 | 运维 |
| 14 | 邮箱监控 | 运维 |
| 15 | 压力测试 | 安全 |
| 16 | 远程桌面 | 运维 |
| 17 | Halo建站 | 开发 |

## 📧 联系方式

- **网站**: [gbtxiaotudou.com](https://gbtxiaotudou.com)
- **GitHub**: [paysssk-creator](https://github.com/paysssk-creator)
- **邮件**: hello@gbtxiaotudou.com

---

> © 2026 GBTxiaotudou. Built with ❤️ | MIT License