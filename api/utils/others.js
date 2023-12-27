exports.generateUniqueOrderCode = () => {
  // Mendapatkan tanggal saat ini sebagai bagian dari kode order
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Mendapatkan bagian angka acak untuk membuat kode order unik
  const uniqueNumber = Math.floor(Math.random() * 10000);

  // Menggabungkan semua komponen untuk membentuk kode order
  const orderCode = `ITEKNISI-${year}${month}${day}-${uniqueNumber}`;

  return orderCode;
};
