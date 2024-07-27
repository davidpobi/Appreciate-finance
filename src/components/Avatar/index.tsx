"use client";

import Image from "next/image";

interface AvatarProps {
  imgUrl: string | any;
  objectFit: "cover" | "contain";
  isLogo?: boolean;
}

const CustomAvatar = ({ imgUrl, objectFit, isLogo }: AvatarProps) => {
  return <Image src={imgUrl} alt="" sizes={"100%"} objectFit={objectFit} className="img" />;
};

export default CustomAvatar;
