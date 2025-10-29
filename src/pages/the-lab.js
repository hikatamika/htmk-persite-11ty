//Lab Progress
export async function labProgressList(content) {
  return `<ul class="lab-prog-list">${content}</ul>`
}
export async function labProgressBar(progressID, progressLabel, progressComplete, progressTotal) {
  var progressPercent = Math.round((progressComplete / progressTotal) * 100);
  return `
    <li class="lab-prog">
      <label for="${progressID}">${progressLabel}:</label>
      <div class="lab-prog-container">
        <progress id="${progressID}" value="${progressComplete}" max="${progressTotal}">
          ${progressPercent}%
        </progress>
        <span class="lab-prog-value">${progressPercent}%</span>
      </div>
    </li>
  `
}

// Lab Check List
export async function labCheckList(content) {
  return `<ul class="lab-check-list">${content}</ul>`
}

export async function labCheckItem(checkID, checkLabel,done) {

  if (done) {
    return `
    <li>
      <input id="${checkID}" type="checkbox" onclick="return false" style="pointer-events: none;" checked />
      <label for="${checkID}"><span class="lab-check-label">${checkLabel}</span></label>
    </li>
  `
  } else {
    return `
    <li>
      <input id="${checkID}" type="checkbox" onclick="return false" style="pointer-events: none;" />
      <label for="${checkID}"><span class="lab-check-label">${checkLabel}</span></label>
    </li>
  `
  }
  
}