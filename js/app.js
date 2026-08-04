(function () {
  "use strict";

  /* 动态太阳系模型 · Interactive Solar System
   * 基于 Three.js 的 3D 太阳系交互网站
   * 在线演示：https://oen1day.github.io/solar-system/
   * 开源协议：MIT（贴图版权与署名见 README.md） */

  /* =========================================================
   *  数据定义
   * ========================================================= */
  const BODIES = {
    sun: {
      key: "sun", name: "太阳", en: "Sun", type: "恒星",
      radius: 2.4, distance: 0, color: 0xffcc44, emissive: 0xffaa22,
      angle: 0, orbitSpeed: 0, spinSpeed: 0.08,
      facts: [
        ["直径", "139.2 万 km"], ["表面温度", "约 5,500 ℃"],
        ["类型", "G2V 黄矮星"], ["质量占比", "99.86%"]
      ],
      desc: "太阳系的中心，一颗正值壮年的黄矮星，内部每秒将约 6 亿吨氢转化为氦，为整个太阳系提供光和热。"
    },
    mercury: {
      key: "mercury", name: "水星", en: "Mercury", type: "类地行星",
      radius: 0.057, distance: 6.0, color: 0xb8b8c0,
      angle: 0.4, orbitSpeed: 5.31, spinSpeed: 0.03,
      facts: [
        ["直径", "4,879 km"], ["距太阳", "5,790 万 km"],
        ["公转周期", "88 天"], ["自转周期", "58.6 天"],
        ["表面温度", "-173 ~ 427 ℃"]
      ],
      desc: "离太阳最近、也是最小的行星。几乎没有大气层保护，昼夜温差超过 600℃，表面布满陨石坑，像一颗巨大的铁核。"
    },
    venus: {
      key: "venus", name: "金星", en: "Venus", type: "类地行星",
      radius: 0.142, distance: 11.2, color: 0xe8c27a,
      angle: 2.0, orbitSpeed: 3.52, spinSpeed: -0.015,
      facts: [
        ["直径", "12,104 km"], ["距太阳", "1.082 亿 km"],
        ["公转周期", "225 天"], ["自转周期", "243 天（逆向）"],
        ["表面温度", "约 465 ℃"]
      ],
      desc: "太阳系最热的行星。浓密的二氧化碳大气和硫酸云层造成失控温室效应，表面温度足以熔化铅，且自转方向与公转相反。"
    },
    earth: {
      key: "earth", name: "地球", en: "Earth", type: "类地行星",
      radius: 0.15, distance: 15.5, color: 0x4a8cf7,
      angle: 4.0, orbitSpeed: 2.55, spinSpeed: 0.12,
      hasMoon: true,
      facts: [
        ["直径", "12,756 km"], ["距太阳", "1.496 亿 km"],
        ["公转周期", "365.25 天"], ["自转周期", "23.9 小时"],
        ["表面温度", "-89 ~ 57 ℃"]
      ],
      desc: "目前已知唯一存在生命的星球。71% 的表面被液态海洋覆盖，大气中 21% 是氧气，拥有唯一的天然卫星——月球。"
    },
    mars: {
      key: "mars", name: "火星", en: "Mars", type: "类地行星",
      radius: 0.08, distance: 23.6, color: 0xd1664a,
      angle: 5.5, orbitSpeed: 1.81, spinSpeed: 0.1,
      facts: [
        ["直径", "6,792 km"], ["距太阳", "2.279 亿 km"],
        ["公转周期", "687 天"], ["自转周期", "24.6 小时"],
        ["表面温度", "-140 ~ 20 ℃"]
      ],
      desc: "被称为红色星球，表面氧化铁让它呈现锈红色。拥有太阳系最高的火山——奥林帕斯山（高约 21 km），是人类未来移民的热门候选。"
    },
    asteroidBelt: {
      key: "asteroidBelt", name: "小行星带", en: "Asteroid Belt", type: "小行星带",
      radius: 1.0, distance: 42.0, color: 0x9a8f7a,
      angle: 0, orbitSpeed: 0.5, spinSpeed: 0,
      facts: [
        ["位置", "火星与木星之间"], ["范围", "约 2.2 ~ 3.2 AU"],
        ["已知数量", "数百万颗"], ["最大天体", "谷神星（940 km）"]
      ],
      desc: "太阳系形成早期未能聚集成行星的物质残留，由岩石和金属组成。最大的谷神星直径约 940 公里，已被归类为矮行星。"
    },
    jupiter: {
      key: "jupiter", name: "木星", en: "Jupiter", type: "气态巨行星",
      radius: 1.65, distance: 80.6, color: 0xd9a066,
      angle: 1.2, orbitSpeed: 0.69, spinSpeed: 0.28,
      facts: [
        ["直径", "142,984 km"], ["距太阳", "7.786 亿 km"],
        ["公转周期", "11.86 年"], ["自转周期", "9.9 小时"],
        ["表面温度", "约 -108 ℃"]
      ],
      desc: "太阳系最大的行星，体积可容纳 1300 多个地球。标志性的大红斑是一场已持续数百年的超级风暴，直径超过地球。"
    },
    saturn: {
      key: "saturn", name: "土星", en: "Saturn", type: "气态巨行星",
      radius: 1.42, distance: 148.4, color: 0xe3c987,
      angle: 3.0, orbitSpeed: 0.454, spinSpeed: 0.26,
      hasRings: true, ringColor: 0xcbb087,
      facts: [
        ["直径", "120,536 km"], ["距太阳", "14.34 亿 km"],
        ["公转周期", "29.45 年"], ["自转周期", "10.7 小时"],
        ["表面温度", "约 -139 ℃"]
      ],
      desc: "以壮观的光环闻名，光环由无数冰块和岩石碎屑组成，宽达数十万公里却只有几十米厚。土星平均密度比水还低。"
    },
    uranus: {
      key: "uranus", name: "天王星", en: "Uranus", type: "冰巨行星",
      radius: 0.6, distance: 297.4, color: 0x8fd8d8,
      angle: 0.8, orbitSpeed: 0.319, spinSpeed: 0.2,
      hasFaintRing: true,
      facts: [
        ["直径", "51,118 km"], ["距太阳", "28.71 亿 km"],
        ["公转周期", "84 年"], ["自转周期", "17.2 小时"],
        ["表面温度", "约 -197 ℃"]
      ],
      desc: "一颗与众不同的冰巨行星，自转轴几乎“平躺”在轨道面上，像是侧着身子绕太阳滚动。大气中的甲烷让它呈现淡蓝绿色。"
    },
    neptune: {
      key: "neptune", name: "海王星", en: "Neptune", type: "冰巨行星",
      radius: 0.58, distance: 466.0, color: 0x5f7ff0,
      angle: 2.6, orbitSpeed: 0.249, spinSpeed: 0.22,
      facts: [
        ["直径", "49,528 km"], ["距太阳", "44.95 亿 km"],
        ["公转周期", "164.8 年"], ["自转周期", "16.1 小时"],
        ["表面温度", "约 -201 ℃"]
      ],
      desc: "距离太阳最远的行星，深蓝色的外观来自大气中的甲烷。拥有太阳系最狂暴的风，速度可达每小时 2,100 公里。"
    },
    kuiperBelt: {
      key: "kuiperBelt", name: "柯伊伯带", en: "Kuiper Belt", type: "冰质天体带",
      radius: 1.0, distance: 660.0, color: 0x7a86a8,
      angle: 0, orbitSpeed: 0.12, spinSpeed: 0,
      facts: [
        ["位置", "海王星轨道之外"], ["范围", "约 30 ~ 55 AU"],
        ["组成", "冰、甲烷、氨"], ["著名成员", "冥王星"]
      ],
      desc: "海王星轨道之外环绕太阳的冰质天体带，是短周期彗星的故乡。曾经的第九大行星冥王星就位于这片区域。"
    }
  };

  const PLANET_KEYS = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
  const BELT_KEYS = ["asteroidBelt", "kuiperBelt"];
  const MOON_RADIUS = 0.041;
  // 月球轨道：视觉折中（真实约为 60 倍地球半径，按当前尺度会直接嵌入地球球体）
  const MOON_ORBIT_R = 1.0;
  // 小行星带 2.2~3.2 AU、柯伊伯带 30~55 AU（1 AU = 15.5 场景单位）
  const BELT_RANGE = [34.1, 49.6];
  const KUIPER_RANGE = [465, 852.5];

  const MOON_INFO = {
    key: "moon", name: "月球", en: "Moon", type: "天然卫星",
    facts: [
      ["直径", "3,474 km"], ["距地球", "约 38.4 万 km"],
      ["公转周期", "27.3 天"], ["自转周期", "27.3 天（潮汐锁定）"],
      ["表面温度", "-173 ~ 127 ℃"]
    ],
    desc: "地球唯一的天然卫星，也是人类唯一亲身踏足过的地外天体。月球被地球潮汐锁定，永远以同一面朝向地球，正面与背面的地貌差异巨大。"
  };

  // 人类里程碑事件
  const EVENTS = [
    {
      key: "apollo11", name: "阿波罗11号 · 人类首次登月", short: "阿波罗11号登月",
      year: "1969年7月20日", type: "载人登月", body: "moon",
      lat: 0.7, lon: 23.7, color: 0xff5a4a,
      desc: "阿姆斯特朗与奥尔德林乘坐“鹰”号登月舱降落在静海基地，成为最先踏上月球的人类。两人在月面活动约 2.5 小时，带回 21.5 公斤月岩样本，阿姆斯特朗说出了那句名言：“这是个人的一小步，却是人类的一大步。”"
    },
    {
      key: "change4", name: "嫦娥四号 · 月背软着陆", short: "嫦娥四号月背着陆",
      year: "2019年1月3日", type: "无人探测器", body: "moon",
      lat: -45.5, lon: 177.6, color: 0x3fce7a,
      desc: "嫦娥四号在月球背面冯·卡门撞击坑成功软着陆，是人类历史上首个在月球背面着陆的探测器。玉兔二号月球车随后展开巡视，持续传回珍贵科学数据。"
    },
    {
      key: "voyager1", name: "旅行者1号", short: "旅行者1号",
      year: "1977年发射 · 2012年进入星际空间", type: "深空探测器", body: "space",
      pos: [950, 8, -20], color: 0x5aa8ff,
      desc: "1977年9月发射，先后飞掠木星和土星，2012年成为首个进入星际空间的人造物体。它目前仍是距离地球最远的人造探测器，携带的镀金唱片向宇宙传递着人类文明的问候。"
    },
    {
      key: "voyager2", name: "旅行者2号", short: "旅行者2号",
      year: "1977年发射 · 2018年进入星际空间", type: "深空探测器", body: "space",
      pos: [-880, -6, 30], color: 0x5aa8ff,
      desc: "1977年8月发射，是唯一飞掠过木星、土星、天王星、海王星四颗巨行星的探测器。2018年进入星际空间，至今仍在向地球传回科学数据。"
    },
    {
      key: "newhorizons", name: "新视野号 · 飞越冥王星", short: "新视野号飞越冥王星",
      year: "2006年发射 · 2015年飞越冥王星", type: "深空探测器", body: "space",
      pos: [800, 5, 25], color: 0xffc85a,
      desc: "2006年发射，2015年7月飞越冥王星并传回首张高清特写，让人类第一次看清这颗矮行星的“心形”冰原。2019年又飞掠了柯伊伯带小天体“天涯海角”（Arrokoth）。"
    }
  ];
  const EVENT_BY_KEY = {};
  EVENTS.forEach(function (ev) { EVENT_BY_KEY[ev.key] = ev; });

  /* =========================================================
   *  多语言（简体中文 / 繁體中文 / English / Русский）
   * ========================================================= */
  const LANGS = ["zh", "zhTW", "en", "ru"];
  const ZH_TW_MAP = {
    "万":"萬","亿":"億","约":"約","颗":"顆","数":"數","与":"與","轨":"軌","间":"間","时":"時","温":"溫",
    "带":"帶","个":"個","锁":"鎖","谷":"穀","载":"載","发":"發","际":"際","号":"號","罗":"羅","陆":"陸",
    "软":"軟","着":"著","后":"後","里":"裡","车":"車","飞":"飛","视":"視","标":"標","签":"籤","单":"單",
    "击":"擊","键":"鍵","缩":"縮","转":"轉","滚":"滾","轮":"輪","侧":"側","边":"邊","还":"還","远":"遠",
    "独":"獨","为":"為","传":"傳","递":"遞","携":"攜","层":"層","浓":"濃","云":"雲","应":"應","铅":"鉛",
    "盖":"蓋","卫":"衛","铁":"鐵","锈":"鏽","红":"紅","奥":"奧","门":"門","热":"熱","选":"選","残":"殘",
    "质":"質","属":"屬","类":"類","志":"誌","级":"級","风":"風","环":"環","无":"無","宽":"寬","轴":"軸",
    "蓝":"藍","绿":"綠","乡":"鄉","异":"異","历":"歷","测":"測","续":"續","贵":"貴","据":"據","离":"離",
    "镀":"鍍","问":"問","进":"進","这":"這","经":"經","纬":"緯","对":"對","浏":"瀏","览":"覽","寻":"尋",
    "让":"讓","变":"變","阳":"陽","屿":"嶼","优":"優","众":"眾","参":"參","台":"臺","两":"兩","却":"卻",
    "冯":"馮","静":"靜","样":"樣","岁":"歲","纪":"紀","头":"頭","尘":"塵","龙":"龍"
  };
  function zhTW(s) {
    let out = s;
    Object.keys(ZH_TW_MAP).forEach(function (k) {
      out = out.split(k).join(ZH_TW_MAP[k]);
    });
    return out;
  }
  const UI_T = {
    title: { zh: "动态太阳系模型 · Interactive Solar System", zhTW: "動態太陽系模型 · Interactive Solar System", en: "动态太阳系模型 · Interactive Solar System", ru: "动态太阳系模型 · Interactive Solar System" },
    brand: { zh: "动态太阳系模型", zhTW: "動態太陽系模型", en: "Solar System Model", ru: "Модель Солнечной системы" },
    menuToggleTitle: { zh: "展开/收起菜单", zhTW: "展開/收起選單", en: "Open/close menu", ru: "Открыть/закрыть меню" },
    pauseTitle: { zh: "播放/暂停", zhTW: "播放/暫停", en: "Play/Pause", ru: "Играть/Пауза" },
    speed: { zh: "速度", zhTW: "速度", en: "Speed", ru: "Скорость" },
    orbit: { zh: "轨道", zhTW: "軌道", en: "Orbits", ru: "Орбиты" },
    labels: { zh: "标签", zhTW: "標籤", en: "Labels", ru: "Метки" },
    belt: { zh: "小行星带", zhTW: "小行星帶", en: "Asteroid belt", ru: "Пояс астероидов" },
    timeRunning: { zh: "运行 {n} 天", zhTW: "運行 {n} 天", en: "Day {n}", ru: "День {n}" },
    sidebarTitle: { zh: "太阳系导航", zhTW: "太陽系導航", en: "Solar System Navigation", ru: "Навигация по Солнечной системе" },
    sidebarCloseTitle: { zh: "收起菜单", zhTW: "收起選單", en: "Close menu", ru: "Закрыть меню" },
    searchPlaceholder: { zh: "搜索星球…", zhTW: "搜尋星球…", en: "Search planets…", ru: "Поиск планет…" },
    resetView: { zh: "重置视角", zhTW: "重置視角", en: "Reset view", ru: "Сбросить вид" },
    infoCloseTitle: { zh: "关闭", zhTW: "關閉", en: "Close", ru: "Закрыть" },
    infoCollapseTitle: { zh: "收起/展开", zhTW: "收起/展開", en: "Collapse/expand", ru: "Свернуть/развернуть" },
    followPrefix: { zh: "跟随中 · ", zhTW: "跟隨中 · ", en: "Following · ", ru: "Слежение · " },
    followCancelTitle: { zh: "取消跟随", zhTW: "取消跟隨", en: "Stop following", ru: "Остановить слежение" },
    eventDockTitle: { zh: "固定到右侧", zhTW: "固定到右側", en: "Dock to the right", ru: "Закрепить справа" },
    eventBackTitle: { zh: "回到标记位置", zhTW: "回到標記位置", en: "Return to marker", ru: "Вернуться к маркеру" },
    eventCollapseTitle: { zh: "收起/展开", zhTW: "收起/展開", en: "Collapse/expand", ru: "Свернуть/развернуть" },
    eventCloseTitle: { zh: "关闭", zhTW: "關閉", en: "Close", ru: "Закрыть" },
    hint: { zh: "左键拖拽旋转 · 滚轮缩放 · 右键平移 · 点击星球或侧边菜单定位", zhTW: "左鍵拖曳旋轉 · 滾輪縮放 · 右鍵平移 · 點擊星球或側邊選單定位", en: "Drag to rotate · Scroll to zoom · Right-drag to pan · Click a planet or menu item to focus", ru: "Перетаскивание — вращение · Колесо — масштаб · Правая кнопка — панорама · Клик по планете или пункту меню — фокус" },
    loadingTitle: { zh: "正在加载太阳系…", zhTW: "正在載入太陽系…", en: "Loading the solar system…", ru: "Загрузка Солнечной системы…" },
    loadingConnect: { zh: "正在连接资源服务器…", zhTW: "正在連線資源伺服器…", en: "Connecting to resource servers…", ru: "Подключение к серверам ресурсов…" },
    retry: { zh: "重新加载", zhTW: "重新載入", en: "Reload", ru: "Перезагрузить" },
    attributionLabel: { zh: "贴图来源：", zhTW: "貼圖來源：", en: "Textures: ", ru: "Текстуры: " },
    navStar: { zh: "恒星", zhTW: "恆星", en: "Stars", ru: "Звёзды" },
    navPlanets: { zh: "行星", zhTW: "行星", en: "Planets", ru: "Планеты" },
    navSatellites: { zh: "卫星", zhTW: "衛星", en: "Moons", ru: "Спутники" },
    navAsteroidBelt: { zh: "小行星带", zhTW: "小行星帶", en: "Asteroid Belt", ru: "Пояс астероидов" },
    navMilestones: { zh: "人类里程碑", zhTW: "人類里程碑", en: "Milestones", ru: "Вехи" },
    navKuiperBelt: { zh: "柯伊伯带", zhTW: "柯伊伯帶", en: "Kuiper Belt", ru: "Пояс Койпера" },
    lblDiameter: { zh: "直径", zhTW: "直徑", en: "Diameter", ru: "Диаметр" },
    lblDistSun: { zh: "距太阳", zhTW: "距太陽", en: "Distance from the Sun", ru: "Расстояние от Солнца" },
    lblOrbit: { zh: "公转周期", zhTW: "公轉週期", en: "Orbital period", ru: "Период обращения" },
    lblRotation: { zh: "自转周期", zhTW: "自轉週期", en: "Rotation period", ru: "Период вращения" },
    lblTemp: { zh: "表面温度", zhTW: "表面溫度", en: "Surface temperature", ru: "Температура поверхности" },
    lblPosition: { zh: "位置", zhTW: "位置", en: "Position", ru: "Положение" },
    lblRange: { zh: "范围", zhTW: "範圍", en: "Range", ru: "Диапазон" },
    lblCount: { zh: "已知数量", zhTW: "已知數量", en: "Number of objects", ru: "Известное количество" },
    lblLargest: { zh: "最大天体", zhTW: "最大天體", en: "Largest object", ru: "Крупнейший объект" },
    lblComposition: { zh: "组成", zhTW: "組成", en: "Composition", ru: "Состав" },
    lblMember: { zh: "著名成员", zhTW: "著名成員", en: "Famous member", ru: "Известный объект" },
    lblType: { zh: "类型", zhTW: "類型", en: "Type", ru: "Тип" },
    lblMassShare: { zh: "质量占比", zhTW: "質量佔比", en: "Mass share", ru: "Доля массы" },
    lblDistEarth: { zh: "距地球", zhTW: "距地球", en: "Distance from Earth", ru: "Расстояние от Земли" }
  };
  const FACT_LABEL_KEYS = {
    "直径": "lblDiameter", "距太阳": "lblDistSun", "公转周期": "lblOrbit", "自转周期": "lblRotation",
    "表面温度": "lblTemp", "位置": "lblPosition", "范围": "lblRange", "已知数量": "lblCount",
    "最大天体": "lblLargest", "组成": "lblComposition", "著名成员": "lblMember", "类型": "lblType",
    "质量占比": "lblMassShare", "距地球": "lblDistEarth"
  };
  const BODY_T = {
    sun: {
      name: { zh: "太阳", en: "Sun", ru: "Солнце" },
      type: { zh: "恒星", en: "Star", ru: "Звезда" },
      desc: { zh: "太阳系的中心，一颗正值壮年的黄矮星，内部每秒将约 6 亿吨氢转化为氦，为整个太阳系提供光和热。", en: "The center of the solar system — a middle-aged yellow dwarf. Every second it fuses about 600 million tons of hydrogen into helium, providing light and heat for the entire solar system.", ru: "Центр Солнечной системы — жёлтый карлик среднего возраста. Каждую секунду он превращает около 600 миллионов тонн водорода в гелий, давая свет и тепло всей Солнечной системе." }
    },
    mercury: {
      name: { zh: "水星", en: "Mercury", ru: "Меркурий" },
      type: { zh: "类地行星", en: "Terrestrial planet", ru: "Планета земной группы" },
      desc: { zh: "离太阳最近、也是最小的行星。几乎没有大气层保护，昼夜温差超过 600℃，表面布满陨石坑，像一颗巨大的铁核。", en: "The closest and smallest planet to the Sun. With almost no atmosphere, its day-night temperature difference exceeds 600 °C. Its cratered surface hides a huge iron core.", ru: "Ближайшая к Солнцу и самая маленькая планета. Почти без атмосферы, перепад температур между днём и ночью превышает 600 °C. Поверхность покрыта кратерами и скрывает огромное железное ядро." }
    },
    venus: {
      name: { zh: "金星", en: "Venus", ru: "Венера" },
      type: { zh: "类地行星", en: "Terrestrial planet", ru: "Планета земной группы" },
      desc: { zh: "太阳系最热的行星。浓密的二氧化碳大气和硫酸云层造成失控温室效应，表面温度足以熔化铅，且自转方向与公转相反。", en: "The hottest planet in the solar system. A dense carbon-dioxide atmosphere and sulfuric-acid clouds create a runaway greenhouse effect; its surface is hot enough to melt lead, and it rotates opposite to its orbit.", ru: "Самая горячая планета Солнечной системы. Плотная углекислотная атмосфера и сернокислые облака вызывают неконтролируемый парниковый эффект; температура поверхности достаточна для плавления свинца, а вращение обратное орбитальному." }
    },
    earth: {
      name: { zh: "地球", en: "Earth", ru: "Земля" },
      type: { zh: "类地行星", en: "Terrestrial planet", ru: "Планета земной группы" },
      desc: { zh: "目前已知唯一存在生命的星球。71% 的表面被液态海洋覆盖，大气中 21% 是氧气，拥有唯一的天然卫星——月球。", en: "The only known planet with life. 71% of its surface is covered by liquid oceans, its atmosphere is 21% oxygen, and it has one natural satellite — the Moon.", ru: "Единственная известная планета с жизнью. 71% поверхности покрыто океанами, в атмосфере 21% кислорода, есть единственный естественный спутник — Луна." }
    },
    mars: {
      name: { zh: "火星", en: "Mars", ru: "Марс" },
      type: { zh: "类地行星", en: "Terrestrial planet", ru: "Планета земной группы" },
      desc: { zh: "被称为红色星球，表面氧化铁让它呈现锈红色。拥有太阳系最高的火山——奥林帕斯山（高约 21 km），是人类未来移民的热门候选。", en: "Known as the Red Planet, its rust-colored surface comes from iron oxide. It has the tallest volcano in the solar system — Olympus Mons (about 21 km high) — and is a popular candidate for future human colonization.", ru: "Известна как Красная планета из-за оксидов железа на поверхности. Здесь находится самый высокий вулкан Солнечной системы — Олимп (около 21 км), популярный кандидат для будущей колонизации." }
    },
    asteroidBelt: {
      name: { zh: "小行星带", en: "Asteroid Belt", ru: "Пояс астероидов" },
      type: { zh: "小行星带", en: "Asteroid belt", ru: "Пояс астероидов" },
      desc: { zh: "太阳系形成早期未能聚集成行星的物质残留，由岩石和金属组成。最大的谷神星直径约 940 公里，已被归类为矮行星。", en: "Remains of material that failed to form a planet in the early solar system, composed of rock and metal. The largest object, Ceres (about 940 km across), is classified as a dwarf planet.", ru: "Остатки вещества, не собравшегося в планету на заре Солнечной системы; состоят из камня и металла. Крупнейший объект — Церера (около 940 км) — классифицируется как карликовая планета." }
    },
    jupiter: {
      name: { zh: "木星", en: "Jupiter", ru: "Юпитер" },
      type: { zh: "气态巨行星", en: "Gas giant", ru: "Газовый гигант" },
      desc: { zh: "太阳系最大的行星，体积可容纳 1300 多个地球。标志性的大红斑是一场已持续数百年的超级风暴，直径超过地球。", en: "The largest planet in the solar system, big enough to hold more than 1,300 Earths. Its iconic Great Red Spot is a superstorm that has raged for centuries and is wider than Earth.", ru: "Крупнейшая планета Солнечной системы: внутри неё поместилось бы более 1300 Земель. Знаменитое Большое красное пятно — супершторм, бушующий веками и по диаметру превышающий Землю." }
    },
    saturn: {
      name: { zh: "土星", en: "Saturn", ru: "Сатурн" },
      type: { zh: "气态巨行星", en: "Gas giant", ru: "Газовый гигант" },
      desc: { zh: "以壮观的光环闻名，光环由无数冰块和岩石碎屑组成，宽达数十万公里却只有几十米厚。土星平均密度比水还低。", en: "Famous for its spectacular rings, made of countless chunks of ice and rock — hundreds of thousands of kilometers wide yet only a few tens of meters thick. Saturn's average density is lower than water's.", ru: "Знаменит великолепными кольцами из бесчисленных льдин и каменных обломков — сотни тысяч километров в ширину и всего десятки метров в толщину. Средняя плотность Сатурна меньше плотности воды." }
    },
    uranus: {
      name: { zh: "天王星", en: "Uranus", ru: "Уран" },
      type: { zh: "冰巨行星", en: "Ice giant", ru: "Ледяной гигант" },
      desc: { zh: "一颗与众不同的冰巨行星，自转轴几乎“平躺”在轨道面上，像是侧着身子绕太阳滚动。大气中的甲烷让它呈现淡蓝绿色。", en: "An unusual ice giant whose axis is almost \"lying down\" on its orbital plane, rolling around the Sun on its side. Methane in its atmosphere gives it a pale blue-green color.", ru: "Необычный ледяной гигант: ось вращения почти «лежит» в плоскости орбиты, и планета катится вокруг Солнца на боку. Метан в атмосфере придаёт ей бледно-голубовато-зелёный цвет." }
    },
    neptune: {
      name: { zh: "海王星", en: "Neptune", ru: "Нептун" },
      type: { zh: "冰巨行星", en: "Ice giant", ru: "Ледяной гигант" },
      desc: { zh: "距离太阳最远的行星，深蓝色的外观来自大气中的甲烷。拥有太阳系最狂暴的风，速度可达每小时 2,100 公里。", en: "The farthest planet from the Sun; its deep blue color comes from methane in its atmosphere. It has the most violent winds in the solar system, reaching 2,100 km/h.", ru: "Самая далёкая планета от Солнца; глубокий синий цвет обусловлен метаном в атмосфере. Здесь самые сильные ветры Солнечной системы — до 2100 км/ч." }
    },
    kuiperBelt: {
      name: { zh: "柯伊伯带", en: "Kuiper Belt", ru: "Пояс Койпера" },
      type: { zh: "冰质天体带", en: "Icy bodies belt", ru: "Пояс ледяных тел" },
      desc: { zh: "海王星轨道之外环绕太阳的冰质天体带，是短周期彗星的故乡。曾经的第九大行星冥王星就位于这片区域。", en: "A ring of icy bodies beyond Neptune's orbit, home to short-period comets. Pluto, once the ninth planet, lies in this region.", ru: "Кольцо ледяных тел за орбитой Нептуна, родина короткопериодических комет. В этой области находится Плутон, некогда девятая планета." }
    }
  };
  const MOON_T = {
    name: { zh: "月球", en: "Moon", ru: "Луна" },
    type: { zh: "天然卫星", en: "Natural satellite", ru: "Естественный спутник" },
    desc: { zh: "地球唯一的天然卫星，也是人类唯一亲身踏足过的地外天体。月球被地球潮汐锁定，永远以同一面朝向地球，正面与背面的地貌差异巨大。", en: "Earth's only natural satellite and the only extraterrestrial body humans have set foot on. Tidally locked to Earth, it always shows the same face; its near and far sides differ greatly.", ru: "Единственный естественный спутник Земли и единственное внеземное тело, на которое ступал человек. Из-за приливного захвата всегда обращена к Земле одной стороной; видимая и обратная стороны сильно различаются." }
  };
  const EVENT_T = {
    apollo11: {
      name: { zh: "阿波罗11号 · 人类首次登月", en: "Apollo 11 · First Human Moon Landing", ru: "«Аполлон-11» · первая высадка человека на Луну" },
      short: { zh: "阿波罗11号登月", en: "Apollo 11 Moon landing", ru: "Высадка «Аполлона-11»" },
      year: { zh: "1969年7月20日", en: "July 20, 1969", ru: "20 июля 1969 г." },
      type: { zh: "载人登月", en: "Manned landing", ru: "Пилотируемая посадка" },
      desc: { zh: "阿姆斯特朗与奥尔德林乘坐“鹰”号登月舱降落在静海基地，成为最先踏上月球的人类。两人在月面活动约 2.5 小时，带回 21.5 公斤月岩样本，阿姆斯特朗说出了那句名言：“这是个人的一小步，却是人类的一大步。”", en: "Armstrong and Aldrin landed the Eagle lunar module at the Sea of Tranquility, becoming the first humans on the Moon. They spent about 2.5 hours on the surface and brought back 21.5 kg of lunar samples. Armstrong's famous words: \"That's one small step for man, one giant leap for mankind.\"", ru: "Армстронг и Олдрин посадили лунный модуль «Орёл» в Море Спокойствия, став первыми людьми на Луне. Они провели на поверхности около 2,5 часов и привезли 21,5 кг лунных образцов. Знаменитая фраза Армстронга: «Маленький шаг для человека, но гигантский скачок для человечества»." }
    },
    change4: {
      name: { zh: "嫦娥四号 · 月背软着陆", en: "Chang'e 4 · Far-side Landing", ru: "«Чанъэ-4» · посадка на обратной стороне" },
      short: { zh: "嫦娥四号月背着陆", en: "Chang'e 4 far-side landing", ru: "Посадка «Чанъэ-4»" },
      year: { zh: "2019年1月3日", en: "January 3, 2019", ru: "3 января 2019 г." },
      type: { zh: "无人探测器", en: "Robotic probe", ru: "Автоматический зонд" },
      desc: { zh: "嫦娥四号在月球背面冯·卡门撞击坑成功软着陆，是人类历史上首个在月球背面着陆的探测器。玉兔二号月球车随后展开巡视，持续传回珍贵科学数据。", en: "Chang'e 4 made a soft landing in the Von Kármán crater on the far side of the Moon, becoming the first spacecraft ever to land there. Its rover Yutu-2 then explored the area, returning valuable scientific data.", ru: "«Чанъэ-4» совершила мягкую посадку в кратере Фон Кармана на обратной стороне Луны — первой в истории. Луноход «Юйту-2» исследовал окрестности и передал ценные научные данные." }
    },
    voyager1: {
      name: { zh: "旅行者1号", en: "Voyager 1", ru: "«Вояджер-1»" },
      short: { zh: "旅行者1号", en: "Voyager 1", ru: "«Вояджер-1»" },
      year: { zh: "1977年发射 · 2012年进入星际空间", en: "Launched 1977 · Entered interstellar space 2012", ru: "Запуск 1977 · В межзвёздное пространство 2012" },
      type: { zh: "深空探测器", en: "Deep-space probe", ru: "Межпланетный зонд" },
      desc: { zh: "1977年9月发射，先后飞掠木星和土星，2012年成为首个进入星际空间的人造物体。它目前仍是距离地球最远的人造探测器，携带的镀金唱片向宇宙传递着人类文明的问候。", en: "Launched in September 1977, Voyager 1 flew past Jupiter and Saturn, and in 2012 became the first human-made object to enter interstellar space. It remains the most distant human-made object and carries a golden record with greetings from humanity.", ru: "Запущен в сентябре 1977 года, пролетел мимо Юпитера и Сатурна, а в 2012 году первым из созданных человеком объектов вышел в межзвёздное пространство. Остаётся самым далёким рукотворным объектом; несёт золотую пластинку с посланием человечества." }
    },
    voyager2: {
      name: { zh: "旅行者2号", en: "Voyager 2", ru: "«Вояджер-2»" },
      short: { zh: "旅行者2号", en: "Voyager 2", ru: "«Вояджер-2»" },
      year: { zh: "1977年发射 · 2018年进入星际空间", en: "Launched 1977 · Entered interstellar space 2018", ru: "Запуск 1977 · В межзвёздное пространство 2018" },
      type: { zh: "深空探测器", en: "Deep-space probe", ru: "Межпланетный зонд" },
      desc: { zh: "1977年8月发射，是唯一飞掠过木星、土星、天王星、海王星四颗巨行星的探测器。2018年进入星际空间，至今仍在向地球传回科学数据。", en: "Launched in August 1977, Voyager 2 is the only spacecraft to have flown past all four giant planets: Jupiter, Saturn, Uranus, and Neptune. It entered interstellar space in 2018 and still returns scientific data.", ru: "Запущен в августе 1977 года — единственный аппарат, пролетевший мимо всех четырёх планет-гигантов: Юпитера, Сатурна, Урана и Нептуна. В 2018 году вышел в межзвёздное пространство и до сих пор передаёт данные." }
    },
    newhorizons: {
      name: { zh: "新视野号 · 飞越冥王星", en: "New Horizons · Pluto Flyby", ru: "«Новые горизонты» · пролёт Плутона" },
      short: { zh: "新视野号飞越冥王星", en: "New Horizons Pluto flyby", ru: "Пролёт Плутона" },
      year: { zh: "2006年发射 · 2015年飞越冥王星", en: "Launched 2006 · Pluto flyby 2015", ru: "Запуск 2006 · Пролёт Плутона 2015" },
      type: { zh: "深空探测器", en: "Deep-space probe", ru: "Межпланетный зонд" },
      desc: { zh: "2006年发射，2015年7月飞越冥王星并传回首张高清特写，让人类第一次看清这颗矮行星的“心形”冰原。2019年又飞掠了柯伊伯带小天体“天涯海角”（Arrokoth）。", en: "Launched in 2006, New Horizons flew past Pluto in July 2015, sending back the first close-up images and revealing the dwarf planet's \"heart-shaped\" ice plain. In 2019 it flew past the Kuiper Belt object Arrokoth.", ru: "Запущена в 2006 году; в июле 2015-го пролетела мимо Плутона, впервые показав его крупным планом и открыв «сердце» из льда. В 2019 году пролетела мимо объекта пояса Койпера Аррокот." }
    }
  };
  let currentLang = "zh";
  try {
    const savedLang = localStorage.getItem("solarLang");
    if (savedLang && LANGS.indexOf(savedLang) >= 0) {
      currentLang = savedLang;
    } else {
      const navLang = (navigator.language || "zh").toLowerCase();
      if (navLang.indexOf("zh") === 0) currentLang = (navLang.indexOf("tw") >= 0 || navLang.indexOf("hk") >= 0) ? "zhTW" : "zh";
      else if (navLang.indexOf("ru") === 0) currentLang = "ru";
      else currentLang = "en";
    }
  } catch (e) {}
  function L(obj) {
    if (!obj) return "";
    if (obj[currentLang]) return obj[currentLang];
    if (currentLang === "zhTW" && obj.zh) return zhTW(obj.zh);
    return obj.zh || "";
  }
  function t(key) {
    const o = UI_T[key];
    return (o && L(o)) || key;
  }
  function formatBigKm(km, en) {
    if (km >= 1e9) {
      const v = (km / 1e9).toFixed(3).replace(/\.?0+$/, "");
      return en ? v + " billion km" : v.replace(".", ",") + " млрд км";
    }
    if (km >= 1e6) {
      const v = (km / 1e6).toFixed(3).replace(/\.?0+$/, "");
      return en ? v + " million km" : v.replace(".", ",") + " млн км";
    }
    return en ? km.toLocaleString("en-US") + " km" : km.toLocaleString("ru-RU") + " км";
  }
  function localizeValue(v) {
    if (currentLang === "zh") return v;
    if (currentLang === "zhTW") return zhTW(v);
    const en = currentLang === "en";
    const special = {
      "火星与木星之间": en ? "Between Mars and Jupiter" : "Между Марсом и Юпитером",
      "海王星轨道之外": en ? "Beyond Neptune's orbit" : "За орбитой Нептуна",
      "数百万颗": en ? "Millions" : "Миллионы",
      "约 2.2 ~ 3.2 AU": en ? "~2.2 – 3.2 AU" : "~2,2 – 3,2 а.е.",
      "约 30 ~ 55 AU": en ? "~30 – 55 AU" : "~30 – 55 а.е.",
      "冰、甲烷、氨": en ? "Ice, methane, ammonia" : "Лёд, метан, аммиак",
      "冥王星": en ? "Pluto" : "Плутон",
      "G2V 黄矮星": en ? "G2V yellow dwarf" : "G2V жёлтый карлик"
    };
    if (special[v]) return special[v];
    let m = v.match(/^谷神星（([\d,.]+)\s*km）$/);
    if (m) return en ? "Ceres (" + m[1] + " km)" : "Церера (" + m[1].replace(/,/g, " ") + " км)";
    m = v.match(/^约?\s*([\d,.]+)\s*(万|亿)\s*km$/);
    if (m) return formatBigKm(parseFloat(m[1].replace(/,/g, "")) * (m[2] === "万" ? 10000 : 100000000), en);
    m = v.match(/^([\d.]+)\s*天（潮汐锁定）$/);
    if (m) return en ? m[1] + " days (tidally locked)" : m[1].replace(".", ",") + " дней (приливная блокировка)";
    m = v.match(/^([\d.]+)\s*天（逆向）$/);
    if (m) return en ? m[1] + " days (retrograde)" : m[1].replace(".", ",") + " дней (ретроградное)";
    m = v.match(/^([\d.]+)\s*天$/);
    if (m) return en ? m[1] + " days" : m[1].replace(".", ",") + " дней";
    m = v.match(/^([\d.]+)\s*小时$/);
    if (m) return en ? m[1] + " hours" : m[1].replace(".", ",") + " часов";
    m = v.match(/^([\d.]+)\s*年$/);
    if (m) return en ? m[1] + " years" : m[1].replace(".", ",") + " лет";
    m = v.match(/^约\s*([-\d.\s~,]+)\s*℃$/);
    if (m) {
      const body = m[1].trim().replace(/\s*~\s*/, en ? " ~ " : " – ").replace(/,/g, en ? "," : " ");
      return "~" + body + " °C";
    }
    if (m) return en ? m[1].trim().replace(/\s*~\s*/, " ~ ") + " °C" : m[1].trim().replace(/\s*~\s*/, " – ").replace(/,/g, " ") + " °C";
    m = v.match(/^([\d,]+)\s*km$/);
    if (m) return en ? m[1] + " km" : m[1].replace(/,/g, " ") + " км";
    m = v.match(/^([\d.]+)%$/);
    if (m) return en ? v : v.replace(".", ",");
    return v;
  }
  function bodyFacts(key) {
    const data = key === "moon" ? MOON_INFO : BODIES[key];
    if (!data || !data.facts) return [];
    return data.facts.map(function (f) {
      const lk = FACT_LABEL_KEYS[f[0]];
      return [lk ? t(lk) : f[0], localizeValue(f[1])];
    });
  }
  function localBody(key) {
    if (key === "moon") {
      return { name: L(MOON_T.name), type: L(MOON_T.type), en: MOON_INFO.en || "Moon", desc: L(MOON_T.desc), facts: bodyFacts("moon") };
    }
    const d = BODIES[key];
    if (!d) return null;
    const tr = BODY_T[key] || {};
    return { name: L(tr.name) || d.name, type: L(tr.type) || d.type, en: d.en || "", desc: L(tr.desc) || d.desc, facts: bodyFacts(key) };
  }
  function localEvent(ev) {
    const tr = EVENT_T[ev.key] || {};
    return {
      name: L(tr.name) || ev.name,
      short: L(tr.short) || ev.short,
      year: L(tr.year) || ev.year,
      type: L(tr.type) || ev.type,
      desc: L(tr.desc) || ev.desc
    };
  }
  function bodyName(key) {
    const d = localBody(key);
    return d ? d.name : key;
  }
  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.title = t(el.getAttribute("data-i18n-title"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
    document.title = t("title");
    const cc = document.getElementById("ccLink");
    if (cc) {
      cc.href = currentLang === "en"
        ? "https://creativecommons.org/licenses/by/4.0/"
        : currentLang === "ru"
          ? "https://creativecommons.org/licenses/by/4.0/deed.ru"
          : currentLang === "zhTW"
            ? "https://creativecommons.org/licenses/by/4.0/deed.zh-hant"
            : "https://creativecommons.org/licenses/by/4.0/deed.zh";
    }
  }
  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) lang = "zh";
    currentLang = lang;
    try { localStorage.setItem("solarLang", lang); } catch (e) {}
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang === "zhTW" ? "zh-Hant" : lang;
    applyStaticI18n();
    buildNav();
    refreshLabels();
    updateFollowBadge();
    if (selectedKey) showInfo(selectedKey);
    if (activeEventKey) showEventCard(EVENT_BY_KEY[activeEventKey]);
    const ls = document.getElementById("langSelect");
    if (ls) ls.value = lang;
  }

  /* =========================================================
   *  基础场景
   * ========================================================= */
  const container = document.getElementById("app");
  function isMobile() { return window.innerWidth < 768; }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 6000);
  camera.position.set(350, 260, 800);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = false;
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  const defaultMinDistance = 1.5;
  controls.minDistance = defaultMinDistance;
  controls.maxDistance = 2200;
  controls.rotateSpeed = 0.7;
  controls.zoomSpeed = 1.1;

  // 背景星空
  function createStars() {
    const starCount = isMobile() ? 3000 : 6000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 2600 + Math.random() * 2000;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const brightness = 0.5 + Math.random() * 0.5;
      const tint = Math.random();
      colors[i * 3] = brightness * (tint < 0.2 ? 0.9 : 1);
      colors[i * 3 + 1] = brightness * (tint > 0.85 ? 0.85 : 1);
      colors[i * 3 + 2] = brightness;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 1.6, vertexColors: true, sizeAttenuation: false,
      transparent: true, opacity: 0.9
    });
    return new THREE.Points(geo, mat);
  }
  scene.add(createStars());

  // 光照
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const sunLight = new THREE.PointLight(0xfff2cc, 8.0, 6000, 0.5);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  /* =========================================================
   *  太阳
   * ========================================================= */
  // 动态火焰表面（着色器，随时间流动）
  const sunMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: [
      "varying vec3 vPos;",
      "void main() {",
      "  vPos = position;",
      "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
      "}"
    ].join("\n"),
    fragmentShader: [
      "uniform float uTime;",
      "varying vec3 vPos;",
      "",
      "float hash(vec3 p) {",
      "  p = fract(p * 0.3183099 + 0.1);",
      "  p *= 17.0;",
      "  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));",
      "}",
      "float noise(vec3 x) {",
      "  vec3 i = floor(x);",
      "  vec3 f = fract(x);",
      "  f = f * f * (3.0 - 2.0 * f);",
      "  float a = hash(i);",
      "  float b = hash(i + vec3(1.0, 0.0, 0.0));",
      "  float c = hash(i + vec3(0.0, 1.0, 0.0));",
      "  float d = hash(i + vec3(1.0, 1.0, 0.0));",
      "  float e = hash(i + vec3(0.0, 0.0, 1.0));",
      "  float f2 = hash(i + vec3(1.0, 0.0, 1.0));",
      "  float g = hash(i + vec3(0.0, 1.0, 1.0));",
      "  float h = hash(i + vec3(1.0, 1.0, 1.0));",
      "  return mix(",
      "    mix(mix(a, b, f.x), mix(c, d, f.x), f.y),",
      "    mix(mix(e, f2, f.x), mix(g, h, f.x), f.y),",
      "    f.z);",
      "}",
      "float fbm(vec3 p) {",
      "  float v = 0.0;",
      "  float amp = 0.5;",
      "  for (int i = 0; i < 6; i++) {",
      "    v += amp * noise(p);",
      "    p *= 2.03;",
      "    amp *= 0.5;",
      "  }",
      "  return v;",
      "}",
      "void main() {",
      "  vec3 p = normalize(vPos);",
      "  vec3 q = p * 2.5;",
      "  float n1 = fbm(q * 1.4 + vec3(uTime * 0.35, uTime * 0.2, uTime * 0.5));",
      "  float n2 = fbm(q * 3.2 - vec3(uTime * 0.6, 0.0, uTime * 0.3));",
      "  float cells = smoothstep(0.35, 0.85, fbm(q * 9.0 + vec3(uTime * 0.8, 0.0, 0.0)));",
      "  float heat = clamp(n1 * 0.55 + n2 * 0.22 + cells * 0.3, 0.0, 1.0);",
      "  vec3 c1 = vec3(1.0, 0.62, 0.16);",
      "  vec3 c2 = vec3(1.0, 0.86, 0.38);",
      "  vec3 c3 = vec3(1.0, 1.0, 0.9);",
      "  vec3 col = mix(c1, c2, smoothstep(0.12, 0.55, heat));",
      "  col = mix(col, c3, smoothstep(0.55, 0.92, heat));",
      "  float limb = 0.72 + 0.28 * abs(p.z);",
      "  col = min(col * 1.12 * limb, vec3(1.0));",
      "  gl_FragColor = vec4(col, 1.0);",
      "}"
    ].join("\n")
  });

  const sunGroup = new THREE.Group();
  sunGroup.name = "sun";
  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(BODIES.sun.radius, 48, 48),
    sunMaterial
  );
  sunMesh.userData.key = "sun";
  sunGroup.add(sunMesh);

  // 光晕（两层：内层亮、外层日冕）
  function makeGlowSprite(stops, size, opacity) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    stops.forEach(function (s) { grad.addColorStop(s[0], s[1]); });
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex, transparent: true, opacity: opacity,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    sprite.scale.set(size, size, 1);
    return sprite;
  }
  const glow = makeGlowSprite(
    [
      [0, "rgba(255,244,210,0.95)"],
      [0.16, "rgba(255,205,110,0.55)"],
      [0.42, "rgba(255,160,60,0.2)"],
      [1, "rgba(255,110,30,0)"]
    ],
    14, 1
  );
  const corona = makeGlowSprite(
    [
      [0, "rgba(255,210,130,0.5)"],
      [0.3, "rgba(255,170,70,0.22)"],
      [0.65, "rgba(255,140,45,0.08)"],
      [1, "rgba(255,120,30,0)"]
    ],
    36, 0.85
  );
  sunGroup.add(glow);
  sunGroup.add(corona);
  scene.add(sunGroup);

  const pickables = [sunMesh];

  /* =========================================================
   *  行星与小行星带
   * ========================================================= */
  const orbitGroups = {};   // key -> group（绕日公转）
  const orbitLines = {};
  const labelSprites = {};
  const beltGroups = {};
  const pickableByKey = {};
  let moonMesh = null;

  function drawLabelSprite(sprite, text, color) {
    const canvas = sprite.userData.canvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 56px Microsoft YaHei, PingFang SC, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 14;
    ctx.fillStyle = color || "#dbe4ff";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    if (sprite.material && sprite.material.map) sprite.material.map.needsUpdate = true;
  }
  function makeLabel(text, color) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex, transparent: true, depthWrite: false
    }));
    sprite.userData.canvas = canvas;
    sprite.userData.labelText = text;
    sprite.userData.labelColor = color || "#dbe4ff";
    drawLabelSprite(sprite, text, color);
    return sprite;
  }
  // 语言切换后重绘 3D 标签
  function refreshLabels() {
    Object.keys(labelSprites).forEach(function (key) {
      const s = labelSprites[key];
      if (!s || !s.userData || !s.userData.canvas) return;
      const text = bodyName(key);
      if (text !== s.userData.labelText) {
        drawLabelSprite(s, text, s.userData.labelColor);
        s.userData.labelText = text;
      }
    });
  }

  /* =========================================================
   *  程序化行星表面纹理（噪点生成，无需外部图片）
   * ========================================================= */
  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6D2B79F5) | 0;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function makeNoise2D(rng) {
    // 与最初版本完全相同的随机序列（保证星球外观不变），
    // 仅把慢的字符串查找换成数字索引，提速约 6 倍
    const grid = {};
    function gx(x, y) {
      const k = x * 65536 + y;
      let v = grid[k];
      if (v === undefined) {
        v = rng();
        grid[k] = v;
      }
      return v;
    }
    function noise(x, y) {
      const xi = Math.floor(x), yi = Math.floor(y);
      const xf = x - xi, yf = y - yi;
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      const a = gx(xi, yi), b = gx(xi + 1, yi);
      const c = gx(xi, yi + 1), d = gx(xi + 1, yi + 1);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    }
    function fbm(x, y, oct) {
      let v = 0, amp = 0.5, freq = 1;
      for (let i = 0; i < oct; i++) {
        v += amp * noise(x * freq, y * freq);
        freq *= 2.03;
        amp *= 0.5;
      }
      return v;
    }
    return { noise, fbm };
  }

  function makePlanetTexture(w, h, painter, seed) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    const rng = mulberry32(seed);
    const nz = makeNoise2D(rng);
    painter(ctx, w, h, nz, rng);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.anisotropy = 8;
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  const planetTextures = {};
  const materialByKey = {};
  const TEX_W = isMobile() ? 512 : 1024;
  const TEX_H = Math.floor(TEX_W / 2);

  // 程序化生成的地球（备用方案：真实影像加载失败时使用）
  function paintEarthNoise(ctx, w, h, nz) {
    const img = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++) {
      const lat = Math.abs(y / h - 0.5) * 2;
      for (let x = 0; x < w; x++) {
        const cont = nz.fbm(x / 130 + 3.1, y / 130 + 7.7, 6);
        const detail = nz.fbm(x / 45, y / 45, 4);
        let r, g, b;
        const ice = lat > 0.82 ? 1 : (lat > 0.72 ? (cont > 0.6 ? 1 : 0) : 0);
        if (ice) {
          const s = 210 + nz.noise(x / 20, y / 20) * 40;
          r = g = b = s;
        } else if (cont > 0.55) {
          const m = detail;
          if (m > 0.58) {
            r = 130 + m * 60; g = 150 + m * 60; b = 70 + m * 30;
          } else {
            r = 80 + m * 70; g = 120 + m * 70; b = 60 + m * 40;
          }
        } else {
          const depth = 30 + nz.fbm(x / 140, y / 140, 4) * 50;
          r = 20 + depth * 0.25;
          g = 60 + depth * 0.55;
          b = 130 + depth * 0.7;
        }
        const cloud = nz.fbm(x / 50 + 9, y / 35, 5);
        if (cloud > 0.62) {
          const cw = (cloud - 0.62) * 2.2;
          r = r + (255 - r) * cw * 0.85;
          g = g + (255 - g) * cw * 0.85;
          b = b + (255 - b) * cw * 0.85;
        }
        const i = (y * w + x) * 4;
        img.data[i] = r;
        img.data[i + 1] = g;
        img.data[i + 2] = b;
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  // 用噪声生成自然的不规则螺旋云带（风眼 + 眼墙 + 断断续续的螺旋云臂）
  function makeStormAlpha(nz, st, W, H) {
    const cx = ((st.lon + 180) / 360) * W;
    const cy = ((90 - st.lat) / 180) * H;
    function ss(a, b, v) {
      const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
      return t * t * (3 - 2 * t);
    }
    return function (x, y) {
      const dx = (x - cx) / (W / 360);
      const dy = (y - cy) / (H / 180);
      const r = Math.sqrt(dx * dx + dy * dy) / st.rDeg;
      if (r > 1.35) return 0;
      const angle = Math.atan2(dy, dx);
      const shear = r * 2.6;
      const a2 = angle + shear;
      const n1 = nz.fbm(Math.cos(a2) * r * 4.5 + st.sx, Math.sin(a2) * r * 4.5 + st.sy, 4);
      const n2 = nz.fbm(Math.cos(a2) * r * 10 + st.sx * 2, Math.sin(a2) * r * 10 + st.sy * 2, 3);
      const band = n1 * 0.65 + n2 * 0.35;
      // 眼墙：半径随角度起伏、亮度由噪声调制，不再是完美圆环
      const wallN = nz.fbm(Math.cos(angle) * 2 + st.sx * 5, Math.sin(angle) * 2 + st.sy * 5, 3);
      const rw = 0.24 + (wallN - 0.5) * 0.14;
      const sEye = ss(0.13, 0.2, r);
      const wall = 0.55 * Math.exp(-Math.pow((r - rw) / 0.12, 2)) * sEye * (0.45 + 0.8 * wallN);
      // 螺旋云带：从眼墙附近就开始，与眼墙叠加融合，外缘平滑淡出
      const bi = ss(0.22, 0.5, r);
      const bo = ss(1.35, 0.9, r);
      const bs = ss(0.34, 0.68, band);
      const bandA = bs * bi * bo;
      return Math.min(1, wall + bandA * (0.35 + 0.65 * wallN));
    };
  }

  // 动态云层纹理：稀疏云团 + 3 个飓风（大西洋/西北太平洋/印度洋）
  function createEarthCloudTexture() {
    const W = 1024, H = 512;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const nz = makeNoise2D(mulberry32(4242));
    const storms = [
      { lat: 18, lon: -62, rDeg: 17, sx: 3.7, sy: 11.2 },
      { lat: 22, lon: 138, rDeg: 15, sx: 21.4, sy: 5.8 },
      { lat: -12, lon: 88, rDeg: 13, sx: 8.1, sy: 17.3 }
    ];
    const stormAlphas = storms.map(function (st) {
      return makeStormAlpha(nz, st, W, H);
    });
    const img = ctx.createImageData(W, H);
    for (let y = 0; y < H; y++) {
      const latFrac = Math.abs(y / H - 0.5) * 2;
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const c1 = nz.fbm(x / 160, y / 160, 5);
        const c2 = nz.fbm(x / 45 + 13, y / 45 + 7, 4);
        let cloud = c1 * 0.6 + c2 * 0.4 + latFrac * latFrac * 0.12;
        let a = 0;
        if (cloud > 0.58) a = Math.min(1, (cloud - 0.58) * 2.6);
        for (let s = 0; s < stormAlphas.length; s++) {
          const sa = stormAlphas[s](x, y);
          if (sa > a) a = sa;
        }
        img.data[i] = 255;
        img.data[i + 1] = 255;
        img.data[i + 2] = 255;
        img.data[i + 3] = Math.floor(a * 235);
      }
    }
    ctx.putImageData(img, 0, 0);
    // 整体柔化，让云和风暴更自然
    const tmp = document.createElement("canvas");
    tmp.width = W;
    tmp.height = H;
    const tctx = tmp.getContext("2d");
    tctx.filter = "blur(3px)";
    tctx.drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(tmp, 0, 0);
    const tex = new THREE.CanvasTexture(canvas);
    tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = 8;
    tex.wrapS = THREE.RepeatWrapping;
    return tex;
  }

  // 地球：优先加载真实卫星影像（NASA Blue Marble 风格）
  function loadEarthTexture() {
    const loader = new THREE.TextureLoader();
    loader.load("assets/earth_atmos_2048.jpg", function (tex) {
      tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = 8;
      tex.wrapS = THREE.RepeatWrapping;
      planetTextures.earth = tex;
      const mat = materialByKey.earth;
      if (mat) {
        mat.map = tex;
        mat.color.set(0xffffff);
        mat.needsUpdate = true;
      }
    }, undefined, function () {
      // 图片加载失败：退回程序化生成
      planetTextures.earth = makePlanetTexture(TEX_W, TEX_H, paintEarthNoise, 3303);
      const mat = materialByKey.earth;
      if (mat) {
        mat.map = planetTextures.earth;
        mat.color.set(0xffffff);
        mat.needsUpdate = true;
      }
    });
    // 夜间城市灯光：使用离线稀疏化的灯光图（仅保留最亮的城市核心，
    // 星星点点、人口密集区更亮），暗面显示暖黄色光点
    loader.load("assets/earth_lights_sparse.png", function (tex) {
      tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = 8;
      tex.wrapS = THREE.RepeatWrapping;
      const mat = materialByKey.earth;
      if (mat) {
        mat.emissive = new THREE.Color(0xffc86a);
        mat.emissiveMap = tex;
        mat.emissiveIntensity = 1.3;
        // 默认自发光会不分昼夜叠加到整个球面，导致白天亮面也透出灯光。
        // 这里在着色器里用“直射光照强度”作为闸门：亮面抑制灯光，暗面完全显示，
        // 明暗交界处用 smoothstep 自然过渡，保留黄昏时分的城市灯光效果。
        mat.onBeforeCompile = function (shader) {
          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <aomap_fragment>",
            "#include <aomap_fragment>\n" +
            "\tfloat cityDayLum = dot(reflectedLight.directDiffuse, vec3(0.299, 0.587, 0.114));\n" +
            "\tfloat cityDarkFactor = 1.0 - smoothstep(0.02, 0.15, cityDayLum);\n" +
            "\ttotalEmissiveRadiance *= cityDarkFactor;"
          );
        };
        mat.needsUpdate = true;
      }
    });
  }

  // 其余行星、月球与小行星带：加载真实卫星影像（失败时保留程序化纹理作为后备）
  function loadRealTextures() {
    const list = [
      ["mercury", "assets/mercury.jpg"],
      ["venus", "assets/venus.jpg"],
      ["mars", "assets/mars.jpg"],
      ["jupiter", "assets/jupiter.jpg"],
      ["saturn", "assets/saturn.jpg"],
      ["uranus", "assets/uranus.jpg"],
      ["neptune", "assets/neptune.jpg"],
      ["moon", "assets/moon.jpg"]
    ];
    const loader = new THREE.TextureLoader();
    list.forEach(function (item) {
      loader.load(item[1], function (tex) {
        tex.encoding = THREE.sRGBEncoding;
        tex.anisotropy = 8;
        tex.wrapS = THREE.RepeatWrapping;
        planetTextures[item[0]] = tex;
        const mat = materialByKey[item[0]];
        if (mat) {
          mat.map = tex;
          mat.color.set(0xffffff);
          mat.needsUpdate = true;
        }
      });
    });
    // 小行星带：使用真实岩石表面纹理作为通用陨石材质
    loader.load("assets/mercury.jpg", function (tex) {
      tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = 4;
      ["asteroidBelt", "kuiperBelt"].forEach(function (k) {
        const mesh = beltGroups[k];
        if (mesh) {
          mesh.material.map = tex;
          mesh.material.color.set(0xffffff);
          mesh.material.needsUpdate = true;
        }
      });
    });
  }

  // 生成动态云层纹理并贴到云层球上
  function loadEarthClouds() {
    const mat = materialByKey.earthCloud;
    if (!mat) return;
    mat.map = createEarthCloudTexture();
    mat.needsUpdate = true;
  }

  function buildTextures() {
    // 水星：灰色坑洼表面
    planetTextures.mercury = makePlanetTexture(TEX_W, TEX_H, function (ctx, w, h, nz) {
      ctx.fillStyle = "#9b9ba3";
      ctx.fillRect(0, 0, w, h);
      const img = ctx.getImageData(0, 0, w, h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const n = nz.fbm(x / 90, y / 90, 5);
          const shade = 118 + (n - 0.5) * 70;
          const i = (y * w + x) * 4;
          img.data[i] = shade;
          img.data[i + 1] = shade + 2;
          img.data[i + 2] = shade + 6;
        }
      }
      ctx.putImageData(img, 0, 0);
      for (let k = 0; k < 260; k++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const r = 2 + Math.random() * 9;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(70,70,78,0.35)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.72, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(40,40,46,0.4)";
        ctx.fill();
      }
    }, 1101);

    // 金星：奶油色云层漩涡
    planetTextures.venus = makePlanetTexture(TEX_W, TEX_H, function (ctx, w, h, nz) {
      ctx.fillStyle = "#d8b066";
      ctx.fillRect(0, 0, w, h);
      const img = ctx.getImageData(0, 0, w, h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const swirl = nz.fbm(x / 60 + Math.sin(y / 20) * 2.2, y / 110, 5);
          const streak = nz.fbm(x / 30, y / 160, 3);
          const n = swirl * 0.7 + streak * 0.3;
          const r = 208 + (n - 0.5) * 46;
          const g = 168 + (n - 0.5) * 52;
          const b = 96 + (n - 0.5) * 30;
          const i = (y * w + x) * 4;
          img.data[i] = r;
          img.data[i + 1] = g;
          img.data[i + 2] = b;
        }
      }
      ctx.putImageData(img, 0, 0);
    }, 2202);

    // 地球：使用真实卫星影像（异步加载，失败时自动退回程序化生成）
    loadEarthTexture();

    // 火星：红褐色表面 + 暗色区域 + 极冠
    planetTextures.mars = makePlanetTexture(TEX_W, TEX_H, function (ctx, w, h, nz) {
      const img = ctx.createImageData(w, h);
      for (let y = 0; y < h; y++) {
        const lat = Math.abs(y / h - 0.5) * 2;
        for (let x = 0; x < w; x++) {
          const n = nz.fbm(x / 110, y / 110, 6);
          const m = nz.fbm(x / 34, y / 34, 4);
          let r, g, b;
          if (lat > 0.86) {
            const s = 220 + n * 30;
            r = g = b = s;
          } else {
            r = 168 + (n - 0.5) * 60 + m * 25;
            g = 78 + (n - 0.5) * 34 + m * 12;
            b = 52 + (n - 0.5) * 20;
            if (m > 0.62) {
              r *= 0.78; g *= 0.8; b *= 0.82;
            }
          }
          const i = (y * w + x) * 4;
          img.data[i] = r;
          img.data[i + 1] = g;
          img.data[i + 2] = b;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    }, 4404);

    // 木星：彩色气带 + 湍流 + 大红斑
    planetTextures.jupiter = makePlanetTexture(TEX_W, TEX_H, function (ctx, w, h, nz) {
      const palette = ["#c8a878", "#a8875e", "#dcc49a", "#8a6a50", "#e2d2ae", "#b89a70", "#cdb98f"];
      const img = ctx.createImageData(w, h);
      for (let y = 0; y < h; y++) {
        const band = y / h * palette.length;
        const bi = Math.floor(band);
        const bf = band - bi;
        const c1 = palette[bi % palette.length];
        const c2 = palette[(bi + 1) % palette.length];
        for (let x = 0; x < w; x++) {
          const t = nz.fbm(x / 80 + Math.sin(y / 24) * 1.4, y / 22, 5);
          const r = (parseInt(c1.substr(1, 2), 16) + (parseInt(c2.substr(1, 2), 16) - parseInt(c1.substr(1, 2), 16)) * bf) + (t - 0.5) * 55;
          const g = (parseInt(c1.substr(3, 2), 16) + (parseInt(c2.substr(3, 2), 16) - parseInt(c1.substr(3, 2), 16)) * bf) + (t - 0.5) * 45;
          const b = (parseInt(c1.substr(5, 2), 16) + (parseInt(c2.substr(5, 2), 16) - parseInt(c1.substr(5, 2), 16)) * bf) + (t - 0.5) * 35;
          const i = (y * w + x) * 4;
          img.data[i] = r;
          img.data[i + 1] = g;
          img.data[i + 2] = b;
          img.data[i + 3] = 255;
        }
      }
      // 大红斑
      ctx.putImageData(img, 0, 0);
      const spotX = w * 0.28, spotY = h * 0.42;
      const grad = ctx.createRadialGradient(spotX, spotY, 4, spotX, spotY, 40);
      grad.addColorStop(0, "rgba(180,72,42,0.95)");
      grad.addColorStop(0.7, "rgba(150,60,38,0.6)");
      grad.addColorStop(1, "rgba(150,60,38,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(spotX, spotY, 46, 20, 0, 0, Math.PI * 2);
      ctx.fill();
    }, 5505);

    // 土星：淡金色气带
    planetTextures.saturn = makePlanetTexture(TEX_W, TEX_H, function (ctx, w, h, nz) {
      const palette = ["#d8c494", "#c8b078", "#e4d4a8", "#bfa468", "#d9c48c"];
      const img = ctx.createImageData(w, h);
      for (let y = 0; y < h; y++) {
        const band = y / h * palette.length;
        const bi = Math.floor(band);
        const bf = band - bi;
        const c1 = palette[bi % palette.length];
        const c2 = palette[(bi + 1) % palette.length];
        for (let x = 0; x < w; x++) {
          const t = nz.fbm(x / 110, y / 30, 4);
          const r = (parseInt(c1.substr(1, 2), 16) + (parseInt(c2.substr(1, 2), 16) - parseInt(c1.substr(1, 2), 16)) * bf) + (t - 0.5) * 32;
          const g = (parseInt(c1.substr(3, 2), 16) + (parseInt(c2.substr(3, 2), 16) - parseInt(c1.substr(3, 2), 16)) * bf) + (t - 0.5) * 26;
          const b = (parseInt(c1.substr(5, 2), 16) + (parseInt(c2.substr(5, 2), 16) - parseInt(c1.substr(5, 2), 16)) * bf) + (t - 0.5) * 20;
          const i = (y * w + x) * 4;
          img.data[i] = r;
          img.data[i + 1] = g;
          img.data[i + 2] = b;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    }, 6606);

    // 天王星：平滑淡青
    planetTextures.uranus = makePlanetTexture(TEX_W, TEX_H, function (ctx, w, h, nz) {
      const img = ctx.createImageData(w, h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const t = nz.fbm(x / 160, y / 90, 3);
          const i = (y * w + x) * 4;
          img.data[i] = 138 + (t - 0.5) * 18;
          img.data[i + 1] = 208 + (t - 0.5) * 14;
          img.data[i + 2] = 216 + (t - 0.5) * 10;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    }, 7707);

    // 海王星：深蓝气带 + 暗斑
    planetTextures.neptune = makePlanetTexture(TEX_W, TEX_H, function (ctx, w, h, nz) {
      const img = ctx.createImageData(w, h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const t = nz.fbm(x / 120, y / 40, 5);
          const band = Math.sin(y / 30) * 0.08;
          const i = (y * w + x) * 4;
          img.data[i] = 55 + (t - 0.5) * 40 + band * 60;
          img.data[i + 1] = 95 + (t - 0.5) * 55 + band * 50;
          img.data[i + 2] = 220 + (t - 0.5) * 50 + band * 25;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      ctx.fillStyle = "rgba(20,40,110,0.75)";
      ctx.beginPath();
      ctx.ellipse(w * 0.62, h * 0.4, 34, 16, 0, 0, Math.PI * 2);
      ctx.fill();
    }, 8808);

    // 月球：灰色坑洼
    planetTextures.moon = makePlanetTexture(Math.floor(TEX_W / 2), Math.floor(TEX_H / 2), function (ctx, w, h, nz) {
      ctx.fillStyle = "#b8b8bc";
      ctx.fillRect(0, 0, w, h);
      const img = ctx.getImageData(0, 0, w, h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const n = nz.fbm(x / 45, y / 45, 5);
          const s = 158 + (n - 0.5) * 70;
          const i = (y * w + x) * 4;
          img.data[i] = s;
          img.data[i + 1] = s;
          img.data[i + 2] = s + 4;
        }
      }
      ctx.putImageData(img, 0, 0);
      for (let k = 0; k < 90; k++) {
        const cx = Math.random() * w, cy = Math.random() * h, r = 2 + Math.random() * 6;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(90,90,100,0.4)";
        ctx.fill();
      }
    }, 9909);
  }

  function createOrbitLine(radius, color) {
    const points = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.LineLoop(geo, new THREE.LineBasicMaterial({
      color: color || 0x3a4a6e, transparent: true, opacity: 0.35
    }));
    return line;
  }

  // 土星光环纹理（径向噪点 + 卡西尼缝）
  function makeRingTexture(seed) {
    const w = 1024, h = 8;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    const rng = mulberry32(seed);
    const nz = makeNoise2D(rng);
    const img = ctx.createImageData(w, h);
    for (let x = 0; x < w; x++) {
      const t = nz.fbm(x / 45, 0.5, 4);
      const f = x / w;
      let alpha = 0.55 + t * 0.35;
      if (f < 0.06) alpha *= f / 0.06;
      if (f > 0.94) alpha *= (1 - f) / 0.06;
      if (f > 0.38 && f < 0.46) alpha *= 0.06;      // 卡西尼缝
      if (f > 0.16 && f < 0.2) alpha *= 0.45;       // 细缝
      if (f > 0.72 && f < 0.74) alpha *= 0.4;       // 恩克环缝
      const bright = 175 + t * 75;
      for (let y = 0; y < h; y++) {
        const i = (y * w + x) * 4;
        img.data[i] = bright;
        img.data[i + 1] = bright * 0.96;
        img.data[i + 2] = bright * 0.82;
        img.data[i + 3] = alpha * 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 8;
    return tex;
  }

  // 小行星带生成（InstancedMesh 性能好）
  function createBelt(innerR, outerR, count, color, sizeRange, ySpread) {
    const geo = new THREE.SphereGeometry(1, 7, 5);
    const mat = new THREE.MeshStandardMaterial({
      color: color, roughness: 0.95, metalness: 0.05
    });
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const dummy = new THREE.Object3D();
    const tint = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = innerR + Math.random() * (outerR - innerR);
      dummy.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * ySpread, Math.sin(angle) * r);
      const s = sizeRange[0] + Math.pow(Math.random(), 1.4) * (sizeRange[1] - sizeRange[0]);
      dummy.scale.set(s * (0.8 + Math.random() * 0.5), s * (0.6 + Math.random() * 0.9), s * (0.8 + Math.random() * 0.5));
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      const shade = 0.75 + Math.random() * 0.45;
      const warm = Math.random() < 0.3 ? 1.05 : 1.0;
      mesh.setColorAt(i, new THREE.Color(shade * warm, shade * (warm > 1 ? 0.95 : 1), shade * 0.95));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.userData.key = "asteroidBelt";
    return mesh;
  }

  function buildBody(key) {
    const data = BODIES[key];
    const group = new THREE.Group();
    group.name = key;
    group.userData.key = key;

    // 轨道线
    if (data.distance > 0) {
      const line = createOrbitLine(data.distance, key.indexOf("Belt") > -1 ? 0x55608a : 0x3a4a6e);
      scene.add(line);
      orbitLines[key] = line;
    }

    // 小行星带：特殊处理
    if (key === "asteroidBelt") {
      const beltMesh = createBelt(BELT_RANGE[0], BELT_RANGE[1], isMobile() ? 1500 : 2600, 0x77777d, [0.07, 0.16], 0.8);
      beltMesh.userData.key = "asteroidBelt";
      group.add(beltMesh);
      group.userData.isBelt = true;
      beltGroups.asteroidBelt = beltMesh;
      pickableByKey.asteroidBelt = beltMesh;
      pickables.push(beltMesh);
      scene.add(group);
      orbitGroups[key] = group;
      return;
    }

    if (key === "kuiperBelt") {
      const beltMesh = createBelt(KUIPER_RANGE[0], KUIPER_RANGE[1], isMobile() ? 2500 : 4200, 0x7f879f, [0.08, 0.2], 1.5);
      beltMesh.userData.key = "kuiperBelt";
      group.add(beltMesh);
      group.userData.isBelt = true;
      beltGroups.kuiperBelt = beltMesh;
      pickableByKey.kuiperBelt = beltMesh;
      pickables.push(beltMesh);
      scene.add(group);
      orbitGroups[key] = group;
      return;
    }

    // 行星本体
    const pmat = new THREE.MeshStandardMaterial({
      map: planetTextures[key] || null,
      color: planetTextures[key] ? 0xffffff : data.color,
      roughness: 0.85,
      metalness: 0.05
    });
    materialByKey[key] = pmat;
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(data.radius, 48, 48),
      pmat
    );
    sphere.userData.key = key;
    sphere.castShadow = false;
    group.add(sphere);
    pickables.push(sphere);
    pickableByKey[key] = sphere;

    // 土星环
    if (data.hasRings) {
      const ringGeo = new THREE.RingGeometry(data.radius * 1.35, data.radius * 2.3, 96);
      const pos = ringGeo.attributes.position;
      const uv = ringGeo.attributes.uv;
      const v3 = new THREE.Vector3();
      const innerR = data.radius * 1.35;
      const outerR = data.radius * 2.3;
      for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        uv.setXY(i, (v3.length() - innerR) / (outerR - innerR), 0.5);
      }
      const ringMat = new THREE.MeshBasicMaterial({
        map: makeRingTexture(7788), side: THREE.DoubleSide,
        transparent: true, opacity: 0.95, depthWrite: false
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.15;
      group.add(ring);
    }

    // 天王星暗环
    if (data.hasFaintRing) {
      const ringGeo = new THREE.RingGeometry(data.radius * 1.4, data.radius * 1.65, 80);
      const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
        color: 0x9fb8c8, side: THREE.DoubleSide, transparent: true, opacity: 0.35
      }));
      ring.rotation.x = Math.PI / 2.4;
      group.add(ring);
    }

    // 地球月球
    if (data.hasMoon) {
      const moonMat = new THREE.MeshStandardMaterial({
        color: 0xbbbbbb, roughness: 0.95, metalness: 0.02
      });
      materialByKey.moon = moonMat;
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(MOON_RADIUS, 24, 24),
        moonMat
      );
      moon.userData.key = "moon";
      moon.name = "moon";
      moon.position.set(MOON_ORBIT_R, 0.25, 0);
      group.add(moon);
      group.userData.moon = moon;
      pickables.push(moon);
      pickableByKey.moon = moon;
      moonMesh = moon;
      // 月球标签
      const moonLabel = makeLabel("月球", "#cfe0ff");
      moonLabel.position.set(0, MOON_RADIUS * 2, 0);
      moonLabel.scale.set(1, 1, 1);
      moon.add(moonLabel);
      labelSprites.moon = moonLabel;

      // 动态云层：比地表略大的半透明球，独立旋转形成流动的云和飓风
      const cloudMat = new THREE.MeshLambertMaterial({
        color: 0xffffff, transparent: true, opacity: 0.85, depthWrite: false
      });
      materialByKey.earthCloud = cloudMat;
      const cloudMesh = new THREE.Mesh(
        new THREE.SphereGeometry(data.radius * 1.03, 48, 48),
        cloudMat
      );
      cloudMesh.userData.key = "earth";
      group.add(cloudMesh);
      group.userData.cloud = cloudMesh;
      pickables.push(cloudMesh);
    }

    // 标签
    const label = makeLabel(data.name, key === "sun" ? "#ffd77a" : "#dbe4ff");
    const labelY = key === "sun" ? data.radius + 3.2 : data.radius + 1.6;
    label.position.set(0, labelY, 0);
    label.scale.set(1, 1, 1);
    group.add(label);
    labelSprites[key] = label;

    // 公转初始角
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.y = data.angle;
    group.position.x = data.distance;
    orbitGroup.add(group);
    scene.add(orbitGroup);
    orbitGroups[key] = orbitGroup;
    group.userData.sphere = sphere;
  }

  Object.keys(BODIES).forEach(function (key) {
    if (key !== "sun") buildBody(key);
  });

  // 默认视角以地球为中心（不贴近，保持全景观察距离）
  {
    const earthPos = bodyWorldPos("earth");
    controls.target.copy(earthPos);
    camera.position.copy(earthPos).add(new THREE.Vector3(350, 260, 800));
  }

  // 小行星带/柯伊伯带标签（加在 belt 的组上）
  ["asteroidBelt", "kuiperBelt"].forEach(function (key) {
    const label = makeLabel(BODIES[key].name, "#aab6d8");
    label.position.set(BODIES[key].distance, key === "kuiperBelt" ? 4 : 3, 0);
    label.scale.set(1, 1, 1);
    const parent = orbitGroups[key].userData.isBelt ? orbitGroups[key] : orbitGroups[key].children[0];
    parent.add(label);
    labelSprites[key] = label;
  });

  /* =========================================================
   *  人类里程碑事件标记
   * ========================================================= */
  const eventMarkers = {};

  function makeEventPin(color) {
    const g = new THREE.Group();
    const h = MOON_RADIUS * 0.6;
    const r = MOON_RADIUS * 0.2;
    const pin = new THREE.Mesh(
      new THREE.ConeGeometry(r, h, 8),
      new THREE.MeshBasicMaterial({ color: color })
    );
    pin.position.y = h / 2;
    const base = new THREE.Mesh(
      new THREE.SphereGeometry(r * 0.55, 10, 8),
      new THREE.MeshBasicMaterial({ color: color })
    );
    g.add(pin);
    g.add(base);
    return g;
  }

  function makeProbe(color) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.09, 0.18, 8),
      new THREE.MeshStandardMaterial({ color: color, roughness: 0.55, metalness: 0.35 })
    );
    body.rotation.x = Math.PI / 2;
    const dish = new THREE.Mesh(
      new THREE.ConeGeometry(0.11, 0.14, 10),
      new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3, metalness: 0.6 })
    );
    dish.rotation.x = -Math.PI / 2;
    dish.position.y = 0.2;
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x2244aa, roughness: 0.5, metalness: 0.3 });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.08), panelMat);
    p1.position.x = 0.22;
    const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.08), panelMat);
    p2.position.x = -0.22;
    g.add(body);
    g.add(dish);
    g.add(p1);
    g.add(p2);
    return g;
  }

  function buildEvents() {
    EVENTS.forEach(function (ev) {
      let group;
      if (ev.body === "moon") {
        const lat = ev.lat * Math.PI / 180;
        const lon = ev.lon * Math.PI / 180;
        // 与月球贴图的真实经纬度对应：
        // 经度 0° 在 +X 方向，东经向 -Z 方向延伸，北纬朝 +Y
        const normal = new THREE.Vector3(
          Math.cos(lat) * Math.cos(lon),
          Math.sin(lat),
          -Math.cos(lat) * Math.sin(lon)
        ).normalize();
        group = makeEventPin(ev.color);
        group.position.copy(normal.clone().multiplyScalar(MOON_RADIUS + 0.015));
        group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
        ev._localOffset = normal.clone().multiplyScalar(MOON_RADIUS + 0.015);
        ev._worldAnchor = moonMesh;
        if (moonMesh) moonMesh.add(group);
        else scene.add(group);
      } else {
        group = makeProbe(ev.color);
        group.position.set(ev.pos[0], ev.pos[1], ev.pos[2]);
        ev._worldAnchor = group;
        scene.add(group);
      }
      ev._group = group;
      // 默认隐藏：只有选中对应事件时才显示标记
      group.visible = false;
      eventMarkers[ev.key] = group;
      group.traverse(function (o) {
        if (o.isMesh) {
          o.userData.eventKey = ev.key;
          pickables.push(o);
        }
      });
    });
  }
  buildEvents();

  /* =========================================================
   *  侧边栏构建
   * ========================================================= */
  const bodyList = document.getElementById("bodyList");
  const bodyColors = {
    sun: "#ffcc44", mercury: "#b8b8c0", venus: "#e8c27a", earth: "#4a8cf7",
    mars: "#d1664a", jupiter: "#d9a066", saturn: "#e3c987", uranus: "#8fd8d8",
    neptune: "#5f7ff0", asteroidBelt: "#9a8f7a", kuiperBelt: "#7a86a8"
  };
  const navOrder = [
    { titleKey: "navStar", items: [{ key: "sun" }] },
    { titleKey: "navPlanets", items: PLANET_KEYS.map(function (k) { return { key: k }; }) },
    { titleKey: "navSatellites", items: [{ key: "moon", sub: ["apollo11", "change4"] }] },
    { titleKey: "navAsteroidBelt", items: [{ key: "asteroidBelt" }] },
    {
      titleKey: "navMilestones",
      items: [
        { key: "voyager1", event: true },
        { key: "voyager2", event: true },
        { key: "newhorizons", event: true }
      ]
    },
    { titleKey: "navKuiperBelt", items: [{ key: "kuiperBelt" }] }
  ];

  function buildNav() {
    bodyList.innerHTML = "";
    navOrder.forEach(function (groupDef) {
      const gDiv = document.createElement("div");
      gDiv.className = "nav-group";
      const title = document.createElement("div");
      title.className = "nav-group-title";
      title.textContent = t(groupDef.titleKey);
      gDiv.appendChild(title);
      groupDef.items.forEach(function (item) {
        const key = item.key;
        const btn = document.createElement("button");
        btn.className = "nav-item";
        btn.dataset.key = key;
        if (item.event) btn.dataset.event = key;
        const dot = document.createElement("span");
        dot.className = "nav-dot";
        if (item.event) dot.style.background = "#" + EVENT_BY_KEY[key].color.toString(16).padStart(6, "0");
        else dot.style.background = bodyColors[key] || "#fff";
        const name = document.createElement("span");
        name.textContent = item.event
          ? localEvent(EVENT_BY_KEY[key]).short
          : bodyName(key);
        btn.appendChild(dot);
        btn.appendChild(name);

        let arrow = null;
        let subDiv = null;
        if (item.sub) {
          arrow = document.createElement("span");
          arrow.className = "nav-arrow";
          arrow.textContent = "▸";
          btn.appendChild(arrow);
          subDiv = document.createElement("div");
          subDiv.className = "nav-sub";
          item.sub.forEach(function (evKey) {
            const ev = EVENT_BY_KEY[evKey];
            const eBtn = document.createElement("button");
            eBtn.className = "nav-item nav-sub-item";
            eBtn.dataset.event = evKey;
            const eDot = document.createElement("span");
            eDot.className = "nav-dot";
            eDot.style.background = "#" + ev.color.toString(16).padStart(6, "0");
            const eName = document.createElement("span");
            eName.textContent = localEvent(ev).short;
            eBtn.appendChild(eDot);
            eBtn.appendChild(eName);
            eBtn.addEventListener("click", function (e) {
              e.stopPropagation();
              selectEvent(evKey, true);
            });
            subDiv.appendChild(eBtn);
          });
          gDiv.appendChild(subDiv);
        }

        btn.addEventListener("click", function (e) {
          if (arrow && (e.target === arrow || arrow.contains(e.target))) {
            const expanded = subDiv.classList.toggle("open");
            arrow.textContent = expanded ? "▾" : "▸";
            return;
          }
          if (item.event) selectEvent(key, true);
          else selectBody(key, true);
        });
        gDiv.appendChild(btn);
      });
      bodyList.appendChild(gDiv);
    });
  }
  buildNav();

  /* =========================================================
   *  相机飞行 & 选中
   * ========================================================= */
  let selectedKey = null;
  let activeEventKey = null;
  let followKey = null;
  let eventCardPinned = false;
  let eventCardDocked = false;
  let flying = null;
  const infoPanel = document.getElementById("infoPanel");
  const infoName = document.getElementById("infoName");
  const infoType = document.getElementById("infoType");
  const infoFacts = document.getElementById("infoFacts");
  const infoDesc = document.getElementById("infoDesc");
  const eventCard = document.getElementById("eventCard");
  const eventTitle = document.getElementById("eventTitle");
  const eventYear = document.getElementById("eventYear");
  const eventDesc = document.getElementById("eventDesc");

  function bodyWorldPos(key, out) {
    out = out || new THREE.Vector3();
    if (key === "sun") return out.set(0, 0, 0);
    if (key === "moon") {
      if (moonMesh) moonMesh.getWorldPosition(out);
      return out;
    }
    if (key === "asteroidBelt" || key === "kuiperBelt") {
      return orbitGroups[key].localToWorld(out.set(BODIES[key].distance, 0, 0));
    }
    if (orbitGroups[key] && orbitGroups[key].children[0]) {
      return orbitGroups[key].children[0].getWorldPosition(out);
    }
    return out.set(0, 0, 0);
  }

  // 跟随目标的有效半径（用于限制最近放大距离，避免镜头穿进星球）
  function getBodyRadius(key) {
    if (EVENT_BY_KEY[key]) {
      return EVENT_BY_KEY[key].body === "moon" ? MOON_RADIUS : 0.6;
    }
    if (key === "moon") return MOON_RADIUS;
    const data = BODIES[key];
    return data ? data.radius : 1;
  }

  function getFollowMinDistance(key) {
    return getBodyRadius(key) * 1.2 + 0.3;
  }

  // 通用防穿：无论是否处于跟随状态，镜头都不允许进入任何天体内部
  function enforceNoClip() {
    const camPos = camera.position;
    const v = new THREE.Vector3();
    const pushOut = function (center, r) {
      const off = camPos.clone().sub(center);
      const d = off.length();
      if (d < r && d > 1e-6) {
        camPos.copy(center).add(off.normalize().multiplyScalar(r + 0.05));
      }
    };
    pushOut(new THREE.Vector3(0, 0, 0), BODIES.sun.radius);
    PLANET_KEYS.forEach(function (key) {
      pushOut(bodyWorldPos(key, v), BODIES[key].radius);
    });
    pushOut(bodyWorldPos("moon", v), MOON_RADIUS);
  }

  function eventWorldPos(ev, out) {
    out = out || new THREE.Vector3();
    if (ev.body === "moon" && ev._worldAnchor && ev._localOffset) {
      return ev._worldAnchor.localToWorld(ev._localOffset.clone());
    }
    if (ev._group) return ev._group.getWorldPosition(out);
    return out.set(0, 0, 0);
  }

  function flyTo(key) {
    const ev = EVENT_BY_KEY[key];
    let target;
    let dist;
    if (ev) {
      target = ev.body === "moon" ? bodyWorldPos("moon") : eventWorldPos(ev);
      dist = ev.body === "moon" ? 1.6 : 4.5;
    } else if (key === "moon") {
      target = bodyWorldPos("moon");
      dist = 1.6;
    } else {
      const data = BODIES[key];
      if (!data) return;
      target = bodyWorldPos(key);
      dist = Math.max(3.5, data.radius * 4 + 2.5);
    }
    const dir = new THREE.Vector3(0.5, 0.45, 1).normalize();
    const startCam = camera.position.clone();
    const startTarget = controls.target.clone();
    const duration = 1300;
    const t0 = performance.now();
    controls.enabled = false;
    flying = { startCam, startTarget, dir: dir.clone(), dist: dist, t0, duration, key };
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function selectBody(key, fly) {
    selectedKey = key;
    activeEventKey = null;
    hideEventCard();
    document.querySelectorAll(".nav-item").forEach(function (el) {
      el.classList.toggle("active", el.dataset.key === key);
    });
    showInfo(key);
    if (fly) flyTo(key);
    followKey = key;
    updateFollowBadge();
    if (window.innerWidth <= 768) closeSidebar();
  }

  function selectEvent(key, fly) {
    const ev = EVENT_BY_KEY[key];
    if (!ev) return;
    activeEventKey = key;
    selectedKey = null;
    setActiveEventMarker(key);
    document.querySelectorAll(".nav-item").forEach(function (el) {
      el.classList.toggle("active", el.dataset.event === key);
    });
    showEventCard(ev);
    if (fly) flyTo(key);
    followKey = ev.body === "moon" ? "moon" : key;
    updateFollowBadge();
    if (window.innerWidth <= 768) closeSidebar();
  }

  function showInfo(key) {
    const data = localBody(key);
    if (!data) return;
    infoName.textContent = data.name;
    infoType.textContent = (currentLang === "zh" || currentLang === "zhTW")
      ? data.type + " · " + data.en
      : data.type;
    infoFacts.innerHTML = "";
    data.facts.forEach(function (f) {
      const div = document.createElement("div");
      div.className = "fact";
      const b = document.createElement("b");
      b.textContent = f[0];
      const span = document.createElement("span");
      span.textContent = f[1];
      div.appendChild(b);
      div.appendChild(span);
      infoFacts.appendChild(div);
    });
    infoDesc.textContent = data.desc;
    infoPanel.classList.remove("hidden");
  }

  function showEventCard(ev) {
    const le = localEvent(ev);
    eventTitle.textContent = le.short || le.name;
    eventYear.textContent = le.year + " · " + le.type;
    eventDesc.textContent = le.desc;
    eventCard.classList.remove("hidden", "collapsed");
    eventCardPinned = false;
    eventCardDocked = false;
    eventCard.classList.add("following");
    eventCard.classList.remove("pinned");
    document.getElementById("eventDock").textContent = "⇥";
    document.getElementById("eventDock").title = t("eventDockTitle");
    document.getElementById("eventCollapse").textContent = "–";
  }

  function hideEventCard() {
    setActiveEventMarker(null);
    eventCard.classList.add("hidden");
    activeEventKey = null;
  }

  // 只显示当前选中事件的标记，其余隐藏
  function setActiveEventMarker(key) {
    Object.keys(eventMarkers).forEach(function (k) {
      eventMarkers[k].visible = (k === key);
    });
  }

  function updateFollowBadge() {
    const badge = document.getElementById("followBadge");
    const nameEl = document.getElementById("followName");
    if (!followKey) {
      badge.classList.add("hidden");
      return;
    }
    if (EVENT_BY_KEY[followKey]) nameEl.textContent = localEvent(EVENT_BY_KEY[followKey]).short;
    else nameEl.textContent = bodyName(followKey);
    badge.classList.remove("hidden");
  }

  // 点击拾取
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let downX = 0, downY = 0, downT = 0;
  renderer.domElement.addEventListener("pointerdown", function (e) {
    downX = e.clientX; downY = e.clientY; downT = Date.now();
  });
  renderer.domElement.addEventListener("pointerup", function (e) {
    const dx = e.clientX - downX, dy = e.clientY - downY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6 || Date.now() - downT > 500) return;
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickables, false);
    if (hits.length > 0) {
      const obj = hits[0].object;
      if (obj.userData.eventKey) {
        selectEvent(obj.userData.eventKey, true);
      } else if (obj.userData.key) {
        selectBody(obj.userData.key, true);
      }
    }
  });

  /* =========================================================
   *  控制条交互
   * ========================================================= */
  let paused = false;
  let timeScale = 30;
  let simDays = 0;

  const pauseBtn = document.getElementById("pauseBtn");
  const speedSlider = document.getElementById("speedSlider");
  const speedValue = document.getElementById("speedValue");
  const orbitToggle = document.getElementById("orbitToggle");
  const labelToggle = document.getElementById("labelToggle");
  const beltToggle = document.getElementById("beltToggle");
  const timeDisplay = document.getElementById("timeDisplay");

  pauseBtn.addEventListener("click", function () {
    paused = !paused;
    pauseBtn.textContent = paused ? "▶" : "⏸";
  });
  speedSlider.addEventListener("input", function () {
    timeScale = parseFloat(this.value);
    speedValue.textContent = timeScale + "x";
  });
  orbitToggle.addEventListener("change", function () {
    Object.keys(orbitLines).forEach(function (k) {
      orbitLines[k].visible = orbitToggle.checked;
    });
  });
  labelToggle.addEventListener("change", function () {
    Object.keys(labelSprites).forEach(function (k) {
      labelSprites[k].visible = labelToggle.checked;
    });
  });
  beltToggle.addEventListener("change", function () {
    Object.keys(beltGroups).forEach(function (k) {
      beltGroups[k].visible = beltToggle.checked;
    });
  });
  document.getElementById("langSelect").addEventListener("change", function () {
    setLang(this.value);
  });

  document.getElementById("resetView").addEventListener("click", function () {
    selectedKey = null;
    activeEventKey = null;
    followKey = "earth";
    controls.minDistance = defaultMinDistance;
    hideEventCard();
    updateFollowBadge();
    document.querySelectorAll(".nav-item").forEach(function (el) {
      el.classList.remove("active");
    });
    infoPanel.classList.add("hidden");
    // 飞回默认全景（以地球为中心）
    const startCam = camera.position.clone();
    const startTarget = controls.target.clone();
    const earthPos = bodyWorldPos("earth");
    const t0 = performance.now();
    controls.enabled = false;
    flying = {
      startCam, startTarget,
      endCam: earthPos.clone().add(new THREE.Vector3(350, 260, 800)),
      endTarget: earthPos.clone(),
      t0, duration: 1200
    };
  });

  // 搜索
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    const q = this.value.trim().toLowerCase();
    document.querySelectorAll(".nav-item").forEach(function (el) {
      const key = el.dataset.key;
      const evKey = el.dataset.event;
      let match;
      if (evKey) {
        const ev = EVENT_BY_KEY[evKey];
        const le = localEvent(ev);
        match = !q ||
          le.name.toLowerCase().indexOf(q) > -1 ||
          le.short.toLowerCase().indexOf(q) > -1 ||
          le.year.toLowerCase().indexOf(q) > -1 ||
          le.type.toLowerCase().indexOf(q) > -1 ||
          evKey.toLowerCase().indexOf(q) > -1;
      } else {
        const data = localBody(key);
        match = !q || !data ||
          data.name.toLowerCase().indexOf(q) > -1 ||
          data.en.toLowerCase().indexOf(q) > -1 ||
          data.type.toLowerCase().indexOf(q) > -1 ||
          key.toLowerCase().indexOf(q) > -1;
      }
      el.style.display = match ? "" : "none";
    });
  });

  // 侧边栏开关
  const sidebar = document.getElementById("sidebar");
  const mask = document.getElementById("sidebarMask");
  document.getElementById("menuToggle").addEventListener("click", function () {
    sidebar.classList.remove("collapsed");
    mask.classList.add("show");
  });
  document.getElementById("sidebarClose").addEventListener("click", closeSidebar);
  mask.addEventListener("click", closeSidebar);
  function closeSidebar() {
    sidebar.classList.add("collapsed");
    mask.classList.remove("show");
  }
  // 手机端默认收起侧边菜单，避免遮挡 3D 画面
  if (isMobile()) closeSidebar();

  document.getElementById("infoClose").addEventListener("click", function () {
    infoPanel.classList.add("hidden");
  });

  document.getElementById("infoCollapse").addEventListener("click", function () {
    const collapsed = infoPanel.classList.toggle("collapsed");
    this.textContent = collapsed ? "+" : "–";
  });

  document.getElementById("followCancel").addEventListener("click", function () {
    followKey = null;
    controls.minDistance = defaultMinDistance;
    updateFollowBadge();
  });

  document.getElementById("eventCollapse").addEventListener("click", function () {
    const collapsed = eventCard.classList.toggle("collapsed");
    this.textContent = collapsed ? "+" : "–";
  });

  document.getElementById("eventClose").addEventListener("click", function () {
    hideEventCard();
  });

  // PC 端：事件卡片可拖动（手机端保持底部弹出，不启用拖动）
  let dragState = null;
  eventCard.addEventListener("pointerdown", function (e) {
    if (isMobile()) return;
    if (e.target.closest("button")) return;
    // 按下瞬间先把卡片固定在当前实际显示位置（包含跟随标记时的偏移），
    // 避免第一次拖动时因为去掉偏移而“跳”一下
    const rect = eventCard.getBoundingClientRect();
    eventCardPinned = true;
    eventCardDocked = false;
    eventCard.classList.add("pinned");
    eventCard.classList.remove("following");
    eventCard.style.left = rect.left + "px";
    eventCard.style.top = rect.top + "px";
    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      origLeft: rect.left,
      origTop: rect.top
    };
    document.getElementById("eventDock").textContent = "⇥";
    document.getElementById("eventDock").title = t("eventDockTitle");
    eventCard.classList.add("dragging");
    eventCard.setPointerCapture(e.pointerId);
  });
  eventCard.addEventListener("pointermove", function (e) {
    if (!dragState) return;
    eventCard.style.left = (dragState.origLeft + e.clientX - dragState.startX) + "px";
    eventCard.style.top = (dragState.origTop + e.clientY - dragState.startY) + "px";
    eventCardPinned = true;
    eventCardDocked = false;
    eventCard.classList.add("pinned");
    eventCard.classList.remove("following");
    document.getElementById("eventDock").textContent = "⇥";
    document.getElementById("eventDock").title = t("eventDockTitle");
  });
  eventCard.addEventListener("pointerup", function () {
    dragState = null;
    eventCard.classList.remove("dragging");
  });
  eventCard.addEventListener("pointercancel", function () {
    dragState = null;
    eventCard.classList.remove("dragging");
  });

  // PC 端：一键固定到右侧 / 回到标记位置
  document.getElementById("eventDock").addEventListener("click", function () {
    if (eventCardDocked) {
      eventCardDocked = false;
      eventCardPinned = false;
      this.textContent = "⇥";
      this.title = t("eventDockTitle");
    } else {
      eventCardDocked = true;
      eventCardPinned = true;
      eventCard.style.left = Math.max(10, window.innerWidth - 298) + "px";
      eventCard.style.top = "74px";
      this.textContent = "⇤";
      this.title = t("eventBackTitle");
    }
  });

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (isMobile()) closeSidebar();
  });

  /* =========================================================
   *  动画循环
   * ========================================================= */
  const clock = new THREE.Clock();
  const tmpDir = new THREE.Vector3();

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);

    if (!paused) {
      const simDt = dt * timeScale / 60; // 相对“天数”的推进
      simDays += simDt;
      timeDisplay.textContent = t("timeRunning").replace("{n}", Math.floor(simDays));

      Object.keys(BODIES).forEach(function (key) {
        const data = BODIES[key];
        if (key === "sun") {
          sunMesh.rotation.y += dt * data.spinSpeed;
          sunMaterial.uniforms.uTime.value += dt * 0.9;
          return;
        }
        const orbitGroup = orbitGroups[key];
        if (orbitGroup) orbitGroup.rotation.y += dt * data.orbitSpeed * 0.02 * (timeScale / 30);
        const inner = orbitGroup && orbitGroup.children[0];
        const sphere = inner && inner.userData.sphere;
        if (sphere) sphere.rotation.y += dt * data.spinSpeed * (timeScale / 30);
        if (inner && inner.userData.moon) {
          const moon = inner.userData.moon;
          moon.position.x = MOON_ORBIT_R * Math.cos(simDays * 0.18);
          moon.position.z = MOON_ORBIT_R * Math.sin(simDays * 0.18);
        }
        if (inner && inner.userData.cloud) {
          // 云层比地表转得快一点，形成流动的云和飓风
          inner.userData.cloud.rotation.y += dt * (data.spinSpeed * 1.35) * (timeScale / 30);
        }
      });
      // 小行星带自转（整个带缓慢旋转）
      Object.keys(beltGroups).forEach(function (key) {
        beltGroups[key].rotation.y += dt * 0.004 * (timeScale / 30);
      });
    }

    // 相机飞行动画
    if (flying) {
      const el = performance.now() - flying.t0;
      const t = Math.min(1, el / flying.duration);
      const e = easeInOutCubic(t);
      if (flying.key) {
        // 飞行途中实时追踪目标当前位置：到达时镜头已与跟随状态完全重合，无闪回
        const cur = EVENT_BY_KEY[flying.key]
          ? eventWorldPos(EVENT_BY_KEY[flying.key])
          : bodyWorldPos(flying.key);
        const endCam = cur.clone().add(flying.dir.clone().multiplyScalar(flying.dist));
        camera.position.lerpVectors(flying.startCam, endCam, e);
        controls.target.lerpVectors(flying.startTarget, cur, e);
      } else {
        camera.position.lerpVectors(flying.startCam, flying.endCam, e);
        controls.target.lerpVectors(flying.startTarget, flying.endTarget, e);
      }
      if (t >= 1) {
        flying = null;
        controls.enabled = true;
      }
    }

    // 持续跟随：以目标天体为中心
    if (followKey && !flying) {
      const pos = EVENT_BY_KEY[followKey]
        ? eventWorldPos(EVENT_BY_KEY[followKey])
        : bodyWorldPos(followKey);
      // 动态缩放下限：不能穿进所跟随的星球表面
      const minD = getFollowMinDistance(followKey);
      controls.minDistance = minD;
      const off = camera.position.clone().sub(controls.target);
      if (off.length() < minD) off.setLength(minD);
      controls.target.copy(pos);
      camera.position.copy(pos).add(off);
    }

    // 事件信息卡跟随标记点
    if (activeEventKey) {
      if (eventCardPinned) {
        // 用户已拖动/固定：卡片停在当前位置，不再跟随标记
        eventCard.classList.remove("hidden");
        eventCard.classList.add("pinned");
        eventCard.classList.remove("following");
      } else {
        const ev = EVENT_BY_KEY[activeEventKey];
        const pos = eventWorldPos(ev);
        const dir = pos.clone().sub(camera.position).normalize();
        camera.getWorldDirection(tmpDir);
        eventCard.classList.add("following");
        eventCard.classList.remove("pinned");
        if (dir.dot(tmpDir) > 0.15) {
          if (!isMobile()) {
            const v = pos.clone().project(camera);
            // 直接用坐标计算“标记上方居中”的位置，不依赖 CSS 变形，
            // 保证拖动前后位置一致、不会跳位
            const cardW = eventCard.offsetWidth;
            const cardH = eventCard.offsetHeight;
            let cx = (v.x * 0.5 + 0.5) * window.innerWidth;
            let cy = (-v.y * 0.5 + 0.5) * window.innerHeight;
            cx = Math.max(8, Math.min(cx - cardW / 2, window.innerWidth - cardW - 8));
            cy = Math.max(8, Math.min(cy - cardH - 24, window.innerHeight - cardH - 8));
            eventCard.style.left = cx + "px";
            eventCard.style.top = cy + "px";
          }
          eventCard.classList.remove("hidden");
        } else {
          eventCard.classList.add("hidden");
        }
      }
    }

    // 标签保持屏幕大小恒定（无论放大缩小都清晰可读）
    const labelPx = (36 * 1.041) / Math.max(window.innerHeight, 1);
    const labelWorld = new THREE.Vector3();
    Object.keys(labelSprites).forEach(function (k) {
      const s = labelSprites[k];
      s.getWorldPosition(labelWorld);
      const dist = camera.position.distanceTo(labelWorld);
      const sy = Math.max(0.12, dist * labelPx);
      s.scale.set(sy * 4, sy, 1);
    });

    enforceNoClip();
    controls.update();
    renderer.render(scene, camera);
  }

  // 首次渲染后隐藏加载层
  // 默认持续跟踪地球（保持全景距离，不拉近）
  followKey = "earth";
  // 应用语言：界面、菜单、3D 标签、信息面板
  setLang(currentLang);
  renderer.render(scene, camera);
  document.getElementById("loading").classList.add("hide");
  animate();

  // 先让画面立即出现，再在后台生成星球纹理，完成后自动贴上去
  setTimeout(function () {
    buildTextures();
    Object.keys(materialByKey).forEach(function (k) {
      const mat = materialByKey[k];
      const tex = planetTextures[k];
      if (mat && tex) {
        mat.map = tex;
        mat.color.set(0xffffff);
        mat.needsUpdate = true;
      }
    });
    loadRealTextures();
    loadEarthClouds();
  }, 60);
})();
