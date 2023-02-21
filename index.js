  const {performance} = require('perf_hooks');
//  const performance = window.performance

  let i =10000, z=0, m=0,  u=0, arr=[], arr2=[], arr3=[];

  for(;z<=10000;z++) arr[z]=Math.floor(Math.random() * i)
  for(;m<=100000;m++) arr2[m]=Math.floor(Math.random() * i)
  for(;u<=1000000;u++) arr3[u]=Math.floor(Math.random() * i)


  
  console.log("\n\n     Results For The Array of Size 10 Thousand ")
  StartProgram(arr)

  console.log("\n\n   Results For The Array of Size 100 Thousand \n")
  StartProgram(arr2)
 
  console.log("\n\n   Results For The Array of Size 1 Million \n")
  StartProgram(arr3)



  function StartProgram(arr){
    console.log("\n\nResults For The Unsorted Array  \n")
    Examine(arr)
  
    let SortedArray = CountingSort(arr)
    console.log("\n \nResults For The Sorted Array  \n")
    Examine(SortedArray)
    console.log("\n \nResults For the Reverse Sorted Array  \n")
  
    let ReverseSortedArray = ReverseSort(arr)
     Examine(ReverseSortedArray)
  }
  
  


function Examine(arr){

  var start = performance.now()
  CountingSort(arr);
  var time = performance.now()-start
  console.log(`Counting Sort :  ${time} ms`)


  try{
      var start = performance.now()
  // quickSort(sortedArray,0,sortedArray.length-1) Exceeds Maximum call stack size even if the array is ascending sorted. 9023 max inputsize
  quickSort([...arr],0, arr.length-1)
  var time = performance.now()-start
  console.log(`Quick sort :  ${time} ms`)
  }
  catch(e){
    console.log("Quick sort :  Maximum call stack size exceeded!")
  }

    

  var start = performance.now()
  quickSort3([...arr], 0, arr.length-1)
  var time = performance.now()-start
  console.log(`Quick sort (median of three) :  ${time} ms`)


  var start = performance.now();
  HeapSort([...arr])
  var time = performance.now()-start;
  console.log(`Heap sort :  ${time} ms`);



  var start = performance.now()
  mergeSort([...arr])
  var time = performance.now()-start
  console.log(`Merge sort :  ${time} ms`)



  var start = performance.now()
  BinaryInsertionSort([...arr])
  var time = performance.now()-start
  console.log(`Binary insertion Sort :  ${time} ms`)

  
  var start = performance.now()
  insertionSort([...arr])
  var time = performance.now()-start
  console.log(`Insertion sort :  ${time} ms \n`)



}
 


   
   



///////////////////////////
//////////////////////////// FUNCTIONS 
//////////////////////////





function CountingSort(Array){
  let carr=[],newArray=[];
  let ind=0,gon=0,yas=0;

  for(;ind<10001;ind++){
    carr[ind]= 0;   }

  for(;yas<Array.length;yas++){
    let x= Array[yas];
    carr[x] +=1 }
 
  for(;gon<10001;gon++){
    let z=carr[gon],p=0;
    for(;p<z;p++) newArray.push(gon)  }

    return newArray;
}




