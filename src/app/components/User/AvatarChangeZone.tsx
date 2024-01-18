
"use client"

import { Avatar } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';

interface AvatarChangeZoneProps {
  src: string;
}

export default function AvatarChangeZone({ src }: AvatarChangeZoneProps) {
  const [avatarSrc, setAvatarSrc] = useState(src)

  return (
    <Dropzone
      onDrop={(files) => setAvatarSrc(URL.createObjectURL(files[0] ?? new Blob()))}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      radius={100}
    >
    <Avatar src={avatarSrc} alt="Avatar" radius={100} size={100}/>
        {/* <Dropzone.Accept>
        </Dropzone.Accept>

        <Dropzone.Reject>
        </Dropzone.Reject>
        <Dropzone.Idle>
        </Dropzone.Idle> */}
    </Dropzone>
  );
}
