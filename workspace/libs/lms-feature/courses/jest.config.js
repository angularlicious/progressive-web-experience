module.exports = {
  name: 'lms-feature-courses',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/lms-feature/courses',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
