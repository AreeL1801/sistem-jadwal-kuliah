# Sistem Jadwal Kuliah

Aplikasi React Native Expo untuk tugas praktikum Pemrograman Mobile:
**Handling Lists & Data Rendering**.

## Ringkasan

Proyek ini membuat sistem jadwal kuliah berbasis data statis. Aplikasi
menampilkan tiga halaman utama:

- `Ringkasan`: daftar mata kuliah semester ini menggunakan `courses.map()`.
- `Pertemuan`: daftar minimal 10 pertemuan menggunakan `FlatList`.
- `Jadwal`: jadwal kuliah per hari menggunakan `SectionList`.

Semua data didefinisikan secara hardcode di `src/data/schedule.ts`, tanpa API,
database, atau layanan backend.

## Kesesuaian dengan Instruksi Tugas

| Ketentuan PDF | Implementasi |
| --- | --- |
| Halaman ringkasan mata kuliah menggunakan `.map()` | Screen `Ringkasan` merender `courses.map()` dan memakai `key={course.id}`. |
| Setiap mata kuliah menampilkan nama, kode, SKS, dosen | Komponen `CourseCard` menampilkan empat informasi tersebut. |
| Halaman daftar pertemuan menggunakan `FlatList` | Screen `Pertemuan` memakai `FlatList` dari React Native. |
| Minimal 10 item pertemuan | Data `meetings` berisi 12 item pertemuan. |
| `keyExtractor` | Menggunakan `item.id` sebagai key unik per pertemuan. |
| `ItemSeparatorComponent` | Menggunakan komponen `MeetingSeparator`. |
| `ListHeaderComponent` | Menggunakan komponen `MeetingListHeader`. |
| `ListEmptyComponent` | Menggunakan komponen `EmptyState`. |
| Halaman jadwal per hari menggunakan `SectionList` | Screen `Jadwal` memakai `SectionList` dengan section berdasarkan hari. |
| Header hari berbeda secara visual | Komponen `DayHeader` memakai warna gelap dan badge jumlah kelas. |
| Data bersumber dari array statis | Semua data berada di `src/data/schedule.ts`. |

## Cara Menjalankan

Pastikan Node.js dan npm sudah tersedia, lalu jalankan:

```bash
npm install
npm run start
```

Setelah Expo terbuka, pilih salah satu opsi berikut:

- Scan QR code dengan Expo Go di ponsel.
- Tekan `a` untuk Android emulator.
- Tekan `w` untuk menjalankan versi web jika diperlukan.

## Pemeriksaan Kode

```bash
npm run typecheck
```

## Catatan GitHub

Repository ini disiapkan agar bisa dikumpulkan sebagai link GitHub. Remote Git
tidak diarahkan ke akun `syronesdreamland`.

Jika repository teman sudah dibuat, gunakan:

```bash
git add .
git commit -m "Initial course schedule app"
git remote add origin <link-repository-teman>
git branch -M main
git push -u origin main
```

Ganti `<link-repository-teman>` dengan URL repository milik teman atau akun
netral yang akan dipakai untuk pengumpulan.

Jika Git meminta identitas commit, isi dengan nama dan email teman yang akan
mengumpulkan tugas, bukan akun `syronesdreamland`.
