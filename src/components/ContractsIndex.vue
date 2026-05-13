<template>
  <h1 class="fw-bold">Danh sách hợp đồng</h1>
  <input
    type="text"
    class="form-control mb-2"
    placeholder="Nhập từ khóa tìm kiếm"
    v-model="keyword"
    @keypress.enter="search"
  />
  <div class="position-relative">
    <div v-if="loading" class="loading-overlay">
      <div
        class="spinner-border text-primary loading-spinner"
        role="status"
      ></div>
    </div>
    <table class="table table-hover table-bordered">
      <thead>
        <tr class="table-dark">
          <th>#</th>
          <th>Tên công ty</th>
          <th>Mã số thuế</th>
          <th>Mã LĐ</th>
          <th>Đầu mối</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in contracts" :key="item.contractId">
          <td>{{ item.contractId }}</td>
          <td>{{ item.companyName }}</td>
          <td>{{ item.companyTaxcode }}</td>
          <td>{{ item.contractCode }}</td>
          <td>{{ item.customerName }}</td>
          <td>
            <button class="btn btn-primary" @click="download(item.contractId)">
              Download
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const loading = ref(false)
const contracts = ref([])

const keyword = ref('')

onMounted(() => {
  getContracts()
})

const getContracts = async () => {
  loading.value = true
  await axios
    .get('http://localhost:3333/api/v1/contracts', {
      params: {
        keyword: keyword.value,
      },
    })
    .then((response) => {
      contracts.value = response.data.data.data
      loading.value = false
    })
}

const search = async () => {
  await getContracts()
}

const download = async (id) => {
  loading.value = true
  const response = await axios.get(
    'http://localhost:3333/api/v1/contracts/download/' + id,
    {
      responseType: 'blob',
    },
  )

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')

  link.href = url

  link.setAttribute('download', `contract_${id}.docx`)

  document.body.appendChild(link)

  link.click()

  loading.value = false
}
</script>
