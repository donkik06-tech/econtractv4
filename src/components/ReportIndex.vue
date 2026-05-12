<template>
  <h1>Reports</h1>

  <pre>
    {{ reportData }}
  </pre>
</template>

<script setup>
import { ref } from "vue"

const reportData = ref([
  {
    contracts: [
      {
        column: "contractId",
        value: 1,
        displayColumn: "ID hợp đồng",
      },
      {
        column: "contractTotal",
        value: 500000,
        displayColumn: "Giá trị hợp đồng",
      },
    ],
  },
])
</script>
