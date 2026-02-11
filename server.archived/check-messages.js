import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: false },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', ContactSchema);

async function checkMessages() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const messages = await Contact.find().sort({ createdAt: -1 });
    
    console.log(`\n📧 Found ${messages.length} messages in database:\n`);
    
    if (messages.length === 0) {
      console.log('❌ No messages found in database');
    } else {
      messages.forEach((msg, i) => {
        console.log(`--- Message ${i + 1} ---`);
        console.log(`📅 Date: ${msg.createdAt}`);
        console.log(`👤 Name: ${msg.name}`);
        console.log(`📧 Email: ${msg.email}`);
        console.log(`📝 Subject: ${msg.subject || 'No subject'}`);
        console.log(`💬 Message: ${msg.message}`);
        console.log('');
      });
    }
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkMessages();