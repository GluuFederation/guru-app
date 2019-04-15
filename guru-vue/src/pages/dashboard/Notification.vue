<template>
  <div id="notifications-tab">
    <b-card class="card-gluu">
      <div class="d-flex align-items-center justify-content-between card-header-gluu mb-lg-4 ml-lg-4 mr-lg-4 mt-lg-4">
        <div class="card-title-gluu">Notifications <span v-if="manageNotifications">Settings</span> </div>
        <button @click="toggleManageNotifications">
          {{ buttonCaption }}
        </button>
      </div>

      <hr v-if="manageNotifications">

      <div v-if="!manageNotifications" id="inner-tabs" class=" mb-lg-4">
        <b-tabs content-class="mt-3">
          <b-tab title="All activities" active id="all-activities-tab">

            <div class="ticket-created-notification mb-lg-4">
              <div class="mb-lg-2">A new ticket has been opened</div>
              <div class="response">
                <div class="mb-lg-1">Docket single host oxtrust can not downlowd SSL certificate</div>
                <div class="mb-lg-1">It is a long established fact that a reader will be distracted by the readable content of a page</div>
                <div>Just now</div>
              </div>
            </div>

            <div class="ticket-responses-notification mb-lg-4">
              <div class="mb-lg-2"><span class="reply-from">William</span> replied to your ticket</div>
              <div class="response">
                <div class="mb-lg-1">Docket single host oxtrust can not downlowd SSL certificate</div>
                <div class="mb-lg-1">It is a long established fact that a reader will be distracted by the readable content of a page</div>
                <div>Just now</div>
              </div>
            </div>

            <div class="ticket-activity-status mb-lg-4">
              <div class="mb-lg-1">Your invoice of september is ready</div>
              <div>Just now</div>
            </div>

          </b-tab>

          <b-tab title="Your activities" id="your-activities-tab">

            <div class="ticket-created-notification mb-lg-4">
              <div class="mb-lg-2 d-flex justify-content-between">
                <div class="notification-event">Nasir <span>Created a ticket</span></div>
                <div class="notification-event-time">9 hours ago</div>
              </div>
              <div class="response">
                <div class="response-heading mb-lg-3">Cache option not available in cluster manager V 3.1.4-06</div>
                <div class="mb-lg-1">Hi Gluu support,</div>
                <div class="mb-lg-1">I'm trying to get two servers clustered using the cluster manager.</div>
              </div>
            </div>

            <div class="ticket-responses-notification mb-lg-4">
                <div class="mb-lg-2 d-flex justify-content-between">
                  <div class="notification-event">Nasir <span>Replied to your ticket</span></div>
                  <div class="notification-event-time">Yestarday</div>
                </div>
                <div class="response">
                  <div class="mb-lg-1">I think we know the origin of the bug.
                      It has to do with a button that comes pre-selected in 3.1.4 and when you drop down to 3.1.2,
                      it doesn't automatically deselect it, revealing the <badge color="red">Cache Configuration</badge>  menu. A fix is coming shortly.
                  </div>
                </div>
            </div>

            <div class="ticket-responses-notification-2 mb-lg-4">
              <div class="mb-lg-2 d-flex justify-content-between">
                <div class="notification-event">Nasir <span>Replied to your ticket</span></div>
                <div class="notification-event-time">Jan18, 2018</div>
              </div>
              <div class="response">
                <div class="mb-lg-2">Can you specify what is trying to connect to OpenDJ here?</div>
                <div class="highlighted-area">dsreplication.java-args=-Xms8m -client -Dcom.sun.jndi.ldap.object.disableEndpoint Identification=true</div>
              </div>
            </div>

            <div class="ticket-created-notification mb-lg-4">
              <div class="mb-lg-2 d-flex justify-content-between">
                <div class="notification-event">Nasir <span>Created a ticket</span></div>
                <div class="notification-event-time">Jan 16, 2018</div>
              </div>
              <div class="response">
                <div class="response-heading mb-lg-3">Java update - Cert Error w/OpenDJ</div>
                <div class="mb-lg-1">Hi</div>
                <div class="mb-lg-1">Upon a recent patch to our in-house servers (to 1.8.0_191), our servers are no longer able to …</div>
              </div>
            </div>

          </b-tab>
        </b-tabs>
      </div>

      <div id="manage-notifications-settings" v-else>

        <div class="d-flex align-items-center justify-content-between card-header-gluu mb-lg-4 ml-lg-4 mr-lg-4 mt-lg-4">
          <div>Notification setting for new tickets only</div>
        </div>

        <div class="d-flex mb-lg-4 ml-lg-4 mr-lg-4 mt-lg-4">
          <!-- <b-form-checkbox v-model="selectAllIssueType" name="check-button">
            All ticket types
          </b-form-checkbox> -->
        </div>

        <hr>

        <div class="d-flex align-items-center justify-content-between card-header-gluu mb-lg-4 ml-lg-4 mr-lg-4 mt-lg-4">
          <div>Notification setting for new tickets and tickets update ( answer, status changes etc )</div>
        </div>

        <div class="d-flex mb-lg-4 ml-lg-4 mr-lg-4 mt-lg-4" id="notifications-settings-checkbox-container">
          <div class="w-100">
            <div class="notifications-settings-checkbox-column-header">
              <div class="mb-lg-3">
                <b-form-checkbox
                  :checked="selectedIssueTypes.length == issueTypeOptions.length"
                  @change="selectAllIssueTypes">
                  All ticket types
                </b-form-checkbox>
              </div>
            </div>
            <div class="d-flex ml-lg-4 flex-column notifications-settings-checkbox-column-content">
              <b-form-group>
                 <b-form-checkbox-group
                  id="checkbox-issue-type"
                  v-model="selectedIssueTypes"
                  :options="issueTypeOptions"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </div>

          </div>
          <div class="w-100">
            <div class="notifications-settings-checkbox-column-header">
              <div class="mb-lg-3">
                <b-form-checkbox 
                  :checked="selectedCategories.length == categoryOptions.length"
                  @change="selectAllCategories">
                  All categories
                </b-form-checkbox>
              </div>
            </div>
            <div class="d-flex ml-lg-4 flex-column notifications-settings-checkbox-column-content">
              <b-form-group>
                 <b-form-checkbox-group
                  id="checkbox-category"
                  v-model="selectedCategories"
                  :options="categoryOptions"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </div>
          </div>

        </div>

      </div>

    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data () {
    return {
      manageNotifications: false,
      buttonCaption: 'Manage notification settings',
      selectedIssueTypes: [],
      issueTypeOptions: [
        { text: 'Production Outages', value: 'outage' },
        { text: 'Production Impaired', value: 'impaired' },
        { text: 'Pre-production Issue', value: 'pre-production' },
        { text: 'Minor Issue', value: 'minor' },
        { text: 'New development Issue', value: 'new' }
      ],
      selectedCategories: [],
      categoryOptions: [
        { text: 'Installation', value: 'installation' },
        { text: 'Outages', value: 'outage' },
        // { text: 'Authentication', value: 'authentication' },
        // { text: 'Authorization', value: 'authorization' },
        // { text: 'Single Sign-On', value: 'sso' },
        // { text: 'Logout', value: 'logout' },
        // { text: 'Access Management', value: 'access' },
        // { text: 'Identity Management', value: 'identity' },
        // { text: 'Upgrade', value: 'upgrade' },
        // { text: 'Maintenance', value: 'maintenance' },
        // { text: 'Customization', value: 'customization' },
        // { text: 'Feature Request', value: 'feature' },
        // { text: 'Other', value: 'other' },
      ]
    }
  },
  methods: {
    toggleManageNotifications () {
      this.manageNotifications = !this.manageNotifications
      if (this.manageNotifications) {
        this.buttonCaption = 'Back'
      } else {
        this.buttonCaption = 'Manage notification settings'
      }
    },
    selectAllCategories () {
      if (this.selectedCategories.length != this.categoryOptions.length) {
        this.categoryOptions.every(item => this.selectedCategories.push(item.value))
      } else {
        this.selectedCategories = []
      }
    },
    selectAllIssueTypes () {
      if (this.selectedIssueTypes.length != this.issueTypeOptions.length) {
        this.issueTypeOptions.every(item => this.selectedIssueTypes.push(item.value))
      } else {
        this.selectedIssueTypes = []
      }
    }
  }
}
</script>

<style>

</style>
