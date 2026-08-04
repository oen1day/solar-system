# 动态太阳系 · Interactive Solar System

一个基于 Three.js 的 3D 交互式太阳系网站。可以在浏览器中自由缩放、旋转、定位和持续跟随天体，查看真实纹理的星球、动态云层、城市灯光，以及阿波罗登月、嫦娥四号、旅行者号等人类里程碑事件。

## 在线演示

<https://oen1day.github.io/solar-system/>

## 功能特性

- 3D 太阳系：太阳、八大行星、月球、小行星带、柯伊伯带与星空背景
- 真实比例：行星大小与轨道距离按真实相对比例构建（太阳与月球为视觉可读性做了折中）
- 真实纹理：行星贴图来自 Solar System Scope（CC BY 4.0），地球使用 NASA 影像并叠加暗面城市灯光
- 动态效果：地球动态云层与飓风、太阳光照与辉光、昼夜分界
- 交互控制：自由旋转 / 缩放 / 平移，点击或侧边菜单一键定位，选中后持续跟随天体公转
- 人类里程碑：阿波罗11号登月、嫦娥四号月背软着陆、旅行者1号 / 2号、新视野号飞越冥王星
- 移动端适配：侧边菜单、底部信息卡片、触屏手势
- 加载优化：CDN 优先加载 + 本地回退，支持离线使用

## 快速开始

### 在线使用

直接打开上面的在线演示链接即可，无需安装任何东西。

### 本地运行

克隆本仓库后，直接用浏览器（推荐 Edge / Chrome）打开 `index.html` 即可，不需要联网。也可以启动任意静态服务器：

```bash
# 例如 Python
python -m http.server 8080
# 然后访问 http://localhost:8080
```

### 鼠标 / 触屏操作

| 操作 | 效果 |
| --- | --- |
| 左键拖拽 | 旋转视角 |
| 滚轮 / 双指缩放 | 放大 / 缩小 |
| 右键拖拽 / 双指平移 | 平移视角 |
| 点击星球或菜单项 | 定位并飞近该天体，随后持续跟随 |
| 点击「跟随中」旁的 ✕ | 取消跟随 |

## 项目结构

```
solar-system/
├── index.html          # 网站主页（加载器 + 页面骨架）
├── css/
│   └── style.css       # 界面样式
├── js/
│   ├── app.js          # 太阳系程序逻辑（天体、相机、交互、事件）
│   ├── three.min.js    # Three.js 3D 引擎
│   └── OrbitControls.js# 视角控制组件
├── assets/             # 行星纹理（Solar System Scope / NASA）
├── 使用说明.txt        # 中文使用说明
└── LICENSE             # MIT 开源协议
```

## 技术栈

- [Three.js](https://threejs.org/)（MIT 协议）—— WebGL 3D 渲染
- 原生 HTML / CSS / JavaScript，无构建步骤
- [GitHub Pages](https://pages.github.com/) 静态托管

## 贴图来源与版权

- 本仓库原创代码采用 **MIT 协议**，详见 [LICENSE](LICENSE)。
- 星球贴图由 [Solar System Scope](https://www.solarsystemscope.com/textures/) 提供，采用 **CC BY 4.0** 协议，页面右下角已保留署名。
- NASA 地球影像属于美国联邦政府作品，为公有领域。

## 贡献

欢迎提交 Issue 和 Pull Request。如果使用了本项目，请保留页面中的贴图署名。

## License

[MIT](LICENSE)
