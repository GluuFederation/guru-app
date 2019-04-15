<template>
  <div id="ticket-details-page-container">
    <div id="breadcrumbs-container"  class="mt-lg-5">
      <b-container>
        <b-row>
          <b-col cols="12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link></li>
                <li class="breadcrumb-item"><router-link :to="{ name: 'TicketList' }">Tickets</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">#{{ ticket.id }}</li>
              </ol>
            </nav>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div id="content-container" class="mt-lg-4">
      <b-container>
        <b-row>
          <b-col lg="9">
            <div class="ticket-details-content-header-container">
              <b-row>
                <b-col cols="9">
                  <h1 class="ticket-details-header"> {{ ticket. title }} <span>#{{ ticket.id }}</span></h1>
                </b-col>
                <b-col cols="3">
                  <div class="ticket-details-subheader d-flex justify-content-end">
                    <b-button
                      class="gluu-icon-btn"
                      v-b-tooltip.hover.topright="this.ticket.isPrivate ? 'Visible to staff and colleagues': 'Publicly visible'"
                    >
                      <b-img :src="ticket.isPrivate ? padlockSvgUrl:padunlockSvgUrl"></b-img>
                    </b-button>
                    <b-button class="ml-lg-2 gluu-outline-no-hover-btn">Edit</b-button>
                  </div>
                </b-col>
              </b-row>
            </div>
            <b-row class="mt-lg-4">
              <b-col cols="2">
                <div class="user-details-container">

                  <div class="card-left-side-gluu d-flex justify-content-center align-items-start">
                    <div class="d-flex flex-column align-items-start">
                      <b-card-img :src="avatarUrl" rounded="circle" class="img-fluid " />

                      <div class="card-left-side-info-gluu d-flex justify-content-start flex-column mt-lg-1">
                        <b-badge class="card-left-side-info-usertype-gluu">Staff</b-badge>
                        <div class="d-flex flex-column mt-lg-3">
                          <span class="card-left-side-info-name-gluu">William Lowe</span>
                          <span class="card-left-side-info-company-gluu">chris@gluu.org</span>
                        </div>
                        <div class="mt-lg-2">
                          <gluu-badge color="green">Gluu</gluu-badge>
                          <gluu-badge color="yellow">Enterprise</gluu-badge>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </b-col>

              <b-col cols="10">
                <div class="ticket-details-content-container">
                  <div>
                    <b-card no-body>
                      <b-card-header class="d-flex align-items-center justify-content-between">
                          <div>30 Aug 2018 at 2:24 PM GMT</div>
                          <div class="d-flex align-items-center" id="ticketDetailsEdit-popover-container">
                            <b-button class="ticket-details-content-edit-btn-gluu">Edit</b-button>
                            <b-button class="ticket-details-content-copy-link-btn-gluu">Copy Link</b-button>
                            <div class="d-flex flex-column text-md-center">
                              <b-button class="gluu-icon-action-btn" id="popover-3">
                                <b-img class="ticket-details-content-ellipsis-icon-gluu" :src="ellipsisSvgUrl" />
                              </b-button>
                              <b-popover target="popover-3" triggers="click blur" placement="bottomleft">
                                <b-dropdown-item>Copy Link</b-dropdown-item>
                                <b-dropdown-item>Open new ticket</b-dropdown-item>
                                <b-dropdown-item v-b-modal.deleteTicketModal>Delete</b-dropdown-item>
                              </b-popover>
                            </div>
                          </div>
                      </b-card-header>

                      <b-card-body>
                        <vue-markdown :source="testingMarkDownString3"></vue-markdown>
                      </b-card-body>
                    </b-card>
                  </div>
                  <div>
                    <div class="timeline">
                      <gluu-timeline-entry 
                        entryType="ticket"
                        description="William Assigned Robi 2 hours ago"
                        :avatarUrl="avatarUrl"
                      ></gluu-timeline-entry>
                      <gluu-timeline-entry 
                        entryType="comment"
                        description="William Added a comment 5 hours ago"
                        :avatarUrl="avatarUrl"
                      ></gluu-timeline-entry>
                      <gluu-timeline-entry 
                        entryType="ticket"
                        description="William  William Created this ticket"
                        :avatarUrl="avatarUrl"
                      ></gluu-timeline-entry>
                    </div>

                    <div class="see-more-link mt-lg-3">
                      <a href="#">See more ...</a>
                    </div>
                  </div>
                </div>
              </b-col>

            </b-row>

            <b-row class="mt-lg-5 mb-lg-4">
              <b-col cols="12">
                <h4>3 Responses</h4>
                <hr>
              </b-col>
            </b-row>

            <b-row class="mt-lg-4">
              <b-col cols="2">
                <div class="user-details-container">

                  <div class="card-left-side-gluu d-flex justify-content-center align-items-start">
                    <div class="d-flex flex-column align-items-start">
                      <b-card-img :src="avatarUrl" rounded="circle" class="img-fluid " />

                      <div class="card-left-side-info-gluu d-flex justify-content-start flex-column mt-lg-1">
                        <b-badge class="card-left-side-info-usertype-gluu">Staff</b-badge>
                        <div class="d-flex flex-column mt-lg-3">
                          <span class="card-left-side-info-name-gluu">William Lowe</span>
                          <span class="card-left-side-info-company-gluu">chris@gluu.org</span>
                        </div>
                        <div class="mt-lg-2">
                          <gluu-badge color="green">Gluu</gluu-badge>
                          <gluu-badge color="yellow">Enterprise</gluu-badge>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </b-col>

              <b-col cols="10">
                <div class="ticket-details-content-container">
                  <div>
                    <b-card no-body>
                      <b-card-header class="d-flex align-items-center justify-content-between">
                          <div>30 Aug 2018 at 2:24 PM GMT</div>
                          <div class="d-flex align-items-center" id="ticketDetailsEdit-popover-container">
                            <b-button class="ticket-details-content-edit-btn-gluu">Edit</b-button>
                            <b-button class="ticket-details-content-copy-link-btn-gluu">Copy Link</b-button>
                            <div class="d-flex flex-column text-md-center">
                              <b-button class="gluu-icon-action-btn" id="popover-4">
                                <b-img class="ticket-details-content-ellipsis-icon-gluu" :src="ellipsisSvgUrl" />
                              </b-button>
                              <b-popover target="popover-4" triggers="click blur" placement="bottomleft">
                                <b-dropdown-item>Copy Link</b-dropdown-item>
                                <b-dropdown-item>Open new ticket</b-dropdown-item>
                                <b-dropdown-item v-b-modal.deleteTicketModal>Delete</b-dropdown-item>
                              </b-popover>
                            </div>
                          </div>
                      </b-card-header>

                      <b-card-body>
                        <vue-markdown :source="testingMarkDownString"></vue-markdown>
                      </b-card-body>
                    </b-card>
                  </div>
                </div>
              </b-col>

            </b-row>

          </b-col>

          <b-col lg="3">
            Sidebar
          </b-col>
        </b-row>
      </b-container>
      <b-modal ref="deleteTicketModal" id="deleteTicketModal" class="card-gluu" hide-footer hide-header centered>
        <div class="form-control-container d-flex flex-column mb-lg-3">
          <div class="dark-18-medium">Are you sure you want to delete this ticket?</div>
        </div>
        <div class="form-control-container d-flex">
          <b-button class="btn" @click="hideDeleteModal()">No</b-button>
          <b-button class="btn">Delete</b-button>
        </div>
      </b-modal>
    </div>      
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import GluuBadge from '@/components/includes/badge/GluuBadge'
import GluuTimelineEntry from '@/components/ticketdetail/GluuTimelineEntry'

