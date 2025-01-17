// test.ts
import { format, isSameDay } from 'date-fns'
type Post = {
    scheduledFor: string;
  };
  
  const posts: Post[] = [
    { scheduledFor: "2024-01-10T10:00:00" },
    { scheduledFor: "2024-01-11T12:00:00" },
    { scheduledFor: "2024-01-10T15:30:00" },
  ];
  
//   const isSameDay = (date1: Date, date2: Date): boolean =>
//     date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate();
  
  const getPostsForDate = (date: Date): Post[] => {
    return posts.filter(post => isSameDay(new Date(post.scheduledFor), date));
  };
  
  // Test function
  const testDate = new Date("2024-01-10");
  const result = getPostsForDate('Thu Jan 30 2025 00:00:00 GMT+0530 (India Standard Time)');
  
  console.log("Posts for the date:", testDate.toISOString());
  console.log(result);
  