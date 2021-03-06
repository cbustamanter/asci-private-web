import { createIcon } from "@chakra-ui/icons";

export const LoginCard = createIcon({
  displayName: "LoginCard",
  viewBox: "0 0 50 50",
  path: (
    <svg
      width="50"
      height="50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="50" height="50" fill="url(#pattern0)" />
      <rect
        width="50"
        height="50"
        fill="#102C63"
        style={{ mixBlendMode: "hue" }}
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0" transform="scale(0.02)" />
        </pattern>
        <image
          id="image0"
          width="50"
          height="50"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  ),
});
