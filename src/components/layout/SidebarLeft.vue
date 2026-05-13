<template>
  <aside class="sidebar d-none d-md-flex flex-column p-4">
    <div class="d-flex align-items-center gap-2 mb-4 pb-2">
      <div
        class="bg-dark text-white rounded-2 d-flex align-items-center justify-center fw-bold"
        style="width: 32px; height: 32px; padding-left: 9px"
      >
        L
      </div>
      <span class="fs-4 fw-bold tracking-tight">LUMINA</span>
    </div>

    <div class="flex-grow-1">
      <p class="text-uppercase text-muted fw-bold mb-2" style="font-size: 11px">
        Tổng quan
      </p>
      <nav class="nav flex-column">
        <a href="#" class="nav-link"
          ><i class="bi bi-house-door fs-5"></i> Trang chủ</a
        >
        <a href="#" class="nav-link"
          ><i class="bi bi-bar-chart fs-5"></i> Phân tích</a
        >
      </nav>

      <p
        class="text-uppercase text-muted fw-bold mt-4 mb-2"
        style="font-size: 11px"
      >
        Quản lý
      </p>
      <nav class="nav flex-column">
        <a href="#" class="nav-link"
          ><i class="bi bi-people fs-5"></i> Khách hàng</a
        >
        <a href="#" class="nav-link active"
          ><i class="bi bi-file-earmark-text fs-5"></i> Hợp đồng</a
        >
        <a href="#" class="nav-link"><i class="bi bi-box fs-5"></i> Sản phẩm</a>
      </nav>
    </div>

    <div class="mt-auto p-3 bg-light rounded-4 d-flex align-items-center gap-3">
      <div
        class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold"
        style="width: 36px; height: 36px; font-size: 10px"
      >
        HA
      </div>
      <div class="overflow-hidden">
        <p class="mb-0 fw-semibold small text-truncate">Hoàng Anh</p>
        <p class="mb-0 text-muted" style="font-size: 11px">Quản trị viên</p>
      </div>
    </div>
  </aside>
</template>
