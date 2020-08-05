/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var input = document.getElementById("input");
var o = document.getElementById("output");
var i = 0;
const p = document.getElementById("p");
const w = document.getElementById("w");
var s = input.value;

//divine the /funtion to 2 side
var leftEquation;
var rightEquation;

var leftElements;
var rightElements;
var allElement;
var leftE = [];
var rightE = [];
var allE = [];
var allRE = [];
var allLE = [];
var O = [];

//tao ra ma tran
var matrix;

function set(button) {
  w.innerHTML = "";
  if (button.value === " = ") {
    if (input.value.match(/\=/)) {
      w.innerHTML("Da co dau bang! ");
      return;
    }
  }
  input.value += button.value;
  if (input.value.match(/\d{3}/)) {
    w.innerHTML(
      "Dang co chuoi so " + input.value.match(/\d{3}/) + " La qua lon!"
    );
    back();
    return;
  }
}
function AC() {
  if (input.value) {
    input.value = "";
  } else {
    w.innerHTML("Hay nham truoc khi xoa!");
  }
}
function back() {
  if (input.value) {
    var t = input.value.substring(0, input.value.length - 1);
    input.value = t;
  } else {
    w.innerHTML("Hay nham truoc khi xoa!");
  }
}

function outputOveride() {
  w.innerHTML = "Ban khong can nham vao output!";
}
function inputAndCheck() {
  leftEquation = "";
  rightEquation = "";
  leftElements = "";
  rightElements = "";
  allElement = "";
  leftE = new Array();
  rightE = new Array();
  allE = new Array();
  allRE = new Array();
  allLE = new Array();
  O = new Array();
  matrix = new Array();
  o.value = "";
  w.innerHTML = "";
  s = input.value;
  if (s.match(/\=/) && !s.match(/ \= /)) {
    w.innerHTML = 'can dau cach giua dau bang! " = "';
    return 0;
  }
  leftEquation = s.split(/ \=\ |\=/)[0];
  rightEquation = s.split(/ \=\ |\=/)[1];

  if (rightEquation == null) {
    w.innerHTML =
      "Thieu ve phai phuong trinh ! Hay nhap dau = de phan cach 2 ve !";
    return 0;
  } else if (rightEquation == null) {
    w.innerHTML = "Thieu ve trai phuong trinh ! ";
    return 0;
  }
  leftElements = leftEquation.split(/[+\s]+/);
  rightElements = rightEquation.split(/[+\s]+/);

  //lay tat ca cac chat trong phuong trinh
  allElement = s.match(/[A-Z]([a-z])|[A-Z]/g);
  allLE = leftEquation.match(/[A-Z]([a-z])|[A-Z]/g);
  allRE = rightEquation.match(/[A-Z]([a-z])|[A-Z]/g);

  for (i = 0; i < allElement.length; i++) {
    for (var j = i + 1; j < allElement.length; j++) {
      if (allElement[i] === allElement[j]) {
        allElement.splice(j, 1);
        i = 0;
      }
    }
  }
  for (i = 0; i < allLE.length; i++) {
    for (var j = i + 1; j < allLE.length; j++) {
      if (allLE[i] === allLE[j]) {
        allLE.splice(j, 1);
        i = 0;
      }
    }
  }
  for (i = 0; i < allRE.length; i++) {
    for (var j = i + 1; j < allRE.length; j++) {
      if (allRE[i] === allRE[j]) {
        allRE.splice(j, 1);
        i = 0;
      }
    }
  }

  //check xem nguoi dung co nhap chu cai viet thuong k
  createList();
  for (var i = 0; i < allE.length; i++) {
    var t = allE[i].whole;

    var st = allE[i].singular;
    //window.alert(st);
    for (var k = 0; k < st.length; k++) {
      //window.alert(t);
      var find = t.search(st[k]);
      if (find != 0)
        //window.alert("Loi syntax ! " + allE[i].whole);
        t = t.toString().substring(find + st[k].length);

      // window.alert(t.toString() + "   " + st[k] + "   " + find + "  " + st[k].length);
    }
    //window.alert(t.toString());
  }

  //check cac chat 2 ve
  if (allRE.length != allLE.length) {
    var fail;
    for (var i = 0; i < allRE.length; i++) {
      if (!contains(allLE, allRE[i])) fail = allRE[i];
    }
    for (var i = 0; i < allLE.length; i++) {
      if (!contains(allRE, allLE[i])) fail = allLE[i];
    }
    window.alert("Dang thua nguyen to " + fail);
  }

  //To matrix
  var r = allElement.length + 1;
  var c = allE.length + 1;
  matrix = new Array(100);
  for (var i = 0; i < 100; i++) {
    matrix[i] = new Array(c);
    for (var j = 0; j < c; j++) {
      matrix[i][j] = 0;
    }
  }

  toMatrix();
  RutGon(matrix, r, c);
  BienLuan(matrix, r, c);
  window.alert(O);

  var c = 0;

  for (var i = 0; i < leftElements.length; i++) {
    if (O[i] !== 1) o.value += O[i];
    o.value += leftElements[i];
    if (i !== leftElements.length - 1) o.value += " + ";
  }
  o.value += " = ";
  for (var i = 0; i < rightElements.length; i++) {
    if (O[i] !== 1) o.value += O[i];
    o.value += rightElements[i];
    if (i !== rightElements.length - 1) o.value += " + ";
  }

  leftEquation = "";
  rightEquation = "";
  leftElements = "";
  rightElements = "";
  allElement = "";
  leftE = new Array();
  rightE = new Array();
  allE = new Array();
  allRE = new Array();
  allLE = new Array();
  O = new Array();
  matrix = new Array();
}

