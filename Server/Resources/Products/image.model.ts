import mongoose from 'mongoose';
interface Image {
    Image: string,
}
const ImageSchema = new mongoose.Schema({
    image: String,
});

module.exports = mongoose.model<Image>('Image', ImageSchema);

