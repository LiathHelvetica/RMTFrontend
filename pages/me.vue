<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="user-name">{{ userData.userName }}</v-card-title>
        <v-card-text>
          <div class="d-flex flex-row user-data ma-2">
            <div :style="dataLabelContainerWidth"><v-icon class="pr-2">mdi-email</v-icon>email</div>
            <div :style="dataContainerWidth">{{ userData.email }}</div>
          </div>
          <v-divider />
          <div class="d-flex flex-row user-data ma-2">
            <div :style="dataLabelContainerWidth"><v-icon class="pr-2">mdi-account</v-icon>id</div>
            <div :style="dataContainerWidth">{{ userData.id }}</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

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
          @click="goToMyRiddle(riddle.id)"
        >
          <div class="d-flex align-center justify-space-between">
            <v-card-title class="py-4">{{ riddle.title }}</v-card-title>
            <div class="pr-4">{{ toDateWithoutTime(riddle.lastUpdateDate) }}</div>
          </div>
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
  name: 'Me',
  async asyncData (context) {
    const userData = await context.store.dispatch('getMyData')
      .catch((error) => {
        console.log(error)
      })
    const out = await context.store.dispatch('getMyRiddles', { n: n, isAccepted: true })
      .catch((error) => {
        console.log(error)
      })
    return {
      riddles: out.data,
      n: n,
      userData
    }
  },
  data () {
    return {
      widthsForDataLabel: {
        xs: 20,
        sm: 20,
        md: 20,
        lg: 20,
        xl: 20
      },
      widthsForData: {
        xs: 80,
        sm: 80,
        md: 80,
        lg: 80,
        xl: 80
      },
      page: 0,
      titleContains: "",
      contentsContains: "",
      isAccepted: true
    }
  },
  computed: {
    dataLabelContainerWidth() {
      return {
        width: this.widthsForDataLabel[this.$vuetify.breakpoint.name] + '%'
      }
    },
    dataContainerWidth() {
      return {
        width: this.widthsForData[this.$vuetify.breakpoint.name] + '%'
      }
    }
  },
  methods: {
    toDateWithoutTime(str) {
      const d = new Date(str)
      return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
    },
    goToMyRiddle(id) {
      this.$router.push(`/riddle/edit/${id}`)
    },
    getNextPage(direction) {
      this.page += direction
      this.refreshRiddles()
    },
    async refreshRiddles() {
      await this.$store.dispatch('getMyRiddles', {
        n: n,
        page: this.page,
        isAccepted: this.isAccepted,
        ...(this.titleContains.trim() !== "") && { titleContains: this.titleContains.trim() },
        ...(this.contentsContains.trim() !== "") && { contentsContains: this.contentsContains.trim() }
      })
        .then(result => {
          console.log(this.riddles)
          console.log(result.data)
          this.riddles = result.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.user-name {
  font-size: 30px;
}

.user-data {
  font-size: 23px;
}
</style>
