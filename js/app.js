(function () {
  "use strict";

  /* =========================================================
   *  数据定义
   * ========================================================= */
  const BODIES = {
    sun: {
      key: "sun", name: "太阳", en: "Sun", type: "恒星",
      radius: 4.2, distance: 0, color: 0xffcc44, emissive: 0xffaa22,
      angle: 0, orbitSpeed: 0, spinSpeed: 0.08,
      facts: [
        ["直径", "139.2 万 km"], ["表面温度", "约 5,500 ℃"],
        ["类型", "G2V 黄矮星"], ["质量占比", "99.86%"]
      ],
      desc: "太阳系的中心，一颗正值壮年的黄矮星，内部每秒将约 6 亿吨氢转化为氦，为整个太阳系提供光和热。"
    },
    mercury: {
      key: "mercury", name: "水星", en: "Mercury", type: "类地行星",
      radius: 0.24, distance: 5.0, color: 0xb8b8c0,
      angle: 0.4, orbitSpeed: 10.7, spinSpeed: 0.03,
      facts: [
        ["直径", "4,879 km"], ["距太阳", "5,790 万 km"],
        ["公转周期", "88 天"], ["自转周期", "58.6 天"],
        ["表面温度", "-173 ~ 427 ℃"]
      ],
      desc: "离太阳最近、也是最小的行星。几乎没有大气层保护，昼夜温差超过 600℃，表面布满陨石坑，像一颗巨大的铁核。"
    },
    venus: {
      key: "venus", name: "金星", en: "Venus", type: "类地行星",
      radius: 0.59, distance: 9.4, color: 0xe8c27a,
      angle: 2.0, orbitSpeed: 4.15, spinSpeed: -0.015,
      facts: [
        ["直径", "12,104 km"], ["距太阳", "1.082 亿 km"],
        ["公转周期", "225 天"], ["自转周期", "243 天（逆向）"],
        ["表面温度", "约 465 ℃"]
      ],
      desc: "太阳系最热的行星。浓密的二氧化碳大气和硫酸云层造成失控温室效应，表面温度足以熔化铅，且自转方向与公转相反。"
    },
    earth: {
      key: "earth", name: "地球", en: "Earth", type: "类地行星",
      radius: 0.62, distance: 13.0, color: 0x4a8cf7,
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
      radius: 0.33, distance: 19.8, color: 0xd1664a,
      angle: 5.5, orbitSpeed: 1.36, spinSpeed: 0.1,
      facts: [
        ["直径", "6,792 km"], ["距太阳", "2.279 亿 km"],
        ["公转周期", "687 天"], ["自转周期", "24.6 小时"],
        ["表面温度", "-140 ~ 20 ℃"]
      ],
      desc: "被称为红色星球，表面氧化铁让它呈现锈红色。拥有太阳系最高的火山——奥林帕斯山（高约 21 km），是人类未来移民的热门候选。"
    },
    asteroidBelt: {
      key: "asteroidBelt", name: "小行星带", en: "Asteroid Belt", type: "小行星带",
      radius: 1.0, distance: 35.0, color: 0x9a8f7a,
      angle: 0, orbitSpeed: 0.35, spinSpeed: 0,
      facts: [
        ["位置", "火星与木星之间"], ["范围", "约 2.2 ~ 3.2 AU"],
        ["已知数量", "数百万颗"], ["最大天体", "谷神星（940 km）"]
      ],
      desc: "太阳系形成早期未能聚集成行星的物质残留，由岩石和金属组成。最大的谷神星直径约 940 公里，已被归类为矮行星。"
    },
    jupiter: {
      key: "jupiter", name: "木星", en: "Jupiter", type: "气态巨行星",
      radius: 6.95, distance: 67.7, color: 0xd9a066,
      angle: 1.2, orbitSpeed: 0.214, spinSpeed: 0.28,
      facts: [
        ["直径", "142,984 km"], ["距太阳", "7.786 亿 km"],
        ["公转周期", "11.86 年"], ["自转周期", "9.9 小时"],
        ["表面温度", "约 -108 ℃"]
      ],
      desc: "太阳系最大的行星，体积可容纳 1300 多个地球。标志性的大红斑是一场已持续数百年的超级风暴，直径超过地球。"
    },
    saturn: {
      key: "saturn", name: "土星", en: "Saturn", type: "气态巨行星",
      radius: 5.86, distance: 124.5, color: 0xe3c987,
      angle: 3.0, orbitSpeed: 0.086, spinSpeed: 0.26,
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
      radius: 2.49, distance: 249.6, color: 0x8fd8d8,
      angle: 0.8, orbitSpeed: 0.03, spinSpeed: 0.2,
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
      radius: 2.41, distance: 390.0, color: 0x5f7ff0,
      angle: 2.6, orbitSpeed: 0.0155, spinSpeed: 0.22,
      facts: [
        ["直径", "49,528 km"], ["距太阳", "44.95 亿 km"],
        ["公转周期", "164.8 年"], ["自转周期", "16.1 小时"],
        ["表面温度", "约 -201 ℃"]
      ],
      desc: "距离太阳最远的行星，深蓝色的外观来自大气中的甲烷。拥有太阳系最狂暴的风，速度可达每小时 2,100 公里。"
    },
    kuiperBelt: {
      key: "kuiperBelt", name: "柯伊伯带", en: "Kuiper Belt", type: "冰质天体带",
      radius: 1.0, distance: 550.0, color: 0x7a86a8,
      angle: 0, orbitSpeed: 0.012, spinSpeed: 0,
      facts: [
        ["位置", "海王星轨道之外"], ["范围", "约 30 ~ 55 AU"],
        ["组成", "冰、甲烷、氨"], ["著名成员", "冥王星"]
      ],
      desc: "海王星轨道之外环绕太阳的冰质天体带，是短周期彗星的故乡。曾经的第九大行星冥王星就位于这片区域。"
    }
  };

  const PLANET_KEYS = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
  const BELT_KEYS = ["asteroidBelt", "kuiperBelt"];

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
      pos: [520, 25, -70], color: 0x5aa8ff,
      desc: "1977年9月发射，先后飞掠木星和土星，2012年成为首个进入星际空间的人造物体。它目前仍是距离地球最远的人造探测器，携带的镀金唱片向宇宙传递着人类文明的问候。"
    },
    {
      key: "voyager2", name: "旅行者2号", short: "旅行者2号",
      year: "1977年发射 · 2018年进入星际空间", type: "深空探测器", body: "space",
      pos: [-480, -25, 140], color: 0x5aa8ff,
      desc: "1977年8月发射，是唯一飞掠过木星、土星、天王星、海王星四颗巨行星的探测器。2018年进入星际空间，至今仍在向地球传回科学数据。"
    },
    {
      key: "newhorizons", name: "新视野号 · 飞越冥王星", short: "新视野号飞越冥王星",
      year: "2006年发射 · 2015年飞越冥王星", type: "深空探测器", body: "space",
      pos: [430, 18, 120], color: 0xffc85a,
      desc: "2006年发射，2015年7月飞越冥王星并传回首张高清特写，让人类第一次看清这颗矮行星的“心形”冰原。2019年又飞掠了柯伊伯带小天体“天涯海角”（Arrokoth）。"
    }
  ];
  const EVENT_BY_KEY = {};
  EVENTS.forEach(function (ev) { EVENT_BY_KEY[ev.key] = ev; });

  /* =========================================================
   *  基础场景
   * ========================================================= */
  const container = document.getElementById("app");
  function isMobile() { return window.innerWidth < 768; }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.set(260, 220, 700);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = false;
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 3;
  controls.maxDistance = 1000;
  controls.rotateSpeed = 0.7;
  controls.zoomSpeed = 1.1;

  // 背景星空
  function createStars() {
    const starCount = isMobile() ? 3000 : 6000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 1400 + Math.random() * 1000;
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
  const sunLight = new THREE.PointLight(0xfff2cc, 8.0, 600, 0.8);
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
    24, 1
  );
  const corona = makeGlowSprite(
    [
      [0, "rgba(255,210,130,0.5)"],
      [0.3, "rgba(255,170,70,0.22)"],
      [0.65, "rgba(255,140,45,0.08)"],
      [1, "rgba(255,120,30,0)"]
    ],
    64, 0.85
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

  function makeLabel(text, color) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 56px Microsoft YaHei, PingFang SC, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 14;
    ctx.fillStyle = color || "#dbe4ff";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex, transparent: true, depthWrite: false
    }));
    return sprite;
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
      const beltMesh = createBelt(28.6, 41.6, isMobile() ? 1000 : 1800, 0x77777d, [0.07, 0.16], 0.8);
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
      const beltMesh = createBelt(390, 715, isMobile() ? 1200 : 2000, 0x7f879f, [0.08, 0.2], 1.5);
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
        new THREE.SphereGeometry(0.17, 24, 24),
        moonMat
      );
      moon.userData.key = "moon";
      moon.name = "moon";
      moon.position.set(data.radius * 2.2, 0.25, 0);
      group.add(moon);
      group.userData.moon = moon;
      pickables.push(moon);
      pickableByKey.moon = moon;
      moonMesh = moon;
      // 月球标签
      const moonLabel = makeLabel("月球", "#cfe0ff");
      moonLabel.position.set(0, 0.34, 0);
      moonLabel.scale.set(1, 1, 1);
      moon.add(moonLabel);
      labelSprites.moon = moonLabel;
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
    const pin = new THREE.Mesh(
      new THREE.ConeGeometry(0.05, 0.16, 8),
      new THREE.MeshBasicMaterial({ color: color })
    );
    pin.position.y = 0.08;
    const base = new THREE.Mesh(
      new THREE.SphereGeometry(0.032, 10, 8),
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
        group.position.copy(normal.clone().multiplyScalar(0.17 + 0.015));
        group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
        ev._localOffset = normal.clone().multiplyScalar(0.17 + 0.015);
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
    { title: "恒星", items: [{ key: "sun" }] },
    { title: "行星", items: PLANET_KEYS.map(function (k) { return { key: k }; }) },
    { title: "卫星", items: [{ key: "moon", sub: ["apollo11", "change4"] }] },
    { title: "小行星带", items: [{ key: "asteroidBelt" }] },
    {
      title: "人类里程碑",
      items: [
        { key: "voyager1", event: true },
        { key: "voyager2", event: true },
        { key: "newhorizons", event: true }
      ]
    },
    { title: "柯伊伯带", items: [{ key: "kuiperBelt" }] }
  ];

  function buildNav() {
    bodyList.innerHTML = "";
    navOrder.forEach(function (groupDef) {
      const gDiv = document.createElement("div");
      gDiv.className = "nav-group";
      const title = document.createElement("div");
      title.className = "nav-group-title";
      title.textContent = groupDef.title;
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
          ? EVENT_BY_KEY[key].short
          : (key === "moon" ? MOON_INFO.name : BODIES[key].name);
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
            eName.textContent = ev.short;
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
      target = eventWorldPos(ev);
      dist = ev.body === "moon" ? 2.8 : 4.5;
    } else if (key === "moon") {
      target = bodyWorldPos("moon");
      dist = 2.8;
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
    followKey = key;
    updateFollowBadge();
    if (window.innerWidth <= 768) closeSidebar();
  }

  function showInfo(key) {
    const data = key === "moon" ? MOON_INFO : BODIES[key];
    if (!data) return;
    infoName.textContent = data.name;
    infoType.textContent = data.type + " · " + data.en;
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
    eventTitle.textContent = ev.short || ev.name;
    eventYear.textContent = ev.year + " · " + ev.type;
    eventDesc.textContent = ev.desc;
    eventCard.classList.remove("hidden", "collapsed");
    eventCardPinned = false;
    eventCardDocked = false;
    eventCard.classList.add("following");
    eventCard.classList.remove("pinned");
    document.getElementById("eventDock").textContent = "⇥";
    document.getElementById("eventDock").title = "固定到右侧";
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
    if (EVENT_BY_KEY[followKey]) nameEl.textContent = EVENT_BY_KEY[followKey].short;
    else if (followKey === "moon") nameEl.textContent = "月球";
    else nameEl.textContent = BODIES[followKey] ? BODIES[followKey].name : "";
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

  document.getElementById("resetView").addEventListener("click", function () {
    selectedKey = null;
    activeEventKey = null;
    followKey = null;
    hideEventCard();
    updateFollowBadge();
    document.querySelectorAll(".nav-item").forEach(function (el) {
      el.classList.remove("active");
    });
    infoPanel.classList.add("hidden");
    // 飞回全景
    const startCam = camera.position.clone();
    const startTarget = controls.target.clone();
    const t0 = performance.now();
    controls.enabled = false;
    flying = {
      startCam, startTarget,
      endCam: new THREE.Vector3(260, 220, 700),
      endTarget: new THREE.Vector3(0, 0, 0),
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
        match = !q ||
          ev.name.toLowerCase().indexOf(q) > -1 ||
          ev.short.toLowerCase().indexOf(q) > -1 ||
          ev.year.toLowerCase().indexOf(q) > -1;
      } else {
        const data = key === "moon" ? MOON_INFO : BODIES[key];
        match = !q ||
          data.name.toLowerCase().indexOf(q) > -1 ||
          data.en.toLowerCase().indexOf(q) > -1;
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
    document.getElementById("eventDock").title = "固定到右侧";
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
    document.getElementById("eventDock").title = "固定到右侧";
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
      this.title = "固定到右侧";
    } else {
      eventCardDocked = true;
      eventCardPinned = true;
      eventCard.style.left = Math.max(10, window.innerWidth - 298) + "px";
      eventCard.style.top = "74px";
      this.textContent = "⇤";
      this.title = "回到标记位置";
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
      timeDisplay.textContent = "运行 " + Math.floor(simDays) + " 天";

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
          moon.position.x = BODIES.earth.radius * 2.2 * Math.cos(simDays * 0.18);
          moon.position.z = BODIES.earth.radius * 2.2 * Math.sin(simDays * 0.18);
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
      const off = camera.position.clone().sub(controls.target);
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

    controls.update();
    renderer.render(scene, camera);
  }

  // 首次渲染后隐藏加载层
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
  }, 60);
})();
