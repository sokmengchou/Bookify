import moment from 'moment';
import { Image } from 'react-native';
import _ from 'lodash';
import { shuffle } from './functions';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface ISize {
  width: number;
  height: number;
}

export function pageKey() {
  return Number(moment().format('YYYYMMDDHHmmss'));
}
export function pageKeyMS() {
  return Number(moment().format('YYYYMMDDHHmmssSSSS'));
}

export function pushToArray(snapshot: FirebaseFirestoreTypes.QuerySnapshot): Array<any> {
  if (snapshot.empty) return [];
  return snapshot.docs.map((m) => ({ id: m.id, ...m.data() }));
}

export function pushToObject(snapshot: FirebaseFirestoreTypes.DocumentSnapshot): any {
  if (!snapshot?.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export function orderByDesc(data: Array<any>, field: string) {
  return _.orderBy(data, [field], ['desc'])
}

export function orderByAsc(data: Array<any>, field: string) {
  return _.orderBy(data, [field], ['asc'])
}

export function timestampToDate(date: any) {
  if (!date) return new Date();
  return moment.unix(date.seconds).toDate();
}

export function timestampToDateOrDate(date: FirebaseFirestoreTypes.Timestamp) {
  if (!date) return new Date();
  if (date.seconds) return moment.unix(date.seconds).toDate();
  return moment(date).toDate();
}

export function materialWebIcon(icon: string) {
  return icon.replace('_', '-')
}

export function stringToArray(str: string) {
  return str.replace(/[^a-zA-Z]/g, ' ').split(' ').filter(m => (m != '')).map(m => (m.trim()))
}

export function removeSpecialStrAdd_(str: string) {
  if (!str) return ''
  return str.replace(/[^a-zA-Z0-9]/g, '-')
}

export function pushObjArray(data: Array<any>, newItem: any) {
  let value: any[] = [];
  if (data && data.length > 0) {
    value = data;
    const exist = value.filter(m => m.key === newItem.key);
    if (exist && exist.length > 0) {
      // const index = value.findIndex((obj => obj.key == newItem.key));
      // value[index] = newItem;
      const list: any[] = value.filter(m => m.key !== newItem.key)
      list.push(newItem)
      value = list;
    } else {
      value.push(newItem);
    }
  } else {
    value.push(newItem);
  }

  return value;
}

export function updateObjArray(data: Array<any>, newItem: any) {
  let value: any[] = [];
  if (data && data.length > 0) {
    value = data;
    const exist = value.filter(m => m.key === newItem.key);
    if (exist && exist.length > 0) {
      const index = value.findIndex((obj => obj.key == newItem.key));
      value[index] = newItem;
    } else {
      value.push(newItem);
    }
  } else {
    value.push(newItem);
  }
  return value;
}


export function toNumber(value: any) {
  if (value === null || value === "" || value === undefined) {
    return 0;
  }
  if (Number(value) === NaN) return 0;
  return Number(value);
}

export function sum(data: Array<any>, field: string) {
  return data.reduce((a, b) => a + toNumber(b[field]), 0)
}

export function pushStringArray(data: Array<any>, key: string) {
  let value = [];
  if (data && data.length > 0) {
    value = data;
    const exist = value.filter(m => m === key);
    if (exist && exist.length > 0) {
      // const index = value.findIndex((obj => obj == key));
      // value[index] = key;
      const list: any[] = value.filter(m => m !== key)
      list.push(key)
      value = list;
    } else {
      value.push(key);
    }
  } else {
    value.push(key);
  }

  return value;
}

export function removeObjArray(data: Array<any>, key: string): any {
  let value = [];
  if (data && data.length > 0) {
    value = data.filter(m => m.key !== key);
  }
  return value;
}

export function removeStingArray(data: Array<any>, key: string): any {
  let value = [];
  if (data && data.length > 0) {
    value = data.filter(m => m !== key);
  }
  return value;
}


export function shuffleArray(data: any[]) {
  return _.shuffle(data);
}


export function shuffleData(Activity: any, field: string, shuffleField: string) {
  if (!Activity) return
  const shuffle = Activity[field].map((m: any) => ({
    ...m,
    [shuffleField]: shuffleArray(m[shuffleField])
  }))
  return { ...Activity, [field]: shuffle }
}


export function shuffleAnswer(Activity: any, shuffleField: string) {
  if (!Activity) return
  const shuffle = Activity.map((m: any) => ({
    ...m,
    [shuffleField]: _.shuffle(m[shuffleField])
  }))
  return shuffle
}

export function shuffleExercise(exercises: any) {
  if (!exercises) return;
  var arrayAnswers: any = [];
  exercises.map((m: any) => arrayAnswers.push(m));
  const shuffleAnswer = shuffle(arrayAnswers);
  return (shuffleAnswer);
}


export function getImageSize(uri: string): Promise<ISize> {
  const success = (resolve: (value?: ISize | PromiseLike<ISize>) => void) => (width: number, height: number) => {
    resolve({
      width,
      height
    });
  };
  const error = (reject: (reason?: any) => void) => (failure: Error) => {
    reject(failure);
  };

  return new Promise<ISize>((resolve, reject) => {
    Image.getSize(uri, success(resolve as any), error(reject));
  });
}

export function sumSkills(data: any[]) {
  const lessons = data ? data : []
  let skills: any[] = [
    { key: 'vocabulary', totalCorrectBySkill: 0 },
    { key: 'grammar', totalCorrectBySkill: 0 },
    { key: 'reading', totalCorrectBySkill: 0 },
    { key: 'listening', totalCorrectBySkill: 0 },
    { key: 'speaking', totalCorrectBySkill: 0 },
  ];
  skills.map((skill: any) => {
    let lessonSkill: any = 0;
    let totalCorrectBySkill: any = 0;
    lessons.map((l: any) => {
      const skillByLesson = l && l.skills ? l.skills : []
      const skillInLesson = skillByLesson.find((i: any) => i.key === skill.key);
      if (skillInLesson) {
        lessonSkill = lessonSkill + 1;
        const { totalSkillCorrect } = skillInLesson
        totalCorrectBySkill = totalCorrectBySkill + totalSkillCorrect;
      }
    })
    skills.find((i: any) => i.key === skill.key).totalCorrectBySkill = totalCorrectBySkill / lessonSkill || 0;
  })
  return skills
}

export function calendarDate(date: any) {
  return moment(timestampToDate(date)).calendar();
}

export function fromNow(date: any) {
  // console.log('date', date)
  // console.log('timestampToDate(date)', timestampToDate(date))
  return moment(timestampToDate(date)).fromNow();
}


export function removeSpace(str: string) {
  if (!str) return ''
  return str.replace(/\s+/g, '-');
}

export function removeSpecialStr(str: string) {
  if (!str) return ''
  return str.replace(/[^a-zA-Z0-9]/g, '')
}

export function splitExtension(fileName: string) {
  if (!fileName) return '';
  const fileExtension = `${fileName}`.split('.');
  return `.${fileExtension[fileExtension.length - 1]}`;
}

export function toDateKey(date: Date) {
  return Number(moment(date).format('YYYYMMDD'))
}

export function toDateFromCalendar(datestring: any) {
  return moment(datestring, 'YYYY-MM-DD').toDate();
}

export function expiredDate(date: any) {
  return moment(date, 'YYYYMMDDHHmm').format('LT')
}



export function timeLeftSecond(date1: Date, dateNumber: string) {
  const dateFormat = getDateTimeHM(date1);
  const time1 = moment(dateFormat, 'YYYYMMDDHHmm');
  const time2 = moment(dateNumber, 'YYYYMMDDHHmm')
  return time2.diff(time1, "second")
}
export function getDateTimeHM(date: any) {
  return toNumber(moment(date).format('YYYYMMDDHHmm'))
}

export function TimeLeft(date1: Date, date2: Date) {
  const time1 = moment(date1)
  const time2 = moment(date2)
  return time2.diff(time1, 'second')
}