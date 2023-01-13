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
            v-model="contents"
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
              v-model="answers[index].answer"
              :label="`answer ${index + 1}`"
              prepend-icon="mdi-pencil"
            />
            <div class="pl-2">
              <v-icon
                @click="removeAnswer(index)"
              >
                mdi-delete
              </v-icon>
            </div>
          </div>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="blue"
              class="add-answer-btn"
              @click="answers.push({
                answer: '',
                action: 'create'
              })"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="d-flex justify-space-between pa-4">
            <v-btn color="red" @click="deleteRiddle"><v-icon class="pl-2">mdi-delete</v-icon>Delete</v-btn>
            <v-btn color="green" @click="submit"><v-icon class="pr-2">mdi-send</v-icon>Update</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CreateRiddle',
  async asyncData (context) {
    const myRiddle = await context.store.dispatch('getMyRiddle', context.params.id)
      .then(data => {
        const answersUpdated = data.answers.map(ans => {
          ans.action = "update"
          return ans
        })
        data.answers = answersUpdated
        data.id = context.params.id
        return data
      })
      .catch((error) => {
        console.log(error)
      })

    return myRiddle
  },
  data () {
    return {
      answersToRemove: []
    }
  },
  computed: {
  },
  methods: {
    async submit() {

      const payload = {
        title: this.title,
        contents: this.contents,
        answers: this.answersToRemove.concat(this.answers)
      }

      this.$store.dispatch('updateRiddle', { payload, id: this.id })
        .catch((error) => {
          console.log(error)
        })
    },
    removeAnswer(index) {
      const ans = this.answers[index]
      if (ans.id) {
        this.answersToRemove.push({
          action: "delete",
          id: ans.id
        })
      }
      this.answers.splice(index, 1)
    },
    deleteRiddle() {
      this.$store.dispatch('deleteRiddle', this.id)
        .then(() => {
          this.$router.push('/me')
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
