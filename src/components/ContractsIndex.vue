<template>
  <a-page-header title="DANH SÁCH HỢP ĐỒNG" @back="() => {}" />

  <a-form layout="vertical" @submit.prevent="getContracts">
    <a-row :gutter="[12, 12]" align="bottom">
      <!-- Luôn hiện ô tìm kiếm chính này -->
      <a-col :xs="24" :md="12" :lg="14">
        <a-form-item label="Từ khóa tìm kiếm" class="mb-0">
          <a-input
            size="large"
            v-model:value="keyword"
            placeholder="Nhập mã số thuế hoặc tên công ty để tìm kiếm..."
            allow-clear
          />
        </a-form-item>
      </a-col>

      <!-- Hàng nút bấm chính kèm nút Mở rộng -->
      <a-col :xs="24" :md="12" :lg="10" style="text-align: right">
        <a-space :size="8">
          <a-button size="large" @click="getContracts()">Đặt lại</a-button>
          <a-button
            type="primary"
            size="large"
            html-type="submit"
            :loading="loading"
            >Tìm kiếm</a-button
          >

          <!-- Nút trigger giả lập nâng cao bằng Antd Link -->
          <a-button
            type="link"
            @click="isAdvancedSearchVisible = !isAdvancedSearchVisible"
          >
            {{ isAdvancedSearchVisible ? "Thu gọn" : "Bộ lọc nâng cao" }}
            <UpOutlined v-if="isAdvancedSearchVisible" />
            <DownOutlined v-else />
          </a-button>
        </a-space>
      </a-col>
    </a-row>

    <!-- Đoạn này có thể dùng CSS ẩn/hiển thị hoặc để tạm để test layout -->
    <a-row
      :gutter="[12, 12]"
      align="bottom"
      class="mt-3"
      v-show="isAdvancedSearchVisible"
    >
      <a-col :span="6">
        <a-form-item label="Thời gian hợp đồng" class="mb-0">
          <a-range-picker
            size="large"
            style="width: 100%"
            format="DD/MM/YYYY"
          />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="Đầu mối" class="mb-0">
          <a-input size="large" placeholder="Tên đầu mối..." allow-clear />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="Trạng thái" class="mb-0">
          <a-select size="large" placeholder="Tất cả" allow-clear />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="Thanh toán" class="mb-0">
          <a-select size="large" placeholder="Tất cả" allow-clear />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>


  <a-table
    :columns="columns"
    :data-source="contracts"
    :loading="loading"
    :pagination="{
      pageSize: 100,
    }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key == 'companyName'">
        <strong class="text-primary">{{ record.companyName }}</strong>
      </template>
      <template v-if="column.key == 'status'">
        <a-tag color="success" class="payment-tag fw-bold text-wrap">
          {{ contractPayment(record.contractPayment) }}
        </a-tag>
      </template>
      <template v-if="column.key == 'payment'">
        <a-tag color="warning" class="payment-tag fw-bold text-wrap">
          {{ contractPayment(record.contractPayment) }}
        </a-tag>
      </template>
      <templale v-if="column.key == 'contractTotal'">
        <strong class="text-danger">{{
          formatCurrency(record.contractTotal)
        }}</strong>
      </templale>
      <template v-if="column.key == 'action'">
        <a-dropdown
          trigger="click"
          placement="bottomLeft"
          :arrow="{ pointAtCenter: true }"
        >
          <a-button type="link" @click.prevent>
            <DownOutlined />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a-space :size="8" align="center" class="fw-bold">
                  <EyeOutlined />
                  <span>Xem chi tiết</span>
                </a-space>
              </a-menu-item>
              <a-menu-item>
                <a-space :size="8" class="fw-bold" align="center"
                  ><EditOutlined />Cập nhật hợp đồng</a-space
                >
              </a-menu-item>
              <a-menu-item>
                <a-space :size="8" class="fw-bold"
                  ><DeleteOutlined />Hủy hợp đồng</a-space
                >
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { onMounted, ref } from "vue"
import dayjs from "dayjs"
import axios from "axios"
import {
  DownOutlined,
  UpOutlined,
  // EllipsisOutlined,
  // SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue"
import { message } from "ant-design-vue"

import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

const loading = ref(false)
const contracts = ref([])
const keyword = ref("")
const isAdvancedSearchVisible = ref(false)

onMounted(() => {
  getContracts()
})

const formatDateTime = (date) => {
  if (!date) return "---"

  // .utc() sẽ giữ nguyên giá trị 00:00:00 của chuỗi gốc
  const d = dayjs.utc(date)

  const isMidnight = d.hour() === 0 && d.minute() === 0 && d.second() === 0

  return d.format(isMidnight ? "DD/MM/YYYY" : "DD/MM/YYYY HH:mm:ss")
}

// Lấy danh sách từ API
const getContracts = async () => {
  loading.value = true
  try {
    const response = await axios.get("http://localhost:3333/api/v1/contracts", {
      params: { keyword: keyword.value },
    })
    // Map đúng cấu trúc data của NestJS/Laravel bạn đang dùng
    contracts.value = response.data.data.data
  } catch (error) {
    message.error("Không thể tải danh sách hợp đồng")
    console.error(error)
  } finally {
    loading.value = false
  }
}
const formatCurrency = (val) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(val)
}

