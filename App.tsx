import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar as NativeStatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  courses,
  meetings,
  scheduleSections,
  type Course,
  type DailyScheduleItem,
  type Meeting,
  type ScheduleSection,
} from './src/data/schedule';

type TabKey = 'summary' | 'meetings' | 'daily';

type TabConfig = {
  key: TabKey;
  label: string;
  eyebrow: string;
  glyph: 'summary' | 'meetings' | 'daily';
};

const tabs: TabConfig[] = [
  {
    key: 'summary',
    label: 'Ringkasan',
    eyebrow: 'map()',
    glyph: 'summary',
  },
  {
    key: 'meetings',
    label: 'Pertemuan',
    eyebrow: 'FlatList',
    glyph: 'meetings',
  },
  {
    key: 'daily',
    label: 'Jadwal',
    eyebrow: 'SectionList',
    glyph: 'daily',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('summary');
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab) + 1;

  return (
    <SafeAreaView style={styles.appShell}>
      <ExpoStatusBar style="dark" />

      <View style={styles.header}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.kicker}>Tugas Praktikum Pemrograman Mobile</Text>
          <Text style={styles.title}>Sistem Jadwal Kuliah</Text>
          <Text style={styles.subtitle}>
            Data statis semester ini ditampilkan lewat tiga teknik rendering list
            yang diminta pada instruksi tugas.
          </Text>
        </View>

        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeNumber}>0{activeIndex}</Text>
          <Text style={styles.headerBadgeLabel}>Halaman</Text>
        </View>
      </View>

      <View style={styles.tabBar} accessibilityRole="tablist">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <Pressable
              key={tab.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={() => setActiveTab(tab.key)}
              style={({ pressed }) => [
                styles.tabButton,
                isActive && styles.tabButtonActive,
                pressed && styles.tabButtonPressed,
              ]}
            >
              <TabGlyph type={tab.glyph} active={isActive} />
              <View style={styles.tabCopy}>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
                <Text style={[styles.tabEyebrow, isActive && styles.tabEyebrowActive]}>
                  {tab.eyebrow}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.content}>
        {activeTab === 'summary' && <SummaryScreen />}
        {activeTab === 'meetings' && <MeetingsScreen />}
        {activeTab === 'daily' && <DailyScheduleScreen />}
      </View>
    </SafeAreaView>
  );
}

function SummaryScreen() {
  const totalCredits = useMemo(
    () => courses.reduce((total, course) => total + course.credits, 0),
    [],
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.summaryHero}>
        <View style={styles.metricBlock}>
          <Text style={styles.metricNumber}>{courses.length}</Text>
          <Text style={styles.metricLabel}>Mata kuliah aktif</Text>
        </View>
        <View style={styles.metricBlock}>
          <Text style={styles.metricNumber}>{totalCredits}</Text>
          <Text style={styles.metricLabel}>Total SKS</Text>
        </View>
      </View>

      <View style={styles.sectionIntro}>
        <Text style={styles.sectionTitle}>Ringkasan mata kuliah</Text>
        <Text style={styles.sectionDescription}>
          Halaman ini sengaja memakai courses.map() untuk merender seluruh
          mata kuliah dengan key unik dari setiap course id.
        </Text>
      </View>

      <View style={styles.courseList}>
        {courses.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </View>
    </ScrollView>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <View style={styles.courseCard}>
      <View style={styles.courseCardHeader}>
        <View style={styles.courseCodePill}>
          <Text style={styles.courseCode}>{course.code}</Text>
        </View>
        <Text style={styles.courseIndex}>{String(index + 1).padStart(2, '0')}</Text>
      </View>

      <Text style={styles.courseName}>{course.name}</Text>

      <View style={styles.courseMetaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaValue}>{course.credits}</Text>
          <Text style={styles.metaLabel}>SKS</Text>
        </View>
        <View style={styles.metaDivider} />
        <View style={styles.lecturerBlock}>
          <Text style={styles.metaLabel}>Dosen pengampu</Text>
          <Text style={styles.lecturerName}>{course.lecturer}</Text>
        </View>
      </View>
    </View>
  );
}

