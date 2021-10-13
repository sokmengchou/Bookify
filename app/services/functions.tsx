import { studentRef, userRef } from "./data.service";

export function shuffle(array: any = []) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



export function isEquivalent(a: any, b: any, field?: string[]) {
  const aProps = field || Object.getOwnPropertyNames(a);
  const bProps = field || Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (let i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (JSON.stringify(a[propName]) !== JSON.stringify(b[propName])) {
      return false;
    }
  }

  return true;
}

export async function getReadPercentage(bookId: string, isStudent: boolean, uid: string) {
  const readerRef = isStudent ? studentRef() : userRef();
  const book = await readerRef.doc(uid).collection("read_books").doc(bookId).get();
  const bookData: any = book.exists ? book.data() : null
  return (bookData && bookData.read_percentage ? bookData.read_percentage : 0)
}


export function arrayKeys(key: string, arrayKeys: any[]) {
  const found = arrayKeys.find(m => m === key);
  var keys = arrayKeys || []
  if (!found) {
    keys.push(key)
    return (keys)
  } else {
    return (arrayKeys);
  }
}