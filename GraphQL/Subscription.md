# Subscriptions
Subscription fields are defined exactly as `Query` and `Mutation` fields are, but using the `subscription` root operation type instead:
```
type Subscription {
  reviewCreated: Review
}
```
A subscription is initiated using the `subscription` keyword as the operation type:
```
subscription NewReviewCreated {
  reviewCreated {
    rating
    commentary
  }
}
```