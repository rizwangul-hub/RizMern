const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema(
  {
    courseId: { type: String, default: 'rizmern-3month', index: true },
    month: { type: Number, required: true, min: 1, max: 3 },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const lessonSchema = new mongoose.Schema(
  {
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModule', required: true, index: true },
    courseId: { type: String, default: 'rizmern-3month', index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    order: { type: Number, default: 1 },
    content: { type: String, required: true },
    videoUrl: { type: String, default: null },
    resources: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        type: { type: String, default: 'documentation' },
      },
    ],
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const CourseModule = mongoose.model('CourseModule', moduleSchema);
const CourseLesson = mongoose.model('CourseLesson', lessonSchema);

/**
 * Default Course Curriculum Initializer (Seed Data)
 */
function getDefaultModulesAndLessons() {
  return [
    {
      id: 'mod-1',
      month: 1,
      title: 'Modern HTML5 & Semantic UI Architecture',
      description: 'Foundational document structure, semantic hierarchy, and responsive layout styling.',
      order: 1,
      lessons: [
        {
          id: 'les-1',
          title: 'Semantic HTML & Document Accessibility',
          slug: 'semantic-html-accessibility',
          description: 'Understanding landmarks, accessible heading hierarchy, and modern document layout.',
          order: 1,
          published: true,
          content: `### Welcome to RizMern: Semantic HTML & Accessibility

In modern web development, semantic markup is the bedrock of maintainable engineering, assistive technologies (screen readers), and search engine optimization.

#### 1. Core Landmark Elements
Instead of nesting generic \`<div>\` containers, use HTML5 semantic tags:
- \`<header>\`: Introductory content or navigational aids.
- \`<nav>\`: Navigation links.
- \`<main>\`: The primary unique content of the page.
- \`<section>\`: Standalone thematic groupings of content.
- \`<article>\`: Self-contained, independently distributable content.
- \`<footer>\`: Author, copyright, or footer links.

#### 2. Accessible Code Example:
\`\`\`html
<header class="site-header">
  <nav aria-label="Main Navigation">
    <a href="/">Home</a>
    <a href="/course">Course</a>
  </nav>
</header>

<main>
  <article>
    <h1>Building Accessible Full-Stack Systems</h1>
    <p>Always pair proper aria-labels with interactive buttons.</p>
  </article>
</main>
\`\`\`

#### 3. Key Takeaway
Always prioritize standard semantic elements before reaching for custom \`<div>\` structures with JavaScript workarounds.`,
          resources: [
            { title: 'MDN Semantic Elements Guide', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics', type: 'documentation' },
          ],
        },
        {
          id: 'les-2',
          title: 'CSS Flexbox & Responsive Layouts',
          slug: 'css-flexbox-responsive',
          description: 'Mastering 1D layout mechanics, alignment, and mobile responsive containers.',
          order: 2,
          published: true,
          content: `### Flexbox: One-Dimensional Layout Architecture

Flexbox provides predictive alignment and spacing along a single primary axis (row or column).

#### The Flex Container & Items:
\`\`\`css
.card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
    align-items: stretch;
  }
}
\`\`\`

#### Essential Properties:
1. \`justify-content\`: Distributes space along the main axis.
2. \`align-items\`: Aligns items along the cross axis.
3. \`gap\`: Cleaner than individual margins for spacing child elements.`,
          resources: [
            { title: 'CSS-Tricks Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'guide' },
          ],
        },
      ],
    },
    {
      id: 'mod-2',
      month: 1,
      title: 'Modern JavaScript (ES6+) & TypeScript Basics',
      description: 'Modern language syntax, arrow functions, destructuring, promises, and async/await.',
      order: 2,
      lessons: [
        {
          id: 'les-3',
          title: 'Asynchronous JavaScript: Promises & Async/Await',
          slug: 'async-await-promises',
          description: 'Handling non-blocking I/O, network requests, and error management cleanly.',
          order: 1,
          published: true,
          content: `### Mastering Asynchronous JavaScript & API Calls

JavaScript runs on a single-threaded event loop. When fetching remote data or reading databases, asynchronous patterns prevent the main UI thread from freezing.

#### 1. From Callbacks to Async/Await:
\`\`\`javascript
// Fetching API data with async/await and try/catch
async function loadCourseData() {
  try {
    const response = await fetch('/api/course-config');
    if (!response.ok) {
      throw new Error('Network response failed with status ' + response.status);
    }
    const data = await response.json();
    console.log('Course Config:', data);
    return data;
  } catch (error) {
    console.error('Error fetching course data:', error.message);
  }
}
\`\`\`

#### 2. Golden Rule:
Always wrap asynchronous awaits in \`try/catch\` blocks to prevent unhandled rejection crashes!`,
          resources: [
            { title: 'JavaScript.info: Async/Await', url: 'https://javascript.info/async-await', type: 'tutorial' },
          ],
        },
      ],
    },
    {
      id: 'mod-3',
      month: 1,
      title: 'React Components, State & Hook Mechanics',
      description: 'Component architecture, unidirectional data flow, useState, and useEffect lifecycles.',
      order: 3,
      lessons: [
        {
          id: 'les-4',
          title: 'React State Management with useState & useEffect',
          slug: 'react-state-hooks',
          description: 'Managing reactive UI state, side effects, and clean-up functions.',
          order: 1,
          published: true,
          content: `### React Hooks: useState & useEffect

React applications are built around declarative components driven by reactive state.

#### Interactive Component Example:
\`\`\`jsx
import React, { useState, useEffect } from 'react';

export function LessonTracker({ lessonId }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    await markLessonComplete(lessonId);
    setIsCompleted(true);
    setIsLoading(false);
  };

  return (
    <button onClick={handleToggle} disabled={isLoading || isCompleted}>
      {isCompleted ? '✓ Completed' : isLoading ? 'Saving...' : 'Mark Complete'}
    </button>
  );
}
\`\`\`

#### The Dependency Array in useEffect:
- \`[]\`: Runs only once on mount.
- \`[varA, varB]\`: Re-runs whenever \`varA\` or \`varB\` changes.`,
          resources: [
            { title: 'React Documentation: Built-in React Hooks', url: 'https://react.dev/reference/react', type: 'documentation' },
          ],
        },
      ],
    },
    {
      id: 'mod-4',
      month: 2,
      title: 'Node.js & Express Backend REST API Architecture',
      description: 'Building secure server routers, controller logic, middleware, and CORS configuration.',
      order: 4,
      lessons: [
        {
          id: 'les-5',
          title: 'Express Routing & Custom Middleware Architecture',
          slug: 'express-routing-middleware',
          description: 'Structuring controllers, request pipelines, and input validation guards.',
          order: 1,
          published: true,
          content: `### Building Production Express.js APIs

Express powers the routing and middleware pipeline in the MERN Stack.

#### Clean Controller & Route Separation:
\`\`\`javascript
const express = require('express');
const router = express.Router();

// Middleware: Verify student token
const requireStudentAuth = require('../middleware/studentAuthMiddleware');

// Controller: Get student progress
const { getStudentProgress } = require('../controllers/studentController');

router.get('/progress', requireStudentAuth, getStudentProgress);

module.exports = router;
\`\`\`

#### Middleware Flow:
Request -> CORS -> JSON Parser -> Auth Middleware -> Controller -> Database -> Response.`,
          resources: [
            { title: 'Express.js Official Guide', url: 'https://expressjs.com/', type: 'documentation' },
          ],
        },
      ],
    },
    {
      id: 'mod-5',
      month: 2,
      title: 'MongoDB Document Modeling & Mongoose ODM',
      description: 'Schema design, document relationships, indexing, and MongoDB Atlas configuration.',
      order: 5,
      lessons: [
        {
          id: 'les-6',
          title: 'Mongoose Schemas & Relational Data Modeling',
          slug: 'mongoose-schema-data-modeling',
          description: 'Defining strict schemas, validators, timestamps, and model methods.',
          order: 1,
          published: true,
          content: `### Mongoose Schemas & Validation

MongoDB is schema-less by nature, but production applications require predictability and validation. Mongoose provides schema validation on top of MongoDB.

#### Example Schema Definition:
\`\`\`javascript
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: String, required: true },
  completedLessons: [{ type: String }],
  progressPercentage: { type: Number, default: 0, min: 0, max: 100 },
}, { timestamps: true });

module.exports = mongoose.model('CourseProgress', progressSchema);
\`\`\`

Compound index ensures high-speed lookups:
\`progressSchema.index({ studentId: 1, courseId: 1 }, { unique: true });\``,
          resources: [
            { title: 'Mongoose Documentation', url: 'https://mongoosejs.com/docs/guide.html', type: 'documentation' },
          ],
        },
      ],
    },
    {
      id: 'mod-6',
      month: 3,
      title: 'React Native & Mobile App Development',
      description: 'Cross-platform mobile UI, React Native styling, navigation, and Android APK compilation.',
      order: 6,
      lessons: [
        {
          id: 'les-7',
          title: 'React Native Layout Primitives & Cross-Platform UI',
          slug: 'react-native-primitives',
          description: 'Understanding View, Text, ScrollView, StyleSheet, and mobile gestures.',
          order: 1,
          published: true,
          content: `### Mobile Development with React Native

React Native compiles JavaScript to native Android and iOS components.

#### Primitives vs Web Elements:
- \`<div>\` -> \`<View>\`
- \`<p>\`, \`<span>\` -> \`<Text>\`
- \`<button>\` -> \`<TouchableOpacity>\` or \`<Pressable>\`
- CSS files -> \`StyleSheet.create({ ... })\`

\`\`\`jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function MobileCard({ title, onAction }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={onAction}>
        <Text style={styles.buttonText}>Continue Lesson</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: '#1e293b', borderRadius: 8 },
  title: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  button: { backgroundColor: '#7c3aed', padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600' },
});
\`\`\``,
          resources: [
            { title: 'React Native Documentation', url: 'https://reactnative.dev/docs/getting-started', type: 'documentation' },
          ],
        },
      ],
    },
  ];
}

module.exports = {
  CourseModule,
  CourseLesson,
  getDefaultModulesAndLessons,
};
