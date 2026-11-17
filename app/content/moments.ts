/**
 * "Moments from the Prime family" on the About page.
 * Add, remove or reorder items here. Files live in public/images and public/video.
 * width and height are the file's real pixel size: each item takes exactly the space its shape needs.
 * Videos play muted and looped while on screen; `poster` is the still shown before they load.
 */
export type Moment =
  | { kind: "photo"; src: string; alt: string; width: number; height: number }
  | { kind: "video"; src: string; poster: string; label: string; width: number; height: number };

export const moments: Moment[] = [
  {
    kind: "photo",
    src: "/images/a.prime.jpeg",
    alt: "A young woman smiling through the Prime Church photo frame at Church in the Park, holding a blue balloon",
    width: 960,
    height: 1280,
  },
  {
    kind: "video",
    src: "/video/church-in-the-park.mp4",
    poster: "/video/church-in-the-park.jpg",
    label: "Video from Church in the Park",
    width: 720,
    height: 1280,
  },
  {
    kind: "photo",
    src: "/images/f.prime.jpeg",
    alt: "A young man in a white shirt holding up the Prime Church photo frame at Church in the Park",
    width: 960,
    height: 1280,
  },
  {
    kind: "photo",
    src: "/images/o.prime.jpeg",
    alt: "A young woman speaking into a microphone at Church in the Park",
    width: 960,
    height: 1280,
  },
  {
    kind: "photo",
    src: "/images/S.Prime.jpeg",
    alt: "A young woman with braids smiling through the Prime Church photo frame at Church in the Park",
    width: 960,
    height: 1280,
  },
  {
    kind: "photo",
    src: "/images/T.prime.jpeg",
    alt: "A young man posing in the Prime Church photo frame under a tree at Church in the Park",
    width: 960,
    height: 1280,
  },
];
