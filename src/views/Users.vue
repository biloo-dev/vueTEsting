<template>
<v-container id="user-profile-view" fluid tag="section">
  <v-row justify="center">
    <v-col cols="12" md="6">
      <material-card color="primary" icon="mdi-account-outline">
        <template #title>
          Add New — <small class="text-body-1">User</small>
        </template>

        <v-form>
          <v-container class="py-0">
            <v-row>
              <v-col cols="4" offset="4" class="text-center">
                <v-card class="rounded-circle" @click="addImg">
                  <v-avatar size="150">
                    <v-img class="rounded-circle" src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg" />
                  </v-avatar>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined v-model="editUser.username" hide-details="auto" dense label="User Name" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined v-model="editUser.email" hide-details="auto" dense label="Email Address" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined v-model="editUser.firstName" hide-details="auto" dense label="First Name" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined v-model="editUser.lastName" hide-details="auto" dense label="Last Name" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field outlined v-model="editUser.password" hide-details="auto" dense label="Password" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined v-model="editUser.confirmPassword" hide-details="auto" dense label="Confirm Password" />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn :color="editedIndex === -1 ? 'primary' : 'success'" min-width="150">
                  {{ formTitle }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </material-card>
    </v-col>

    <v-col cols="12" md="6">
      <template>
        <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ $t('users') }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editUser.name" label="Dessert name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editUser.calories" label="Calories"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editUser.fat" label="Fat (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editUser.carbs" label="Carbs (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editUser.protein" label="Protein (g)"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </template>
    </v-col>
  </v-row>
</v-container>
</template>
 <script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'id', 
          sortable: false,
          value: 'id',
        },
        { text: 'username',align: 'start', value: 'username' },
        { text: 'firstName',align: 'start', value: 'firstName' },
        { text: 'lastName',align: 'start', value: 'lastName' },
        { text: 'E-mail', value: 'email' }, 
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editUser: { 
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      defaultUser: { 
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? this.$t('NewUser') : this.$t('EditUser')
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            id: 159,
            username:'Frozen Yogurt',
            firstName: 6.0,
            lastName: 24,
            email: 4.0,
          },
          {
            id: 237,
            username:'Ice cream sandwich',
            firstName: 9.0,
            lastName: 37,
            email: 4.3,
          },
          {
            id: 262,
            username:'Eclair',
            firstName: 16.0,
            lastName: 23,
            email: 6.0,
          },
          {
            id: 305,
            username:'Cupcake',
            firstName: 3.7,
            lastName: 67,
            email: 4.3,
          },
          {
            id: 356,
            username:'Gingerbread',
            firstName: 16.0,
            lastName: 49,
            email: 3.9,
          },
          {
            id: 375,
            username:'Jelly bean',
            firstName: 0.0,
            lastName: 94,
            email: 0.0,
          },
          {
            id: 392,
            username:'Lollipop',
            firstName: 0.2,
            lastName: 98,
            email: 0,
          },
          {
            id: 408,
            username:'Honeycomb',
            firstName: 3.2,
            lastName: 87,
            email: 6.5,
          },
          {
            id: 452,
            username:'Donut',
            firstName: 25.0,
            lastName: 51,
            email: 4.9,
          },
          {
            id: 518,
            username:'KitKat',
            firstName: 26.0,
            lastName: 65,
            email: 7,
          },
        ]
      },

      addImg () {
         alert('oky oky')
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editUser = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editUser = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editUser = Object.assign({}, this.defaultUser)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editUser = Object.assign({}, this.defaultUser)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editUser)
        } else {
          this.desserts.push(this.editUser)
        }
        this.close()
      },
    },
  }
</script>