function swap(items, leftIndex, rightIndex){
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function partition(items, left, right) {
    var pivot = items[left], // 9 8 7 6
    i = left, 
    j = right;  /// i=0 j= 3

  while (i <= j) {
      while (items[i] < pivot)  i++;
      while (items[j] > pivot)  j--;
  
      if (i <= j) {
          swap(items, i, j); 
          i++;
          j--;
      }
  }
  return i;
}

function quickSort(items,left,right) {
  var index;
  if (items.length > 1) {
      index = partition(items, left, right); 
      if (left < index - 1) { 
          quickSort(items, left, index - 1);
      }
      if (index < right) { 
          quickSort(items, index, right);
      }
  }
  return items;
}




function partition3(items, left, right){
  var pivot;
  var middle= items[Math.floor((left+right)/2)]
  var first = items[left]
  var last = items[right]

  if((first>=middle && first<=last) || (first>=last && first<=middle)) pivot = first
  if((last>=middle && last<=first) || (last>=first && last<=middle)) pivot = last
  if((middle>=first && middle<=last) || (middle>=last && middle<=first)) pivot= middle

  var i = left, 
  j = right;

while (i <= j) {
    while (items[i] < pivot)  i++;
    while (items[j] > pivot)  j--;

    if (i <= j) {
        swap(items, i, j); 
        i++;
        j--;
    }
}
return i;
}

function quickSort3(items,left,right){
  var index;
  if (items.length > 1) {
      index = partition3(items, left, right); 
      if (left < index - 1) { 
        quickSort3(items, left, index - 1);
      }
      if (index < right) { 
        quickSort3(items, index, right);
      }
  }
  return items;
}






function _mergeArrays (a, b) {
    const c = []

    while (a.length && b.length) c.push(a[0] > b[0] ? b.shift() : a.shift())
    while (a.length) c.push(a.shift()) 
    while (b.length) c.push(b.shift())
    
    return c
  }
  

  function mergeSort(a){
    if (a.length < 2) return a
    const middle = Math.floor(a.length / 2)
    const a_l = a.slice(0, middle)
    const a_r = a.slice(middle, a.length)
    const sorted_l = mergeSort(a_l)
    const sorted_r = mergeSort(a_r)
    return _mergeArrays(sorted_l, sorted_r)
  }


  function insertionSort(inputArr){
    let length = inputArr.length;
    for (let i = 1; i < length; i++) {
        let key = inputArr[i];
        let j = i - 1;
        while (j >= 0 && inputArr[j] > key) {
            inputArr[j + 1] = inputArr[j];
            j = j - 1;
        }
        inputArr[j + 1] = key;
    }
    return inputArr;
}



function Heapify(array, length, i){
  let biggest   = i
  let lefChild   = 2*i+1
  let rightChild = 2*i+2

  if(length>lefChild && array[lefChild] > array[biggest])      biggest = lefChild
  if(length>rightChild && array[rightChild] > array[biggest])  biggest = rightChild
  if(biggest != i) {
    [array[i],array[biggest]]= [array[biggest], array[i]]
    Heapify(array, length, biggest) 
  }

       return array
}

function HeapSort(array){
  let length = array.length
  let i= Math.floor(array.length / 2 - 1)
  let k= array.length-1

  while(i>=0){
    Heapify(array, length, i)
    i--
  }

  while(k>=0){
    [array[0], array[k]]= [array[k], array[0]]
    Heapify(array, k, 0)
    k--
  }

  return array
}




function ReverseSort(Array){
  let carr=[],newArray=[];
  let ind=0,gon=10000,yas=0;

  for(;ind<10001;ind++){
    carr[ind]= 0;   }

  for(;yas<Array.length;yas++){
    let x= Array[yas];
    carr[x] +=1 }
 
  for(;gon>=0;gon--){
    let z=carr[gon],p=0;
    for(;p<z;p++) newArray.push(gon)  }

    return newArray;
}




function comparator(a, b) {
  return a - b;
}


function BinaryInsertionSort(array, cmp) {
  cmp = cmp || comparator;
  var current;
  var middle;
  var left;
  var right;

  for (var i = 1; i < array.length; i += 1) {
    current = array[i]; // 3
    left = 0;
    right = i; // 2
    middle = Math.floor((left + right) / 2); // 1

    while (left <= right) {

      if (cmp(array[middle], current) <= 0)      left = middle + 1;
      else if (cmp(array[middle], current) > 0)  right = middle - 1; 
      middle = Math.floor((right + left) / 2);

    }


    for (var j = i; j > left; j -= 1) array[j] = array[j - 1];
    
    array[j] = current;
  }

  return array;
}
