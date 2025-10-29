import galleryCategIndex from '../_data/galleryCategIndex.json' with { type: 'json' };

const years = galleryCategIndex.year.map(a => a.categKey);
const subjects = galleryCategIndex.subject.map(a => a.categKey);
const mediums = galleryCategIndex.medium.map(a => a.categKey);

function gallArrayObject(aoYears, aoSubjects, aoMediums) {
    this.years = aoYears;
    this.subjects = aoSubjects;
    this.mediums = aoMediums;
}

let gallCategArrays = new gallArrayObject(years, subjects, mediums);

// console.log(gallCategArrays.years);
// console.log(gallCategArrays.subjects);
// console.log(gallCategArrays.mediums);

export default gallCategArrays;