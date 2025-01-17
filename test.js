"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// test.ts
var date_fns_1 = require("date-fns");
var posts = [
    { scheduledFor: "2024-01-10T10:00:00" },
    { scheduledFor: "2024-01-11T12:00:00" },
    { scheduledFor: "2024-01-10T15:30:00" },
];
//   const isSameDay = (date1: Date, date2: Date): boolean =>
//     date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate();
var getPostsForDate = function (date) {
    return posts.filter(function (post) { return (0, date_fns_1.isSameDay)(new Date(post.scheduledFor), date); });
};
// Test function
var testDate = new Date("2024-01-10");
var result = getPostsForDate(testDate);
console.log("Posts for the date:", testDate.toISOString());
console.log(result);
