<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <v-text-field
            id="titleContains"
            v-model="titleContains"
            label="string contained in title"
            prepend-icon="mdi-pencil"
          />
          <v-text-field
            id="contentsContains"
            v-model="contentsContains"
            label="string contained in content"
            prepend-icon="mdi-text"
          />
          <v-text-field
            id="userNameContains"
            v-model="userNameContains"
            label="string contained in username"
            prepend-icon="mdi-account"
          />
          <v-checkbox
            id="isAccepted"
            v-model="isAccepted"
            prepend-icon="mdi-check"
            label="Show only accepted"
          />
        </v-card-text>
        <v-card-text class="pt-0 d-flex justify-center">
          <v-btn color="green" width="80%" @click="refreshRiddles">Refresh</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <div class="d-flex flex-wrap">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        v-for="(riddle, index) in riddles"
        :id="`riddle-${index}`"
      >
        <v-card
          class="mb-6"
          @click="goToRiddle(riddle.id)"
        >
          <div class="d-flex align-center justify-space-between pt-4">
            <v-card-title class="py-0">{{ riddle.title }}</v-card-title>
            <div class="pr-4">{{ toDateWithoutTime(riddle.lastUpdateDate) }}</div>
          </div>
          <v-card-subtitle class="pt-0">Created by {{ riddle.creatorName }}</v-card-subtitle>
        </v-card>
      </v-col>
    </div>
    <v-col cols="12" class="d-flex align-center justify-center">
      <v-btn @click="getNextPage(-1)" class="mr-2"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <div>Page: {{ page }}</div>
      <v-btn @click="getNextPage(1)" class="ml-2"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </v-col>
  </v-row>
</template>

<script>

const n = 12
export default {
  name: 'MainPage',
  async asyncData (context) {
    const out = await context.store.dispatch('getRiddles', { n: n, isAccepted: true })
      .catch((error) => {
        console.log(error)
      })
    return {
      riddles: out.data,
      n: n
    }
  },
  data() {
    return {
      page: 0,
      titleContains: "",
      contentsContains: "",
      userNameContains: "",
      isAccepted: true
    }
  },
  methods: {
    toDateWithoutTime(str) {
      const d = new Date(str)
      return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
    },
    goToRiddle(id) {
      this.$router.push(`/riddle/${id}`)
    },
    getNextPage(direction) {
      this.page += direction
      this.refreshRiddles()
    },
    async refreshRiddles() {
      await this.$store.dispatch('getRiddles', {
        n: n,
        page: this.page,
        isAccepted: this.isAccepted,
        ...(this.titleContains.trim() !== "") && { titleContains: this.titleContains.trim() },
        ...(this.contentsContains.trim() !== "") && { contentsContains: this.contentsContains.trim() },
        ...(this.userNameContains.trim() !== "") && { userNameContains: this.userNameContains.trim() }
      })
        .then(result => {
          this.riddles = result.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
