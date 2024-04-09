function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="402"
      height="68"
      fill="none"
    >
      <path fill="url(#a)" d="M0 0h402v68H0z"></path>
      <defs>
        <pattern
          id="a"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.002 .01178)" xlinkHref="#b"></use>
        </pattern>
        <image
          id="b"
          width="502"
          height="85"
          xlinkHref="data:image/png;base64,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"
        ></image>
      </defs>
    </svg>
  );
}

export default Icon;