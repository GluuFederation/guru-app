<template>
  <div class="preview-card">
    <b-row class="mt-lg-2">
      <b-col cols="12">
        <b-card class="card-gluu">
          <div class="card-left-side-gluu d-flex justify-content-center align-items-center">
            <div class="d-flex flex-column align-items-start">
              <b-card-img :src="avatarUrl" rounded="circle" class="img-fluid"/>

              <div
                class="card-left-side-info-gluu d-flex justify-content-center flex-column mt-lg-2"
              >
                <span class="card-left-side-info-name-gluu">{{ ticket.createdBy.fullName }}</span>
                <span
                  class="card-left-side-info-company-gluu"
                  v-if="ticket.companyAssociation"
                >{{ ticket.companyAssociation.name }}</span>
                <span class="card-left-side-info-type-gluu">Enterprise</span>
              </div>
            </div>
          </div>

          <div class="card-right-side-gluu d-flex justify-content-between">
            <div>
              <div class="card-right-side-badge-container">
                <gluu-badge class="badge-status" v-bind:class="status.slug">{{ status.name }}</gluu-badge>
                <gluu-badge class="badge-issue-type" v-bind:class="type.slug">{{ type.name }}</gluu-badge>
                <gluu-badge class="badge-category">{{ category.name }}</gluu-badge>
              </div>

              <div class="card-right-side-issue-title-gluu">
                <router-link :to="ticketLink">{{ ticket.title }}</router-link>
              </div>

              <div class="card-right-side-issue-details-gluu">
                <span class="card-right-side-issue-details-number-gluu">#{{ ticket.id }}</span>&ensp;
                <span class="card-right-side-issue-details-date-gluu">
                  <strong>Created</strong>
                  : {{ createdOn }}
                </span>
                <span class="card-right-side-issue-details-time-gluu" v-if="ticket.updatedBy">
                  <strong>Last updated</strong>
                  : {{ updatedOn }} by {{ ticket.updatedBy.fullName }}
                </span>
              </div>
            </div>

            <div
              class="card-right-right-side-gluu d-flex flex-column justify-content-center ml-lg-2"
            >
              <label>
                <b-img :src="commentSvgUrl"/>
                {{ ticket.responseNumber }} {{ ticket.responseNumber | pluralize('en', ['response', 'responses']) }}
              </label>
              <label>
                <b-img :src="clapSvgUrl"/>
                {{ ticket.voters.length }} {{ ticket.voters.length | pluralize('en', ['vote', 'votes']) }}
              </label>
              <label v-if="ticket.assignee">
                <b-img :src="userSvgUrl"/>
                <span>{{ ticket.assignee.fullName }}</span>
                <b-img :src="arrowDownUrl"/>
              </label>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import GluuBadge from "@/components/includes/badge/GluuBadge";
export default {
  name: "GluuTicketPreview",
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
    ...mapGetters(["products", "categories", "statuses", "types"]),
    ticketLink() {
      return {
        name: "TicketDetail",
        params: {
          slug: this.ticket.slug
        }
      };
    },
    avatarUrl() {
      return require("@/assets/images/avatar.svg");
    },
    commentSvgUrl() {
      return require("@/assets/images/comment.svg");
    },
    clapSvgUrl() {
      return require("@/assets/images/clap.svg");
    },
    userSvgUrl() {
      return require("@/assets/images/user.svg");
    },
    arrowDownUrl() {
      return require("@/assets/images/arrow_down.svg");
    },
    category() {
      const category = this.categories.find(
        cat => cat.id === this.ticket.category
      );
      if (category) return category;
      return {};
    },
    product() {
      const product = this.products.find(p => p.id === this.ticket.product);
      if (product) return product;
      return {};
    },
    status() {
      const status = this.statuses.find(s => s.id === this.ticket.status);
      if (status) return status;
      return {};
    },
    type() {
      const type = this.types.find(t => t.id === this.ticket.issueType);
      if (type) return type;
      return {};
    },
    createdOn() {
      return moment(this.ticket.createdOn).format("LLL");
    },
    updatedOn() {
      return moment(this.ticket.updatedOn).fromNow();
    }
  }
};
</script>

<style lang="scss">
@import "GluuTicketPreview";
</style>
