module.exports = {
  name: 'lms-authors',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lms-authors',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js'],
};
