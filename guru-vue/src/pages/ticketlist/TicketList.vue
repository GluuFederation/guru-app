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
                          :action="actions.removeFilterCompany"
                          v-on:clear="filterAction"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu single-select"
                        v-model="ticketFilters.companies"
                        :options="companyOptions"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select company"
                        label="name"
                        track-by="id"
                        @search-change="getCompanyList"
                        @input="filterChange"
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
                          :action="actions.removeFilterCreator"
                          v-on:clear="filterAction"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu"
                        v-model="ticketFilters.createdBy"
                        :options="createdByOptions"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select Author"
                        label="name"
                        track-by="id"
                        @search-change="getCreatorList"
                        @input="filterChange"
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
                          :action="actions.removeFilterAssignee"
                          v-on:clear="filterAction"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu"
                        v-model="ticketFilters.assignedTo"
                        :options="assignedToOptions"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select Assignee"
                        label="name"
                        track-by="id"
                        @search-change="getAssigneeList"
                        @input="filterChange"
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
                          :action="actions.removeFilterCategory"
                          v-on:clear="filterAction"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu"
                        v-model="ticketFilters.categories"
                        :options="categories"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select category"
                        label="name"
                        track-by="slug"
                        @input="filterChange"
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
                      <div>
                        <gluu-tag
                          v-for="(item, key) in ticketFilters.products"
                          :key="key"
                          :tag="item"
                          :action="actions.removeFilterProduct"
                          v-on:clear="filterAction"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu"
                        v-model="ticketFilters.products"
                        :options="products"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select product"
                        label="name"
                        track-by="id"
                        @input="filterChange"
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
                      <div>
                        <gluu-tag
                          v-for="(item, key) in ticketFilters.types"
                          :key="key"
                          :tag="item"
                          :action="actions.removeFilterType"
                          v-on:clear="filterAction"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu"
                        v-model="ticketFilters.types"
                        :options="types"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select issue type"
                        label="name"
                        track-by="slug"
                        @input="filterChange"
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
                      <div>
                        <gluu-tag
                          v-for="(item, key) in ticketFilters.statuses"
                          :key="key"
                          :tag="item"
                          :action="actions.removeFilterStatus"
                          v-on:clear="filterAction"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu"
                        v-model="ticketFilters.statuses"
                        :options="statuses"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select status"
                        label="name"
                        track-by="slug"
                        @input="filterChange"
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
                        v-model="ticketFilters.dateRange"
                        format="YYYY-MM-DD"
                        formatted="ll"
                        :range="true"
                        :customShortcuts="customShortcuts"
                        color="#00B372"
                        @input="filterChange"
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
                        <b-form-input
                          v-model="ticketFilters.searchText"
                          type="text"
                          placeholder="Type the keyword"
                          @input="filterChange"
                        />
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
                          @input="filterChange"
                        ></multi-select>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col cols="12">
                      <div id="tags-container" class="d-flex">
                        <div>Results Found</div>
                        <div class="d-flex flex-wrap">
                          <div
                            class="ml-lg-2"
                            v-for="(item, key) in ticketFilters.companies"
                            :key="key"
                          >
                            <gluu-tag
                              :tag="item"
                              :action="actions.removeFilterCompany"
                              v-on:clear="filterAction"
                              type="outline"
                            ></gluu-tag>
                          </div>
                          <div
                            class="ml-lg-2"
                            v-for="(item, key) in ticketFilters.createdBy"
                            :key="key"
                          >
                            <gluu-tag
                              :tag="item"
                              :action="actions.removeFilterCreator"
                              v-on:clear="filterAction"
                              type="outline"
                            ></gluu-tag>
                          </div>
                          <div
                            class="ml-lg-2"
                            v-for="(item, key) in ticketFilters.assignedTo"
                            :key="key"
                          >
                            <gluu-tag
                              :tag="item"
                              :action="actions.removeFilterAssignee"
                              v-on:clear="filterAction"
                              type="outline"
                            ></gluu-tag>
                          </div>
                          <div
                            class="ml-lg-2"
                            v-for="(item, key) in ticketFilters.categories"
                            :key="key"
                          >
                            <gluu-tag
                              :tag="item"
                              :action="actions.removeFilterCategory"
                              v-on:clear="filterAction"
                              type="outline"
                            ></gluu-tag>
                          </div>
                          <div
                            class="ml-lg-2"
                            v-for="(item, key) in ticketFilters.statuses"
                            :key="key"
                          >
                            <gluu-tag
                              :tag="item"
                              :action="actions.removeFilterStatus"
                              v-on:clear="filterAction"
                              type="outline"
                            ></gluu-tag>
                          </div>
                          <div
                            class="ml-lg-2"
                            v-for="(item, key) in ticketFilters.types"
                            :key="key"
                          >
                            <gluu-tag
                              :tag="item"
                              :action="actions.removeFilterType"
                              v-on:clear="filterAction"
                              type="outline"
                            ></gluu-tag>
                          </div>
                          <div
                            class="ml-lg-2"
                            v-for="(item, key) in ticketFilters.products"
                            :key="key"
                          >
                            <gluu-tag
                              :tag="item"
                              :action="actions.removeFilterProduct"
                              v-on:clear="filterAction"
                              type="outline"
                            ></gluu-tag>
                          </div>
                        </div>
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
                        <span
                          class="pagination-container-second-span"
                        >of {{ticketPagination.totalCount}} tickets</span>
                      </div>
                    </b-col>

                    <b-col lg="5" offset-lg="2">
                      <div id="pagination-container-2" class="d-flex align-items-center">
                        <paginate
                          :pageCount="pages"
                          :clickHandler="changePage"
                          :forcePage="ticketPagination.currentPage"
                        ></paginate>
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
import { FETCH_TICKETS } from "@/store/actions.type";
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
      companyOptions: [],
      createdByOptions: [],
      assignedToOptions: [
        { id: "-1", name: "Unassigned" },
        { id: "-2", name: "Assigned" }
      ],
      orderByOptions: [
        { name: "Most recent", value: "+recent" },
        { name: "Least recent", value: "-recent" }
        // { name: "User (a-z)", value: "a-z" },
        // { name: "User (z-a)", value: "z-a" }
      ],
      customShortcuts: [
        { label: "Today", value: "day", isSelected: false },
        { label: "Yesterday", value: "-day", isSelected: false },
        { label: "This Week", value: "week", isSelected: false },
        { label: "Last Week", value: "-week", isSelected: false },
        { label: "This Month", value: "month", isSelected: false },
        { label: "Last Month", value: "-month", isSelected: false },
        { label: "Last 30 days", value: 30, isSelected: false }
      ],
      paginationOptions: [10, 15, 20, 25],
      actions: {
        addFilterCategory: ADD_FILTER_CATEGORY,
        addFilterProduct: ADD_FILTER_PRODUCT,
        addFilterType: ADD_FILTER_TYPE,
        addFilterCreator: ADD_FILTER_CREATOR,
        addFilterAssignee: ADD_FILTER_ASSIGNEE,
        addFilterStatus: ADD_FILTER_STATUS,
        addFilterCompany: ADD_FILTER_COMPANY,
        removeFilterCategory: REMOVE_FILTER_CATEGORY,
        removeFilterProduct: REMOVE_FILTER_PRODUCT,
        removeFilterType: REMOVE_FILTER_TYPE,
        removeFilterCreator: REMOVE_FILTER_CREATOR,
        removeFilterAssignee: REMOVE_FILTER_ASSIGNEE,
        removeFilterStatus: REMOVE_FILTER_STATUS,
        removeFilterCompany: REMOVE_FILTER_COMPANY
      }
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
    },
    pages() {
      return Math.ceil(
        this.ticketPagination.totalCount / this.ticketPagination.itemsPerPage
      );
    }
  },
  methods: {
    filterAction(tag, action) {
      this.$store.commit(action, tag);
      this.$store.dispatch(FETCH_TICKETS);
    },

    filterChange() {
      this.$store.dispatch(FETCH_TICKETS);
    },

    changePage(page) {
      this.$store.commit(SET_PAGINATION_PAGE, page);
      this.$store.dispatch(FETCH_TICKETS);
    },

    getCreatorList(q) {
      this.axios.get("access-list/users/", { params: { q } }).then(response => {
        this.$data.createdByOptions = response.data.results.map(item => ({
          ...item,
          name: item.fullName
        }));
      });
    },

    getAssigneeList(q) {
      this.axios.get("access-list/users/", { params: { q } }).then(response => {
        this.$data.assignedToOptions = [
          { id: "-1", name: "Unassigned" },
          { id: "-2", name: "Assigned" },
          response.data.results.map(item => ({
            ...item,
            name: item.fullName
          }))
        ];
      });
    },

    getCompanyList(q) {
      this.axios
        .get("access-list/companies/", { params: { q } })
        .then(response => {
          this.$data.companyOptions = response.data.results;
        });
    },

    clearAllTags() {
      this.$store.commit(CLEAR_FILTER_COMPANIES);
      this.$store.commit(CLEAR_FILTER_CREATORS);
      this.$store.commit(CLEAR_FILTER_ASSIGNEES);
      this.$store.commit(CLEAR_FILTER_CATEGORIES);
      this.$store.commit(CLEAR_FILTER_PRODUCTS);
      this.$store.commit(CLEAR_FILTER_STATUSES);
      this.$store.commit(CLEAR_FILTER_TYPES);
      this.$store.dispatch(FETCH_TICKETS);
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_TICKETS);
  }
};
</script>

<style lang="scss">
@import "TicketList";
</style>

