export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  src: string;
  cover?: string;
}

export const PLAYLIST: Track[] = [
  {
    id: "track-1",
    title: "Goonee' Vocals",
    artist: "Goonee'",
    duration: "4:10",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663390776942/aLpKCOryOGdkJoFu.wav?Expires=1804179211&Signature=di7KKQGlyRR3X5H3xlffUYboluZZ1CIHIv0naoziNqVCaGyz7eUBwUbIujd~5K4XsLpq29uEgDD7D7fw3nuIM1kzg1QpJeD76cvtEp7ZpH4lA3G39eddhI-zXXKW945LnVl10jfvFzmgTY3ieNHQzRK7d4jQPrK36n~aFiCR1Rj4~XzrmyD3p4AYA2KQ9xvSpoTwX4UTiXnw8F1xRcbaPZfSjLy2oeq6CHKhmW9MvzALTk7TrrPrWV9CKb563CbbA9UpVQC6Z6XpLLuBCh8HxiVB-b5zDhv6Wgk7P8B6Me6ncgoIDL81V1yIZadG9Jw0O3i1JRhFwvd8m3-5CbNy~g__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  {
    id: "track-2",
    title: "Cyber Beat C1",
    artist: "Goonee'",
    duration: "2:12",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663390776942/SEcDJNyRgbSgmmdZ.wav?Expires=1804179201&Signature=CNdEPDrJDKnN8eeMdioErNTRBD-Us0dnyid5FLG2ygWM4OXMdGPm3ZvlNMoRSlgXmwrCgg9ExPwefqlSDtMSvzlmnE4CtJAztAI3ISiTNp~UZyN0kxA89MDddZ93ABcOgYrafr-jgGNEytpNlU8QLAC~9DU3LLjHhbgSXs7NnsrTq3xY2GJD8CyeyogyT4bsKR~lBDbaEbicvw3YBwMB~SpLi0GzQxPeREKd6WKUR~hQ7W8Z7SdtnqpoaivG7FTci6kpmQNEKNc1y7wn0-bzUwCvyzFTbYHrvlXcQpFVDGlXUekj-~imXCrbERa-TGMStKNQ3ljnQdj2IWgJYGqG-g__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  {
    id: "track-3",
    title: "Neon Pulse C2",
    artist: "Goonee'",
    duration: "2:12",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663390776942/XmfNycfTEusPGDsV.wav?Expires=1804179201&Signature=chLlByxPNwwtLpVaGGptdu2sZnRb6HUemQtPwQS4yzHaVNLgPb-41liFo0cJPZbrFfgT9zLgLLRyHgG9Zd7K4PtEjqT2x1fU7rRRUoh~ZnET-7q8fzd4J7VZyYejitVHZblu95blBXRM3OhW8LveSp9wPhOsPGI9LfiVNb-qIBve5eGZ0fzlzmPiUId8JLHXjMSY3WXAWblsCkLgWyBvPqkkrVptu6S3-SdW-hq4~rNS57YiIxlkGs6VhugHFX3eax4oBo8LO22viCgbFLDjel-xpJy6k3gjeW0JwJgTzbI4aDlQDM0X53-21~b7JBixnCGPRxUyS23uaJAb5D~KTg__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  {
    id: "track-4",
    title: "Arcade Dreams C3",
    artist: "Goonee'",
    duration: "2:12",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663390776942/azBgjrfOWvPvUYQE.wav?Expires=1804179201&Signature=TBlQwIhrhKUjewAU~-mpMdgDXOgxvdbB2umeO8eReW-B5OpObgCEXW0j31Sj2~1x6hH1qfVg-Doyr3YX0bhKyokDX9GV5ZONA8LWPRtI4uTZH1EaibSizvDcYWA-3vRBqeONVmlmEovCi2-BvsQkVyfwuyAtwMF8--qnomGtwiymUmAfwh52knNzMOFIoeGXeTNLcucxxJtguXPB8~8UucMpok2uNATvgS4JlRJCAWakF~KX8mFPmp7NaslbeOjYeBL7MVy0SLHSpED0CLXZbLW05B-r521dJowc4KG2IHC98Q4Euk3hmyDNo1yj93nifeD57EaUyol--NX2xR0Oxw__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  {
    id: "track-5",
    title: "Midnight Ride C4",
    artist: "Goonee'",
    duration: "1:54",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663390776942/gsaYSfrQdORZwfYb.wav?Expires=1804179201&Signature=fq1D6n25CTStUOx87oDUxQAb-ooytncKTXvQACvrmpUjLO36hHU8moaiosWly2ipzsNxP~42ESV18IDCMvUuFEXovwFeOFRik0V~xr4o5hAOMXFUG8Z-htSsgzWyTWUXg3jizOKjgC74pzT1Bn8O1v4lva2ixHI3fPh1WN-9uRY4REkNmczXIPw81gW49Weu0ZGHjs-2TqGTohjf2KPUjdi8gbllVrPB0CaKXGTGhsY91l5lwD8tLJ8CghVu~eLSx9bHNiXFi0uuF68zzfC8oqSk1e0RUFrVyOIJ2yxIvnv7y-L3BWE32f7uZAfqG8RTCF8rRUApcZUblAieMAIt4w__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  {
    id: "track-6",
    title: "Electric Soul C5",
    artist: "Goonee'",
    duration: "1:54",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663390776942/OgCNrMyKISjKJxff.wav?Expires=1804179201&Signature=Pfxr6EmePjjdit~OkpbRFtsVIonPXDMVB-rwKCQu4Z-qfqvS6b12avH0bWshDs5zzp25IkipnIeBZaIUB72~dmhTzGFtPr8ZkvCoprcsSQarN6dMSRKzcwuXKbgF1wuLUjm7e-fvttvq9rnse68kHHS-mphBNzrIYuCraCpiIj50hhszFW3KdebVUZznNQmKJcjs-s-3SHGzvicXwssaTYgOv49S5dv1OYpsZ9ztLPBEJiTQjTYW2BDElAnlkDp7bui6tQCHNfCesVNqvgG7pjXlFBF6lqLL-LSY0yZClAMhNlbfTV5hOvxidHOqXPM6b-0gqFtF36MhZRCl7xJW6Q__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  {
    id: "track-7",
    title: "Digital Horizon",
    artist: "Goonee'",
    duration: "2:05",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663390776942/xraGERuUQGlzBzIw.wav?Expires=1804179211&Signature=pTItxAm4bx1ohqtiHGlTgPCnEB08j6ypz2hQl2kQ26ZL6JKVqjogTW8BATZMlWsezQtDb8gNxSrITUCSp2xtYv0V4OHFvRSDa2-FE9rdHfuShaO7V~x5SWWZxQkGs1Sb62ARi~vY3XcWzE3WurOIulmR2wv~smFKKAVOb-gqzBZdaVUlQgPfOn-ucZqoXcEaQR2wTYHxStSlbntWLHOiQ9Jp-mq0BQVxUjXIG8jLp03RoxnTd4JynmIveaGm2~S8dXgrkXMzpfstzSHntQJbPfzyitkbIlW3KRsYxRzdH1VUWVut2cwBvHlsYohhX849Iv5Ce2gdifBLXsw4JrTSYw__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
];

export const AVATAR_VIDEO_URL = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663390776942/UNtafjUQoECHmwus.mp4?Expires=1804179190&Signature=RsnbkmnE0FT1h3UzkDt89Z6nJ1TM~zwFGeuN~ZJTT4QQSaPWQVcsu2-7cHpNkKLRD8xCrdSN7QxKtGXtvMra0J749idnk17b4RPfSx-cHxCssHP5nHPj7PV0vmyzCbPhdX5YRIei61BlprbwRZw0b5e1HMhK9r~VScgKmpbamrkM0yh53raKyfUrEyV12Pf9yAXXUcxCO81rmi4L7DrbwPyRfWl07iqefWeTKgB~lXAbMj~WGUOEu1Ilx4e-5qF5F4FAK5qGXY8BOAXdmMxC7T3NSfHR9wgKnvRcSGXwG8OwMWJO5u5V~s44hWKhJ0yX-S2LGu951xxA29oDPMWBRw__&Key-Pair-Id=K2HSFNDJXOU9YS";

export const IMAGES = {
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663390776942/Ae4xzXqXwsBFFJ6dKFRsYQ/hero-bg-neon-arcade-2Lxw62dVdwUWxCwbacDaPC.webp",
  equalizerBanner: "https://d2xsxph8kpxj0f.cloudfront.net/310519663390776942/Ae4xzXqXwsBFFJ6dKFRsYQ/neon-equalizer-banner-7DLL9rUMANcosJqmjT3g4H.webp",
  gooneeStage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663390776942/Ae4xzXqXwsBFFJ6dKFRsYQ/goonee-stage-performance-6hvLGZXodfTMmzx4Z4UFWJ.webp",
  neonGrid: "https://d2xsxph8kpxj0f.cloudfront.net/310519663390776942/Ae4xzXqXwsBFFJ6dKFRsYQ/neon-grid-pattern-V7p8n6nQ7FZseNrt9ZZwp4.webp",
};
