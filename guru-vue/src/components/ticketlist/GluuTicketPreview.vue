<template>
  <div class="preview-card">
    <b-row class="mt-lg-2">
      <b-col cols="12">
        <b-card class="card-gluu">

          <div class="card-left-side-gluu d-flex justify-content-center align-items-center">
            <div class="d-flex flex-column align-items-start">
              <b-card-img :src="avatarUrl" rounded="circle" class="img-fluid " />

              <div class="card-left-side-info-gluu d-flex justify-content-center flex-column mt-lg-2">
                <span class="card-left-side-info-name-gluu">{{ ticket.createdBy.fullName }}</span>
                <span class="card-left-side-info-company-gluu"> {{ ticket.companyAssociation.name }} </span>
                <span class="card-left-side-info-type-gluu">Enterprise</span>
              </div>
            </div>
          </div>


          <div class="card-right-side-gluu d-flex justify-content-between">
            <div>
              <div class="card-right-side-badge-container">
                <gluu-badge  class="badge-status" v-bind:class="ticket.status">{{ ticket.status }}</gluu-badge>
                <gluu-badge  class="badge-issue-type" v-bind:class="ticket.issueType" >{{ ticket.issueType }}</gluu-badge>
                <gluu-badge  class="badge-category">{{ ticket.category }}</gluu-badge>
              </div>

              <div class="card-right-side-issue-title-gluu">
                <router-link :to="ticketLink">{{ ticket.title }}</router-link>
              </div>

              <div class="card-right-side-issue-details-gluu">
                <span class="card-right-side-issue-details-number-gluu">#{{ ticket.id }}</span>
                <span class="card-right-side-issue-details-date-gluu"><strong>Created</strong> : {{ ticket.createdAt }}</span>
                <span class="card-right-side-issue-details-time-gluu"><strong>Last updated</strong>  : {{ ticket.updatedAt }} by {{ ticket.updatedBy}} </span>
              </div>
            </div>

            <div class="card-right-right-side-gluu d-flex flex-column justify-content-center ml-lg-2">
              <label><b-img :src="commentSvgUrl" /> {{ ticket.responseNo }} {{ ticket.responseNo | pluralize('en', ['response', 'responses']) }} </label>
              <label><b-img :src="clapSvgUrl" /> {{ ticket.votes }} {{ ticket.votes | pluralize('en', ['vote', 'votes']) }} </label>
              <label> <b-img :src="userSvgUrl" /> <span>Asim zaka</span> <b-img :src="arrowDownUrl" /> </label>
            </div>
          </div>

        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import GluuBadge from '@/components/includes/badge/GluuBadge'
export default {
  name: 'GluuTicketPreview',
  components: {
    GluuBadge
  },
  props: {
    ticket: {
      type: Object,
      required: true
    },
    badges: Array
  },
  computed: {
    ticketLink () {
      return {
        name: 'TicketDetail',
        params: {
          slug: this.ticket.slug
        }
      }
    },
    avatarUrl() {
      return require('@/assets/images/avatar.svg')
    },
    commentSvgUrl() {
      return require('@/assets/images/comment.svg')
    },
    clapSvgUrl() {
      return require('@/assets/images/clap.svg')
    },
    userSvgUrl() {
      return require('@/assets/images/user.svg')
    },
    arrowDownUrl() {
      return require('@/assets/images/arrow_down.svg')
    }
  }
}
</script>

<style lang="scss">
@import 'GluuTicketPreview';
</style>
