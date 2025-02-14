<template>
    <div class="flex flex-col items-center py-8">
        <div class="w-11/12">
            <div class="my-6 flex justify-between items-center">
                <h3 class="text-xl font-bold text-pink-800">Mes commandes</h3>
            </div>
            <table id="table" class="w-full my-8">
                <thead class="text-left bg-pink-800 text-gray-50">
                    <tr>
                        <th class="p-2">Numéro</th>
                        <th class="p-2">Date</th>
                        <th class="p-2">Nombre de produits</th>
                        <th class="p-2">Montant</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="orders.length == 0">
                        <td colspan="3" class="text-center py-4">Aucune commande</td>
                    </tr>
                    <tr v-else v-for="order in orders" @click="openOrderInfosModal(order)" class="cursor-pointer hover:bg-gray-100">
                        <td class="p-1">{{ order.id }}</td>
                        <td class="p-1">{{ order.date }}</td>
                        <td class="p-1">{{ calculateProductLength(order) }}</td>
                        <td class="p-1">{{ calculateTotalPrice(order) }}€</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-if="orderModal.isOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg w-11/12 sm:w-10/12 md:w-9/12 lg:w-6/12 xl:4/12 2xl:w-3/12 p-6 overflow-auto">
            <h2 class="text-xl text-pink-800 font-bold mb-4">
                Détail de la commande
            </h2>
            <div class="px-2">
                <span class="block text-gray-700 font-bold">Numéro de commande</span>
                {{ orderModal.order?.id }}
            </div>
            <div class="px-2">
                <span class="block text-gray-700 font-bold">Date de commande</span>
                {{ new Date(orderModal.order?.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
            <div class="px-2">
                <span class="block text-gray-700 font-bold">Total de la commande</span>
                {{ calculateTotalPrice(orderModal.order) }}€
            </div>
            <div class="px-2">
                <span class="block text-gray-700 font-bold">Détails des produits</span>
                <table class="w-full">
                    <thead class="text-left bg-pink-800 text-gray-50">
                        <tr>
                            <th class="p-2">Nom</th>
                            <th class="p-2">Quantité</th>
                            <th class="p-2">Prix unitaire</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in orderModal.order.orderProducts">
                            <td class="p-1">{{ products.find(p => p.id === product.productId)?.name }}</td>
                            <td class="p-1">{{ product.quantity }}</td>
                            <td class="p-1">{{ products.find(p => p.id === product.productId)?.sellPrice }}€</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-full flex justify-end mt-4 px-2">
                <button type="button" @click="closeOrderInfosModal" class="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded mr-2">Fermer</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router/router';

export default {
    data() {
        return {
            orders: [],
            products: [],
            
            orderModal: {
                isOpen: false,
                title: '',
                order: null
            }
        };
    },
    computed: {
        token() {
            return localStorage.getItem('authToken');
        },
    },
    methods: {
        async fetchOrders() {
            if (!this.token) {
                return router.push('/');
            }
            try {
                const response = await fetch('https://localhost:44308/api/Order', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                if (response.ok) {
                    this.orders = await response.json();
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        
        async fetchProductInfos(productId) {
            try {
                const response = await fetch(`https://localhost:44308/api/Product/Get/${productId}`);
                if (response.ok) {
                    const product = await response.json();
                    this.products.push(product);
                } else {
                    console.error('Failed to fetch product infos');
                }
            } catch (error) {
                console.error('Error fetching product infos:', error);
            }
        },
        
        calculateTotalPrice(order) {
            let totalPrice = 0;
            
            for (const product of order.orderProducts) {
                if (!this.products.find(p => p.id === product.productId)) {
                    this.fetchProductInfos(product.productId);
                }
                
                const productInfos = this.products.find(p => p.id === product.productId);
                
                totalPrice += productInfos.sellPrice * product.quantity;
            }
            
            return totalPrice;
        },
        
        calculateProductLength(order) {
            let productLength = 0;
            
            for (const product of order.orderProducts) {
                productLength += product.quantity;
            }
            
            return productLength;
        },

        openOrderInfosModal(order) {
            this.orderModal.isOpen = true;
            this.orderModal.order = order;
        },

        closeOrderInfosModal() {
            this.orderModal.isOpen = false;
        },
    },
    
    mounted() {
        this.fetchOrders();
    },
};
</script>

<style scoped>
/* Add your styles here */
</style>