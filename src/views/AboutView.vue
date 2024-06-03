<template>
  <div class="container">
    <h1 class="history-title">История Ала Арчи</h1>
    <div class="head-block">
      <div class="head-content">
        <h3 style="color: #000000" class="head-content-title">
          Природный парк Ала-Арча был основан в 1976 г.
        </h3>
        <p class="head-content-text">
          Свое название парк получил за наличие арчи, придающей парку пестроту.
          Расположение парка было выбрано благодаря экологическому разнообразию,
          а также близкому расположению к городу Бишкек.
        </p>
      </div>
      <img src="../assets/img/park/ala-archa-history-1.png" class="head-img" />
    </div>
    <div class="clear"></div>
    <div class="history-blocks">
      <div class="history-block">
        <p class="history-block-text-mob">
          <b>Наиболее известные животные:<br /></b>бабочка-парусник, золотой
          орел, снежный гриф, туркестанская рысь и снежный барс.
        </p>
        <img
          src="../assets/img/park/ala-archa-history-2.png"
          class="history-flor"
          width="100%"
          alt=""
        />
        <img
          class="history-flor-mob-l"
          src="../assets/img/park/history-flor-1.png"
          alt=""
        />
        <img
          class="history-flor-mob-r"
          src="../assets/img/park/history-flor-2.png"
          alt=""
        />
        <p class="history-block-text">
          <b>Наиболее известные животные:<br /></b>бабочка-парусник, золотой
          орел, снежный гриф, туркестанская рысь и снежный барс.
        </p>
      </div>
      <div class="clear-mob"></div>
      <div class="history-block-center">
        <p class="history-block-text-mob">
          <b
            >В парке насчитывается 161 видов растений. Наиболее известные
            растения:<br /></b
          >красный и белый тюльпан, примула и незабудка.
        </p>
        <img
          src="../assets/img/park/ala-archa-history-3.png"
          width="100%"
          alt=""
        />
        <p class="history-block-text">
          <b
            >В парке насчитывается 161 видов растений. Наиболее известные
            растения:<br /></b
          >красный и белый тюльпан, примула и незабудка.
        </p>
      </div>
      <div class="history-block">
        <p class="history-block-text-mob">
          <b>Ала-Арча находится на горных хребтах Кыргыз Ала-Тоо.<br /></b>В
          парке текут три основные реки, из них самая большая река Ала-Арча, она
          имеет два больших притока Ак-Сай и Адыгине.
        </p>
        <img
          src="../assets/img/park/ala-archa-history-4.png"
          width="100%"
          alt=""
        />
        <p class="history-block-text">
          <b>Ала-Арча находится на горных хребтах Кыргыз Ала-Тоо.<br /></b>В
          парке текут три основные реки, из них самая большая река Ала-Арча, она
          имеет два больших притока Ак-Сай и Адыгине.
        </p>
      </div>
    </div>

    <div class="clear"></div>

    <div class="park">
      <h5>Парк разделен на 4 зоны</h5>
      <h4>Первая зона: Рекреационная</h4>
      <img :src="getImgUrl(currentFirstSlide)" class="park-mob-img" alt="" />
      <p>
        здесь посетители могут изучать парк в безопасной дружественной
        атмосфере.
      </p>
      <div class="park-blocks">
        <div class="park-blocks-sub-img">
          <img
            src="../assets/img/park/main.png"
            v-show="currentFirstSlide != 'main'"
            @click="currentFirstSlide = 'main'"
            alt=""
          />
          <img
            src="../assets/img/park/main2.png"
            v-show="currentFirstSlide != 'main2'"
            @click="currentFirstSlide = 'main2'"
            alt=""
          />
          <img
            src="../assets/img/park/main3.png"
            v-show="currentFirstSlide != 'main3'"
            @click="currentFirstSlide = 'main3'"
            alt=""
          />
        </div>
        <div class="park-blocks-tit-img">
          <img :src="getImgUrl(currentFirstSlide)" alt="" />
        </div>
      </div>
      <div class="clear"></div>
      <h4>Вторая зона: Спортивный Альпинизм</h4>
      <p>
        предназначена для профессиональных скалолазов. Здесь скалолазы могут
        восхищаться горными вершинами, которые были знамениты со времен
        Советского Союза.
      </p>
      <img :src="getImgUrl(currentSecondSlide)" class="park-mob-img" alt="" />
      <div class="park-blocks">
        <div class="park-blocks-sub-img">
          <img
            src="../assets/img/park/mount.png"
            v-show="currentSecondSlide != 'mount'"
            @click="currentSecondSlide = 'mount'"
            alt=""
          />
          <img
            src="../assets/img/park/mount2.png"
            v-show="currentSecondSlide != 'mount2'"
            @click="currentSecondSlide = 'mount2'"
            alt=""
          />
          <img
            src="../assets/img/park/mount3.png"
            v-show="currentSecondSlide != 'mount3'"
            @click="currentSecondSlide = 'mount3'"
            alt=""
          />
          <img
            src="../assets/img/park/mount4.png"
            v-show="currentSecondSlide != 'mount4'"
            @click="currentSecondSlide = 'mount4'"
            alt=""
          />
        </div>
        <div class="park-blocks-tit-img">
          <img :src="getImgUrl(currentSecondSlide)" alt="" />
        </div>
      </div>
      <div class="clear"></div>
      <h4>Репродуктивная зона</h4>
      <img :src="getImgUrl(currentThirdSlide)" class="park-mob-img" alt="" />
      <p>
        является еще одной зоной, запрещенной для посетителей парка. Местность
        находится под охраной для того, чтобы животные могли размножаться и жить
        в среде далекой от человеческого вмешательства.
      </p>
      <div class="park-blocks">
        <div class="park-blocks-sub-img" style="float: right">
          <img
            src="../assets/img/park/zone.png"
            v-show="currentThirdSlide != 'zone'"
            @click="currentThirdSlide = 'zone'"
            alt=""
          />
          <img
            src="../assets/img/park/zone1.png"
            v-show="currentThirdSlide != 'zone1'"
            @click="currentThirdSlide = 'zone1'"
            alt=""
          />
          <img
            src="../assets/img/park/zone2.png"
            v-show="currentThirdSlide != 'zone2'"
            @click="currentThirdSlide = 'zone2'"
            alt=""
          />
          <img
            src="../assets/img/park/zone3.png"
            v-show="currentThirdSlide != 'zone3'"
            @click="currentThirdSlide = 'zone3'"
            alt=""
          />
        </div>
        <div class="park-blocks-tit-img" style="float: left">
          <img :src="getImgUrl(currentThirdSlide)" alt="" />
        </div>
      </div>
      <div class="clear"></div>
      <h4>Зона кормления и наблюдения за дикими животными</h4>
      <img :src="getImgUrl(currentFourthSlide)" class="park-mob-img" alt="" />
      <p>
        запрещена для посетителей. Зона охраняется в целях проведения научных
        исследований за живой природой вне человеческого влияния.
      </p>
      <div class="park-blocks">
        <div class="park-blocks-sub-img">
          <img
            src="../assets/img/park/feed.png"
            v-show="currentFourthSlide != 'feed'"
            @click="currentFourthSlide = 'feed'"
            alt=""
          />
          <img
            src="../assets/img/park/feed1.png"
            v-show="currentFourthSlide != 'feed1'"
            @click="currentFourthSlide = 'feed1'"
            alt=""
          />
          <img
            src="../assets/img/park/feed2.png"
            v-show="currentFourthSlide != 'feed2'"
            @click="currentFourthSlide = 'feed2'"
            alt=""
          />
        </div>
        <div class="park-blocks-tit-img">
          <img :src="getImgUrl(currentFourthSlide)" alt="" />
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>

  <footer class="green">
    <div class="container">
      <div class="row">
        <div class="logo">
          <img src="../assets/img/icons/logo.png" alt="logo" />
          <h6>Природный парк "Ала-Арча"</h6>
        </div>
        <div class="navigation">
          <h6>Навигация</h6>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/about-us">История</a></li>
            <li><a href="/flora">Флора</a></li>
            <li><a href="/fauna">Фауна</a></li>
            <li><a href="/services">Услуги</a></li>
            <li><a href="/entry">Въезд</a></li>
          </ul>
        </div>
        <div class="contacts">
          <h6>Контакты</h6>
          <ul>
            <li>
              Менеджер (PR-маркетинг) <br />
              +996 (700) 267 680
            </li>
            <br />
            <li>
              КПП (пункт пропуска) <br />
              +996 (312) 88 32 05
            </li>
            <br />
          </ul>
        </div>
        <div class="address">
          <h6>Адрес</h6>
          <ul>
            <li>
              Кыргызская Республика, Чуйская обл, Аламудунский р-н, село
              Кашка-Суу
            </li>
          </ul>
          <h6>Электронный адрес</h6>
          <ul>
            <li>ala-archa@list.ru</li>
          </ul>
        </div>
        <div class="social">
          <h6>Социальные сети</h6>
          <ul>
            <li><img src="../assets/img/icons/facebook.png" alt="" /></li>
            <li><img src="../assets/img/icons/instagram.png" alt="" /></li>
            <li><img src="../assets/img/icons/twitter.png" alt="" /></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentFirstSlide: "main",
      currentSecondSlide: "mount",
      currentThirdSlide: "zone",
      currentFourthSlide: "feed",
    };
  },
  methods: {
    getImgUrl(image) {
      return require(`../assets/img/park/${image}.png`);
    },
  },
};
</script>

<style src="../assets/css/all.css" />
