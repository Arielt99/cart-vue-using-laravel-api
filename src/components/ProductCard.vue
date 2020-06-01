<template>
    <ion-card id="ProductCard">
        <ion-card-header>
            <ion-card-title>{{emitedProduct.name}}</ion-card-title>
            <ion-card-subtitle>{{emitedProduct.price}}€</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>{{emitedProduct.description}}</ion-card-content>
        <ion-chip color="dark" @click="AddToCart(emitedProduct.id)">
            <ion-icon name="cart"></ion-icon>
            <ion-label >Add to the cart</ion-label>
        </ion-chip>
    </ion-card>
</template>

<script>

import axios from 'axios';

export default {
    name : 'ProductCard',
    props:{
        emitedProduct: Object
    },
    methods:{
        AddToCart(ProductId){
            axios.post('https://cart-laravel-api.herokuapp.com/api/cart',{product_id: ProductId})
            .then( response => {
                this.$bus.$emit('update')
            })
            .catch( error =>  {
                console.log(error.response.data)
            })
        }
    }
}
</script>

<style>
#ProductCard{
    width: 48%;
}
</style>