//Create list of elements
function createList() {
  for (var i = 0; i < leftElements.length; i++) {
    var lE = new lElement(leftElements[i]);
    //   window.alert(lE.singular);
    leftE.push(lE);
    allE.push(lE);
  }

  for (var i = 0; i < rightElements.length; i++) {
    var rE = new rElement(rightElements[i]);
    rightE.push(rE);
    // window.alert(rE.singular);
    allE.push(rE);
  }
}

function toMatrix() {
  var r = allElement.length;
  var c = allE.length;
  for (var i = 0; i < r; i++) {
    var j = 0;
    for (j = 0; j < c + 1; j++) {
      if (j == c) {
        matrix[i][j] = 0;
        break;
      }
      var elementAt = allE[j];
      // window.alert(allE[j].singular);
      var posi = checkInArray(allElement[i], elementAt.listOfSingular);
      //window.alert(elementAt.listOfSingular);
      if (posi != -1) {
        matrix[i][j] = allE[j].singularValue[posi];
      } else matrix[i][j] = 0;
    }
  }

  matrix[r][0] = 1;
  for (var i = 1; i < c; i++) {
    matrix[r][i] = 0;
  }
  matrix[r][c] = 1;
}
//CHECK BINE TEMP CO TRONG ARRAY KO
function checkInArray(temp, array) {
  //window.alert(array);
  for (var i = 0; i < array.length; i++) {
    if (array[i] === temp) return i;
  }
  return -1;
}
function getGroupSingular(element) {
  var groupSingular = element.match(/[A-Z](\d|[a-z])+|[A-Z]/g);
  return groupSingular;
}
function lElement(element) {
  this.whole = element;
  this.element = element;
  this.group = this.element.match(/\(\w+\)\d/g);
  this.element = subGroup(element);
  this.singular = this.element.match(/[A-Z](\d|[a-z])+|[A-Z]/g);
  this.listOfSingular = this.element.match(/[A-Z][a-z]|[A-Z]/g);
  this.singularValue = [];
  //singularity of a group
  // window.alert(this.group);

  //NEU TRONG CHAT NAY CO 1 NHOM CAC CHAT
  if (this.group) {
    this.groupSingular = [];
    this.listOfGroupSingular = this.group[0].match(/[A-Z][a-z]|[A-Z]/g);
    this.groupSingularValue = [];
    this.groupMulti;
    if (this.group) {
      this.groupMulti = this.group[0].charAt(this.group[0].length - 1);
      this.groupSingular = this.group[0].match(/[A-Z](\d|[a-z])+|[A-Z]/g);
    }
    for (var i = 0; i < this.groupSingular.length; i++) {
      if (this.groupSingular[i].match(/\d/g)) {
        this.groupSingularValue.push(
          this.groupSingular[i].match(/\d/g) * this.groupMulti
        );
      } else this.groupSingularValue.push(this.groupMulti);
    }
  }
  //create gia tri cua tung chat trong cac chat don
  for (var i = 0; i < this.singular.length; i++) {
    if (this.singular[i].match(/\d/g)) {
      this.singularValue.push(this.singular[i].match(/\d/g));
    } else this.singularValue.push(1);
  }

  //DUA CAC GIA TRI VAO NHOM
  if (this.group) {
    for (var i = 0; i < this.listOfGroupSingular.length; i++) {
      var j = 0;
      for (j = 0; j < this.listOfSingular.length; j++) {
        if (this.listOfGroupSingular[i] === this.listOfSingular[j]) {
          this.singularValue[j] =
            parseInt(this.singularValue[j]) +
            parseInt(this.groupSingularValue[i]);
          break;
        }
      }
      if (j === this.listOfSingular.length) {
        this.listOfSingular.push(this.listOfGroupSingular[i]);
        this.singularValue.push(this.groupSingularValue[i]);
      }
    }
  }
  // window.alert(this.singular);
}

