#### School Subscription
Initially access to each school will be blocked unless the user is subscribed to the school.
Authorization will work by adding a boolean type status checker to each User document in Mongo.
Each user will hold an array of subscribed schools.

If a user goes to a school page, instead of the posts, a 'Subscribe' button will show if the user is not subscribed. This button creates an AJAX request to the Subscription controller and update the user's list of subscribed schools. Once the array is updated, the page refreshes and the user will see the content.
