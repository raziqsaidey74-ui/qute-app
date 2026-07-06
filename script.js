// ۱. دیتابیس کامل جملات، نام‌ها و مسیر درست عکس‌ها در پوشه images
const quotes = [
    {
        text: "هوشمندی یعنی توانایی تطبیق با تغییرات.",
        author: "استیون هاوکینگ",
        image: "images/hawking.jpg"
    },
    {
        text: "تنها راه انجام دادن کارهای بزرگ، عشق ورزیدن به کاری است که انجام می‌دهید.",
        author: "استیو جابز",
        image: "images/jobs.jpg"
    },
    {
        text: "بزرگترین ریسک، ریسک نکردن است.",
        author: "مارک زاکربرگ",
        image: "images/zuckerberg.jpg"
    },
    {
        text: "کیفیت یعنی کار را درست انجام دهی، وقتی کسی نگاهت نمی‌کند.",
        author: "هنری فورد",
        image: "images/ford.jpg"
    }
];

// ۲. انتخاب المان‌های HTML برای تزریق اطلاعات
const quoteText = document.querySelector('.quote-text');
const authorName = document.querySelector('.author-name');
const authorImg = document.getElementById('author-img');
const favoritesList = document.getElementById('favorites-list');

// انتخاب دکمه‌های اصلی بر اساس کلاس و ترتیب قرارگیری در HTML
const buttons = document.querySelectorAll('.action-btn');
const nextBtn = buttons[0];  // دکمه جمله بعدی
const starBtn = buttons[1];  // دکمه ستاره‌دار کردن
const copyBtn = buttons[2];  // دکمه کپی
const speakBtn = buttons[3]; // دکمه پخش صدا
const bgBtn = buttons[4];    // دکمه تغییر رنگ پس‌زمینه
const shareBtn = buttons[5]; // دکمه اشتراک‌گذاری
const clearAllBtn = document.getElementById('clear-all-btn');

// انتخاب دکمه‌های سایز فونت به کمک ID
const decreaseFontBtn = document.getElementById('decrease-font');
const increaseFontBtn = document.getElementById('increase-font');

// اندازه اولیه متن بر حسب rem
let currentFontSize = 1.2;

// ۳. عملکرد دکمه «جمله بعدی» (تغییر تصادفی متن، نام و عکس)
nextBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    quoteText.innerText = `"${randomQuote.text}"`;
    authorName.innerText = randomQuote.author;
    authorImg.src = randomQuote.image; // تغییر عکس به شخص جدید
});

// ۴. عملکرد دکمه «کپی» متن در کلیپ‌بورد
copyBtn.addEventListener('click', () => {
    const fullText = `${quoteText.innerText} - ${authorName.innerText}`;
    navigator.clipboard.writeText(fullText).then(() => {
        alert("متن با موفقیت کپی شد!");
    });
});

// ۵. عملکرد دکمه «ستاره‌دار کردن» (اضافه به لیست برگزیده‌ها)
starBtn.addEventListener('click', () => {
    const li = document.createElement('li');
    li.style.margin = "8px 0";
    li.style.fontSize = "0.9rem";
    li.style.color = "#ffca28";
    li.style.listStyleType = "none";
    li.innerText = `⭐ ${quoteText.innerText} (${authorName.innerText})`;
    favoritesList.appendChild(li);
});

// ۶. عملکرد دکمه «پاک کردن همه» لیست برگزیده‌ها
clearAllBtn.addEventListener('click', () => {
    favoritesList.innerHTML = '';
});

// ۷. عملکرد دکمه «تغییر رنگ پس‌زمینه» به صورت تصادفی
bgBtn.addEventListener('click', () => {
    const colors = ['#12161a', '#1a1c1e', '#211a1d', '#1a221a', '#1a1f2c', '#111827'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});

// ۸. عملکرد دکمه «پخش صدا» (خوانش متن فارسی)
speakBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // متوقف کردن صداهای قبلی
        const utterance = new SpeechSynthesisUtterance(quoteText.innerText);
        utterance.lang = 'fa-IR'; 
        window.speechSynthesis.speak(utterance);
    } else {
        alert("مرورگر شما از پخش صدا پشتیبانی نمی‌کند.");
    }
});

// ۹. عملکرد دکمه «اشتراک‌گذاری»
shareBtn.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'سخن بزرگان',
            text: `${quoteText.innerText} - ${authorName.innerText}`,
        }).catch(console.error);
    } else {
        alert("قابلیت اشتراک‌گذاری مستقیم در این مرورگر فعال نیست. لطفاً از دکمه کپی استفاده کنید.");
    }
});

// ۱۰. عملکرد دکمه‌های بزرگ‌نمایی و کوچک‌نمایی متن (A+ و A-)
increaseFontBtn.addEventListener('click', () => {
    if (currentFontSize < 2.5) { // حداکثر اندازه برای جلوگیری از به هم ریختگی چیدمان
        currentFontSize += 0.15;
        quoteText.style.fontSize = `${currentFontSize}rem`;
    }
});

decreaseFontBtn.addEventListener('click', () => {
    if (currentFontSize > 0.8) { // حداقل اندازه مجاز متن
        currentFontSize -= 0.15;
        quoteText.style.fontSize = `${currentFontSize}rem`;
    }
});