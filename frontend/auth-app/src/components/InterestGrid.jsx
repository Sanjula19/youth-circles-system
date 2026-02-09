const EMOJI = {
  SPORTS: "\u26BD", // ⚽
  ARTS: "\u{1F3A8}", // 🎨
  BUSINESS: "\u{1F4BC}", // 💼
  TECH: "\u{1F4BB}", // 💻
  ENV: "\u{1F33F}", // 🌿
  COMMUNITY: "\u{1F91D}", // 🤝
};

const INTERESTS = [
  { key: "SPORTS", title: "Sports & Athletics", meta: "1250 members", emoji: EMOJI.SPORTS },
  { key: "ARTS", title: "Arts & Culture", meta: "980 members", emoji: EMOJI.ARTS },
  { key: "BUSINESS", title: "Entrepreneurship", meta: "750 members", emoji: EMOJI.BUSINESS },
  { key: "TECH", title: "Technology & Innovation", meta: "1100 members", emoji: EMOJI.TECH },
  { key: "ENV", title: "Environmental Conservation", meta: "620 members", emoji: EMOJI.ENV },
  { key: "COMMUNITY", title: "Community Service", meta: "890 members", emoji: EMOJI.COMMUNITY },
];

export default function InterestGrid({ value = [], onChange }) {
  const selected = new Set(Array.isArray(value) ? value : []);

  const toggle = (key) => {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onChange(Array.from(next));
  };

  return (
    <div className="interestGrid2">
      {INTERESTS.map((it) => {
        const isOn = selected.has(it.key);
        return (
          <button
            key={it.key}
            type="button"
            className={`interestCard ${isOn ? "isSelected" : ""}`}
            onClick={() => toggle(it.key)}
          >
            <div className="interestIcon">{it.emoji}</div>
            <div className="interestText">
              <div className="interestTitle">{it.title}</div>
              <div className="interestMeta">{it.meta}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
