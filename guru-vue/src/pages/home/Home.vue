<template>
  <div id="home">
    <div id="content-container" class="mt-lg-5">
      <b-container>
        <b-row class="mb-lg-5">
          <b-col cols="12">
            <div id="hero-container">
              <div class="p-lg-3 d-flex justify-content-center align-items-center">
                <b-img class="img-fluid" :src="heroUrl"/>
                <div class="position-absolute" id="search-for-a-question-container">
                  <div
                    class="dark-36-semi mb-lg-3"
                    id="search-for-a-question-top"
                  >Search for a Ticket</div>
                  <div id="search-for-a-question-container-bottom">
                    <b-img class="mr-lg-3" :src="searchGreenUrl"/>
                    <b-form-input
                      id="input-default"
                      type="text"
                      size="lg"
                      placeholder="Search or ask a question"
                    />
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row id="select-ticket-category-container">
          <b-col cols="12">
            <div
              class="dark-22-medium mb-lg-4 text-center"
            >Select The category to find related topic</div>
            <div class="flex-row flex-wrap d-flex justify-content-center align-items-center">
              <div
                class="gluu-tile flex-column"
                v-for="(category, index) in categories"
                :key="index"
                v-on:click="goToTicketCategory(category, $event)"
              >
                <div class="mb-lg-3">
                  <gluu-svg :icon="category.slug"></gluu-svg>
                </div>
                <div class="dark-16-medium">{{ category.name }}</div>
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
import paths from "@/router/paths";
import { FETCH_INFO_ALL } from "@/store/actions.type";
import { SET_FILTER_CATEGORY } from "@/store/mutations.type";
import GluuSvg from "@/components/includes/gluusvg/GluuSvg";
export default {
  components: {
    GluuSvg
  },
  computed: {
    heroUrl() {
      return require("@/assets/images/hero.svg");
    },
    searchGreenUrl() {
      return require("@/assets/images/searchGreen.svg");
    },
    ...mapGetters(["categories"])
  },
  mounted() {
    this.$store.dispatch(FETCH_INFO_ALL);
  },
  methods: {
    goToTicketCategory(category, event) {
      if (event) {
        event.preventDefault();
      }
      this.$store.commit(SET_FILTER_CATEGORY, category);
      this.$router.push(paths.TICKET_LIST);
    }
  }
};
</script>

<style lang="scss">
@import "Home";
</style>
