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
                          v-for="(item, key) in company"
                          :key="key"
                          :tag="item"
                          v-on:clear="removeCompanyTag"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu single-select"
                        v-model="company"
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
                      <label class="card-labels-gluu single-select">Create by:</label>
                      <div>
                        <gluu-tag
                          v-for="(item, key) in createdBy"
                          :key="key"
                          :tag="item"
                          v-on:clear="removeAuthorTag"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu"
                        v-model="createdBy"
                        :options="createdByOptions"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select Author"
                        label="firstName"
                        track-by="id"
                        @select="created_select"
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
                          v-for="(item, key) in assignedBy"
                          :key="key"
                          :tag="item"
                          v-on:clear="removeAssignedByTag"
                        ></gluu-tag>
                      </div>
                      <multi-select
                        class="select-tags-gluu single-select"
                        v-model="assignedBy"
                        :options="assignedByOptions"
                        :multiple="true"
                        :show-labels="false"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select Assignee"
                        label="fullName"
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
                      <multi-select
                        class="select-tags-gluu single-select"
                        v-model="category"
                        :options="categoryOptions"
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
                        v-model="product"
                        :options="productOptions"
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
                        v-model="issueType"
                        :options="issueTypeOptions"
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
                        v-model="status"
                        :options="statusOptions"
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
                          v-model="orderBy"
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
                        <div class="d-flex flex-wrap">
                          <div class="ml-lg-2" v-for="(item, key) in configFilters" :key="key">
                            <gluu-tag :tag="item" v-on:clear="removeConfigTag" type="outline"></gluu-tag>
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
                          v-model="paginationOption"
                          :options="paginationOptions"
                          :show-labels="false"
                          :allowEmpty="false"
                          :searchable="false"
                          openDirection="bottom"
                        ></multi-select>
                        <span class="pagination-container-second-span"> of {{ tickets_count }} Tickets</span>
                      </div>
                    </b-col>

                    <b-col lg="5" offset-lg="2">
                      <!-- <div id="pagination-container-2" class="d-flex align-items-center"> -->
                        <!-- <div id="pagination-container-2-nextbtn" @click="previous">Previous</div> -->
                        <!-- <div v-for="page in total_pages" v-if ="page < 5" :key="page" @click="tickets_data"  class="pagination-container-2-buttons">{{ page }}</div>
                        <div class="ellipsis-container" >
                          <span>....... </span>
                        </div>
                        <div v-for="page in total_pages" v-if ="page >= 5" :key="page" @click="tickets_data"  class="pagination-container-2-buttons">{{ page }}</div>
                        <div id="pagination-container-2-nextbtn" @click="next">Next</div> -->
                        <!-- </div> -->
                        <b-pagination
                          v-model="currentPage"
                          :total-rows="rows"
                          :per-page="perPage"
                          first-text="First"
                          prev-text="Prev"
                          next-text="Next"
                          last-text="Last"
                          @change="tickets_data"
                        ></b-pagination>
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
import ApiService from "@/common/api.service";
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
      tickets: [],
      tickets_count : 0,
      page : 1,
      next_page: "",
      total_pages: 0,
      rows:0,
      perPage: 10,
      currentPage: 1,
      configFilters: [],
      ajax_url : "",
      query: "",
      company: [],
      companyOptions: [
        { id: 1, name: "Gluu" },
        { id: 2, name: "OpenIAM" },
        { id: 3, name: "IDFConnect" }
      ],
      createdBy: [],
      createdByOptions: [],
      assignedBy: [],
      assignedByOptions: [],
      orderBy: { name: "Most recent" },
      orderByOptions: [
        { name: "Most recent" },
        { name: "Least recent" },
        { name: "User (a-z)" },
        { name: "User (z-a)" }
      ],
      category: [],
      categoryOptions: [],
      product: [],
      productOptions: [],
      issueType: [],
      issueTypeOptions: [],
      status: [],
      statusOptions: [],
      paginationOption : 10,
      paginationOptions : [10,20,30,40],
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
      
    };
  },
  computed: {
    searchIconUrl() {
      return require("@/assets/images/search.svg");
    }
  },
  methods: {
    removeCompanyTag(tag) {
      const indexOfTag = this.company.indexOf(tag);
      if (indexOfTag != -1) {
        this.company.splice(indexOfTag, 1);
      }
    },
    created_select(e){
      console.log(this.ajax_url);
      if (this.ajax_url != ""){
          this.ajax_url = this.ajax_url+"&created_by="+e.id;
      }else{
        this.ajax_url = "tickets/?created_by="+e.id;
      }
      console.log(this.ajax_url);
      this.$http.get(this.ajax_url).then(response => { 
      this.$data.tickets = response.data.results;
      this.tickets_count = response.data.count;
      this.rows = response.data.count;
      });
    },
    tickets_data(e){
        console.log(this.ajax_url);
        if (this.ajax_url != ""){
          this.ajax_url = this.ajax_url+"&page="+e;
        }else{
          this.ajax_url = "tickets/?page="+e;
        }
        console.log(this.ajax_url); 
        this.$http.get(this.ajax_url).then(response => { 
        this.$data.tickets = response.data.results;
      }); 
    },
    
    removeAuthorTag(tag) {
      var string = '&created_by='+tag.id;
      if (this.ajax_url.indexOf(string) != -1 ){
        this.ajax_url = this.ajax_url.replace('&created_by='+tag.id,'');
      }else{
        this.ajax_url = this.ajax_url.replace('/?created_by='+tag.id,'');
      }
      const indexOfTag = this.createdBy.indexOf(tag);
      if (indexOfTag != -1) {
        this.createdBy.splice(indexOfTag, 1);
      }
    },

    removeAssignedByTag(tag) {
      const indexOfTag = this.assignedBy.indexOf(tag);
      if (indexOfTag != -1) {
        this.assignedBy.splice(indexOfTag, 1);
      }
    },

    addCategoryTag(tag) {
      this.addConfigTag(tag, "category");
    },
    removeCategoryTag(tag) {
      this.removeConfigTag(tag, "category");
    },

    addProductTag(tag) {
      this.addConfigTag(tag, "product");
    },
    removeProductTag(tag) {
      this.removeConfigTag(tag, "product");
    },

    addIssueTypeTag(tag) {
      this.addConfigTag(tag, "issueType");
    },
    removeIssueTypeTag(tag) {
      this.removeConfigTag(tag, "issueType");
    },

    addStatusTag(tag) {
      this.addConfigTag(tag, "status");
    },
    removeStatusTag(tag) {
      this.removeConfigTag(tag, "status");
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
      this.configFilters = [];
    }
  },
  mounted() {
    ApiService.get("/tickets").then(response => {
      this.$data.tickets = response.data.results;
      this.tickets_count = response.data.count;
      this.rows = response.data.count; //Math.ceil(this.tickets_count/10);
      // this.next_page = response.data.next;
      // this.prev_page = response.data.previous;
    });
    ApiService.get("/users").then(response => {
      this.createdByOptions = response.data.results;  
    });
    ApiService.get("/companies").then(response => {
      this.companyOptions=response.data.results;  
    });
    ApiService.get("/users/staffs").then(response => {
      this.assignedByOptions = response.data.results;  
    });
    ApiService.get("/info/categories").then(response => {
      this.categoryOptions = response.data.results;  
    });
    ApiService.get("/info/issue-types").then(response => {
      this.issueTypeOptions = response.data.results;  
    });
    ApiService.get("/info/products").then(response => {
      this.productOptions = response.data.results; 
    });
    ApiService.get("/info/statuses").then(response => {
      this.statusOptions = response.data.results;             
    });
  }
};
</script>

<style lang="scss">
@import "TicketList";
</style>

