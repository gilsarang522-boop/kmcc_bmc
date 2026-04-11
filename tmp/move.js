const fs = require('fs');

const file = 'src/App.tsx';
let code = fs.readFileSync(file, 'utf8');

const startMarker = '      {/* 커리큘럼 */}\n      <section id="curriculum"';
const endMarker = '※ M1-M5는 온라인(2hr), M6는 오프라인(8hr)으로 진행됩니다.</p>\n      </section>';

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker) + endMarker.length;

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find curriculum section');
  process.exit(1);
}

let curriculumSection = code.substring(startIndex, endIndex);
code = code.substring(0, startIndex) + code.substring(endIndex);

curriculumSection = curriculumSection.replace(
  '<h3 className="text-3xl font-bold mb-4">커리큘럼 블루프린트</h3>',
  '<h3 className="text-3xl font-bold mb-4">비즈니스멘탈코칭 전문가 자격과정</h3>'
);

const insertMarker = '      {/* 코치 소개 */}';
const insertIndex = code.indexOf(insertMarker);

if (insertIndex === -1) {
  console.error('Could not find insert point');
  process.exit(1);
}

code = code.substring(0, insertIndex) + curriculumSection + '\n\n' + code.substring(insertIndex);

fs.writeFileSync(file, code, 'utf8');
console.log('Successfully moved curriculum section');
