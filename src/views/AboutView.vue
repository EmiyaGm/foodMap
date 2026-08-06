<template>
  <section class="about">
    <div class="about__panel">
      <p class="about__eyebrow">关于</p>
      <h1>美食地图</h1>
      <p class="about__lead">
        以行政区地图为线索，从全国下钻到省、市、区县，探索各地美食与特产。
      </p>
      <ul>
        <li>首页：中国全国地图，按省分块</li>
        <li>省级：进入后按市分块</li>
        <li>市级：进入后按区分块</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.about {
  min-height: calc(100vh - 64px);
  display: grid;
  place-items: center;
  padding: 40px 20px;
  background:
    radial-gradient(ellipse 60% 40% at 20% 20%, rgba(27, 75, 138, 0.12), transparent 60%),
    linear-gradient(165deg, #eef3f8, #dce7f1);
}

.about__panel {
  max-width: 36rem;
  color: #0f2444;
  font-family: 'Noto Serif SC', serif;
}

.about__eyebrow {
  margin: 0 0 8px;
  color: #b83b2e;
  letter-spacing: 0.35em;
  font-size: 0.8rem;
}

h1 {
  margin: 0;
  font-family: 'ZCOOL XiaoWei', 'Noto Serif SC', serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 400;
  letter-spacing: 0.14em;
}

.about__lead {
  margin: 16px 0 24px;
  line-height: 1.8;
  color: rgba(15, 36, 68, 0.72);
  letter-spacing: 0.04em;
}

ul {
  margin: 0;
  padding-left: 1.2rem;
  line-height: 2;
  letter-spacing: 0.04em;
}
</style>
