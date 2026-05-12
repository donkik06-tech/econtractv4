<template>
  <h1 class="fw-bold">Danh sách hợp đồng</h1>

  <table class="table table-hover table-bordered">
    <thead>
      <tr class="table-dark">
        <th>#</th>
        <th>Tên công ty</th>
        <th>Mã số thuế</th>
        <th>Mã LĐ</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in contracts" :key="item.contractId">
        <td>{{ item.contractId }}</td>
        <td>{{ item.company?.companyName }}</td>
        <td>{{ item.company?.companyTaxcode }}</td>
        <td>{{ item.contractCode }}</td>
        <td>
          <button class="btn btn-primary" @click="download(item.contractId)">
            Download
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const contracts = ref([])

onMounted(() => {
  getContracts()
})

const getContracts = async () => {
  await axios.get('http://localhost:3333/api/v1/contracts').then((response) => {
    contracts.value = response.data.data.data
  })
}

const download = async (id) => {
  const response = await axios.get(
    'http://localhost:3333/api/v1/contracts/download/' + id,
    {
      responseType: 'blob',
    },
  )

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')

  link.href = url

  link.setAttribute('download', 'contract.docx')

  document.body.appendChild(link)

  link.click()
}
</script>
