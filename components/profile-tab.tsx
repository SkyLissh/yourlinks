"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Area } from "react-easy-crop";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { DialogImageCropper } from "@/components/dialog-image-cropper";
import { ImagePicker } from "@/components/image-picker";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ProfileInfo } from "@/models/profile-info";

import { useProfileStore } from "@/stores/use-profile-store";

import { resizeImage } from "@/actions/resize-image";

type ProfileInfoWithoutPreview = Omit<ProfileInfo, "preview">;

export function ProfileTab() {
  const t = useTranslations();
  const { profile, updateProfile, changePreview } = useProfileStore();

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Partial<ProfileInfoWithoutPreview>>({
    resolver: zodResolver(ProfileInfo.omit({ preview: true })),
    defaultValues: profile,
  });

  const onSubmit = (data: Partial<ProfileInfoWithoutPreview>) => {
    updateProfile(data);
  };

  const onImageUpload = (file: File) => {
    const success = ProfileInfo.partial().safeParse({ picture: file });
    if (!success) {
      setError("picture", { message: "Invalid image" });
      return;
    }

    const preview = URL.createObjectURL(file);
    setPreview(preview);
    setFile(file);
    setDialogOpen(true);
  };

  const onCrop = async (croppedArea: Area) => {
    if (!file) return;
    const buffer = await resizeImage(await file.arrayBuffer(), croppedArea);
    const image = new File([buffer], "profile.jpg", { type: "image/jpeg" });
    const preview = URL.createObjectURL(image);

    changePreview(preview);
    setValue("picture", await image.arrayBuffer());
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (!value) return;
      updateProfile(value as Partial<ProfileInfo>);
    });

    return () => subscription.unsubscribe();
  }, [watch, updateProfile]);

  return (
    <article className="flex flex-1 flex-col gap-4 bg-card px-8 py-4">
      <h2 className="text-2xl font-bold">{t("profileDetails")}</h2>
      <p className="text-muted-foreground">{t("profileDetailsDescription")}</p>

      <form className="flex flex-1 flex-col gap-6 p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between gap-4 bg-background p-4 md:flex-row md:items-center">
          <p className="text-muted-foreground">{t("profilePicture")}</p>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-4">
            <ImagePicker image={profile.preview} onChange={onImageUpload} />
            <p
              className={cn(
                "text-sm text-muted-foreground/80 md:w-48",
                errors.picture && "font-medium text-destructive"
              )}
            >
              {t("profilePictureIndications")}
            </p>
          </div>
        </div>
        <fieldset className="flex flex-col gap-4 bg-background p-4">
          <label className="grid grid-cols-[1fr_3fr] gap-2">
            <p className="text-muted-foreground">{t("name")}*</p>
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder={t("name")}
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm font-medium text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
          </label>
          <label className="grid grid-cols-[1fr_3fr] gap-2">
            <p className="text-muted-foreground">{t("email")}</p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="example@email.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </label>
          <label className="grid grid-cols-[1fr_3fr] gap-2">
            <p className="text-muted-foreground">{t("description")}</p>
            <div className="flex flex-col gap-2">
              <Textarea
                className="resize-none"
                rows={2}
                maxLength={100}
                placeholder={t("description")}
                aria-invalid={!!errors.description}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm font-medium text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </label>
        </fieldset>

        <Button className="mt-auto w-full">{t("save")}</Button>
      </form>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogImageCropper image={preview!} onCrop={onCrop} />
      </Dialog>
    </article>
  );
}
