<template>
  <b-container fluid id="footer-container" class="mt-lg-5">
    <b-row>
      <b-col cols="12">
        <div class="d-flex align-items-start justify-content-between">
          <div class="footer-container-item">
            <div class="dark-20-semi mb-lg-4">About Gluu</div>
            <ul>
              <li>
                <div class="light-16-regular"><a href="#">Our Story</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="#">Team</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="#">Press Releases</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="">Contact us</a> </div>
              </li>
            </ul>
          </div>

          <div class="footer-container-item">
            <div class="dark-20-semi mb-lg-4">Support</div>
            <ul>
              <li>
                <div class="light-16-regular"><a href="#">Open a ticket</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="#">Knowledge base</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="#">Read the docs</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="">Schedule a call</a> </div>
              </li>
            </ul>
          </div>

          <div class="footer-container-item">
            <div class="dark-20-semi mb-lg-4">Our Products</div>
            <ul>
              <li>
                <div class="light-16-regular"><a href="#"> Gluu Server</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="#"> Super Gluu</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="#">oxd</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="">Cluster Manager</a> </div>
              </li>
            </ul>
          </div>
          
          <div class="footer-container-item">
            <div class="dark-20-semi mb-lg-4">Quick Links</div>
            <ul>
              <li>
                <div class="light-16-regular"><a href="#">Features</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="#">Marketplace</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="#">Pricing</a></div>
              </li>
              <li>
                <div class="light-16-regular"><a href="">EDU</a> </div>
              </li>
              <li>
                <div class="light-16-regular"><a href="">Blog</a> </div>
              </li>
              <li>
                <div class="light-16-regular"><a href="">Roadmap</a> </div>
              </li>
            </ul>
          </div>
        </div>
      </b-col>
    </b-row>
    <hr>
    <b-row class="mt-lg-4">
      <b-col cols="12">
        <div class="d-flex align-items-center justify-content-between">
          <div class="first-part-lower-footer d-flex align-items-center">
            <div class="semi-dark-15-regular">
              © 2009-2018 Gluu, Inc.
            </div>
            <div class="semi-dark-15-regular ml-lg-4">
              <a href="#">Terms</a>
            </div>
            <div class="semi-dark-15-regular ml-lg-3 mr-lg-3">
              |
            </div>
            <div class="semi-dark-15-regular">
              <a href="#">Privacy Policy</a>
            </div>
          </div>
          <div class="second-part-lower-footer">
            <b-img :src="logoSvgUrl" />
          </div>
          <div class="third-part-lower-footer">
            <div>
              Follow us:
            </div>
            <div>
              <v-icon name="brands/github"/>
              <v-icon name="brands/twitter" />
              <v-icon name="brands/youtube" />
              <v-icon name="brands/linkedin" />
              <v-icon name="brands/slideshare" />
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import 'vue-awesome/icons/brands/github'
import 'vue-awesome/icons/brands/twitter'
import 'vue-awesome/icons/brands/youtube'
import 'vue-awesome/icons/brands/linkedin'
import 'vue-awesome/icons/brands/slideshare'

export default {
  computed:{
    logoSvgUrl() {
      return require('@/assets/images/logo.png')
    }
  }
};
</script>