function rElement(element) {
  this.whole = element;
  this.element = element;
  this.group = this.element.match(/\(\w+\)\d/g);
  this.element = subGroup(element);
  this.singular = this.element.match(/[A-Z](\d|[a-z])+|[A-Z]/g);
  this.listOfSingular = this.element.match(/[A-Z][a-z]|[A-Z]/g);
  this.singularValue = [];
  //singularity of a group
  // window.alert(this.group);

  //NEU TRONG CHAT NAY CO 1 NHOM CAC CHAT
  if (this.group) {
    this.groupSingular = [];
    this.listOfGroupSingular = this.group[0].match(/[A-Z][a-z]|[A-Z]/g);
    this.groupSingularValue = [];
    this.groupMulti;
    if (this.group) {
      this.groupMulti = this.group[0].charAt(this.group[0].length - 1);
      this.groupSingular = this.group[0].match(/[A-Z](\d|[a-z])+|[A-Z]/g);
    }
    for (var i = 0; i < this.groupSingular.length; i++) {
      if (this.groupSingular[i].match(/\d/g)) {
        this.groupSingularValue.push(
          this.groupSingular[i].match(/\d/g) * this.groupMulti * -1
        );
      } else this.groupSingularValue.push(this.groupMulti * -1);
    }
  }
  //create gia tri cua tung chat trong cac chat don
  for (var i = 0; i < this.singular.length; i++) {
    if (this.singular[i].match(/\d/g)) {
      this.singularValue.push(this.singular[i].match(/\d/g) * -1);
    } else this.singularValue.push(-1);
  }

  //DUA CAC GIA TRI VAO NHOM
  if (this.group) {
    for (var i = 0; i < this.listOfGroupSingular.length; i++) {
      var j = 0;
      for (j = 0; j < this.listOfSingular.length; j++) {
        if (this.listOfGroupSingular[i] === this.listOfSingular[j]) {
          this.singularValue[j] =
            parseInt(this.singularValue[j]) +
            parseInt(this.groupSingularValue[i]);
          break;
        }
      }
      if (j === this.listOfSingular.length) {
        this.listOfSingular.push(this.listOfGroupSingular[i]);
        this.singularValue.push(this.groupSingularValue[i]);
      }
    }
  }
}

function subGroup(result) {
  for (i = 0; i < result.length; i++) {
    if (result.charAt(i) === "(") {
      result = result.substr(0, i);
      break;
    }
  }
  // window.alert(result);
  return result;
}

function contains(arr, element) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === element) {
      return true;
    }
  }
  return false;
}

//splititng to each group
//var result = leftE.split(/[+\s]+/);
//var Elements = [];
//if (leftE.match(/\(\w+\)\d/g))
//    Elements.push(leftE.match(/\(\w+\)\d/g));

//for (i = 0; i < result.length; i++) {
//    if (Elements.includes())
//        Elements.push(result[i].match(/[A-Z](\d|[a-z])+|[A-Z]/g));
//}

//result[0][9].;
//p.innerHTML = Elements;
//var rElem = /[A-Z](\d|[a-z])+|[A-Z]/g;
//var resultE = leftE.match(rElem);
//p.innerHTML = resultE;
function main(dong, cot) {
  RutGon(matrix, dong, cot);

  BienLuan(matrix, dong, cot);
}

