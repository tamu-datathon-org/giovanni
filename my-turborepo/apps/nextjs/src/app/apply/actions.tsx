import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export async function ResumeForm() {
    async function uploadResume(formData: FormData) {
        'use server';
        const resumeFile = formData.get('resume') as File;
        const blob = await put(resumeFile.name, resumeFile, {
            access: "public",
        });
        return blob
    }
    return (
        <form action={uploadResume}>
            <label>Upload Resume</label>
            <input type="file" name="resume" required />
            <button type="submit">Upload</button>
        </form>
    )
}