import React from 'react';
import { 
  Document, Page, Text, View, StyleSheet, Font, 
  Image, Link 
} from '@react-pdf/renderer';
import { languageConfig } from '../config/languageConfig';

// Register fonts that support Lithuanian characters (ąčęėįšųūž)
// Using Inter from Google Fonts CDN
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZg.ttf', fontWeight: 700 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf', fontWeight: 900, fontStyle: 'italic' }
  ]
});

const lessonStyles = (theme) => StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    backgroundColor: theme === 'premium' ? '#ffffff' : '#ffffff',
    color: '#1e293b'
  },
  header: {
    marginBottom: 20,
    borderBottom: theme === 'premium' ? 3 : 1,
    borderBottomColor: theme === 'premium' ? '#003399' : '#e2e8f0',
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  title: {
    fontSize: 24,
    fontWeight: 900,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    color: theme === 'premium' ? '#003399' : '#000000'
  },
  lessonNumber: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: 700
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 900,
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 10,
    color: theme === 'premium' ? '#cc0000' : '#000000',
    letterSpacing: 1
  },
  storyBox: {
    backgroundColor: theme === 'premium' ? '#f8fafc' : '#ffffff',
    padding: 15,
    borderRadius: 8,
    borderLeft: 4,
    borderLeftColor: theme === 'premium' ? '#cc0000' : '#000000',
    marginBottom: 20
  },
  storyText: {
    fontSize: 11,
    lineHeight: 1.6,
    fontStyle: 'italic',
    color: '#334155'
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 8
  },
  itemCol: {
    width: '50%',
    paddingRight: 10
  },
  textEn: {
    fontSize: 11,
    fontWeight: 700,
    color: theme === 'premium' ? '#003399' : '#000000'
  },
  textLt: {
    fontSize: 10,
    color: '#64748b'
  },
  point: {
    fontSize: 10,
    marginBottom: 5,
    paddingLeft: 10,
    color: '#334155'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    textAlign: 'center',
    color: '#94a3b8',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10
  }
});

const LessonPDF = ({ lesson, theme = 'premium' }) => {
  const styles = lessonStyles(theme);

  return (
    <Document title={`Lesson ${lesson.id} Study Guide`}>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>{lesson.theory.title}</Text>
          <Text style={styles.lessonNumber}>{languageConfig.targetLangName.toUpperCase()} {lesson.id}</Text>
        </View>

        {/* THEORY */}
        <View>
          <Text style={styles.sectionTitle}>TEORIJA / STORY</Text>
          <View style={styles.storyBox}>
            <Text style={styles.storyText}>{lesson.theory.story}</Text>
          </View>
        </View>

        {/* KEY POINTS */}
        <View>
          <Text style={styles.sectionTitle}>AKCENTAI</Text>
          {lesson.theory.points.map((p, i) => (
            <Text key={i} style={styles.point}>• {p}</Text>
          ))}
        </View>

        {/* DIALOGUE */}
        <View>
          <Text style={styles.sectionTitle}>{languageConfig.lesson.dialogueTab.toUpperCase()}</Text>
          {lesson.theory.dialogue.map((d, i) => (
            <View key={i} style={styles.itemRow} wrap={false}>
              <View style={styles.itemCol}>
                <Text style={styles.textEn}>{d.text}</Text>
              </View>
              <View style={styles.itemCol}>
                <Text style={styles.textLt}>{d.translation}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Lt-{languageConfig.targetLang.split('-')[0]} 2026 platforma | Mokykitės bet kur ir bet kada.
        </Text>
      </Page>

      {/* SECOND PAGE - TPRS & QUESTIONS */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>TRENIRUOTĖ / TPRS STORY</Text>
        {lesson.theory.tprsStory.map((s, i) => (
          <View key={i} style={{ marginBottom: 15 }} wrap={false}>
            <View style={styles.itemRow}>
               <View style={styles.itemCol}>
                  <Text style={styles.textEn}>{s.text}</Text>
                  <Text style={styles.textLt}>{s.translation}</Text>
               </View>
            </View>
            {/* COMPREHENSION CHECK */}
            <View style={{ backgroundColor: '#f8fafc', padding: 8, marginTop: 5, borderRadius: 4 }}>
               <Text style={{ fontSize: 9, fontWeight: 900, marginBottom: 4 }}>CHECK: {s.check.question}</Text>
               <Text style={{ fontSize: 8, fontStyle: 'italic', color: '#64748b' }}>
                 Answers: {s.check.choices.join(' | ')}
               </Text>
            </View>
          </View>
        ))}

        <Text style={styles.footer}>
          Lapai {lesson.id} - Vertimas ir suvokimas
        </Text>
      </Page>
    </Document>
  );
};

export default LessonPDF;
