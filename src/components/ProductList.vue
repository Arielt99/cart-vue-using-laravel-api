<template>
    <ion-row id="ProductList" text-wrap>
        <ion-card id="ProductListCard">
            <ion-card-header color="medium">
                <ion-card-title>Product List</ion-card-title>
            </ion-card-header>
            <ion-content class="ion-text-start">
                <ion-row text-wrap>
                    <ProductCard class="ion-text-start" v-for="product in Products" :key="product.id" v-bind:emitedProduct="product"/>  
                </ion-row>
            </ion-content>
        </ion-card>
    </ion-row>
</template>

<script>

import axios from 'axios';
import ProductCard from './ProductCard'

export default {
    name: 'ProductList',
    components: {
    ProductCard
    },
    props:{
    Products: Array
    },
}
</script>
<style>
#ProductList{
    width: 70vw;
    height: 90vh;
}
#ProductListCard{
    width: 100%;
}
</style>
