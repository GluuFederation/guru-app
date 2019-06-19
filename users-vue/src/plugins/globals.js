import Vue from "vue";

const Globals = {
  install(vue) {
    vue.prototype.globalProps = {
      isChrome:
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor)
    };
  }
};

Vue.use(Globals);
