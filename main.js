const applyButton = document.querySelector("#btn-apply");
const parseButton = document.querySelector("#btn-parse");

const filterField = document.querySelector("#filter-field")

const inputField = document.querySelector("#input-field")
const outputField = document.querySelector("#output-field")

const input = document.querySelector('input[type="file"]');
let regex = new RegExp(/(\d*)\s(\d*(\d{4}))\s([A-Za-z\.\s]*)\s(\d*)\s([\d\.]*)/);
var data;

applyButton.onclick = function () {
  console.log("Filter Applied");
  const filter = filterField.value;
  
  regex = new RegExp(filter)
  console.log(regex);
};


input.addEventListener("change", function (e) {
	console.log(input.files);
	const reader = new FileReader();
	reader.onload = function () {
		const lines = reader.result.split("\n").map(function (line) {
			return line.split(regex);
    });
    // console.log(reader.result);
    
		data = lines;
    inputField.innerText = reader.result;
    console.log(reader.result);
    
	};
  reader.readAsText(input.files[0]);
  
  
});

parseButton.onclick = function () {
	if (!data) {
		alert("Uploade your file");
	} else {
		var mhs = data.map((index) => {
			const obj = {};

			obj.id = index[1];
			obj.nrp = index[2];
			obj.nrpLast = index[3];
			obj.name = index[4];
			obj.akt = index[5];
			obj.ipk = index[6];

			return obj;
		});

		// for (const index in mhs) {
		// 	const element = mhs[index];
		// 	console.log(element.name);
    // }
    const stringified = JSON.stringify(mhs, null, 1)
    outputField.innerText = stringified;
    console.log(stringified);
    
	}
};

function formatTip(){
  const stringalert = "assign your object properties as array index (using map)\r\n\r\nfor example : anArray = [\"001\", \"John Doe\", \"Somewhere]\r\nwrite :\r\n\r\nobj.id = index[0];\r\nobj.name= index[1];\r\nobj.address= index[2];\r\nobj.name = index[4];\r\n"
  // const stringalert = "var mhs = data.map((index) => {\r\n\t\t\tconst obj = {};\r\n\r\n\t\t\tobj.id = index[1];\r\n\t\t\tobj.nrp = index[2];\r\n\t\t\tobj.nrpLast = index[3];\r\n\t\t\tobj.name = index[4];\r\n\t\t\tobj.akt = index[5];\r\n\t\t\tobj.ipk = index[6];\r\n\r\n\t\t\treturn person;\r\n\t\t});"
  alert(stringalert)
}