import type { LegalLocaleContent } from '../types';

const id: LegalLocaleContent = {
  ui: {
    updated: 'Tanggal berlaku',
    company: 'Data perusahaan',
    related: 'Lihat juga',
    consent: 'Dengan membayar, Anda menyetujui {terms}, {refund}, dan {privacy}.',
    consentNames: { terms: 'Syarat Sewa', refund: 'Kebijakan Pembatalan & Pengembalian Dana', privacy: 'Kebijakan Privasi' },
    footerLegal: 'Legal',
    companyLabels: { name: 'Nama badan usaha', address: 'Alamat terdaftar', email: 'Email', phone: 'Telepon / WhatsApp' },
  },
  docs: {
    terms: {
      title: 'Syarat dan Ketentuan Sewa',
      short: 'Syarat Sewa',
      description: 'Syarat sewa skuter TROPICAL BIKES (PT ART TREADING GLOBAL) di Bali: pemesanan, pembayaran, dokumen, penggunaan skuter, kerusakan, denda, dan pengembalian.',
      sections: [
        { h: '1. Tentang kami', p: [
          'Situs {site} dan merek TROPICAL BIKES dikelola oleh {company}, perseroan terbatas penanaman modal asing (PT PMA) yang terdaftar di Republik Indonesia, alamat: {address}.',
          'Syarat ini berlaku untuk setiap pemesanan melalui situs, WhatsApp, Telegram, atau secara langsung. Dengan melakukan pemesanan atau pembayaran, Anda menyatakan telah membaca dan menyetujui Syarat ini, Kebijakan Pembatalan & Pengembalian Dana, serta Kebijakan Privasi.',
        ] },
        { h: '2. Pemesanan dan konfirmasi', p: [
          'Pemesanan dianggap terkonfirmasi setelah Anda menerima konfirmasi melalui email, WhatsApp, atau akun pribadi. Kami dapat menolak atau membatalkan pemesanan jika skuter tidak tersedia, data tidak lengkap atau tidak benar, atau pembayaran tidak diterima; dalam hal ini seluruh dana yang dibayarkan dikembalikan penuh.',
          'Masa sewa dihitung per 24 jam sejak waktu pengantaran yang disepakati. Model yang dipesan dijamin; jika tidak tersedia karena hal di luar kendali kami, kami menawarkan skuter kelas yang sama atau lebih tinggi tanpa biaya tambahan, atau pengembalian dana penuh.',
        ] },
        { h: '3. Harga dan pembayaran', p: [
          'Harga ditetapkan dalam Rupiah (IDR). Jumlah dalam mata uang lain hanya ditampilkan untuk kemudahan; penagihan dilakukan dalam IDR atau dengan kurs yang tertera di halaman pembayaran. Bank Anda dapat mengenakan biaya konversi sendiri.',
          'Harga sudah termasuk skuter, helm, bantuan darurat dasar, dan pengantaran di zona gratis. Pengantaran ke area lain, helm tambahan, proteksi kerusakan, dan layanan tambahan lainnya ditampilkan terpisah sebelum pembayaran.',
          'Pembayaran dapat dilakukan secara online dengan kartu bank, QRIS, dompet digital, atau metode lain di halaman pembayaran, dengan kripto, atau tunai saat pengantaran jika opsi tersebut tersedia. Pembayaran kartu dan QR diproses oleh penyedia jasa pembayaran berizin; kami tidak pernah menerima atau menyimpan data kartu lengkap Anda.',
          'Kami tidak meminta deposit dan tidak menahan paspor Anda.',
        ] },
        { h: '4. Persyaratan pengendara', p: [
          'Pengendara minimal berusia 18 tahun dan memiliki SIM yang berlaku untuk sepeda motor (kategori A) beserta International Driving Permit, atau SIM C Indonesia. Anda bertanggung jawab mematuhi peraturan lalu lintas Indonesia.',
          'Saat serah terima kami memeriksa SIM dan dokumen identitas pengendara. Skuter hanya boleh dikendarai oleh pemesan dan pengendara yang kami setujui.',
        ] },
        { h: '5. Serah terima dan pengembalian', p: [
          'Skuter diantar dalam keadaan bersih, terawat, dan berisi bahan bakar. Saat serah terima kami memotret kondisinya bersama Anda; laporkan kerusakan yang sudah ada saat itu.',
          'Kembalikan skuter pada waktu dan tempat yang disepakati dalam kondisi yang sama, kecuali keausan wajar. Bahan bakar yang terpakai tidak dikenakan biaya; skuter yang dikembalikan dengan tangki kosong dapat dikenakan biaya pengisian sesuai harga pokok.',
          'Keterlambatan pengembalian hingga 1 jam tidak dikenakan biaya. Setelah itu setiap hari yang dimulai dikenakan tarif harian kecuali perpanjangan telah disepakati. Jika skuter tidak dikembalikan dan Anda tidak dapat dihubungi dalam 24 jam setelah masa sewa berakhir, kami dapat melapor ke polisi.',
        ] },
        { h: '6. Penggunaan skuter', p: [
          'Berkendaralah dengan hati-hati, selalu memakai helm, dan jangan membawa lebih dari satu penumpang. Skuter tidak boleh dikendarai di bawah pengaruh alkohol atau narkoba, untuk balapan, off-road, angkutan komersial, atau dibawa keluar Pulau Bali (termasuk ke Nusa Penida, Lombok, atau Jawa) tanpa persetujuan tertulis dari kami.',
          'Selalu kunci skuter dan simpan kuncinya. Jangan memperbaiki atau memodifikasi skuter sendiri; hubungi kami dan kami akan mengatur bantuan atau penggantian.',
        ] },
        { h: '7. Kerusakan, pencurian, dan denda', p: [
          'Selama masa sewa Anda bertanggung jawab atas kerusakan skuter, hilangnya kunci atau dokumen, serta pencurian akibat kelalaian (misalnya skuter tidak dikunci atau kunci tertinggal di kontak). Perbaikan dikenakan biaya sesuai tarif bengkel resmi; kunci dan dokumen yang hilang dikenakan biaya penggantian aktual.',
          'Jika Anda membeli proteksi kerusakan, tanggung jawab Anda dibatasi sesuai jumlah yang tertera di pemesanan, kecuali kerusakan akibat berkendara tanpa SIM yang berlaku, di bawah pengaruh alkohol atau narkoba, atau melanggar bagian 6.',
          'Denda lalu lintas selama masa sewa dibayar oleh pengendara. Jika terjadi kecelakaan atau pencurian, segera hubungi kami dan, bila diperlukan, polisi.',
        ] },
        { h: '8. Tanggung jawab kami', p: [
          'Kami bertanggung jawab menyediakan skuter yang layak jalan. Jika skuter rusak karena gangguan teknis, kami memperbaiki atau menggantinya tanpa biaya, biasanya dalam beberapa jam di area layanan kami, atau mengembalikan dana untuk hari yang tidak terpakai.',
          'Sepanjang diizinkan hukum, kami tidak bertanggung jawab atas kerugian tidak langsung, penerbangan atau kegiatan yang terlewat, maupun cedera dan kerusakan akibat tindakan pengendara sendiri. Berkendara skuter memiliki risiko; kami menyarankan asuransi perjalanan yang menanggung berkendara sepeda motor.',
        ] },
        { h: '9. Pembatalan dan pengembalian dana', p: [
          'Pembatalan, perubahan, dan pengembalian dana diatur dalam Kebijakan Pembatalan & Pengembalian Dana yang merupakan bagian dari Syarat ini.',
        ] },
        { h: '10. Hukum yang berlaku dan keluhan', p: [
          'Syarat ini tunduk pada hukum Republik Indonesia. Kirim keluhan ke {email} atau WhatsApp {phone}; kami menjawab dalam 2 hari kerja dan berupaya menyelesaikan setiap masalah secara musyawarah. Sengketa yang tidak dapat diselesaikan secara musyawarah diselesaikan oleh pengadilan yang berwenang di Denpasar, Bali.',
          'Kami dapat memperbarui Syarat ini. Untuk setiap pemesanan berlaku versi yang dipublikasikan di situs pada tanggal pemesanan.',
        ] },
      ],
    },
    refund: {
      title: 'Kebijakan Pembatalan & Pengembalian Dana',
      short: 'Pembatalan & Refund',
      description: 'Pembatalan gratis hingga 24 jam sebelum pengantaran, jangka waktu pengembalian dana, dan aturan pengembalian lebih awal di TROPICAL BIKES Bali.',
      sections: [
        { h: '1. Pembatalan gratis', p: [
          'Setiap pemesanan dapat dibatalkan tanpa biaya paling lambat 24 jam sebelum waktu pengantaran dan Anda menerima pengembalian penuh atas jumlah yang dibayarkan.',
          'Untuk membatalkan, gunakan akun pribadi atau hubungi kami melalui WhatsApp {phone} atau email {email}. Waktu diterimanya pesan Anda dianggap sebagai waktu pembatalan.',
        ] },
        { h: '2. Pembatalan mendadak dan tidak hadir', p: [
          'Jika dibatalkan kurang dari 24 jam sebelum pengantaran, harga sewa hari pertama ditahan dan sisanya dikembalikan.',
          'Jika Anda tidak berada di lokasi yang disepakati dan tidak dapat dihubungi dalam 2 jam setelah waktu pengantaran, pemesanan dianggap tidak hadir (no-show): harga hari pertama dan biaya pengantaran yang telah dibayar ditahan, sisanya dikembalikan.',
        ] },
        { h: '3. Perubahan pemesanan', p: [
          'Tanggal, alamat, atau skuter dapat diubah tanpa biaya, sesuai ketersediaan, paling lambat 24 jam sebelum pengantaran. Jika pemesanan baru lebih mahal, Anda membayar selisihnya; jika lebih murah, selisihnya dikembalikan.',
          'Perpanjangan selama masa sewa sebisa mungkin dihitung dengan tarif untuk total masa sewa.',
        ] },
        { h: '4. Pengembalian lebih awal', p: [
          'Jika skuter dikembalikan lebih awal, hari yang tidak terpakai tidak dikembalikan, kecuali sewa diakhiri karena gangguan teknis yang tidak dapat kami perbaiki atau ganti.',
          'Untuk sewa bulanan yang diakhiri lebih awal atas permintaan Anda, kami dapat, atas kebijakan kami, menghitung ulang harga dengan tarif untuk masa yang benar-benar digunakan dan mengembalikan selisihnya.',
        ] },
        { h: '5. Pembatalan oleh kami', p: [
          'Jika kami tidak dapat menyediakan skuter yang dipesan atau skuter kelas yang sama atau lebih tinggi, atau membatalkan pemesanan karena alasan apa pun yang bukan kesalahan Anda, Anda menerima pengembalian penuh atas seluruh pembayaran.',
        ] },
        { h: '6. Cara dan waktu pengembalian dana', p: [
          'Dana dikembalikan melalui metode pembayaran asal: kartu bank, dompet digital, atau rekening bank. Pembayaran kartu dan dompet digital tidak dapat dikembalikan secara tunai. Pembayaran kripto dikembalikan dalam mata uang yang sama ke dompet yang Anda tentukan, berdasarkan jumlah pemesanan dalam IDR.',
          'Kami memproses pengembalian dalam 3 hari kerja setelah pembatalan. Tergantung bank atau penyedia pembayaran Anda, dana biasanya diterima dalam 5–14 hari kerja. Pengembalian dilakukan dalam IDR; kami tidak bertanggung jawab atas selisih kurs atau biaya bank Anda.',
        ] },
        { h: '7. Sengketa dan chargeback', p: [
          'Jika ada masalah, hubungi kami sebelum mengajukan sengketa ke bank — biasanya kami menyelesaikannya pada hari yang sama. Chargeback atas layanan yang telah diberikan sesuai aturan ini dapat kami sanggah dengan foto serah terima dan data pemesanan.',
        ] },
      ],
    },
    privacy: {
      title: 'Kebijakan Privasi',
      short: 'Privasi',
      description: 'Cara TROPICAL BIKES (PT ART TREADING GLOBAL) mengumpulkan, menggunakan, dan melindungi data pribadi pelanggan bali.bike sesuai UU No. 27 Tahun 2022.',
      sections: [
        { h: '1. Pengendali data', p: [
          'Data pribadi Anda dikendalikan oleh {company}, {address} (“kami”). Kebijakan ini menjelaskan cara kami memproses data pribadi sesuai Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi dan peraturan lain yang berlaku. Kontak: {email}.',
        ] },
        { h: '2. Data yang kami kumpulkan', p: [
          'Data pemesanan dan kontak: nama, email, nomor telepon, messenger (WhatsApp, Telegram, WeChat), alamat dan lokasi pengantaran, tanggal sewa, skuter dan layanan tambahan yang dipilih.',
          'Data pengendara: data SIM dan dokumen identitas yang diperiksa saat serah terima, serta foto kondisi skuter.',
          'Data pembayaran: jumlah, metode, dan status pembayaran. Data kartu dan dompet digital dimasukkan di halaman aman penyedia pembayaran; kami tidak pernah menerima atau menyimpan nomor kartu lengkap atau CVV.',
          'Data teknis: alamat IP, jenis perangkat dan browser, halaman yang dikunjungi, cookie dan teknologi serupa, serta data dari alat analitik dan iklan seperti Google Analytics dan Google Ads.',
        ] },
        { h: '3. Tujuan penggunaan data', p: [
          'Untuk menerima, mengonfirmasi, dan menjalankan pemesanan, mengantar dan menjemput skuter, menerima pembayaran, dan mengembalikan dana (pelaksanaan perjanjian).',
          'Untuk menghubungi Anda terkait sewa, memberikan dukungan, serta menangani keluhan, kecelakaan, denda, dan klaim kerusakan (perjanjian dan kepentingan yang sah).',
          'Untuk pembukuan dan perpajakan serta menanggapi permintaan resmi dari instansi berwenang (kewajiban hukum).',
          'Untuk meningkatkan situs, mengukur efektivitas iklan, dan, dengan persetujuan Anda, mengirim penawaran (kepentingan yang sah dan persetujuan). Anda dapat menolak pesan pemasaran kapan saja.',
        ] },
        { h: '4. Pihak penerima data', p: [
          'Kami tidak menjual data pribadi. Kami hanya membagikannya kepada staf dan pengantar kami; penyedia jasa pembayaran dan bank yang memproses pembayaran; penyedia hosting, email, pesan, dan analitik yang bekerja untuk kami; perusahaan asuransi, polisi, atau instansi lain jika diwajibkan hukum atau diperlukan untuk menangani kecelakaan, pencurian, atau denda.',
          'Sebagian penyedia tersebut dapat menyimpan data di luar Indonesia. Dalam hal ini kami menggunakan penyedia yang menjamin tingkat pelindungan yang memadai sesuai hukum Indonesia.',
        ] },
        { h: '5. Lama penyimpanan', p: [
          'Data pemesanan dan pembayaran disimpan selama diwajibkan peraturan perpajakan dan akuntansi Indonesia (hingga 10 tahun). Foto serah terima disimpan 6 bulan setelah sewa kecuali diperlukan untuk klaim. Data pemasaran disimpan sampai Anda menarik persetujuan. Data akun dihapus atas permintaan, kecuali catatan yang wajib kami simpan menurut hukum.',
        ] },
        { h: '6. Keamanan', p: [
          'Kami menggunakan enkripsi HTTPS, pembatasan akses, dan penyedia tepercaya untuk melindungi data pribadi. Pembayaran online diproses oleh penyedia pembayaran bersertifikat PCI DSS.',
        ] },
        { h: '7. Hak Anda', p: [
          'Anda berhak memperoleh informasi dan salinan data pribadi Anda, memperbaikinya, meminta penghapusan atau pembatasan pemrosesan, menarik persetujuan, menolak pemrosesan, dan mengajukan pengaduan kepada lembaga yang berwenang. Untuk menggunakan hak Anda, kirim email ke {email}; kami akan menjawab dalam jangka waktu yang ditetapkan undang-undang.',
        ] },
        { h: '8. Cookie', p: [
          'Situs menggunakan cookie yang diperlukan (bahasa, mata uang, login, draf pemesanan) serta cookie analitik dan iklan. Anda dapat memblokir atau menghapus cookie di pengaturan browser; beberapa fungsi situs mungkin tidak berjalan dengan baik.',
        ] },
        { h: '9. Perubahan', p: [
          'Kami dapat memperbarui kebijakan ini. Versi terbaru selalu dipublikasikan di halaman ini beserta tanggal berlakunya.',
        ] },
      ],
    },
  },
};

export default id;
