<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <div class="pa-4">
          <v-text-field
            id="title"
            v-model="title"
            label="title"
            prepend-icon="mdi-pencil"
          />
          <v-textarea
            id="content"
            v-model="content"
            label="content"
            prepend-icon="mdi-text"
          />
          <v-card-title>Answers</v-card-title>
          <v-card-subtitle class="grey--text">Every given answer will be treated as a correct one</v-card-subtitle>

          <div
            v-for="(answer, index) in answers"
            class="d-flex align-center"
          >
            <v-text-field
              :id="`answer${index}`"
              v-model="answers[index]"
              :label="`answer ${index + 1}`"
              prepend-icon="mdi-pencil"
            />
            <div class="pl-2">
              <v-icon
                @click="answers.splice(index, 1)"
              >
                mdi-delete
              </v-icon>
            </div>
          </div>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="blue"
              class="add-answer-btn"
              @click="answers.push('')"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="d-flex justify-end pa-4">
            <v-btn color="green" @click="submit"><v-icon class="pr-2">mdi-send</v-icon>Submit</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CreateRiddle',
  data () {
    return {
      title: "",
      content: "",
      answers: []
    }
  },
  computed: {
  },
  methods: {
    async submit() {

      const payload = {
        title: this.title,
        riddleType: "stringAnswer",
        contents: this.content,
        answers: this.answers.map(v => {
          return { answer: v }
        })
      }

      this.$store.dispatch('postStringAnswerRiddle', payload)
        .then(() => {
          this.$router.push('/me') // TODO: success info
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.add-answer-btn {
  width: 80%;
}
</style>
