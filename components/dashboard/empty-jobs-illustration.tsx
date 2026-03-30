export function EmptyJobsIllustration() {
  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle - centered */}
        <circle cx="120" cy="120" r="110" fill="#E8EFFE" fillOpacity="0.4" />
        {/* Inner glow */}
        <circle cx="120" cy="120" r="70" fill="#E8EFFE" fillOpacity="0.3" />
        {/* Radiating bars - centered at 120,120 */}
        <g transform="translate(120, 120)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const opacity = [1, 0.8, 0.55, 0.35, 0.2, 0.35, 0.55, 0.8][i];
            const colors = [
              "#0E3FA9",
              "#1667DB",
              "#1667DB",
              "#4C96FF",
              "#77BFFF",
              "#A8D4FF",
              "#77BFFF",
              "#4C96FF",
            ];
            return (
              <rect
                key={angle}
                x="-7"
                y="-60"
                width="14"
                height="38"
                rx="7"
                fill={colors[i]}
                opacity={opacity}
                transform={`rotate(${angle})`}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
