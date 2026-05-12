<template>
  <h1 class="fw-bold">Danh sách công ty</h1>
  <div class="row mb-2">
    <div class="col-12">
      <input
        type="text"
        placeholder="Nhập từ khóa  tìm kiếm"
        class="form-control"
        v-model="keyword"
        @keypress.enter="search"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-12">
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
              <th class="text-uppercase">Tên công ty</th>
              <th class="text-uppercase">Mã số thuế</th>
              <th class="text-uppercase">Đại diện</th>
              <th class="text-uppercase">SĐT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in companies" :key="item.companyId">
              <td>{{ item.companyId }}</td>
              <td>{{ item.companyName }}</td>
              <td>{{ item.companyTaxcode }}</td>
              <td>{{ item.companyOwner }}</td>
              <td>{{ item.companyTelephone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const companies = ref([])
const keyword = ref('')

let loading = ref(true)

onMounted(() => {
  getCompanies()
})

const getCompanies = async () => {
  loading.value = true
  await axios
    .get('http://localhost:3333/api/v1/companies', {
      params: {
        keyword: keyword.value,
        page: 1,
      },
    })
    .then((response) => {
      companies.value = response.data.data.data
      loading.value = false
    })
}
const search = () => {
  getCompanies()
}
</script>