function MeetingsScreen() {
  return (
    <FlatList
      data={meetings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MeetingRow meeting={item} />}
      ItemSeparatorComponent={MeetingSeparator}
      ListHeaderComponent={<MeetingListHeader total={meetings.length} />}
      ListEmptyComponent={
        <EmptyState
          title="Belum ada data pertemuan"
          description="Jika array pertemuan dikosongkan, komponen ini akan tampil sebagai ListEmptyComponent."
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.listContent,
        meetings.length === 0 && styles.emptyListContent,
      ]}
    />
  );
}

function MeetingListHeader({ total }: { total: number }) {
  return (
    <View style={styles.listHeader}>
      <View>
        <Text style={styles.sectionTitle}>Daftar pertemuan</Text>
        <Text style={styles.sectionDescription}>
          Seluruh pertemuan lintas mata kuliah dirender dengan FlatList.
        </Text>
      </View>
      <View style={styles.countBadge}>
        <Text style={styles.countBadgeNumber}>{total}</Text>
        <Text style={styles.countBadgeLabel}>item</Text>
      </View>
    </View>
  );
}

function MeetingRow({ meeting }: { meeting: Meeting }) {
  return (
    <View style={styles.meetingRow}>
      <View style={styles.meetingNumber}>
        <Text style={styles.meetingNumberText}>{meeting.meetingNumber}</Text>
      </View>

      <View style={styles.meetingBody}>
        <Text style={styles.meetingCourse}>{meeting.courseName}</Text>
        <Text style={styles.meetingTopic}>{meeting.topic}</Text>
        <View style={styles.meetingFooter}>
          <Text style={styles.meetingCode}>{meeting.courseCode}</Text>
          <Text style={styles.meetingDate}>{meeting.date}</Text>
        </View>
      </View>
    </View>
  );
}

function MeetingSeparator() {
  return <View style={styles.meetingSeparator} />;
}