// Hàm màu avatar dựa trên tên
// const getAvatarColor = (name) => {
//   if (!name) return "#94a3b8"
//   const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]
//   return colors[name.length % colors.length]
// }
// Xử lý tải file
// const download = async (id) => {
//   try {
//     loading.value = true
//     const response = await axios.get(
//       `http://localhost:3333/api/v1/contracts/download/${id}`,
//       { responseType: "blob" },
//     )

//     const url = window.URL.createObjectURL(new Blob([response.data]))
//     const link = document.createElement("a")
//     link.href = url
//     link.setAttribute("download", `contract_${id}.docx`)
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)

//     message.success("Bắt đầu tải file...")
//   } catch (error) {
//     message.error("Lỗi khi tải file")
//   } finally {
//     loading.value = false
//   }
// }

// const contractStatus = (status) => {
//   switch (status) {
//     case 1:
//       return "Đã trình kí"
//     case 0:
//       return "Mới tạo lập"
//     case 2:
//       return "Đã gửi KH"
//     case 3:
//       return "Hoàn thiện"
//     case 4:
//       return "Đã làm thanh toán"
//     default:
//       return "NaN"
//   }
// }

const contractPayment = (status) => {
  switch (status) {
    case 1:
      return "Đã nhận tiền nhưng chưa nộp tiền"
    case 0:
      return "Chưa thanh toán"
    case 2:
      return "Đã xuất hóa đơn nhưng chưa nộp tiền"
    case 3:
      return "Đã nộp tiền"

    default:
      return "Đã hoàn thiện và làm thanh toán"
  }
}

const columns = [
  {
    title: "#",
    key: "contractId",
    dataIndex: "contractId",
  },
  {
    title: " Tên thuê bao",
    dataIndex: "companyName",
    key: "companyName",
  },
  {
    title: "Mã số thuế",
    dataIndex: "companyTaxcode",
  },
  {
    title: "Mã LĐ",
    dataIndex: "contractCode",
  },
  {
    title: "Ngày HĐ",
    dataIndex: "contractDate",
    customRender: ({ record }) => formatDateTime(record.contractDate),
  },
  {
    title: "Trạng thái",
    dataIndex: "contractStatus",
    key: "status",
  },
  {
    title: "Thanh toán",
    dataIndex: "contractPayment",
    key: "payment",
  },
  {
    title: "Đầu mối",
    dataIndex: "customerName",
  },
  {
    title: "Giá trị",
    dataIndex: "contractTotal",
    key: "contractTotal",
  },

  {
    key: "action",
  },
]
</script>
