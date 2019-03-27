import {Injectable} from '@angular/core';
import {MonthDays} from '../models/dates.interface';

@Injectable()
export class DatesService {
  toString(date: Date, separator: string = '/') {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${mm}${separator}${dd}${separator}${yyyy}`;
  }

  getToday() {
    const today = new Date();
    return this.toString(today);
  }

  getCurrentWeek() {
    const curr = new Date;
    const week = [];

    for (let i = 1; i <= 7; i++) {
      const first = curr.getDate() - curr.getDay() + i;
      const day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }

    return week;
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getMonthDates(date: Date): MonthDays {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const daysCount = this.daysInMonth(mm, yyyy);

    const monthDates: MonthDays = {
      first: `${mm}/01/${yyyy}`,
      last: `${mm}/${daysCount}/${yyyy}`
    };

    return monthDates;
  }

}
