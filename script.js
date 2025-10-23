let dataBarang = JSON.parse(localStorage.getItem("stokBarang")) || [];

// Tampilkan data saat halaman dibuka
tampilkanBarang();

document.getElementById("formBarang").addEventListener("submit", function(e) {
  e.preventDefault();

  const kode = document.getElementById("kode").value.trim();
  const nama = document.getElementById("nama").value.trim();
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const harga = parseInt(document.getElementById("harga").value);

  if (kode && nama && jumlah > 0 && harga > 0) {
    dataBarang.push({ kode, nama, jumlah, harga });
    simpanData();
    tampilkanBarang();
    this.reset();
  } else {
    alert("Isi semua kolom dengan benar!");
  }
});

function tampilkanBarang() {
  const tabel = document.getElementById("tabelBarang");
  tabel.innerHTML = "";

  dataBarang.forEach((item, i) => {
    const total = item.jumlah * item.harga;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.kode}</td>
      <td>${item.nama}</td>
      <td>${item.jumlah}</td>
      <td>Rp ${item.harga.toLocaleString()}</td>
      <td>Rp ${total.toLocaleString()}</td>
      <td><button class="btn btn-danger btn-sm" onclick="hapusBarang(${i})">Hapus</button></td>
    `;
    tabel.appendChild(tr);
  });
}

function hapusBarang(index) {
  if (confirm("Yakin ingin menghapus barang ini?")) {
    dataBarang.splice(index, 1);
    simpanData();
    tampilkanBarang();
  }
}

function simpanData() {
  localStorage.setItem("stokBarang", JSON.stringify(dataBarang));
}

// 🔍 Fitur pencarian
document.getElementById("searchBox").addEventListener("keyup", function() {
  const keyword = this.value.toLowerCase();
  const baris = document.querySelectorAll("#tabelBarang tr");
  baris.forEach(row => {
    const teks = row.textContent.toLowerCase();
    row.style.display = teks.includes(keyword) ? "" : "none";
  });
});
