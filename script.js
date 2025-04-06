const horoscopes = {
    Aries: "Today is a great day to take bold actions. Trust yourself.",
    Taurus: "Focus on financial matters. Stability is coming your way.",
    Gemini: "Communication is key today. Express your ideas.",
    Cancer: "Spend quality time with family. Emotions run high.",
    Leo: "You will shine in your work. Confidence pays off.",
    Virgo: "Be organized. A new opportunity is around the corner.",
    Libra: "Balance your time and energy. Harmony is important.",
    Scorpio: "A mystery will be solved. Trust your instincts.",
    Sagittarius: "Adventure calls! Say yes to something new.",
    Capricorn: "Hard work pays off. Keep going steadily.",
    Aquarius: "Innovation and creativity lead you forward.",
    Pisces: "Listen to your intuition. Dreams hold messages."
  };
  
  const luckyNumbers = {
    Aries: 9, Taurus: 6, Gemini: 5, Cancer: 2,
    Leo: 1, Virgo: 3, Libra: 7, Scorpio: 4,
    Sagittarius: 8, Capricorn: 10, Aquarius: 11, Pisces: 12
  };
  
  const luckyColors = {
    Aries: "Red", Taurus: "Green", Gemini: "Yellow", Cancer: "White",
    Leo: "Gold", Virgo: "Brown", Libra: "Pink", Scorpio: "Black",
    Sagittarius: "Purple", Capricorn: "Grey", Aquarius: "Blue", Pisces: "Sea Green"
  };
  
  const luckyDays = {
    Aries: "Tuesday", Taurus: "Friday", Gemini: "Wednesday", Cancer: "Monday",
    Leo: "Sunday", Virgo: "Wednesday", Libra: "Friday", Scorpio: "Tuesday",
    Sagittarius: "Thursday", Capricorn: "Saturday", Aquarius: "Saturday", Pisces: "Thursday"
  };
  
  const loveCompatibility = {
    Aries: ["Leo", "Sagittarius", "Gemini"],
    Taurus: ["Virgo", "Capricorn", "Cancer"],
    Gemini: ["Libra", "Aquarius", "Aries"],
    Cancer: ["Scorpio", "Pisces", "Taurus"],
    Leo: ["Aries", "Sagittarius", "Libra"],
    Virgo: ["Taurus", "Capricorn", "Cancer"],
    Libra: ["Gemini", "Aquarius", "Leo"],
    Scorpio: ["Cancer", "Pisces", "Virgo"],
    Sagittarius: ["Aries", "Leo", "Aquarius"],
    Capricorn: ["Taurus", "Virgo", "Scorpio"],
    Aquarius: ["Gemini", "Libra", "Sagittarius"],
    Pisces: ["Cancer", "Scorpio", "Capricorn"]
  };
  
  const marriagePrediction = {
    Aries: "You may get married between 26-30 years of age.",
    Taurus: "Stable relationships ahead. Marriage is likely around 28.",
    Gemini: "Chances of love marriage between 27-31.",
    Cancer: "Family-arranged marriage around 25-29 possible.",
    Leo: "Marriage may happen after achieving career goals, around 30.",
    Virgo: "Marriage around 27-30 with someone intellectual.",
    Libra: "Early marriage possible, likely between 24-27.",
    Scorpio: "Deep connection may lead to marriage between 28-32.",
    Sagittarius: "Marriage may come as a surprise around 29.",
    Capricorn: "Career-first approach, marriage around 30-34.",
    Aquarius: "Unconventional marriage timing, likely after 30.",
    Pisces: "Emotional bonding may lead to marriage around 26-29."
  };
  
  function getZodiacSign(month, day) {
    const zodiacSigns = [
      { sign: "Capricorn", end: 19 },
      { sign: "Aquarius", end: 18 },
      { sign: "Pisces", end: 20 },
      { sign: "Aries", end: 19 },
      { sign: "Taurus", end: 20 },
      { sign: "Gemini", end: 20 },
      { sign: "Cancer", end: 22 },
      { sign: "Leo", end: 22 },
      { sign: "Virgo", end: 22 },
      { sign: "Libra", end: 22 },
      { sign: "Scorpio", end: 21 },
      { sign: "Sagittarius", end: 21 }
    ];
    return day <= zodiacSigns[month].end
      ? zodiacSigns[month].sign
      : zodiacSigns[(month + 1) % 12].sign;
  }
  
  function showHoroscope() {
    const dob = document.getElementById("dob").value;
    const birthTime = document.getElementById("birthTime").value;
    const birthPlace = document.getElementById("birthPlace").value;
    const partnerDob = document.getElementById("partnerDob").value;
    if (!dob) {
      alert("Please enter your date of birth.");
      return;
    }
  
    const date = new Date(dob);
    const zodiac = getZodiacSign(date.getMonth(), date.getDate());
    const message = horoscopes[zodiac];
    const number = luckyNumbers[zodiac];
    const color = luckyColors[zodiac];
    const day = luckyDays[zodiac];
  
    let compatibilityInfo = "";
    if (partnerDob) {
      const partnerDate = new Date(partnerDob);
      const partnerZodiac = getZodiacSign(partnerDate.getMonth(), partnerDate.getDate());
      const isCompatible = loveCompatibility[zodiac].includes(partnerZodiac);
      compatibilityInfo = `<p class="info"><strong>Love Compatibility with ${partnerZodiac}:</strong> ${isCompatible ? '💖 High Compatibility' : '⚠️ Needs effort'}</p>`;
    }
  
    const kundali = `<p class="info"><strong>Kundali Details:</strong><br>
      Birth Time: ${birthTime || 'Unknown'}<br>
      Birth Place: ${birthPlace || 'Unknown'}<br>
      Sun Sign (Zodiac): ${zodiac}</p>`;
  
    const marriageInfo = `<p class="info"><strong>💍 Marriage Prediction:</strong> ${marriagePrediction[zodiac]}</p>`;
  
    document.getElementById("result").innerHTML = `
      <h3>${zodiac} ♈</h3>
      <p class="info"><strong>Horoscope:</strong> ${message}</p>
      <p class="info"><strong>Lucky Number:</strong> ${number}</p>
      <p class="info"><strong>Lucky Color:</strong> ${color}</p>
      <p class="info"><strong>Lucky Day:</strong> ${day}</p>
      ${kundali}
      ${compatibilityInfo}
      ${marriageInfo}
    `;
  }
  
  function downloadPDF() {
    const element = document.getElementById("result");
    if (element.innerHTML.trim() === "") {
      alert("Please check the horoscope first before downloading.");
      return;
    }
    html2pdf().from(element).save("horoscope-report.pdf");
  }
  