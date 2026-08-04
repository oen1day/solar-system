# 动态太阳系模型 · Interactive Solar System

一个基于 Three.js 的 3D 交互式太阳系网站，界面支持简体中文、繁體中文、English 和 Русский。
An interactive 3D solar system built with Three.js, available in Simplified Chinese, Traditional Chinese, English, and Russian.

## 在线演示 · Live Demo

<https://oen1day.github.io/solar-system/>

项目仓库 · Repository：<https://github.com/oen1day/solar-system>

## 功能特性 · Features

- 3D 太阳系：太阳、八大行星、月球、小行星带、柯伊伯带与星空 / 3D solar system: the Sun, eight planets, the Moon, the asteroid belt, the Kuiper belt, and a starfield
- 真实比例：行星大小与轨道距离按真实相对比例构建（太阳与月球为视觉可读性做了折中）/ Realistic scale: planet sizes and orbits follow real relative proportions (the Sun and the Moon are visually adjusted for readability)
- 真实纹理：行星贴图来自 Solar System Scope（CC BY 4.0），地球使用 NASA 影像并叠加暗面城市灯光 / Real textures: Solar System Scope (CC BY 4.0) planet maps plus NASA Earth imagery with night-time city lights
- 动态效果：地球动态云层与飓风、太阳光照与辉光、昼夜分界 / Dynamic clouds and hurricanes on Earth, sun lighting and glow, day/night terminator
- 交互控制：自由旋转 / 缩放 / 平移，点击或侧边菜单定位，选中后持续跟随天体公转 / Free rotate / zoom / pan, click or menu to focus, and continuous tracking of celestial bodies
- 人类里程碑：阿波罗11号登月、嫦娥四号月背软着陆、旅行者1号 / 2号、新视野号飞越冥王星 / Human milestones: Apollo 11, Chang'e 4, Voyager 1 / 2, and New Horizons
- 多语言：简体中文 / 繁體中文 / English / Русский，一键切换并自动记住选择 / Multi-language UI with one-click switching and remembered preference
- 移动端适配：侧边菜单、底部信息卡片、触屏手势 / Mobile-friendly layout, bottom info cards, and touch gestures
- 加载优化：CDN 优先加载 + 本地回退，支持离线使用 / Optimized loading with CDN-first fallback and offline support

## 快速开始 · Quick Start

### 在线使用 · Online

直接打开上面的在线演示链接即可，无需安装任何东西。
Just open the live demo link above — no installation needed.

### 本地运行 · Run locally

克隆本仓库后，直接用浏览器（推荐 Edge / Chrome）打开 `index.html` 即可，也可以启动任意静态服务器：
Clone the repository, open `index.html` in a browser (Edge / Chrome recommended), or run any static server:

```bash
python -m http.server 8080
# 然后访问 http://localhost:8080
# then open http://localhost:8080
```

### 操作 · Controls

| 操作 / Control | 效果 / Effect |
| --- | --- |
| 左键拖拽 / Drag | 旋转视角 / Rotate the view |
| 滚轮 / Scroll | 放大 / 缩小 / Zoom in / out |
| 右键拖拽 / Right-drag | 平移视角 / Pan |
| 点击星球或菜单项 / Click a planet or menu item | 定位并飞近，随后持续跟随 / Focus, fly close, and keep following |
| 顶部语言下拉框 / Language menu | 切换界面语言 / Switch UI language |

## 项目结构 · Project Structure

```
solar-system/
├── index.html          # 网站主页（加载器 + 页面骨架） / Main page (loader + UI skeleton)
├── css/
│   └── style.css       # 界面样式 / Styles
├── js/
│   ├── app.js          # 太阳系程序逻辑（天体、相机、交互、事件、多语言） / Main logic (bodies, camera, interactions, events, i18n)
│   ├── three.min.js    # Three.js 3D 引擎 / Three.js engine
│   └── OrbitControls.js# 视角控制组件 / Camera controls
├── assets/             # 行星纹理 / Planet textures (Solar System Scope / NASA)
├── 使用说明.txt        # 中英双语使用说明 / Bilingual usage notes
└── LICENSE             # MIT 开源协议 / MIT license
```

## 技术栈 · Tech Stack

- [Three.js](https://threejs.org/)（MIT 协议 / MIT license）— WebGL 3D 渲染 / WebGL rendering
- 原生 HTML / CSS / JavaScript，无构建步骤 / Vanilla HTML/CSS/JS, no build step
- [GitHub Pages](https://pages.github.com/) 静态托管 / Static hosting

## 贴图来源与版权 · Texture Credits & License

- 本仓库原创代码采用 **MIT 协议**，详见 [LICENSE](LICENSE)。/ Original code is licensed under **MIT** — see [LICENSE](LICENSE).
- 星球贴图由 [Solar System Scope](https://www.solarsystemscope.com/textures/) 提供，采用 **CC BY 4.0** 协议，页面右下角已保留署名。/ Planet textures by [Solar System Scope](https://www.solarsystemscope.com/textures/) under **CC BY 4.0**; attribution is shown in the page footer.
- NASA 地球影像属于美国联邦政府作品，为公有领域。/ NASA Earth imagery is in the public domain (U.S. government work).

## 贡献 · Contributing

欢迎提交 Issue 和 Pull Request。如果使用了本项目，请保留页面中的贴图署名。
Issues and pull requests are welcome. If you use this project, please keep the texture attribution in the page.

## License

[MIT](LICENSE)
