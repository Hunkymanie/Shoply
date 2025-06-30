import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2563eb',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shopping bag outline */}
          <path
            d="M5 7.5L4.5 16H15.5L15 7.5H5Z"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
            fill="rgba(255,255,255,0.1)"
          />
          {/* Shopping bag handles */}
          <path
            d="M7 7.5V6.5C7 5.39543 7.89543 4.5 9 4.5H11C12.1046 4.5 13 5.39543 13 6.5V7.5"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* S letter */}
          <path
            d="M8.5 10.5C8.5 10.2239 8.72386 10 9 10H10.5C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H9C8.72386 11 8.5 11.2239 8.5 11.5C8.5 11.7761 8.72386 12 9 12H10.5C10.7761 12 11 11.7761 11 11.5"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
