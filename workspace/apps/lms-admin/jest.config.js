module.exports = {
  name: 'lms-admin',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lms-admin',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