function DailyScheduleScreen() {
  return (
    <SectionList<DailyScheduleItem, ScheduleSection>
      sections={scheduleSections}
      keyExtractor={(item) => item.id}
      renderSectionHeader={({ section }) => <DayHeader section={section} />}
      renderItem={({ item }) => <ScheduleRow item={item} />}
      ListHeaderComponent={
        <View style={styles.sectionListIntro}>
          <Text style={styles.sectionTitle}>Jadwal per hari</Text>
          <Text style={styles.sectionDescription}>
            SectionList mengelompokkan kelas berdasarkan hari, lalu memberi
            header visual yang berbeda untuk setiap seksi.
          </Text>
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          title="Belum ada jadwal"
          description="Komponen ini disiapkan jika array section jadwal tidak memiliki item."
        />
      }
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

function DayHeader({ section }: { section: ScheduleSection }) {
  return (
    <View style={styles.dayHeader}>
      <View>
        <Text style={styles.dayTitle}>{section.title}</Text>
        <Text style={styles.daySubtitle}>{section.note}</Text>
      </View>
      <View style={styles.dayCount}>
        <Text style={styles.dayCountText}>{section.data.length} kelas</Text>
      </View>
    </View>
  );
}

function ScheduleRow({ item }: { item: DailyScheduleItem }) {
  return (
    <View style={styles.scheduleRow}>
      <View style={styles.timeRail}>
        <Text style={styles.timeStart}>{item.startTime}</Text>
        <View style={styles.timeLine} />
        <Text style={styles.timeEnd}>{item.endTime}</Text>
      </View>

      <View style={styles.scheduleBody}>
        <Text style={styles.scheduleCourse}>{item.courseName}</Text>
        <Text style={styles.scheduleRoom}>{item.room}</Text>
        <Text style={styles.scheduleLecturer}>{item.lecturer}</Text>
      </View>
    </View>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyMark}>
        <View style={styles.emptyMarkLine} />
        <View style={[styles.emptyMarkLine, styles.emptyMarkLineShort]} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
    </View>
  );
}

function TabGlyph({ type, active }: { type: TabConfig['glyph']; active: boolean }) {
  const color = active ? palette.accent : palette.muted;
  const softColor = active ? palette.accentSoft : palette.line;

  if (type === 'summary') {
    return (
      <View style={[styles.glyphFrame, active && styles.glyphFrameActive]}>
        <View style={[styles.glyphBar, { backgroundColor: color, width: 16 }]} />
        <View style={[styles.glyphBar, { backgroundColor: softColor, width: 10 }]} />
        <View style={[styles.glyphBar, { backgroundColor: color, width: 13 }]} />
      </View>
    );
  }

  if (type === 'meetings') {
    return (
      <View style={[styles.glyphFrame, active && styles.glyphFrameActive]}>
        <View style={styles.glyphListRow}>
          <View style={[styles.glyphDot, { backgroundColor: color }]} />
          <View style={[styles.glyphListLine, { backgroundColor: softColor }]} />
        </View>
        <View style={styles.glyphListRow}>
          <View style={[styles.glyphDot, { backgroundColor: color }]} />
          <View style={[styles.glyphListLine, { backgroundColor: softColor }]} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.glyphFrame, active && styles.glyphFrameActive]}>
      <View style={styles.glyphGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.glyphCell,
              { backgroundColor: index === 0 || active ? color : softColor },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const palette = {
  paper: '#F7F8F5',
  surface: '#FFFFFF',
  surfaceSoft: '#EEF3EF',
  ink: '#17211D',
  text: '#2C3832',
  muted: '#6F7A73',
  faint: '#9CA69F',
  line: '#DDE5DF',
  accent: '#2F7D68',
  accentDark: '#1F5D4E',
  accentSoft: '#CFE2DA',
  warningSoft: '#F1E3C8',
};

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: palette.paper,
    paddingTop: NativeStatusBar.currentHeight ?? 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  headerTextGroup: {
    flex: 1,
  },
  kicker: {
    color: palette.accentDark,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: palette.ink,
    fontSize: 31,
    lineHeight: 36,
    fontWeight: '900',
    letterSpacing: 0,
  },
  subtitle: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  headerBadge: {
    minWidth: 76,
    borderRadius: 18,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 3,
  },
  headerBadgeNumber: {
    color: palette.ink,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
  },
  headerBadgeLabel: {
    color: palette.faint,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  tabBar: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 6,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
  },
  tabButton: {
    flex: 1,
    minHeight: 68,
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: palette.surfaceSoft,
  },
  tabButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  tabCopy: {
    alignItems: 'center',
    gap: 1,
  },
  tabLabel: {
    color: palette.muted,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '800',
    letterSpacing: 0,
  },
  tabLabelActive: {
    color: palette.ink,
  },
  tabEyebrow: {
    color: palette.faint,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '700',
    letterSpacing: 0,
  },
  tabEyebrowActive: {
    color: palette.accentDark,
  },
  content: {
    flex: 1,
    marginTop: 14,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  summaryHero: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricBlock: {
    flex: 1,
    minHeight: 96,
    backgroundColor: palette.ink,
    borderRadius: 24,
    padding: 18,
    justifyContent: 'space-between',
  },
  metricNumber: {
    color: palette.surface,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '900',
    letterSpacing: 0,
  },
  metricLabel: {
    color: palette.accentSoft,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  sectionIntro: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: palette.ink,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    letterSpacing: 0,
  },
  sectionDescription: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
  courseList: {
    gap: 12,
  },
  courseCard: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    elevation: 2,
  },
  courseCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  courseCodePill: {
    alignSelf: 'flex-start',
    backgroundColor: palette.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  courseCode: {
    color: palette.accentDark,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  courseIndex: {
    color: palette.line,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
  courseName: {
    color: palette.ink,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 18,
  },
  courseMetaRow: {
    minHeight: 66,
    backgroundColor: palette.paper,
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    width: 52,
    alignItems: 'center',
  },
  metaValue: {
    color: palette.ink,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '900',
    letterSpacing: 0,
  },
  metaLabel: {
    color: palette.faint,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '800',
  },
  metaDivider: {
    width: 1,
    height: 42,
    backgroundColor: palette.line,
  },
  lecturerBlock: {
    flex: 1,
  },
  lecturerName: {
    color: palette.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '800',
    marginTop: 3,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  countBadge: {
    minWidth: 66,
    borderRadius: 18,
    backgroundColor: palette.ink,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  countBadgeNumber: {
    color: palette.surface,
    fontSize: 22,
    lineHeight: 25,
    fontWeight: '900',
    letterSpacing: 0,
  },
  countBadgeLabel: {
    color: palette.accentSoft,
    fontSize: 11,
    fontWeight: '800',
  },
  meetingRow: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  meetingNumber: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: palette.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meetingNumberText: {
    color: palette.accentDark,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  meetingBody: {
    flex: 1,
    minWidth: 0,
  },
  meetingCourse: {
    color: palette.accentDark,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  meetingTopic: {
    color: palette.ink,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 4,
  },
  meetingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 12,
  },
  meetingCode: {
    color: palette.muted,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  meetingDate: {
    color: palette.faint,
    flexShrink: 1,
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  meetingSeparator: {
    height: 10,
  },
  sectionListIntro: {
    marginBottom: 16,
  },
  dayHeader: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: palette.ink,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  dayTitle: {
    color: palette.surface,
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '900',
    letterSpacing: 0,
  },
  daySubtitle: {
    color: palette.accentSoft,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    marginTop: 3,
  },
  dayCount: {
    backgroundColor: palette.accent,
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  dayCountText: {
    color: palette.surface,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '900',
    letterSpacing: 0,
  },
  scheduleRow: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderWidth: 1,
    borderRadius: 22,
    padding: 15,
    flexDirection: 'row',
    gap: 15,
    marginBottom: 10,
  },
  timeRail: {
    width: 58,
    alignItems: 'center',
  },
  timeStart: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
  },
  timeLine: {
    width: 1,
    height: 34,
    backgroundColor: palette.accentSoft,
    marginVertical: 8,
  },
  timeEnd: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
  },
  scheduleBody: {
    flex: 1,
    minWidth: 0,
  },
  scheduleCourse: {
    color: palette.ink,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
    letterSpacing: 0,
  },
  scheduleRoom: {
    color: palette.accentDark,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '900',
    marginTop: 7,
  },
  scheduleLecturer: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    minHeight: 260,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMark: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: palette.surfaceSoft,
    justifyContent: 'center',
    paddingHorizontal: 15,
    gap: 8,
    marginBottom: 16,
  },
  emptyMarkLine: {
    height: 4,
    borderRadius: 99,
    backgroundColor: palette.accent,
  },
  emptyMarkLineShort: {
    width: 18,
  },
  emptyTitle: {
    color: palette.ink,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyDescription: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
  },
  glyphFrame: {
    width: 26,
    height: 26,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  glyphFrameActive: {
    borderColor: palette.accentSoft,
  },
  glyphBar: {
    height: 3,
    borderRadius: 99,
  },
  glyphListRow: {
    width: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  glyphDot: {
    width: 4,
    height: 4,
    borderRadius: 99,
  },
  glyphListLine: {
    flex: 1,
    height: 3,
    borderRadius: 99,
  },
  glyphGrid: {
    width: 14,
    height: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  glyphCell: {
    width: 5.5,
    height: 5.5,
    borderRadius: 2,
  },
});
