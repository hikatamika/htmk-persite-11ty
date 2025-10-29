import galleryCategIndex from './galleryCategIndex.json' with { type: 'json' };

const scraps = galleryCategIndex.scrap.map(a => a.categKey);

let gallScrapArray = scraps;

// console.log(gallCategArrays.dates);
// console.log(gallCategArrays.subjects);
// console.log(gallCategArrays.mediums);

export default gallScrapArray;