export default {
  name: 'TicketDetail',
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    GluuBadge,
    GluuTimelineEntry,
    VueMarkdown
  },
  data () {
    return {
      ticket: {
        id: 1,
        title: 'Admin account locked out',
        slug: 'admin-account-locked-out',
        status: 'new',
        issueType: 'pre-production',
        category: 'installation',
        createdAt: 'Jan 12, 2019',
        updatedAt: '12 min ago',
        updatedBy: 'muhib zico',
        responseNo: 12,
        votes: 1,
        createdBy: {
          id: 1,
          fullName: 'William Lowe'
        },
        companyAssociation: {
          id: 1,
          name: 'Gluu.org'
        },
        isPrivate: true
      },
      testingMarkDownString:"Kesavan,\n" +
                    "\n" +
                    "There will have to be some legwork done on your part, but you of course can run a multi-host example not using Digital Ocean. You'll have to fully understand docker-machine and docker swarm. A place to start is looking how the manager and workers are configured initially:\n" +
                    "\n" +
                    "[https://github.com/GluuFederation/gluu-docker/blob/3.1.3/examples/multi-hosts/nodes.sh#L20](#)\n" +
                    "\n" +
                    "Then continue through that script to understand how to launch everything.\n" +
                    "\n" +
                    "Paragraph file [Resource.txt](#)",
      testingMarkDownString2:"It turns out this feature isn't working properly in 3.1.3 or 3.1.4. Please remove the entry you created in web UI, for now. If you need a custom nameid, you'll have to use manual approach as described in section \"Configure NameID - Manual configuration\" in this doc.",
      testingMarkDownString3:"Hi Team,\n" +
                    "\n" +
                    "Reference link : [\"https://github.com/GluuFederation/gluu-docker/tree/3.1.3/examples/multi-hosts\"](#)\n" +
                    "\n" +
                    "Above github link refer the multi host setup for digital ocean, but we need without digitail ocean, so we did manual docker setup in our server and followed the script which is return in github.\n" +
                    "\n" +
                    "After installation of multi host gluu docker and container we facing the issue in nginx, it is return 502 Bad Gateway error.\n" +
                    "\n" +
                    "then, when we debug the oxtrust container log it shows the below issue.\n" +
                    "\n" +
                    "ERROR \\[main\\] \\[org.gluu.oxtrust.config.ConfigurationFactory\\] (ConfigurationFactory.java:298) Failed to load application configuration from file: /etc/gluu/conf/oxtrust-config.json ERROR \\[main\\] \\[org.gluu.oxtrust.config.ConfigurationFactory\\] (ConfigurationFactory.java:153) - Failed to load configuration from LDAP. Please fix it!!!.\n" +
                    "\n" +
                    "Paragraph file [Resource.txt](#)\n" +
                    "\n" +
                    "Website file [Logo.pdf](#)\n" +
                    "\n" +
                    "[Website.jpg](#)",
    }
  },
  computed:{
    padlockSvgUrl() {
      return require("@/assets/images/padlock.svg");
    },
    padunlockSvgUrl(){
      return require("@/assets/images/padunlock.svg");
    },
    avatarUrl() {
      return require('@/assets/images/avatar.svg');
    },
    ellipsisSvgUrl(){
      return require('@/assets/images/ellipsis.svg');
    },
  },
  methods: {
    hideDeleteModal () {
      this.$refs['deleteTicketModal'].hide()
    }
  }
}
</script>

<style lang="scss">
@import 'TicketDetail';
</style>
