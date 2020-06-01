<template >
    <div id="cart">
        <ion-card id="cart-list" >
            <ion-card-header color="medium">
                <ion-card-title> Cart </ion-card-title>
            </ion-card-header>
            <ion-content class="ion-text-start">
                <ion-grid style="height: 75%" v-if="cart.length == 0">
                    <ion-row justify-content-center align-items-center style="height: 100%">
                        Nothing in the cart
                    </ion-row>
                </ion-grid>
                <ion-item style="width: 100%" v-for="product in cart" :key="product.id" lines="full">
                    <p>{{product.quantity}} X {{product.name}} = {{product.price*product.quantity}}€ </p>
                    <ion-button @click="delProduct(product.id)" slot="end" shape="round" color="danger"> X </ion-button>
                </ion-item>
            </ion-content>
        </ion-card>
        <ion-button id="del-all" color="danger" @click="delAll()">delete all</ion-button>
    </div>
</template>
<script>

import axios from 'axios';

export default {
    name : 'Cart',
    data (){
        return {
            cart :[],
            temp_product_id : "" ,
            tempQuantity:0,
            tempPrice:0
        }
    },
    props:{
        Products: Array
    },
    methods:{
        getCart(){
        axios.get('https://cart-laravel-api.herokuapp.com/api/cart')
        .then( response => {
            this.cart = []
            for (let i=0; i<response.data.length; i++){

                this.temp_product_id = response.data[i].product_id-1

                this.tempQuantity += response.data[i].quantity
                this.tempPrice += parseInt(this.Products[this.temp_product_id].price)*response.data[i].quantity

                this.cart.push({
                id : response.data[i].product_id,
                quantity : response.data[i].quantity,
                name : this.Products[this.temp_product_id].name,
                price : this.Products[this.temp_product_id].price 
                })
            }
            this.$bus.$emit('updateTotal', this.tempQuantity, this.tempPrice)
            //this.cart = []
            this.tempQuantity=0
            this.tempPrice=0
        })
        .catch( error =>  {
            console.log(error.response.data)
        })
        },
        delProduct(productId){
            axios.delete('https://cart-laravel-api.herokuapp.com/api/cart/'+productId)
            .then( response => {
                this.$bus.$emit('update')
            })
            .catch( error =>  {
                console.log(error.response.data)
            })
        },
        delAll(){
            axios.delete('https://cart-laravel-api.herokuapp.com/api/cart')
            .then( response => {
                this.$bus.$emit('update')
            })
            .catch( error =>  {
                console.log(error.response.data)
            })
        }
    },
    mounted(){
        this.$bus.$on('update', () => {
            this.getCart()
        });
    },
    created: function(){
    this.getCart()
    }
}
</script>

<style>
#cart{
    width: 27vw;
    margin-left: 10px;
}
#cart-list{
    height: 300px;
    width: 100%;
}
#del-all{
    width: 100%;
    margin-left: 10px;
}
</style>