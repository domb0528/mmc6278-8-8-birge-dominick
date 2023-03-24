const { Schema, model, SchemaTypes, models} = require('mongoose');
const CommentSchema = require('./Comment')

const PostSchema = new Schema({
// Create an "title" property with type String that is required and unique
// Create an "body" property with type String that is required
// Create a "createdAt" property with type Date and set default to Date.now
// Create a "comments" property that is an array of CommentSchema (a subdocument)
// Create a "tags" property that is an array of objects
// with type SchemaTypes.ObjectId and ref 'Tag'
// Create a "slug" property with type String
title: {
  type: String,
  required: true,
  unique: true
},
body: {
  type: String,
  required: true
},
createdAt: {
  type: Date,
  createdAt: Date.now
},
slug: {
  type: String,
},
comments: [CommentSchema],
tags: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }
]


})

// Turns the first five words of the title and lowercases them
// and joins them on hypens.
// Ex: The Trouble With JavaScript => the-trouble-with-javascript
PostSchema.pre('save', async function(next) {
  this.slug = this.title
    .split(' ')
    .slice(0, 5)
    .join('-')
    .toLowerCase()
    .replace(/[',.*\?\!\\\$@;:"]/, "")
  next()
})

module.exports = models.Post || model('Post', PostSchema)
