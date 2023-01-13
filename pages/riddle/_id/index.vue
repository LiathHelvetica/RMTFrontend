<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <div class="d-flex align-center justify-space-between pt-4">
          <v-card-title class="py-0">{{ riddleData.title }}</v-card-title>
          <div class="pr-4">{{ lastUpdateDateWithoutTime }}</div>
        </div>
        <v-card-subtitle class="pt-0">Created by {{ riddleData.creatorName }}</v-card-subtitle>
        <div class="text-center">{{ riddleData.contents }}</div>
        <v-card-text class="d-flex justify-center">
          <v-text-field
            id="answer"
            v-model="answer"
            label="answer"
            prepend-icon="mdi-puzzle"
            class="answer-field flex-grow-0"
          />
        </v-card-text>
        <v-card-actions class="d-flex justify-end pt-0 px-4 pb-4">
          <v-btn color="green" @click="submit"><v-icon class="pr-2">mdi-send</v-icon>Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Riddle',
  async asyncData (context) {
    const riddleData = await context.store.dispatch('getRiddle', context.params.id)
      .catch((error) => {
        console.log(error)
      })
    return {
      id: context.params.id,
      riddleData
    }
  },
  data () {
    return {
      answer: ""
    }
  },
  computed: {
    lastUpdateDate() {
      return new Date(this.riddleData.lastUpdateDate)
    },
    lastUpdateDateWithoutTime() {
      return `${this.lastUpdateDate.getDate()}-${this.lastUpdateDate.getMonth()}-${this.lastUpdateDate.getFullYear()}`
    }
  },
  methods: {
    async submit() {
      await this.$store.dispatch('answer', { payload: { answer: this.answer }, id: this.id })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.answer-field {
  width: 80%;
}
</style>