function RutGon(M, m, n) {
  var HeSoNhan = 0,
    tg = 0;
  var i,
    j,
    k,
    l,
    kt = 0,
    dong = 0;

  /**
   * Chuyen doi ma tran M ve dang bac thang rut gon
   * Dua tung cot ve dang cot cua ma tran don vi I tuong ung
   */
  for (i = 0; i < n; i++) {
    /*
     * Bien doi theo cot
     *
     * Trao doi dong de dua ma tran ve dang co the bien ve so 1
     * Moi cot chi can chao doi mot lan
     */
    if (Number(M[i][i] == 0)) {
      // Tim dong co cot i khac 0 de trsao doi
      for (k = i + 1; k < m; k++) {
        if (Number(M[k][i]) != 0) {
          // Chao doi dong k chua phan tu != 0 do voi dong i dang xet
          for (l = 0; l < n; l++) {
            tg = Number(M[i][l]);
            M[i][l] = Number(M[k][l]);
            M[k][l] = Number(tg);
          }

          break; // dung vong for lai khi da chao doi xong
        }
      }
    } // Hoan tat trao doi

    /*
     * Tien hanh bien doi M[j][i] thanh so 1 va so 0
     * Chuyen doi lan luot tung dong theo dung loai
     */
    for (j = 0; j < m; j++) {
      /*
       * Xac dinh loai can chuyen ve so 0 hay so 1
       * loai = 2 la truong hop phan tu M[j][i] da o dung vi tri
       * khong can bien doi gi ca.
       */
      var loai = -1;
      // Neu M[j][i] khong nam tren duong cheo chinh va ban than no khac 0
      if (j != i && Number(M[j][i] != 0)) {
        // M[j][i] can chuyen ve zero
        loai = 0;
      }

      // Neu M[j][i] nam tren duong cheo chinh va ban than no khac 1
      if (j == i && Number(M[j][i] != 1)) {
        // M[j][i] can chuyen ve 1 chuan
        loai = 1;
      }

      switch (loai) {
        // Truong hop can chuyen M[j][i] ve so 0
        case 0:
          //Xac dinh he so nhan(HeSoNhan) va dong nhan vao thich hop
          for (k = 0; k < m; k++) {
            if (k != j) {
              HeSoNhan = 0;
              kt = 0;
              for (l = 0; l < i; l++) if (Number(M[k][l]) != 0) kt = 1;
              if (kt == 0 && Number(M[k][i]) != 0) {
                dong = k;
                HeSoNhan = (-1 * Number(M[j][i])) / Number(M[dong][i]);
                break;
              }
            }
          }
          //Neu co HeSoNhan thi se chuyen doi neu khong thi giu nguyen
          if (HeSoNhan != 0) {
            for (k = 0; k < n; k++) {
              M[j][k] = Number(M[j][k]) + Number(HeSoNhan) * Number(M[dong][k]);
            }
          }
          break;
        // Truong hop can chuyen M[j][i] ve so 0
        case 1:
          kt = 0;
          for (l = 0; l < i; l++) {
            if (M[j][l] != 0) {
              kt = 1;
            }
          }

          HeSoNhan = M[j][i];
          if (HeSoNhan != 0 && kt == 0) {
            for (l = 0; l < n; l++) {
              M[j][l] = Number(M[j][l]) / Number(HeSoNhan);
            }
          }

          break;
      }
    }
  }
}
function BienLuan(M, m, n) {
  var i, j;
  // Tim hang cua ma tran he so A
  var rA = 0;
  var tangHangA;
  for (i = 0; i < m; i++) {
    // Mac dinh la khong tang hang
    tangHangA = 0;
    for (j = 0; j < n - 1; j++) {
      // Chi can mot phan tu trong hang khac 0 la tang hang ngay
      if (Number(M[i][j]) != 0) {
        tangHangA = 1;
        break;
      }
    }

    rA += tangHangA;
  }

  // Tim hang cua ma tran bo sung M
  var rM = 0;
  var tangHangM;
  for (i = 0; i < m; i++) {
    // Mac dinh la khong tang hang
    tangHangM = 0;
    for (j = 0; j < n; j++) {
      // Chi can mot phan tu trong hang khac 0 la tang hang ngay
      if (Number(M[i][j]) != 0) {
        tangHangM = 1;
        break;
      }
    }

    rM += tangHangM;
  }

  if (rA == rM && rA == n - 1) {
    for (i = 0; i < n - 1; i++) {
      O[i] = parseFloat(Number(M[i][n - 1]).toFixed(3));
    }
  }

  // TH2 HPTTT co vo so nghiem Khi rA == rM < so an: -> k can bang dc
  if (rA == rM && rA < n - 1) {
    for (var i = 0; i < allE; i++) {
      O[i] = 0;
    }
    //printf("\n-> He phuong trinh co vo so nghiem.\n");
  }

  // TH2 HPTTT vo nghiem Khi rA < rM: -> k can bang dc
  if (rA < rM) {
    for (var i = 0; i < allE; i++) {
      O[i] = 0;
    }
    window.alert("He phuong trinh vo nghiem");
    //printf("\n-> He phuong trinh vo nghiem.\n");
  }
}
