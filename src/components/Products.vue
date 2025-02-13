<script>
import { ref, onMounted, nextTick } from 'vue';
import DataTable from 'datatables.net-dt';

export default {
    setup() {
        const products = ref([]);
        const fetchProducts = async () => {
            const response = await fetch('https://localhost:44308/api/Product');
            products.value = await response.json();

            nextTick(() => {
                new DataTable('#table', {
                    paging: false,
                    searching: true,
                    info: false,
                });
            });
        };
        onMounted(fetchProducts);
        
        
        return { products };
    },
}
</script>

<template>
    <link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.tailwindcss.css">
    <div class="flex flex-col items-center">
        <table id="table" class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-4 py-2 border-b">Nom</th>
                    <th class="px-4 py-2 border-b">Prix</th>
                    <th class="px-4 py-2 border-b">Année de mise en bouteille</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td class="px-4 py-2 border-b">{{ product.name }}</td>
                    <td class="px-4 py-2 border-b">{{ product.sellPrice }}€</td>
                    <td class="px-4 py-2 border-b">{{ product.bottlingDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
@import url('https://cdn.datatables.net/2.2.2/css/dataTables.tailwindcss.css');
</style>