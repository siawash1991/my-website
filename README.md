# وبسایت شخصی مشاور AI - Siavash

یک وبسایت مدرن دوزبانه (فارسی/انگلیسی) برای مشاور هوش مصنوعی

## ویژگی‌ها

- 🌐 پشتیبانی کامل دوزبانه (فارسی/انگلیسی)
- 🌓 حالت تاریک/روشن
- 📱 طراحی Responsive
- ⚛️ React + TypeScript
- 🎨 Tailwind CSS + Shadcn UI

## راه‌اندازی سریع

### 1. نصب بسته‌ها

```bash
npm install
```

### 2. تنظیم فایل .env

یک فایل `.env` در ریشه پروژه بسازید:

```bash
nano .env
```

و این محتوا را در آن قرار دهید:

```env
DATABASE_URL="postgresql://username:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"
SESSION_SECRET="my-secret-key-123456"
NODE_ENV="development"
PORT=5000
```

**مهم:** `DATABASE_URL` را با connection string واقعی دیتابیس Neon خود جایگزین کنید.

برای دریافت دیتابیس رایگان:
1. به https://neon.tech بروید
2. یک اکانت بسازید
3. یک پروژه جدید ایجاد کنید
4. Connection string را کپی کنید

### 3. ساخت جداول دیتابیس

```bash
npm run db:push
```

### 4. اجرای سرور

```bash
npm run dev
```

سپس مرورگر را باز کنید و به http://localhost:5000 بروید.

## دستورات موجود

- `npm run dev` - اجرای سرور development
- `npm run build` - ساخت نسخه production
- `npm start` - اجرای نسخه production
- `npm run check` - بررسی خطاهای TypeScript
- `npm run db:push` - ایجاد/به‌روزرسانی جداول دیتابیس

## تکنولوژی‌های استفاده شده

### Frontend
- React 18
- TypeScript
- Wouter (routing)
- TanStack Query
- Tailwind CSS
- Shadcn UI
- Framer Motion

### Backend
- Node.js
- Express
- PostgreSQL (Neon)
- Drizzle ORM
- Passport.js (authentication)

## ساختار پروژه

```
.
├── client/           # Frontend React
│   ├── src/
│   │   ├── components/   # کامپوننت‌های React
│   │   ├── pages/        # صفحات
│   │   ├── contexts/     # Context API
│   │   └── hooks/        # Custom hooks
├── server/           # Backend Express
│   ├── index.ts      # ورودی سرور
│   ├── routes.ts     # API routes
│   ├── db.ts         # تنظیمات دیتابیس
│   └── auth.ts       # احراز هویت
├── shared/           # کد مشترک
│   ├── content.ts    # محتوای دوزبانه
│   └── schema.ts     # Schema دیتابیس
└── .env             # متغیرهای محیطی

```

## راهنمای دیپلوی

### دیپلوی روی سرور Ubuntu

1. نصب Node.js و npm
2. کپی فایل‌های پروژه
3. تنظیم فایل `.env`
4. اجرای `npm install`
5. اجرای `npm run build`
6. راه‌اندازی با PM2 یا systemd
7. تنظیم Nginx به عنوان reverse proxy
8. تنظیم SSL با Let's Encrypt

## پشتیبانی

برای گزارش مشکلات یا سوالات، لطفاً یک Issue در GitHub ایجاد کنید.

## لایسنس

MIT
