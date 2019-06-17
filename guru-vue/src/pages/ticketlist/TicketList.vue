<template>
  <div id="tickets-page-container">
    <gluu-sub-navbar></gluu-sub-navbar>
    <div id="content-container" class="mt-lg-5">
      <b-container>
        <b-row>
          <b-col lg="3">
            <div id="sidebar-container">
              <div class="sideBar">
                <b-card class="card-gluu">
                  <b-card-header class="card-title-gluu">Advance Filter</b-card-header>
                  <b-card-body>
                    <b-form-group>
                      <label class="card-labels-gluu">Company:</label>
                      <div>
                        <gluu-tag
                          v-for="(item, key) in ticketFilters.companies"
                          :key="key"
                          :tag="item"
                          v-on:clear="removeCompanyTag"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu single-select"
                        v-model="ticketFilters.companies"
                        :options="companyOptions"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select company"
                        label="name"
                        track-by="id"
                      >
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                          <span
                            class="multiselect__single"
                            v-if="values.length &amp;&amp; !isOpen"
                          >{{ values.length }} options selected</span>
                        </template>
                      </multi-select>
                    </b-form-group>

                    <b-form-group>
                      <label class="card-labels-gluu single-select">Created by:</label>
                      <div>
                        <gluu-tag
                          v-for="(item, key) in ticketFilters.createdBy"
                          :key="key"
                          :tag="item"
                          v-on:clear="removeAuthorTag"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu"
                        v-model="ticketFilters.createdBy"
                        :options="createdByOptions"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select Author"
                        label="name"
                        track-by="id"
                      >
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                          <span
                            class="multiselect__single"
                            v-if="values.length &amp;&amp; !isOpen"
                          >{{ values.length }} options selected</span>
                        </template>
                      </multi-select>
                    </b-form-group>

                    <b-form-group>
                      <label class="card-labels-gluu">Assigned to:</label>
                      <div>
                        <gluu-tag
                          v-for="(item, key) in ticketFilters.assignedTo"
                          :key="key"
                          :tag="item"
                          v-on:clear="removeAssignedToTag"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu single-select"
                        v-model="ticketFilters.assignedTo"
                        :options="assignedToOptions"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select Assignee"
                        label="name"
                        track-by="id"
                      >
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                          <span
                            class="multiselect__single"
                            v-if="values.length &amp;&amp; !isOpen"
                          >{{ values.length }} options selected</span>
                        </template>
                      </multi-select>
                    </b-form-group>

                    <b-form-group>
                      <label class="card-labels-gluu">Category</label>
                      <div>
                        <gluu-tag
                          v-for="(item, key) in ticketFilters.categories"
                          :key="key"
                          :tag="item"
                          v-on:clear="removeCategoryTag"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu single-select"
                        v-model="ticketFilters.categories"
                        :options="categories"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select category"
                        label="name"
                        track-by="slug"
                        @select="addCategoryTag"
                        @remove="removeCategoryTag"
                      >
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                          <span
                            class="multiselect__single"
                            v-if="values.length &amp;&amp; !isOpen"
                          >{{ values.length }} options selected</span>
                        </template>
                      </multi-select>
                    </b-form-group>

                    <b-form-group>
                      <label class="card-labels-gluu">Product</label>
                      <multi-select
                        class="select-tags-gluu single-select"
                        v-model="ticketFilters.products"
                        :options="products"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select product"
                        label="name"
                        track-by="slug"
                        @select="addProductTag"
                        @remove="removeProductTag"
                      >
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                          <span
                            class="multiselect__single"
                            v-if="values.length &amp;&amp; !isOpen"
                          >{{ values.length }} options selected</span>
                        </template>
                      </multi-select>
                    </b-form-group>

                    <b-form-group>
                      <label class="card-labels-gluu">Issue Type</label>
                      <multi-select
                        class="select-tags-gluu single-select"
                        v-model="ticketFilters.types"
                        :options="types"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select issue type"
                        label="name"
                        track-by="slug"
                        @select="addIssueTypeTag"
                        @remove="removeIssueTypeTag"
                      >
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                          <span
                            class="multiselect__single"
                            v-if="values.length &amp;&amp; !isOpen"
                          >{{ values.length }} options selected</span>
                        </template>
                      </multi-select>
                    </b-form-group>

                    <b-form-group>
                      <label class="card-labels-gluu">Status</label>
                      <multi-select
                        class="select-tags-gluu single-select"
                        v-model="ticketFilters.statuses"
                        :options="statuses"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select status"
                        label="name"
                        track-by="slug"
                        @select="addStatusTag"
                        @remove="removeStatusTag"
                      >
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                          <span
                            class="multiselect__single"
                            v-if="values.length &amp;&amp; !isOpen"
                          >{{ values.length }} options selected</span>
                        </template>
                      </multi-select>
                    </b-form-group>

                    <b-form-group>
                      <label class="card-labels-gluu">Created date:</label>
                      <VueCtkDateTimePicker
                        v-model="dateRange"
                        format="YYYY-MM-DD"
                        formatted="ll"
                        :range="true"
                        :customShortcuts="customShortcuts"
                        color="#00B372"
                      />
                    </b-form-group>
                  </b-card-body>
                </b-card>
              </div>
            </div>
          </b-col>
          <b-col lg="9">
            <div id="ticket-list-container">
              <div id="ticket-list">
                <div id="search-container">
                  <b-row class="mb-lg-4">
                    <b-col lg="5">
                      <div id="search-bar-container" class="d-flex align-items-center">
                        <b-form-input v-model="query" type="text" placeholder="Type the keyword"/>
                        <span>
                          <b-img :src="searchIconUrl"></b-img>
                        </span>
                      </div>
                    </b-col>

                    <b-col lg="5" offset-lg="2">
                      <div
                        id="order-by-select-container"
                        class="d-flex align-items-center justify-content-end"
                      >
                        <label class="card-labels-gluu">Order by:</label>
                        <multi-select
                          class="select-tags-gluu"
                          v-model="ticketFilters.orderBy"
                          :options="orderByOptions"
                          label="name"
                          track-by="name"
                          :show-labels="false"
                          :allowEmpty="false"
                          :searchable="false"
                          openDirection="bottom"
                        ></multi-select>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col cols="12">
                      <div id="tags-container" class="d-flex">
                        <div>Results Found</div>
                        <!--<div class="d-flex flex-wrap">
                          <div class="ml-lg-2" v-for="(item, key) in configFilters" :key="key">
                            <gluu-tag :tag="item" v-on:clear="removeConfigTag" type="outline"></gluu-tag>
                          </div>
                        </div>-->
                        <div class="ml-auto clear-all-btn">
                          <a v-on:click="clearAllTags">Clear all</a>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </div>

                <div id="tickets-container">
                  <gluu-ticket-preview
                    v-for="ticket in tickets"
                    :ticket="ticket"
                    :key="ticket.slug"
                  ></gluu-ticket-preview>
                </div>

                <div id="tickets-footer">
                  <b-row class="d-flex align-items-center">
                    <b-col lg="5">
                      <div id="pagination-container" class="d-flex align-items-center">
                        <label class="card-labels-gluu">Show:</label>
                        <multi-select
                          class="select-tags-gluu"
                          v-model="ticketPagination.itemsPerPage"
                          :options="paginationOptions"
                          :show-labels="false"
                          :allowEmpty="false"
                          :searchable="false"
                          openDirection="bottom"
                        ></multi-select>
                        <span class="pagination-container-second-span">of 150 tickets</span>
                      </div>
                    </b-col>

                    <b-col lg="5" offset-lg="2">
                      <div id="pagination-container-2" class="d-flex align-items-center">
                        <div class="pagination-container-2-buttons">
                          <a href>1</a>
                        </div>
                        <div class="pagination-container-2-buttons">
                          <a href>2</a>
                        </div>
                        <div class="pagination-container-2-buttons">
                          <a href>3</a>
                        </div>

                        <div class="ellipsis-container">
                          <span>.......</span>
                        </div>
                        <div class="pagination-container-2-buttons">
                          <a href>14</a>
                        </div>
                        <div class="pagination-container-2-buttons">
                          <a href>15</a>
                        </div>
                        <div id="pagination-container-2-nextbtn">Next</div>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_TICKETS,
  FETCH_ASSOCIATED_COMPANIES
} from "@/store/actions.type";
import {
  SET_PAGINATION_ITEMS,
  SET_PAGINATION_PAGE,
  ADD_FILTER_COMPANY,
  ADD_FILTER_CREATOR,
  ADD_FILTER_ASSIGNEE,
  ADD_FILTER_CATEGORY,
  ADD_FILTER_PRODUCT,
  ADD_FILTER_TYPE,
  ADD_FILTER_STATUS,
  REMOVE_FILTER_COMPANY,
  REMOVE_FILTER_CREATOR,
  REMOVE_FILTER_ASSIGNEE,
  REMOVE_FILTER_CATEGORY,
  REMOVE_FILTER_PRODUCT,
  REMOVE_FILTER_TYPE,
  REMOVE_FILTER_STATUS,
  CLEAR_FILTER_COMPANIES,
  CLEAR_FILTER_CREATORS,
  CLEAR_FILTER_ASSIGNEES,
  CLEAR_FILTER_CATEGORIES,
  CLEAR_FILTER_PRODUCTS,
  CLEAR_FILTER_TYPES,
  CLEAR_FILTER_STATUSES,
  SET_FILTER_START_DATE,
  SET_FILTER_END_DATE,
  SET_SEARCH_TEXT
} from "@/store/mutations.type";
import GluuSubNavbar from "@/components/ticketlist/GluuSubNavbar";
import GluuTicketPreview from "@/components/ticketlist/GluuTicketPreview";
import GluuTag from "@/components/includes/tag/GluuTag";
export default {
  name: "TicketList",
  components: {
    GluuSubNavbar,
    GluuTicketPreview,
    GluuTag
  },
  data() {
    return {
      query: "",
      companyOptions: [],
      createdByOptions: [],
      assignedToOptions: [],
      orderByOptions: [
        { name: "Most recent", value: "+recent" },
        { name: "Least recent", value: "-recent" },
        { name: "User (a-z)", value: "a-z" },
        { name: "User (z-a)", value: "z-a" }
      ],
      dateRange: null,
      customShortcuts: [
        { label: "Today", value: "day", isSelected: true },
        { label: "Yesterday", value: "-day", isSelected: false },
        { label: "This Week", value: "week", isSelected: false },
        { label: "Last Week", value: "-week", isSelected: false },
        { label: "This Month", value: "month", isSelected: false },
        { label: "Last Month", value: "-month", isSelected: false },
        { label: "Last 30 days", value: 30, isSelected: false }
      ],
      paginationOptions: [10, 15, 20, 25]
    };
  },
  computed: {
    ...mapGetters([
      "tickets",
      "ticketPagination",
      "ticketFilters",
      "products",
      "categories",
      "statuses",
      "types"
    ]),
    searchIconUrl() {
      return require("@/assets/images/search.svg");
    }
  },
  methods: {
    removeCompanyTag(company) {
      this.$store.commit(REMOVE_FILTER_COMPANY, company);
      this.$store.dispatch(FETCH_TICKETS);
    },

    removeAuthorTag(author) {
      this.$store.commit(REMOVE_FILTER_CREATOR, author);
      this.$store.dispatch(FETCH_TICKETS);
    },

    removeAssignedToTag(assignee) {
      this.$store.commit(REMOVE_FILTER_ASSIGNEE, assignee);
      this.$store.dispatch(FETCH_TICKETS);
    },

    addCategoryTag(category) {
      this.$store.commit(ADD_FILTER_CATEGORY, category);
      this.$store.dispatch(FETCH_TICKETS);
    },

    removeCategoryTag(category) {
      this.$store.commit(REMOVE_FILTER_CATEGORY, category);
      this.$store.dispatch(FETCH_TICKETS);
    },

    addProductTag(product) {
      this.$store.commit(ADD_FILTER_PRODUCT, product);
      this.$store.dispatch(FETCH_TICKETS);
    },
    removeProductTag(product) {
      this.$store.commit(REMOVE_FILTER_PRODUCT, product);
      this.$store.dispatch(FETCH_TICKETS);
    },

    addIssueTypeTag(type) {
      this.$store.commit(ADD_FILTER_TYPE, type);
      this.$store.dispatch(FETCH_TICKETS);
    },
    removeIssueTypeTag(type) {
      this.$store.commit(REMOVE_FILTER_TYPE, type);
      this.$store.dispatch(FETCH_TICKETS);
    },

    addStatusTag(status) {
      this.$store.commit(ADD_FILTER_STATUS, status);
      this.$store.dispatch(FETCH_TICKETS);
    },

    removeStatusTag(status) {
      this.$store.commit(REMOVE_FILTER_STATUS, status);
      this.$store.dispatch(FETCH_TICKETS);
    },

    addConfigTag(_tag, configFilterType) {
      const tag = {
        configFilterType: configFilterType,
        name: _tag.name,
        slug: _tag.slug
      };
      this.configFilters.push(tag);
    },

    removeConfigTag(tag, configFilterType = null) {
      var indexOfTag;
      if (configFilterType === null) {
        indexOfTag = this.configFilters.indexOf(tag);
        switch (tag.configFilterType) {
          case "category":
            this.category.splice(
              this.category.findIndex(item => item.slug === tag.slug),
              1
            );
            break;
          case "product":
            this.product.splice(
              this.product.findIndex(item => item.slug === tag.slug),
              1
            );
            break;
          case "issueType":
            this.issueType.splice(
              this.issueType.findIndex(item => item.slug === tag.slug),
              1
            );
            break;
          case "status":
            this.status.splice(
              this.status.findIndex(item => item.slug === tag.slug),
              1
            );
            break;
        }
      } else {
        indexOfTag = this.configFilters.findIndex(
          item =>
            item.configFilterType === configFilterType &&
            item.name === tag.name &&
            item.slug === tag.slug
        );
      }
      this.configFilters.splice(indexOfTag, 1);
    },

    clearAllTags() {
      this.$store.commit(CLEAR_FILTER_COMPANIES);
      this.$store.commit(CLEAR_FILTER_CREATORS);
      this.$store.commit(CLEAR_FILTER_ASSIGNEES);
      this.$store.commit(CLEAR_FILTER_CATEGORIES);
      this.$store.commit(CLEAR_FILTER_PRODUCTS);
      this.$store.commit(CLEAR_FILTER_STATUSES);
      this.$store.commit(CLEAR_FILTER_TYPES);
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_TICKETS);
    this.$store.dispatch(FETCH_ASSOCIATED_COMPANIES);
  }
};
</script>

<style lang="scss">
@import "TicketList";
</style>

