<!-- Understanding Pagination -->
/feed/page=1&limit=10 => gives 1st 10 users (1-10) => .skip(0) & .limit(10)
/feed/page=2&limit=10 => gives next 10 users (11-20) => .skip(10) & .limit(10)
/feed/page=3&limit=10 => gives next 10 users (21-30)=> .skip(20) & .limit(10)
...
/feed/page=n&limit=10 => gives next 10 users (21-30)=> .skip((n-1)*10) & .limit(10)


<!-- in mongoDB there are 2 important functions (A) .skip()  (B) .limit() -->