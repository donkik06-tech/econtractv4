<template>
  <div class="contract-container">
    <!-- Header: Tách biệt rõ ràng Title và Search -->
    <div class="header-section">
      <div class="title-group">
        <h1 class="page-title">Quản lý Hợp đồng</h1>
        <p class="page-subtitle">
          Theo dõi và quản lý các thỏa thuận pháp lý của doanh nghiệp
        </p>
      </div>
      <a-input-search
        v-model:value="keyword"
        placeholder="Tìm tên công ty, mã hợp đồng..."
        enter-button="Tìm kiếm"
        size="large"
        :loading="loading"
        @search="getContracts"
        class="search-box"
      />
    </div>

    <a-spin :spinning="loading" tip="Đang tải dữ liệu...">
      <div class="card-list">
        <a-card
          v-for="item in contracts"
          :key="item.contractId"
          class="contract-card"
          :bordered="false"
        >
          <div class="card-flex-container">
            <!-- Left: Thông tin chính (Chiếm nhiều không gian nhất) -->
            <div class="info-column main-info">
              <div class="title-row">
                <h4 class="contract-name">{{ item.companyName }}</h4>
                <span class="status-badge">Đang chạy</span>
              </div>

              <div class="meta-row">
                <span class="tax-code">MST: {{ item.companyTaxcode }}</span>
                <span class="divider-dot"></span>
                <span class="contract-id">#{{ item.contractCode }}</span>
              </div>

              <div class="pic-row">
                <div
                  class="pic-avatar-mini"
                  :style="{
                    backgroundColor: getAvatarColor(item.customerName),
                  }"
                >
                  {{
                    item.customerName
                      ? item.customerName.charAt(0).toUpperCase()
                      : 'U'
                  }}
                </div>
                <span class="pic-label">Đầu mối:</span>
                <span class="pic-value">{{ item.customerName }}</span>
              </div>
            </div>

            <!-- Middle: Thông số (Nâng cấp thêm nhiều thông tin) -->
            <div class="info-column metrics-column">
              <!-- Nhóm Ngày tháng (Tận dụng Vertical Space) -->
              <div class="date-group">
                <div class="stat-item mini">
                  <span class="stat-label">NGÀY LẬP</span>
                  <span class="stat-value text-xs">{{
                    formatDateTime(item.contractDate)
                  }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">THỜI HẠN</span>
                  <span class="stat-value text-xs">
                    {{ formatDateTime(item.contractDateStart, 'DD/MM/YY') }} -
                    {{ formatDateTime(item.contractDateEnd, 'DD/MM/YY') }}
                  </span>
                </div>
              </div>

              <!-- Nhóm Tài chính & Thanh toán -->
              <div class="finance-group">
                <div class="stat-item">
                  <span class="stat-label">GIÁ TRỊ</span>
                  <span class="stat-value highlight">{{
                    formatCurrency(item.contractTotal)
                  }}</span>
                </div>
                <!-- Badge Trạng thái thanh toán nằm ngay dưới số tiền -->
                <a-tag
                  :color="item.paymentStatus === 'paid' ? 'success' : 'warning'"
                  class="payment-tag"
                >
                  {{
                    item.paymentStatus === 'paid'
                      ? 'Đã thanh toán'
                      : 'Chờ thanh toán'
                  }}
                </a-tag>
              </div>
            </div>

            <!-- Middle: Thông số (Giá trị & Thời hạn) -->
            <!-- <div class="info-column metrics-column">
              <div class="stat-item">
                <span class="stat-label">GIÁ TRỊ</span>
                <span class="stat-value highlight">{{
                  formatCurrency(item.contractTotal || 450000000)
                }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">THỜI HẠN</span>
                <span class="stat-value">{{
                  formatDateTime(item.contractDateEnd) || '20/12/2026'
                }}</span>
              </div>
            </div> -->

            <!-- Right: Hành động (Cố định bên phải) -->
            <div class="info-column action-column">
              <a-space size="middle">
                <a-tooltip title="Tải xuống tài liệu">
                  <a-button
                    type="light"
                    class="btn-download"
                    @click="download(item.contractId)"
                  >
                    <template #icon><DownloadOutlined /></template>
                  </a-button>
                </a-tooltip>

                <a-dropdown :trigger="['click']" placement="bottomRight">
                  <a-button type="text" class="btn-more">
                    <template #icon><EllipsisOutlined /></template>
                  </a-button>
                  <template #overlay>
                    <a-menu class="modern-menu">
                      <a-menu-item key="view"
                        ><EyeOutlined /> Xem chi tiết</a-menu-item
                      >
                      <a-menu-item key="edit"
                        ><EditOutlined /> Cập nhật</a-menu-item
                      >
                      <a-menu-divider />
                      <a-menu-item key="delete" danger
                        ><DeleteOutlined /> Hủy bỏ</a-menu-item
                      >
                    </a-menu>
                  </template>
                </a-dropdown>
              </a-space>
            </div>
          </div>
        </a-card>

        <a-empty v-if="contracts.length === 0 && !loading" />
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'
import {
  DownloadOutlined,
  EllipsisOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const contracts = ref([])
const keyword = ref('')

onMounted(() => {
  getContracts()
})

const formatDateTime = (date) => {
  if (!date) return 'Chưa cập nhật'
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}

// Lấy danh sách từ API
const getContracts = async () => {
  loading.value = true
  try {
    const response = await axios.get('http://localhost:3333/api/v1/contracts', {
      params: { keyword: keyword.value },
    })
    // Map đúng cấu trúc data của NestJS/Laravel bạn đang dùng
    contracts.value = response.data.data.data
  } catch (error) {
    message.error('Không thể tải danh sách hợp đồng')
    console.error(error)
  } finally {
    loading.value = false
  }
}
const formatCurrency = (val) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(val)
}

// Hàm màu avatar dựa trên tên
const getAvatarColor = (name) => {
  if (!name) return '#94a3b8'
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']
  return colors[name.length % colors.length]
}
// Xử lý tải file
const download = async (id) => {
  try {
    loading.value = true
    const response = await axios.get(
      `http://localhost:3333/api/v1/contracts/download/${id}`,
      { responseType: 'blob' },
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `contract_${id}.docx`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    message.success('Bắt đầu tải file...')
  } catch (error) {
    message.error('Lỗi khi tải file')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Container & Header */
.contract-container {
  /* padding: 40px 20px;
  max-width: 1100px;
  margin: 0 auto;
  background-color: #f8fafc;
  min-height: 100vh; */
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.025em;
}

.page-subtitle {
  color: #64748b;
  margin: 4px 0 0 0;
}

.search-box {
  width: 380px;
}

/* Card Styling */
.contract-card {
  margin-bottom: 16px;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.contract-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px -5px rgba(0, 0, 0, 0.05);
}

.card-flex-container {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* Columns */
.info-column {
  display: flex;
  flex-direction: column;
}

.main-info {
  flex: 1; /* Chiếm tối đa không gian */
}

/* Chi tiết bên trong */
.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.contract-name {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.status-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #dcfce7;
  border-radius: 6px;
  text-transform: uppercase;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 12px;
}

.divider-dot {
  width: 4px;
  height: 4px;
  background: #cbd5e1;
  border-radius: 50%;
}

/* PIC Row */
.pic-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pic-avatar-mini {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: white;
}

.pic-label {
  font-size: 12px;
  color: #64748b;
}

.pic-value {
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}

/* Metrics Column */
.metrics-column {
  flex-direction: row;
  gap: 48px;
  padding: 0 40px;
  border-left: 1px dashed #e2e8f0;
  border-right: 1px dashed #e2e8f0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  min-width: 100px;
}

.stat-label {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 14px;
  font-weight: 700;
  color: #334155;
}

.stat-value.highlight {
  color: #0f172a;
}

/* Buttons */
.btn-download {
  background: #eff6ff;
  color: #2563eb;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-download:hover {
  background: #dbeafe;
}

.btn-more {
  font-size: 18px;
  color: #94a3b8;
}

/* Responsive */
@media (max-width: 992px) {
  .card-flex-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .metrics-column {
    border: none;
    padding: 16px 0;
    width: 100%;
    justify-content: space-between;
  }
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .search-box {
    width: 100%;
  }
}
</style>
