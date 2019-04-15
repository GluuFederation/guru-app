<template>
  <div class="entry">
    <div class="title">
      <b-img  :src="ticketSvgUrl" v-if="entryType =='ticket'"/>
      <b-img  :src="commentNotificationSvgUrl" v-else/>
    </div>
    <div class="body">
      <div class="d-flex align-items-center">
        <div>
          <b-card-img :src="avatarUrl" rounded="circle" />
        </div>
        <div>
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GluuTimelineEntry',
  props: {
    entryType: {
      validator: function (value) {
        return ['ticket', 'comment'].indexOf(value) !== -1
      }
    },
    avatarUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  computed: {
    commentNotificationSvgUrl(){
      return require('@/assets/images/commentNotification.svg');
    },
    ticketSvgUrl(){
      return require('@/assets/images/ticket.svg');
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/global.scss";
.entry:last-child{
  .title{
    margin-bottom: 0;
  }
  .body{
    margin-top: 1em;
  }
}

.entry {
  clear: both;
  text-align: left;
  position: relative;
  display: flex;
  align-items: center;
  .title {
    margin: 1em 0;
    float: left;
    text-align: right;
    position: relative;
    display: flex;
    align-items: center;
    left: 1em;
    width: fit-content;
  }
  .body {
    margin-left: 2em;
    img{
      width: 80%;
    }
    @include gluu-text(14px, $font-family-base, #434947);
  }
}
</style>
