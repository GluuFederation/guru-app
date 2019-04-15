<template>
  <div id="nav-tabs-container">
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-nav class="align-items-center">
            <b-nav-item>
              <b-dropdown variant="link" no-caret>
                <template slot="button-content">My assignment<v-icon name="angle-down" class="ml-lg-2"></v-icon></template>
                <b-dropdown-item>In progress</b-dropdown-item>
                <b-dropdown-item>Pending</b-dropdown-item>
              </b-dropdown>
            </b-nav-item>
            <b-nav-item class="nav-item-gluu">Unassigned</b-nav-item>
            <b-nav-item>
              <b-dropdown variant="link" no-caret>
                <template slot="button-content">All tickets<v-icon name="angle-down" class="ml-lg-2"></v-icon></template>
                <b-dropdown-item>New</b-dropdown-item>
                <b-dropdown-item>Assigned</b-dropdown-item>
                <b-dropdown-item>In progress</b-dropdown-item>
                <b-dropdown-item>Pending</b-dropdown-item>
                <b-dropdown-item>Close</b-dropdown-item>
              </b-dropdown>
            </b-nav-item>
            <b-nav-item>
              <b-dropdown variant="link" no-caret>
                <template slot="button-content">My tickets<v-icon name="angle-down" class="ml-lg-2"></v-icon></template>
                <b-dropdown-item>Assigned</b-dropdown-item>
                <b-dropdown-item>Close</b-dropdown-item>
              </b-dropdown>
            </b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
    </b-container>
</div>
</template>

<script>
import 'vue-awesome/icons/angle-down'
export default {
  name: 'GluuSubNavbar'
}
</script>

<style lang="scss">
@import 'GluuSubNavbar';
</style>
