module.exports = {
  name: 'lms-business-courses',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/lms/courses',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
