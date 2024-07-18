const genForm = document.getElementById("gen-form");
const genButton = document.getElementById("gen-button");
const downloadButton = document.getElementById("download-button");
const outputWrapper = document.getElementById("output-wrapper");

let formValuesStore;

console.log('loaded');

genButton.addEventListener('click', () => {
  formValuesStore = docParse(getFormValues());
  console.log(outputWrapper); 
  outputWrapper.innerHTML = `<div class="faketxt">${formValuesStore.html}</div>`;
  downloadButton.disabled = false;
});

downloadButton.addEventListener('click', () => {
  if (formValuesStore){
    download('solidworksBattery', formValuesStore.txt);
  } else {
    alert('Oops, something get screwy. Regen data.');
  }
})

function getFormValues(){
  const cellDepth = {
    name: document.getElementById('cellDepth').previousSibling.previousSibling.innerText,
    value: (document.getElementById('cellDepth').value / 25.4).toFixed(4)
  }
  
  const cellWidth = {
    name: document.getElementById('cellWidth').previousSibling.previousSibling.innerText,
    value: (document.getElementById('cellWidth').value / 25.4).toFixed(4)
  }
  
  const cellHeight = {
    name: document.getElementById('cellHeight').previousSibling.previousSibling.innerText,
    value: (document.getElementById('cellHeight').value / 25.4).toFixed(4)
  }
  
  const dividerThickness = {
    name: document.getElementById('dividerThickness').previousSibling.previousSibling.innerText,
    value: document.getElementById('dividerThickness').value
  }
  
  const numCellsDeep = {
    name: document.getElementById('numCellsDeep').previousSibling.previousSibling.innerText,
    value: document.getElementById('numCellsDeep').value
  }
  
  const numCellsWide = {
    name: document.getElementById('numCellsWide').previousSibling.previousSibling.innerText,
    value: document.getElementById('numCellsWide').value
  }
  
  const topSpace = {
    name: document.getElementById('topSpace').previousSibling.previousSibling.innerText,
    value: (document.getElementById('topSpace').value / 25.4).toFixed(4)
  }
  
  const sidePlateThickness = {
    name: document.getElementById('sidePlateThickness').previousSibling.previousSibling.innerText,
    value: document.getElementById('sidePlateThickness').value
  }
  
  const topPlateThickness = {
    name: document.getElementById('topPlateThickness').previousSibling.previousSibling.innerText,
    value: document.getElementById('topPlateThickness').value
  }
  
  const bottomPlateThickness = {
    name: document.getElementById('bottomPlateThickness').previousSibling.previousSibling.innerText,
    value: document.getElementById('bottomPlateThickness').value
  }
  
  const endPlateThickness = {
    name: document.getElementById('endPlateThickness').previousSibling.previousSibling.innerText,
    value: document.getElementById('endPlateThickness').value
  }
  
  const formValues = [cellDepth, cellHeight, cellWidth, dividerThickness, numCellsDeep, numCellsWide, topSpace, sidePlateThickness, topPlateThickness, bottomPlateThickness, endPlateThickness]

  return formValues;
}

function docParse(values) {
  let output = {
    html: '',
    txt: ''
  };

  values.forEach(obj => {
    output.html += `<p>${obj.name}: ${obj.value}</p>`
    output.txt += `"${obj.name}"=${obj.value}
`
  })

  return output;
}

function download(filename, text) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

