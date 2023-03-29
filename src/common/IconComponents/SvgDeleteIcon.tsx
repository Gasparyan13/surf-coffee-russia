import React from 'react'

import { SvgIconProps } from './types'

export const SvgDeleteIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        clipRule="evenodd"
        d="M12 3C11.5842 3 11.1886 3.03453 10.8767 3.09437C10.7207 3.12429 10.5993 3.15795 10.5123 3.19051C10.4339 3.21984 10.4057 3.23955 10.4057 3.23955C10.4057 3.23955 10.4069 3.23837 10.4092 3.23618C10.2073 3.42456 9.89094 3.41359 9.70256 3.21169C9.51418 3.00978 9.52514 2.69339 9.72705 2.505C9.85406 2.38651 10.0161 2.30844 10.1618 2.25392C10.3162 2.19618 10.495 2.14936 10.6883 2.11228C11.0749 2.03811 11.5352 2 12 2C12.4648 2 12.9251 2.03811 13.3117 2.11228C13.505 2.14936 13.6838 2.19617 13.8382 2.25392C13.9839 2.30844 14.1459 2.38651 14.2729 2.505C14.4749 2.69339 14.4858 3.00978 14.2974 3.21169C14.1091 3.41359 13.7927 3.42456 13.5908 3.23618C13.5931 3.23837 13.5943 3.23955 13.5943 3.23955C13.5943 3.23955 13.5661 3.21984 13.4877 3.19051C13.4007 3.15795 13.2793 3.12429 13.1233 3.09437C12.8114 3.03453 12.4158 3 12 3ZM3 7V6H3.01776C3.02812 6 3.03843 6 3.0487 6H20.9513C20.9615 6 20.9719 6 20.9822 6H21V7C20.5272 7 20.1977 7.00027 19.9397 7.01787C19.6863 7.03516 19.5387 7.0675 19.426 7.11418C19.0584 7.26642 18.7664 7.55843 18.6142 7.92597C18.5675 8.03867 18.5352 8.18627 18.5179 8.43972C18.5003 8.69767 18.5 9.02722 18.5 9.5V15.5366C18.5 16.4483 18.5 17.1832 18.4223 17.7612C18.3416 18.3612 18.169 18.8665 17.7678 19.2678C17.3665 19.669 16.8612 19.8416 16.2612 19.9223C15.6832 20 14.9483 20 14.0366 20H9.9634C9.05168 20 8.31681 20 7.73883 19.9223C7.13876 19.8416 6.63351 19.669 6.23223 19.2678C5.83096 18.8665 5.65836 18.3612 5.57768 17.7612C5.49997 17.1832 5.49999 16.4483 5.5 15.5366L5.5 9.5C5.5 9.02722 5.49973 8.69767 5.48213 8.43972C5.46484 8.18627 5.4325 8.03867 5.38582 7.92597C5.23358 7.55843 4.94157 7.26642 4.57403 7.11418C4.46133 7.0675 4.31373 7.03516 4.06028 7.01787C3.80233 7.00027 3.47278 7 3 7ZM18 7H6.00001C6.12454 7.16604 6.22892 7.34829 6.3097 7.54329C6.41526 7.79814 6.45904 8.06728 6.47981 8.37165C6.50001 8.66766 6.5 9.03136 6.5 9.48224V15.5C6.5 16.4569 6.50106 17.1244 6.56876 17.6279C6.63453 18.1171 6.75483 18.3762 6.93934 18.5607C7.12385 18.7452 7.3829 18.8655 7.87208 18.9312C8.37565 18.9989 9.04306 19 10 19H14C14.9569 19 15.6244 18.9989 16.1279 18.9312C16.6171 18.8655 16.8762 18.7452 17.0607 18.5607C17.2452 18.3762 17.3655 18.1171 17.4312 17.6279C17.4989 17.1244 17.5 16.4569 17.5 15.5V9.48224C17.5 9.03136 17.5 8.66766 17.5202 8.37165C17.541 8.06728 17.5847 7.79814 17.6903 7.54329C17.7711 7.34829 17.8755 7.16604 18 7Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        d="M10.5 10C10.2239 10 10 10.2239 10 10.5V15.5C10 15.7761 10.2239 16 10.5 16C10.7761 16 11 15.7761 11 15.5V10.5C11 10.2239 10.7761 10 10.5 10Z"
        fill="currentColor"
      />
      <path
        d="M13.5 10C13.2239 10 13 10.2239 13 10.5V15.5C13 15.7761 13.2239 16 13.5 16C13.7761 16 14 15.7761 14 15.5V10.5C14 10.2239 13.7761 10 13.5 10Z"
        fill="currentColor"
      />
    </svg>
  )
}