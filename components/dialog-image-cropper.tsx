import { useState } from "react";

import { useTranslations } from "next-intl";
import Cropper, { Area } from "react-easy-crop";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DialogImageCropper({
  image,
  onCrop,
}: {
  image: string;
  onCrop?: (croppedArea: Area, croppedAreaPixels: Area) => void;
}) {
  const t = useTranslations();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [croppedArea, setCroppedArea] = useState<
    { croppedArea: Area; croppedAreaPixels: Area } | undefined
  >(undefined);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea({ croppedArea, croppedAreaPixels });
  };

  const onUpload = () => {
    if (!croppedArea) return;
    onCrop?.(croppedArea.croppedArea, croppedArea.croppedAreaPixels);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t("profilePicture")}</DialogTitle>
        <DialogDescription>{t("profilePictureDescription")}</DialogDescription>
      </DialogHeader>
      <div className="relative size-[400px] self-center justify-self-center">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          aspect={1 / 1}
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">{t("cancel")}</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={onUpload}>{t("upload")}</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
