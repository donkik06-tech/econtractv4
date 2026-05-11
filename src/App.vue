<template>
  <h1>Danh sách công ty</h1>
  <!-- <pre>
    {{ companies }}
  </pre> -->

  <main class="flex-grow-1 p-4 p-lg-5">
    <!-- Header -->
    <div
      class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-5 gap-4"
    >
      <div>
        <h1 class="fw-800 display-6 mb-1">
          Hợp đồng <span class="text-muted fw-normal">/ Danh sách</span>
        </h1>
        <p class="text-secondary fw-medium">
          Theo dõi và quản lý 24 hợp đồng đang thực hiện.
        </p>
      </div>
      <div class="d-flex gap-3 align-items-center">
        <div class="search-box shadow-sm">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="#64748b"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input type="text" placeholder="Tìm kiếm nhanh..." />
        </div>
        <button class="btn btn-black shadow">+ Tạo hợp đồng</button>
      </div>
    </div>

    <!-- Filters -->
    <div class="d-flex flex-wrap align-items-center gap-2 mb-4">
      <button class="btn btn-dark btn-sm rounded-pill px-4">Tất cả</button>
      <button class="btn btn-outline-secondary btn-sm rounded-pill px-4">
        Đang chạy
      </button>
      <button class="btn btn-outline-secondary btn-sm rounded-pill px-4">
        Sắp hết hạn
      </button>
      <div class="vr mx-2 text-secondary opacity-25"></div>
      <button
        class="btn btn-link text-decoration-none text-muted fw-bold btn-sm"
      >
        Lọc nâng cao
      </button>
    </div>

    <!-- Contract List -->
    <div class="row g-0">
      <!-- Card 1 -->
      <div
        class="contract-card container-fluid"
        v-for="item in companies"
        :key="item.companyId"
      >
        <div class="row align-items-center g-4">
          <div class="col-lg-3">
            <div class="d-flex align-items-center gap-3">
              <div
                class="rounded-4 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center text-primary"
                style="width: 48px; height: 48px"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <div>
                <h6 class="fw-bold mb-0">{{ item.companyName }}</h6>
                <small class="text-muted fst-italic">{{
                  item.companyAddress
                }}</small>
              </div>
              <div>
                <small class="text-muted fst-italic">{{
                  item.companyTaxcode
                }}</small>
              </div>
            </div>
          </div>

          <div class="col-lg-3">
            <div class="d-flex justify-content-between small fw-bold mb-1">
              <span class="text-muted text-uppercase" style="font-size: 9px"
                >Timeline</span
              >
              <span style="font-size: 10px">75% Hoàn thành</span>
            </div>
            <div class="timeline-bar">
              <div class="progress-fill" style="width: 75%"></div>
            </div>
            <div
              class="d-flex justify-content-between text-muted"
              style="font-size: 10px"
            >
              <span>01/01/2024</span>
              <span>31/12/2024</span>
            </div>
          </div>

          <div
            class="col-lg-2 border-start border-light-subtle px-4 d-none d-lg-block"
          >
            <span
              class="text-muted text-uppercase fw-bold"
              style="font-size: 9px"
              >Giá trị</span
            >
            <div class="fw-bold fs-5">
              540.0M <small class="text-muted small">VND</small>
            </div>
          </div>

          <div class="col-lg-2">
            <span
              class="text-muted text-uppercase fw-bold d-block mb-2"
              style="font-size: 9px"
              >Đầu mối</span
            >
            <div class="d-flex align-items-center gap-2">
              <div class="avatar-sm bg-warning-subtle text-warning">HA</div>
              <span class="small fw-bold">Hoàng Anh</span>
            </div>
          </div>

          <div
            class="col-lg-2 d-flex align-items-center justify-content-end gap-3"
          >
            <span
              class="status-badge bg-success-subtle text-success border border-success-subtle"
              >ACTIVE</span
            >
            <button class="btn btn-light rounded-3 btn-sm border shadow-sm">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" stroke-width="3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer / Pagination -->
    <div
      class="mt-5 d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white bg-opacity-50 border border-white rounded-5 shadow-sm gap-3"
    >
      <div class="small fw-bold text-muted">
        Hiển thị <span class="text-dark fw-bolder">02</span> / 24 kết quả
      </div>
      <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm mb-0 gap-2">
          <li class="page-item">
            <a
              class="page-link rounded-3 border-0 bg-white shadow-sm p-2"
              href="#"
              ><svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" stroke-width="2"></path></svg
            ></a>
          </li>
          <li class="page-item active">
            <a
              class="page-link rounded-3 border-0 bg-dark text-white px-3"
              href="#"
              >1</a
            >
          </li>
          <li class="page-item">
            <a
              class="page-link rounded-3 border-0 bg-white shadow-sm px-3 text-muted"
              href="#"
              >2</a
            >
          </li>
          <li class="page-item">
            <a
              class="page-link rounded-3 border-0 bg-white shadow-sm p-2"
              href="#"
              ><svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" stroke-width="2"></path></svg
            ></a>
          </li>
        </ul>
      </nav>
    </div>
  </main>
</template>

<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"

const companies = ref([])

onMounted(() => {
  axios.get("http://localhost:3333/api/v1/companies").then((response) => {
    companies.value = response.data.data
  })
})
</script>
