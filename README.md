# 🕰️ MemoryLane
**Preserve precious memories in digital time capsules that unlock on special dates**

Create, collaborate, and relive cherished moments with photos, videos, audio, and heartfelt messages.

[🎥 Demo](#) • [📚 Documentation](#) • [🐛 Report Bug](#) • [✨ Request Feature](#)

---

## ✨ Features at a Glance

### 🔐 Secure Authentication
- Email/Password with **bcrypt** hashing
- **Google OAuth** integration
- JWT session management
- Protected routes via middleware

### 🤖 AI-Powered Assistance
- Smart caption generation for media
- Content summarization
- Powered by **Google Gemini 2.5 Flash**

### ⏳ Smart Capsule Management
- **4-step creation wizard**
- Theme-based organization
- Flexible privacy controls
- Automatic scheduled unlocking

### 👥 Collaboration System
- Invite contributors to capsules
- Multi-user media uploads
- Role-based permissions

### 💬 Interactive Engagement
- Emoji reactions (❤️)
- Threaded comments

### 📧 Smart Notifications
- Creation confirmations & unlock alerts
- Email via **Nodemailer/SMTP**

---

## 🎯 Core Capabilities

### Capsule Creation Wizard
| Step | Focus | Details |
|------|-------|---------|
| **1. Details** | 📝 | Title, description, theme, privacy + AI-generated suggestions |
| **2. Media** | 📸 | Upload images/videos/audio with AI-generated captions |
| **3. Recipients** | 👥 | Add collaborators, set unlock date/time |
| **4. Review** | ✅ | Confirm all settings before creation |

### Supported Themes
Childhood 🧒 • Family History 👨‍👩‍👧‍👦 • College Years 🎓  • Travel ✈️  • Other 📦

---

## 🛠️ Tech Stack

**Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS  
**Backend:** Next.js API Routes, NextAuth.js  
**Database:** MongoDB + Mongoose  
**AI:** Google Gemini 2.0 Flash  
**Email:** Nodemailer (SMTP)  
**Deployment:** Vercel

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ and npm v9+
- MongoDB (local or Atlas cluster)
- Google Cloud project for OAuth
- Google AI API key (for Gemini)
- SMTP credentials (Gmail recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Ruchika-Sinha0629/Memory-Lane.git
cd memorylane

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev

# Navigate to http://localhost:3000
```

---

## 🔑 Environment Configuration

Create a `.env.local` file:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/memorylane

# Authentication
NEXTAUTH_SECRET=your-super-secret-key-min-32-characters
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=MemoryLane <noreply@memorylane.com>

# AI Features
GOOGLE_API_KEY=your-gemini-api-key

# Cron Jobs (Optional)
CRON_SECRET=your-cron-secret-for-scheduled-jobs
```

📌 **Note:** For Gmail SMTP, generate an [App Password](https://myaccount.google.com/apppasswords)

---

## 📂 Project Structure

```
memorylane/
├── app/
│   ├── auth/              # Sign-in, Sign-up, Error pages
│   ├── api/               # API routes & NextAuth
│   ├── create/capsule/    # Capsule creation wizard
│   ├── dashboard/         # User dashboard
│   ├── capsule/[id]/      # Individual capsule view
│   └── unlocked/[id]/     # Unlocked capsule view
├── components/
│   ├── ui/                # Reusable UI components
│   └── [features]/        # Feature components
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── db.ts              # MongoDB connection
│   ├── ai.ts              # Gemini AI integration
│   └── email.ts           # Nodemailer utilities
├── models/
│   ├── Capsule.ts
│   ├── User.ts
│   └── [others]/          # Additional models
└── package.json
```

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create new user account |
| `*` | `/api/auth/[...nextauth]` | NextAuth.js handler |

### Capsule Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/capsules/create` | Create new capsule | ✅ |
| `POST` | `/api/capsules/[id]/upload` | Add media | ✅ |
| `GET` | `/api/capsules/[id]` | Fetch details | ✅ |
| `POST` | `/api/capsules/[id]/unlock` | Manual unlock | ✅ Owner |
| `POST` | `/api/capsules/collaborate` | Add collaborator | ✅ Owner |

### Engagement
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/reactions` | Toggle reaction | ✅ |
| `POST` | `/api/comments` | Post comment | ✅ |

### AI Features
| Method | Endpoint | Action | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/ai/caption-summary` | `caption` | Generate media captions and summary |

---

## 🗄️ Database Schema

### Capsule Model
```typescript
import mongoose, { Schema, models } from "mongoose";

const MediaSchema = new Schema({
  url: String,
  type: {
    type: String,
    enum: ["image", "video", "audio"],
  },
});

const CapsuleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: String,

    media: [MediaSchema],

    recipients: {
      type: [String],
      default: [],
    },

    collaborators: {
      type: [String],
      default: [],
    },

    theme: String,

    privacy: {
      type: String,
      enum: ["private", "collaborators", "public"],
      default: "private",
    },

    unlockDate: { type: Date, required: true },
    isUnlocked: { type: Boolean, default: false },

     reactions: {
    hearts: { type: [String], default: [] },
  },

    summary: {
  type: String,
  default: "",
},

caption: {
  type: String,
  default: "",
},

    createdBy: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default models.Capsule || mongoose.model("Capsule", CapsuleSchema);

```

**Additional Models:** User • Comment

---

## 🚢 Deployment on Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=(https://github.com/Ruchika-Sinha0629/Memory-Lane.git))

### Manual Steps

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables**
   - Add all variables from `.env.local`
   - Update `NEXTAUTH_URL` to your Vercel domain

4. **Deploy** 🚀
   - Click "Deploy"
   - Live in minutes!

### Post-Deployment
- ✅ Update Google OAuth redirect URIs
- ✅ Test authentication & email notifications
- ✅ Set up cron job for auto-unlocking

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 License

Licensed under the **MIT License** - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Nodemailer](https://nodemailer.com/) - Email delivery

---

<div align="center">

**Made with ❤️ for preserving memories**

</div>
