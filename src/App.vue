<template>
  <div id="app">
    <ion-app>
      <ion-header>
        <ion-toolbar>
          <ion-row>
            <ion-title>Vue Cart</ion-title>
            <ion-row>
              <p> {{TotalNbProduct}} produit{{ TotalNbProduct > 1  ?  's' : ' '}} pour {{totalPrice}}€</p>
              <p>Clément</p>
            </ion-row>
          </ion-row>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-row>
          <ProductList v-bind:Products="Products"/>
          <Cart v-bind:Products="Products"/>
        </ion-row>
       </ion-content>
    </ion-app>
  </div>
</template>

<script>
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import axios from 'axios';

export default {
  name: 'App',
  data (){
    return {
        Products :[],
        TotalNbProduct:0,
        totalPrice:0
    }
  },
  components: {
    ProductList,
    Cart
  },
    methods: {
  } ,

  mounted(){
    this.$bus.$on('updateTotal', (EmitedTotalNbProduct, EmitedTotalPrice) => {
        this.TotalNbProduct = EmitedTotalNbProduct
        this.totalPrice = EmitedTotalPrice
    });
  },

  created:function(){
    axios.get('https://cart-laravel-api.herokuapp.com/api/products')
    .then( response => {
        for (let i=0; i<response.data.length; i++){
              this.Products.push({
                id : response.data[i].id,
                name : response.data[i].name,
                description : response.data[i].description,
                price : response.data[i].price   
              })               
        }
    })
    .catch( error =>  {
        console.log(error.response.data)
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ion-row ion-row p{
  font-weight: bold;
  margin-right : 20px;
}
</style>
