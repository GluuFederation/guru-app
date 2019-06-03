<template>
  <div>
    <b-container>
      <b-row class="mb-lg-4">
        <b-col cols="12">
          <div id="content-header">
            <div class="dark-30-medium mb-lg-3">Create tickets</div>
            <div>
              Step {{ currentStep + 1 }} of 9
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="9">
          <div>
            <div id="multistep-form-container">
              <div>
                <div class="dark-20-medium mb-lg-4">{{ stepsTitle[currentStep] }}</div>
                <div>
                  <div class="form-control-container d-flex flex-column">
                  </div>
                </div>
              </div>
            </div>
            <b-button @click="previousStep()" class="back-button mt-lg-4">Back</b-button>
            <b-button @click="nextStep()" v-if="currentStep <= 8" class="next-button mt-lg-4">Next</b-button>
          </div>
        </b-col>

        <b-col cols="3">
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'TicketCreate',
  data () {
    return  {
      currentStep: 0,
      stepsTitle: [
        'Which organization are you creating the ticket on behalf of?',
        'Who are you creating the ticket on behalf of?',
        'What type of ticket you are opening?',
        'Which category does your issues fall into?',
        'Which version of gluu server do you use?',
        'Select an operating system',
        'Are any other Gluu products relevant to this support ticket?',
        'Select an OS for Gluu Gateway'
      ]
    }
  },
  methods: {
    nextStep: function() {
      if (this.currentStep <= 8){
        this.currentStep ++;
        this.$root.$emit("nextStep");
      }
    },
    previousStep: function() {
      if (this.currentStep >= 2){
        this.currentStep --;
        this.$root.$emit("previousStep");
      }
    },
  }
}
</script>
