export const uploadToCloudinary = async (files: File[]): Promise<string[]> => {
    const uploaders = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "carImages");

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!res.ok) {
            const err = await res.json();
            throw new Error(`Cloudinary error: ${err.error?.message || res.statusText}`);
        }

        const data = await res.json();
        return data.secure_url as string;
    });

    return Promise.all(uploaders);
}