1. Pindah ke branch dev dan ambil update terbaru

- git checkout dev
- git pull origin dev

2. Buat dan pindah ke branch fitur (misalnya: feature/service)

- git checkout -b feature/service

3. Tambahkan perubahan & commit

- git add .
- git commit -m "feat(service): implement service logic"

4. Push branch fitur ke remote

- git push origin feature/service

## branch naming, contoh : 
- feature/nama-fitur, bugfix/nama-bug, hotfix/patch-x, test/nama-test

## commit message, contoh:
- feat: fitur baru
- fix: perbaikan bug
- test: buat test
- refactor: perbaikan struktur kode
- docs: dokumentasi
- chore: tugas dev lain (misal: update dependensi)
