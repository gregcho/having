<template>
  <v-container class="pa-15 mb-15">
    <div v-if="currentUser">
      <header class="jumbotron">
        <h3>{{content}}</h3>
      </header>
    </div>
    <div v-else>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items"
        sort-by="품목"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>재고관리</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.NAME"
                          label="품목"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.gijun_count"
                          label="기준수량"
                          value="form.gijun_count"
                          @change="updateOrder"
                          id="gijun_count"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.count"
                          label="재고"
                          @change="updateOrder"
                          type="number"
                          value="form.count"
                          id="count"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.order_count"
                          label="발주수량"
                          type="number"
                          readonly
                          value="form.order_count"
                          id="order_count"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.price"
                          label="가격"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save(formTitle)">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
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
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        
      </v-data-table>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
import authHeader from '../services/auth-header';
import UserService from '../services/user.service';

export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      selected:[],
      headers: [
        {
          text: '품목',
          align: 'start',
          sortable: false,
          value: 'NAME',
        },
        { text: '기준수량', value: 'gijun_count' },
        { text: '재고', value: 'count' },
        { text: '발주수량', value: 'order_count' },
        { text: '가격', value: 'price' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        CODE: '',
        NAME: '',
        gijun_count: 0,
        count: 0,
        order_count: 0,
        price: 0
      },
      items:[],
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      content: ''
    }),
    computed: {
      currentUser() {
      console.log(this.$store.state.auth.user)
        if(this.$store.state.auth.user==null){
          return true;
        }else{
          return false;
        }
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    },
    beforeMount(){
      console.log('before mount')
      this.getInitData()
    },
    mounted() {
      UserService.getUserBoard().then(
        response => {
          console.log('mount')
          console.log(response.data)
          this.content = response.data;
        },
        error => {
          console.log('mount error')
          this.content =
          '로그인 필요';
          console.log('mo1')
        }
      );
    },
    methods: {
      updateOrder() {
        this.editedItem.order_count = this.editedItem.gijun_count - this.editedItem.count
      },
      createSnackBar(error){
        this.snackbar = true
        this.text= error,
        this.timeout= 2000
      },
      getInitData(){  //검색 함수
      axios
      .get("parts/store", { headers: authHeader() })
        .then((res) => {
          console.log('part/store')
          var b_items = (res.data);

          this.items = b_items;
          let isProgress = false;
          for(var i = 0; i < res.data.length; i++){
            //console.log("data ::");
            //console.log(res.data[i]);
            if(res.data[i].status == 0){
              isProgress = true;
              break;
            }
          }
          if(!isProgress){
            console.log('InterVal 종료')
            clearInterval(this.interval);
          }
        })
        .catch((error) => {
          this.createSnackBar('서버에러');
          alert(error);
        })
        .finally(() => {
        })
      },
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios
          .get("parts/deleteWareHouse",{
            headers: authHeader(),
            params:{
              'itemcode':this.editedItem.CODE,
            }
          })
          .then((res) => {
            this.getInitData();
            this.period = false;
          })
          .catch((error) => {
            this.createSnackBar('서버에러');
            console.log("error");
            console.log("error:",error);
          })
          .finally(() => {
            console.log("finally");
          })

          this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save(title) {
        console.log('save',title)
        console.log('save1', this.editedItem)
        
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        if (title == 'New Item'){
          axios
          .get("parts/insertWareHouse",{
            headers: authHeader(),
            params:{
              'count':this.editedItem.count,
              'gijun_count':this.editedItem.gijun_count,
              'order_count':this.editedItem.order_count,
              'NAME':this.editedItem.NAME,
              'price':this.editedItem.price
            }
          })
          .then((res) => {
            this.getInitData();
            this.period = false;
          })
          .catch((error) => {
            this.createSnackBar('서버에러');
            console.log("error");
            console.log("error:",error);
          })
          .finally(() => {
            console.log("finally");
          })
        }else{
          axios
          .get("parts/updateWareHouse",{
            headers: authHeader(),
            params:{
              'count':this.editedItem.count,
              'itemcode':this.editedItem.CODE
            }
          })
          .then((res) => {
            this.getInitData();
            this.period = false;
          })
          .catch((error) => {
            this.createSnackBar('서버에러');
            console.log("error");
            console.log("error:",error);
          })
          .finally(() => {
            console.log("finally");
          })
        }
        this.close()
      },
    },
  }
</script>