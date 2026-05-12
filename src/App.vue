<template>
  <div class="container">
    <h1>Danh sách công ty</h1>
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
              <tr>
                <th>#</th>
                <th>Tên công ty</th>
                <th>Mã số thuế</th>
                <th>Đại diện</th>
                <th>SĐT</th>
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
      <!-- <div class="col-6" v-for="item in companies" :key="item.companyId">
        <div class="card mb-2">
          <div class="card-header">
            <div class="card-title">#{{ item.companyId }}</div>
          </div>
          <div class="card-body">
            <h6 class="fw-bold">{{ item.companyName }}</h6>
            <p>{{ item.companyTaxcode }}</p>
            <div class="text-muted">
              {{ item.companyAddress }}
            </div>
            <div class="mt-2">
              <ul class="list-group">
                <li class="list-group-item">
                  <b>Người đại diện:</b> {{ item.companyOwner }}
                </li>
                <li class="list-group-item">
                  <b>Chức vụ:</b> {{ item.companyPosition }}
                </li>
                <li class="list-group-item">
                  <b>SĐT:</b> {{ item.companyTelephone }}
                </li>
                <li class="list-group-item">
                  <b>Email:</b> {{ item.companyEmail }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> -->
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
