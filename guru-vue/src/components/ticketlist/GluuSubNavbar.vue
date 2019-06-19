<template>
  <div id="nav-tabs-container">
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-nav class="align-items-center">
            <b-nav-item>
              <b-dropdown variant="link" no-caret>
                <template slot="button-content">
                  My assignment
                  <v-icon name="angle-down" class="ml-lg-2"></v-icon>
                </template>
                <b-dropdown-item v-on:click="myAssignmentsInProgress">In progress</b-dropdown-item>
                <b-dropdown-item v-on:click="myAssignmentsPending">Pending</b-dropdown-item>
              </b-dropdown>
            </b-nav-item>
            <b-nav-item class="nav-item-gluu" v-on:click="unassigned">Unassigned</b-nav-item>
            <b-nav-item>
              <b-dropdown variant="link" no-caret>
                <template slot="button-content">
                  All tickets
                  <v-icon name="angle-down" class="ml-lg-2"></v-icon>
                </template>
                <b-dropdown-item v-on:click="newTickets">New</b-dropdown-item>
                <b-dropdown-item v-on:click="assigned">Assigned</b-dropdown-item>
                <b-dropdown-item v-on:click="inProgress">In progress</b-dropdown-item>
                <b-dropdown-item v-on:click="pending">Pending</b-dropdown-item>
                <b-dropdown-item v-on:click="closed">Closed</b-dropdown-item>
              </b-dropdown>
            </b-nav-item>
            <b-nav-item>
              <b-dropdown variant="link" no-caret>
                <template slot="button-content">
                  My tickets
                  <v-icon name="angle-down" class="ml-lg-2"></v-icon>
                </template>
                <b-dropdown-item v-on:click="myTicketsAssigned">Assigned</b-dropdown-item>
                <b-dropdown-item v-on:click="myTicketsClosed">Closed</b-dropdown-item>
              </b-dropdown>
            </b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "vue-awesome/icons/angle-down";
import { FETCH_TICKETS } from "@/store/actions.type";
import {
  ADD_FILTER_CREATOR,
  ADD_FILTER_ASSIGNEE,
  ADD_FILTER_STATUS,
  CLEAR_FILTER_COMPANIES,
  CLEAR_FILTER_CREATORS,
  CLEAR_FILTER_ASSIGNEES,
  CLEAR_FILTER_CATEGORIES,
  CLEAR_FILTER_PRODUCTS,
  CLEAR_FILTER_TYPES,
  CLEAR_FILTER_STATUSES
} from "@/store/mutations.type";
export default {
  name: "GluuSubNavbar",
  computed: {
    ...mapGetters(["currentUser", "statuses"])
  },
  methods: {
    myAssignmentsInProgress() {
      this.clearFilters();
      this.$store.commit(ADD_FILTER_ASSIGNEE, {
        id: this.currentUser.id,
        name: `${this.currentUser.firstName} ${this.currentUser.otherNames} ${
          this.currentUser.lastName
        }`
      });
      this.$store.commit(
        ADD_FILTER_STATUS,
        this.statuses.find(s => s.slug === "in-progress")
      );
      this.$store.dispatch(FETCH_TICKETS);
    },
    myAssignmentsPending() {
      this.clearFilters();
      this.$store.commit(ADD_FILTER_ASSIGNEE, {
        id: this.currentUser.id,
        name: `${this.currentUser.firstName} ${this.currentUser.otherNames} ${
          this.currentUser.lastName
        }`
      });
      this.$store.commit(
        ADD_FILTER_STATUS,
        this.statuses.find(s => s.slug === "pending")
      );
      this.$store.dispatch(FETCH_TICKETS);
    },
    unassigned() {
      this.clearFilters();
      this.$store.commit(ADD_FILTER_ASSIGNEE, {
        id: "-1",
        name: "Unassigned"
      });
      this.$store.dispatch(FETCH_TICKETS);
    },
    newTickets() {
      this.clearFilters();
      this.$store.commit(
        ADD_FILTER_STATUS,
        this.statuses.find(s => s.slug === "new")
      );
      this.$store.dispatch(FETCH_TICKETS);
    },
    inProgress() {
      this.clearFilters();
      this.$store.commit(
        ADD_FILTER_STATUS,
        this.statuses.find(s => s.slug === "in-progress")
      );
      this.$store.dispatch(FETCH_TICKETS);
    },
    assigned() {
      this.clearFilters();
      this.$store.commit(
        ADD_FILTER_STATUS,
        this.statuses.find(s => s.slug === "assigned")
      );
      this.$store.dispatch(FETCH_TICKETS);
    },
    pending() {
      this.clearFilters();
      this.$store.commit(
        ADD_FILTER_STATUS,
        this.statuses.find(s => s.slug === "pending")
      );
      this.$store.dispatch(FETCH_TICKETS);
    },
    closed() {
      this.clearFilters();
      this.$store.commit(
        ADD_FILTER_STATUS,
        this.statuses.find(s => s.slug === "closed")
      );
      this.$store.dispatch(FETCH_TICKETS);
    },
    myTicketsAssigned() {
      this.clearFilters();
      this.$store.commit(ADD_FILTER_CREATOR, {
        id: this.currentUser.id,
        name: `${this.currentUser.firstName} ${this.currentUser.otherNames} ${
          this.currentUser.lastName
        }`
      });
      this.$store.commit(ADD_FILTER_ASSIGNEE, {
        id: "-2",
        name: "Assigned"
      });
      this.$store.dispatch(FETCH_TICKETS);
    },
    myTicketsClosed() {
      this.clearFilters();
      this.$store.commit(ADD_FILTER_CREATOR, {
        id: this.currentUser.id,
        name: `${this.currentUser.firstName} ${this.currentUser.otherNames} ${
          this.currentUser.lastName
        }`
      });
      this.$store.commit(
        ADD_FILTER_STATUS,
        this.statuses.find(s => s.slug === "closed")
      );
      this.$store.dispatch(FETCH_TICKETS);
    },
    clearFilters() {
      this.$store.commit(CLEAR_FILTER_COMPANIES);
      this.$store.commit(CLEAR_FILTER_CREATORS);
      this.$store.commit(CLEAR_FILTER_ASSIGNEES);
      this.$store.commit(CLEAR_FILTER_CATEGORIES);
      this.$store.commit(CLEAR_FILTER_PRODUCTS);
      this.$store.commit(CLEAR_FILTER_STATUSES);
      this.$store.commit(CLEAR_FILTER_TYPES);
    }
  }
};
</script>

<style lang="scss">
@import "GluuSubNavbar";
</style>
