export function getTodayKST(): Date {
  const d = new Date();
  
  // Extract date components in Asia/Seoul timezone to handle server/client timezone mismatches
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });
  
  const parts = formatter.formatToParts(d);
  const findPart = (type: string) => parts.find(p => p.type === type)?.value || '0';
  
  const year = parseInt(findPart('year'), 10);
  const month = parseInt(findPart('month'), 10) - 1;
  const day = parseInt(findPart('day'), 10);
  const hour = parseInt(findPart('hour'), 10);
  const minute = parseInt(findPart('minute'), 10);
  const second = parseInt(findPart('second'), 10);
  
  return new Date(year, month, day, hour, minute, second);
}

export function getKoreanDayOfWeek(date: Date): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
}

export function formatKoreanDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = getKoreanDayOfWeek(date);
  return `${month}월 ${day}일 ${dayOfWeek}요일`;
}

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

export function getWeekDates(date: Date): Date[] {
  const currentDay = date.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
  
  // Calculate distance to this week's Monday
  const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  
  const monday = new Date(date);
  monday.setDate(date.getDate() + distanceToMonday);
  monday.setHours(12, 0, 0, 0); // Prevent timezone shifting issues

  const weekDates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    d.setHours(12, 0, 0, 0);
    weekDates.push(d);
  }
  return weekDates;
}

export function getWeekOfMonth(date: Date): string {
  const year = date.getFullYear();
  // Using Intl format to stay standard, or general mathematical calculation
  const target = new Date(date);
  // Get first day of target month
  const firstDayOfMonth = new Date(year, target.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay(); // 1: Mon, 7: Sun
  
  const day = target.getDate();
  const offset = firstDayOfWeek - 1; // distance to Monday
  const weekNum = Math.ceil((day + offset) / 7);
  
  return `${target.getMonth() + 1}월 ${weekNum}주차`;
}

export function getDefaultSelectedDate(today: Date): Date {
  const dayNum = today.getDay(); // 0 (Sun) to 6 (Sat)
  if (dayNum >= 1 && dayNum <= 5) {
    return today;
  } else if (dayNum === 6) {
    // Saturday -> Next Monday (today + 2 days)
    const nextMon = new Date(today);
    nextMon.setDate(today.getDate() + 2);
    nextMon.setHours(12, 0, 0, 0);
    return nextMon;
  } else {
    // Sunday -> Next Monday (today + 1 day)
    const nextMon = new Date(today);
    nextMon.setDate(today.getDate() + 1);
    nextMon.setHours(12, 0, 0, 0);
    return nextMon;
  }
}
