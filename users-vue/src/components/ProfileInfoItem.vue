<template>
  <md-list-item>
    <div class="md-list-item-text profile-info-item" v-if="isMobileDevice">
      <span class="mobile-title">{{ name }}</span>
      <span class="mobile-description">{{ value }}</span>
    </div>
    <div class="md-list-item-text profile-info-item" v-if="!isMobileDevice">
      <span>{{ name }}</span>
    </div>
    <div class="md-list-item-text profile-info-item" v-if="!isMobileDevice">
      <span> {{ value }}
      </span>
    </div>
    <md-button class="md-icon-button md-list-action" v-on:click="$emit('update-info')">
      <svg width="18" height="18" viewBox="0 0 700.000000 700.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,700.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path d="M5795 6978 c-7 -15 -24 -27 -50 -33 -24 -6 -60 -28 -89 -55 -41 -37
            -883 -879 -931 -931 -20 -21 -19 -39 2 -39 9 0 277 -261 595 -580 321 -322
            590 -583 603 -586 16 -4 26 0 33 11 5 10 214 223 464 474 344 345 463 471 489
            516 l34 60 0 141 c0 137 -1 142 -27 180 -16 22 -28 50 -28 62 0 13 -8 26 -17
            29 -23 9 -417 403 -426 426 -3 9 -11 17 -17 17 -13 0 -195 182 -203 204 -4 9
            -13 16 -20 16 -8 0 -22 9 -32 20 -9 10 -40 27 -67 36 -27 9 -54 25 -61 35 -10
            17 -25 19 -127 19 -110 0 -116 -1 -125 -22z"></path>
          <path d="M2578 3819 c-1530 -1532 -1818 -1824 -1818 -1847 0 -23 95 -123 569
            -597 312 -314 573 -580 580 -592 15 -29 45 -29 66 0 13 19 2922 2934 3437
            3444 156 154 177 178 172 200 -4 14 -240 258 -575 593 -313 312 -573 579 -579
            594 -5 14 -15 26 -22 25 -7 0 -831 -819 -1830 -1820z"></path>
          <path d="M394 1639 c-4 -7 -8 -42 -10 -78 -1 -36 -12 -91 -23 -121 -11 -30
            -25 -85 -30 -121 -5 -36 -18 -84 -29 -105 -10 -21 -22 -67 -25 -102 -4 -34
            -16 -84 -26 -110 -11 -26 -25 -80 -31 -120 -6 -41 -17 -87 -25 -103 -8 -15
            -20 -63 -26 -106 -5 -43 -18 -96 -28 -118 -10 -22 -23 -75 -30 -118 -6 -43
            -18 -91 -26 -107 -9 -17 -21 -66 -27 -111 -9 -66 -15 -83 -35 -96 -14 -9 -23
            -25 -23 -40 0 -26 0 -26 78 -20 44 2 91 12 111 22 18 10 70 23 115 30 44 6 95
            19 112 28 16 8 59 19 95 23 35 3 84 15 108 26 25 11 81 26 125 33 45 7 97 19
            116 28 19 8 62 18 95 22 33 4 81 16 107 26 26 10 82 25 125 33 43 8 96 21 119
            30 22 8 69 19 105 24 130 19 221 69 174 95 -11 7 -280 272 -598 589 -318 318
            -580 578 -582 578 -2 0 -7 -5 -11 -11z"></path>
        </g>
      </svg>
    </md-button>
  </md-list-item>
</template>

<script>
export default {
  name: 'ProfileInfoItem',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    isMobileDevice: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.md-list-action:hover {
  svg path {
    fill: #00A161;
  }
}
</style>
