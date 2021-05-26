import mongoose from 'mongoose';

interface Image {
    image: String,
}
const imageSchema = new mongoose.Schema({
    image: String,
})

module.exports = mongoose.model<Image>('Image', imageSchema);