<script>
import { ref, onMounted, nextTick, watch } from 'vue';
import DataTable from 'datatables.net-dt';

export default {
    setup() {
        const products = ref([]);
        const tableProducts = ref(null);

        const fetchProducts = async () => {
            const response = await fetch('https://localhost:44308/api/Product');
            products.value = await response.json();

            products.value.forEach((product) => {
                product.purchaceQuantity = 1;
            });

            nextTick(() => {
                tableProducts.value = new DataTable('#table', {
                    paging: false,
                    searching: true,
                    info: false,
                    language: {
                        search: 'Rechercher : ',
                    },
                });
            });
        };

        const command = async (product) => {
            const bodyRequest = {
                userId: 1,
                products: [
                    {
                        productId: product.id,
                        quantity: product.purchaceQuantity,
                    }
                ]
            };

            try {
                const response = await fetch('https://localhost:44308/api/Order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                    body: JSON.stringify(bodyRequest),
                });
                if (response.ok) {
                    alert('Commande passée !');
                } else {
                    console.error('Failed to create order');
                }
            } catch (error) {
                console.error('Error creating order:', error);
            }


        }

        onMounted(fetchProducts);

        const openModal = () => {
            console.log('open modal');
        };
        return {
            products,
            tableProducts,
            openModal,
            command,
        };
    },
}
</script>

<template>
    <link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.tailwindcss.css">
    <div class="flex flex-col items-center py-8">
        <div class="w-11/12">
            <div class="my-6 flex justify-between items-center">
                <h3 class="text-xl font-bold text-pink-800">Produits</h3>
                <button @click="openModal" class="text-l w-30 bg-green-800 hover:bg-green-700 text-white py-1 px-4 rounded">Commander</button>
            </div>
            <table id="table" class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead class="text-left bg-pink-800 text-gray-50">
                    <tr>
                        <th class="p-2">#</th>
                        <th class="p-2">Réf.</th>
                        <th class="p-2">Nom</th>
                        <th class="p-2">Domaine</th>
                        <th class="p-2">Millésime</th>
                        <th class="p-2">Prix</th>
                        <th data-orderable="false"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td class="p-1">{{ product.id }}</td>
                        <td class="p-1">{{ product.reference }}</td>
                        <td class="p-1">{{ product.name }}</td>
                        <td class="p-1">{{ product.house }}</td>
                        <td class="p-1">{{ product.bottlingDate }}</td>
                        <td class="p-1">{{ product.sellPrice }}€</td>
                        <td class="p-1">
                            <div class="flex flex-row gap-2">
                                <select class="rounded border border-gray-200 px-2 py-1" v-model="product.purchaceQuantity">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                                <button class="rounded bg-green-800 px-4 py-1 text-white" @click="command(product)">Commander</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    tbody tr {
        cursor: pointer;

        &:hover {
            background-color: #f9f9f9;
        }
    }
</style>