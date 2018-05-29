const Schema = mongoose.Schema;

const PostEntitySchema = new Schema({
  id: Number,
  date: { type: Date, default: null },
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  text: String,
  tags: String,
  imgUrl: { type: String, required: false},
  status: String,
  // status: String: 'active' | 'inactive';
});

const PostEntity = mongoose.model('post', PostEntitySchema);
module.exports = PostEntity;