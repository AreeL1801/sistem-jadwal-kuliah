export type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
};

export type Meeting = {
  id: string;
  courseCode: string;
  courseName: string;
  meetingNumber: number;
  topic: string;
  date: string;
};

export type DailyScheduleItem = {
  id: string;
  courseCode: string;
  courseName: string;
  lecturer: string;
  room: string;
  startTime: string;
  endTime: string;
};

export type ScheduleSection = {
  title: string;
  note: string;
  data: DailyScheduleItem[];
};

export const courses: Course[] = [
  {
    id: 'mobile-programming',
    code: 'PMB-403',
    name: 'Pemrograman Mobile',
    credits: 3,
    lecturer: 'Dr. Rania Maheswari, M.Kom.',
  },
  {
    id: 'software-engineering',
    code: 'RPL-305',
    name: 'Rekayasa Perangkat Lunak',
    credits: 3,
    lecturer: 'Ardi Pranata, M.Eng.',
  },
  {
    id: 'advanced-database',
    code: 'SBD-321',
    name: 'Sistem Basis Data Lanjut',
    credits: 3,
    lecturer: 'Nadya Paramitha, M.T.I.',
  },
  {
    id: 'human-computer-interaction',
    code: 'IMK-214',
    name: 'Interaksi Manusia Komputer',
    credits: 2,
    lecturer: 'Salsabila N. Putri, M.Ds.',
  },
  {
    id: 'computer-network',
    code: 'JRK-220',
    name: 'Jaringan Komputer',
    credits: 3,
    lecturer: 'Bagas Wiratama, M.Cs.',
  },
  {
    id: 'data-visualization',
    code: 'VIS-242',
    name: 'Visualisasi Data',
    credits: 2,
    lecturer: 'Mira Kencana, M.Stat.',
  },
];

export const meetings: Meeting[] = [
  {
    id: 'PMB-403-01',
    courseCode: 'PMB-403',
    courseName: 'Pemrograman Mobile',
    meetingNumber: 1,
    topic: 'Pengenalan Expo dan struktur proyek React Native',
    date: 'Senin, 7 September 2026',
  },
  {
    id: 'PMB-403-02',
    courseCode: 'PMB-403',
    courseName: 'Pemrograman Mobile',
    meetingNumber: 2,
    topic: 'Komponen dasar, StyleSheet, dan safe area',
    date: 'Senin, 14 September 2026',
  },
  {
    id: 'PMB-403-03',
    courseCode: 'PMB-403',
    courseName: 'Pemrograman Mobile',
    meetingNumber: 3,
    topic: 'Rendering data dengan map, FlatList, dan SectionList',
    date: 'Senin, 21 September 2026',
  },
  {
    id: 'RPL-305-01',
    courseCode: 'RPL-305',
    courseName: 'Rekayasa Perangkat Lunak',
    meetingNumber: 1,
    topic: 'Analisis kebutuhan dan penyusunan user story',
    date: 'Selasa, 8 September 2026',
  },
  {
    id: 'RPL-305-02',
    courseCode: 'RPL-305',
    courseName: 'Rekayasa Perangkat Lunak',
    meetingNumber: 2,
    topic: 'Perancangan arsitektur aplikasi berlapis',
    date: 'Selasa, 15 September 2026',
  },
  {
    id: 'SBD-321-01',
    courseCode: 'SBD-321',
    courseName: 'Sistem Basis Data Lanjut',
    meetingNumber: 1,
    topic: 'Normalisasi lanjutan dan desain transaksi',
    date: 'Rabu, 9 September 2026',
  },
  {
    id: 'SBD-321-02',
    courseCode: 'SBD-321',
    courseName: 'Sistem Basis Data Lanjut',
    meetingNumber: 2,
    topic: 'Indexing, query plan, dan strategi optimasi',
    date: 'Rabu, 16 September 2026',
  },
  {
    id: 'IMK-214-01',
    courseCode: 'IMK-214',
    courseName: 'Interaksi Manusia Komputer',
    meetingNumber: 1,
    topic: 'Prinsip usability dan riset konteks pengguna',
    date: 'Kamis, 10 September 2026',
  },
  {
    id: 'IMK-214-02',
    courseCode: 'IMK-214',
    courseName: 'Interaksi Manusia Komputer',
    meetingNumber: 2,
    topic: 'Wireframe, prototipe, dan evaluasi heuristik',
    date: 'Kamis, 17 September 2026',
  },
  {
    id: 'JRK-220-01',
    courseCode: 'JRK-220',
    courseName: 'Jaringan Komputer',
    meetingNumber: 1,
    topic: 'Model TCP/IP dan pengalamatan jaringan',
    date: 'Jumat, 11 September 2026',
  },
  {
    id: 'JRK-220-02',
    courseCode: 'JRK-220',
    courseName: 'Jaringan Komputer',
    meetingNumber: 2,
    topic: 'Routing dasar dan troubleshooting koneksi',
    date: 'Jumat, 18 September 2026',
  },
  {
    id: 'VIS-242-01',
    courseCode: 'VIS-242',
    courseName: 'Visualisasi Data',
    meetingNumber: 1,
    topic: 'Pemilihan chart dan storytelling berbasis data',
    date: 'Sabtu, 12 September 2026',
  },
];

export const scheduleSections: ScheduleSection[] = [
  {
    title: 'Senin',
    note: 'Fokus praktik mobile',
    data: [
      {
        id: 'senin-PMB-403',
        courseCode: 'PMB-403',
        courseName: 'Pemrograman Mobile',
        lecturer: 'Dr. Rania Maheswari, M.Kom.',
        room: 'Lab Mobile A-302',
        startTime: '08.00',
        endTime: '10.30',
      },
      {
        id: 'senin-VIS-242',
        courseCode: 'VIS-242',
        courseName: 'Visualisasi Data',
        lecturer: 'Mira Kencana, M.Stat.',
        room: 'Studio Data B-204',
        startTime: '13.00',
        endTime: '14.40',
      },
    ],
  },
  {
    title: 'Selasa',
    note: 'Analisis dan desain sistem',
    data: [
      {
        id: 'selasa-RPL-305',
        courseCode: 'RPL-305',
        courseName: 'Rekayasa Perangkat Lunak',
        lecturer: 'Ardi Pranata, M.Eng.',
        room: 'Ruang Teori C-118',
        startTime: '09.10',
        endTime: '11.40',
      },
    ],
  },
  {
    title: 'Rabu',
    note: 'Basis data dan optimasi',
    data: [
      {
        id: 'rabu-SBD-321',
        courseCode: 'SBD-321',
        courseName: 'Sistem Basis Data Lanjut',
        lecturer: 'Nadya Paramitha, M.T.I.',
        room: 'Lab Basis Data D-207',
        startTime: '10.00',
        endTime: '12.30',
      },
    ],
  },
  {
    title: 'Kamis',
    note: 'Riset pengalaman pengguna',
    data: [
      {
        id: 'kamis-IMK-214',
        courseCode: 'IMK-214',
        courseName: 'Interaksi Manusia Komputer',
        lecturer: 'Salsabila N. Putri, M.Ds.',
        room: 'Studio UX E-112',
        startTime: '08.40',
        endTime: '10.20',
      },
    ],
  },
  {
    title: 'Jumat',
    note: 'Jaringan dan infrastruktur',
    data: [
      {
        id: 'jumat-JRK-220',
        courseCode: 'JRK-220',
        courseName: 'Jaringan Komputer',
        lecturer: 'Bagas Wiratama, M.Cs.',
        room: 'Lab Jaringan F-301',
        startTime: '13.20',
        endTime: '15.50',
      },
    ],
  },
];
