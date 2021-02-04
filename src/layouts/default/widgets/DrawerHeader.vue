<template>
<v-list-item class="mb-0 justify-space-between pl-3">
  <v-list-item-avatar size="80">
    <v-img :src="
          require('@/assets/logo.png')" />
  </v-list-item-avatar>

  <v-list-item-content class="pl-0">
    <v-list-item-title class="text-h3">
      <strong class="mr-1 font-weight-black">T-</strong>

      <span class="primary--text">MEDIC</span>
    </v-list-item-title>
  </v-list-item-content>
</v-list-item>
</template>

<script>
// Utilities
import {
  get
} from 'vuex-pathify'

export default {
  name: 'DefaultDrawerHeader',

  computed: {
    version: get('app/version')
  },
}
</script>
