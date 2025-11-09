#!/bin/bash

echo "🚀 در حال راه‌اندازی پروژه..."
echo ""

# رنگ‌ها برای خروجی
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. نصب بسته‌ها
echo "📦 نصب بسته‌های npm..."
npm install

# 2. بررسی فایل .env
if [ ! -f .env ]; then
    echo ""
    echo -e "${YELLOW}⚠️  فایل .env وجود ندارد!${NC}"
    echo ""
    echo "لطفاً فایل .env را با این محتوا بسازید:"
    echo ""
    echo "----------------------------------------"
    cat .env.example
    echo "----------------------------------------"
    echo ""
    echo "برای ساخت فایل .env این دستور را اجرا کنید:"
    echo -e "${GREEN}nano .env${NC}"
    echo ""
    echo "و connection string دیتابیس Neon خود را جایگزین کنید."
    exit 1
fi

# 3. بررسی DATABASE_URL
if ! grep -q "DATABASE_URL" .env || grep -q "YOUR_PASSWORD\|username:password" .env; then
    echo ""
    echo -e "${YELLOW}⚠️  لطفاً DATABASE_URL را در فایل .env تنظیم کنید${NC}"
    echo ""
    echo "فایل .env را باز کنید:"
    echo -e "${GREEN}nano .env${NC}"
    echo ""
    echo "و connection string واقعی Neon را جایگزین کنید."
    exit 1
fi

# 4. ساخت جداول دیتابیس
echo ""
echo "🗄️  ساخت جداول دیتابیس..."
npm run db:push

# 5. پیام موفقیت
echo ""
echo -e "${GREEN}✅ همه چیز آماده است!${NC}"
echo ""
echo "برای اجرای سرور این دستور را بزنید:"
echo -e "${GREEN}npm run dev${NC}"
echo ""
echo "سپس مرورگر را باز کنید و به این آدرس بروید:"
echo -e "${GREEN}http://localhost:5000${NC}"
echo ""
